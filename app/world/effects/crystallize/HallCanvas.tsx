"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { buildGlyphAtlas, RAMP, rgb } from "./glyphs";
import { aspectOf, coverScale, glyphFragment, glyphUniforms, loadImage, sceneVertex } from "./glyphShader";

export const SPACING = 9; // world units between cards along the hall
export const CARD_DISTANCE = 3.5; // how far in front of the camera a card sits when its step is centred

type Props = {
  images: string[];
  /** Each project's other screens, lining the walls around its card. */
  walls: { src: string; project: number }[];
  progress: RefObject<{ value: number }>;
  root: RefObject<HTMLElement | null>;
  active: boolean;
};

const CARD_W = 3.4;
const CARD_H = CARD_W / 1.6;
const WALL_W = 2;
const WALL_H = WALL_W / 1.72;
const LETTERS = "ICE";

/** A letter made of characters: the mask decides where glyphs live. */
const letterFragment = /* glsl */ `
  uniform sampler2D uMask;
  uniform sampler2D uAtlas;
  uniform float uGlyphs;
  uniform float uTime;
  uniform float uOpacity;
  uniform vec2 uGrid;
  uniform vec3 uColour;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  void main() {
    vec2 cell = floor(vUv * uGrid);
    vec2 inCell = fract(vUv * uGrid);
    float mask = texture2D(uMask, (cell + 0.5) / uGrid).r;
    if (mask < 0.5) discard;
    float flicker = hash(cell + floor(uTime * 2.5));
    float index = floor(clamp(0.5 + flicker * 0.5, 0.0, 0.999) * uGlyphs);
    float glyph = texture2D(uAtlas, vec2((index + inCell.x) / uGlyphs, inCell.y)).r;
    gl_FragColor = vec4(uColour, glyph * uOpacity);
  }
`;

/** One letter in the display face, white on black, as a mask texture. */
function letterMask(char: string, fontFamily: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 640;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  ctx.font = `620px ${fontFamily}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(char, 256, 340);
  const t = new THREE.CanvasTexture(canvas);
  t.minFilter = THREE.LinearFilter;
  t.generateMipmaps = false;
  return t;
}

/** The crystallize material for a screenshot in the hall: arrives as loose glyphs. */
function screenMaterial(colours: { ink: string; paper: string; signal: string }) {
  const material = new THREE.ShaderMaterial({
    uniforms: glyphUniforms(20),
    vertexShader: sceneVertex,
    fragmentShader: glyphFragment,
    transparent: true,
    depthWrite: false,
  });
  const u = material.uniforms;
  u.uSolid.value = 0;
  u.uRes.value.set(1600, 1000);
  u.uBg.value = rgb(colours.ink);
  u.uInk.value = rgb(colours.paper);
  u.uSignal.value = rgb(colours.signal);
  return material;
}

// Deterministic scatter, so the hall is the same hall on every visit.
const rand = (i: number) => {
  const x = Math.sin(i * 91.7 + 13.1) * 43758.5453;
  return x - Math.floor(x);
};

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function Hall({ images, walls, progress, root }: Omit<Props, "active">) {
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);
  const pointer = useRef({ x: 0, y: 0 });
  const length = (images.length + 2) * SPACING;

  const colours = useMemo(() => {
    const el = root.current;
    const read = (name: string) => (el && getComputedStyle(el).getPropertyValue(name).trim()) || "#888";
    return {
      ink: read("--ink"),
      paper: read("--paper"),
      signal: read("--signal-on-ink"),
      muted: read("--muted-on-ink"),
      line: read("--line-on-ink"),
    };
  }, [root]);

  // Cards: one plane per project, alternating sides, turned toward the path.
  const cards = useMemo(
    () =>
      images.map((_, k) => {
        const side = k % 2 === 0 ? 1 : -1;
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(CARD_W, CARD_H), screenMaterial(colours));
        mesh.position.set(side * 1.25, (rand(k) - 0.5) * 0.5, -(k + 1) * SPACING);
        mesh.userData.side = side;
        mesh.rotation.set(0, -side * 0.22, side * 0.02);
        return mesh;
      }),
    [images, colours],
  );

  // Walls: each project's other screens, angled along both walls of its
  // stretch of the hall, so every card stands in a room of its own work.
  const panels = useMemo(() => {
    const seen = new Map<number, number>();
    return walls.map(({ project }, i) => {
      const j = seen.get(project) ?? 0;
      seen.set(project, j + 1);
      const cardSide = project % 2 === 0 ? 1 : -1;
      const side = j % 2 === 0 ? -cardSide : cardSide;
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(WALL_W, WALL_H), screenMaterial(colours));
      mesh.position.set(
        side * 3.3,
        (j % 2 === 0 ? 0.55 : -0.7) + (rand(i + 31) - 0.5) * 0.4,
        -(project + 1) * SPACING + 2.6 - j * 2.1,
      );
      mesh.rotation.y = -side * 1.0;
      mesh.userData.side = side;
      return mesh;
    });
  }, [walls, colours]);

  // Letters: I, C, E in glyphs, scattered along the walls at varied depths.
  const letters = useMemo(() => {
    const count = Math.ceil(length / 3.2);
    return Array.from({ length: count }, (_, i) => {
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uMask: { value: null as THREE.Texture | null },
          uAtlas: { value: null as THREE.Texture | null },
          uGlyphs: { value: RAMP.length },
          uTime: { value: 0 },
          uOpacity: { value: 1 },
          uGrid: { value: new THREE.Vector2(26, 32) },
          uColour: { value: rgb(colours.signal) },
        },
        vertexShader: sceneVertex,
        fragmentShader: letterFragment,
        transparent: true,
        depthWrite: false,
      });
      const side = rand(i + 7) > 0.5 ? 1 : -1;
      const height = 4 + rand(i + 3) * 3;
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(height * 0.8, height), material);
      // Behind the wall screens, so letters frame the work instead of covering it.
      mesh.position.set(side * (4.8 + rand(i + 11) * 2.4), (rand(i + 5) - 0.5) * 3, -2 - i * 3.2);
      mesh.rotation.y = -side * (0.35 + rand(i + 2) * 0.3);
      mesh.userData.char = LETTERS[i % LETTERS.length];
      return mesh;
    });
  }, [length, colours]);

  // Rails: the door's corridor carries on through the hall.
  const rails = useMemo(() => {
    const count = 16;
    const positions = new Float32Array(count * 6);
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const x = Math.cos(a) * 7;
      const y = Math.sin(a) * 4;
      positions.set([x, y, 6, x, y, -length], i * 6);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return new THREE.LineSegments(
      geometry,
      new THREE.LineBasicMaterial({ color: new THREE.Color(colours.muted), transparent: true, opacity: 0.35 }),
    );
  }, [length, colours]);

  // Textures: the glyph atlas, three letter masks, the cards' screenshots,
  // then the wall screens (after, so the cards never wait on them).
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let cancelled = false;
    const made: THREE.Texture[] = [];
    (async () => {
      await document.fonts.ready;
      const style = getComputedStyle(el);
      const atlas = buildGlyphAtlas(style.getPropertyValue("--world-mono") || "monospace");
      const display = style.getPropertyValue("--world-display") || "serif";
      const masks = Object.fromEntries(Array.from(LETTERS, (c) => [c, letterMask(c, display)]));
      made.push(atlas, ...Object.values(masks));
      letters.forEach((m) => {
        const u = (m.material as THREE.ShaderMaterial).uniforms;
        u.uAtlas.value = atlas;
        u.uMask.value = masks[m.userData.char as string];
      });
      const shots = await Promise.all(images.map((src) => loadImage(src, 1200)));
      if (cancelled) {
        shots.forEach((t) => t.dispose());
        return;
      }
      made.push(...shots);
      cards.forEach((m, k) => {
        const u = (m.material as THREE.ShaderMaterial).uniforms;
        u.uAtlas.value = atlas;
        u.uTarget.value = shots[k];
        u.uCover.value.copy(coverScale(CARD_W / CARD_H, aspectOf(shots[k])));
      });
      const screens = await Promise.all(walls.map(({ src }) => loadImage(src, 1080)));
      if (cancelled) {
        screens.forEach((t) => t.dispose());
        return;
      }
      made.push(...screens);
      panels.forEach((m, i) => {
        const u = (m.material as THREE.ShaderMaterial).uniforms;
        u.uAtlas.value = atlas;
        u.uTarget.value = screens[i];
        u.uCover.value.copy(coverScale(WALL_W / WALL_H, aspectOf(screens[i])));
      });
    })();
    return () => {
      cancelled = true;
      made.forEach((t) => t.dispose());
    };
  }, [root, images, walls, cards, panels, letters]);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      pointer.current = { x: (e.clientX / innerWidth) * 2 - 1, y: (e.clientY / innerHeight) * 2 - 1 };
    };
    addEventListener("pointermove", move);
    return () => removeEventListener("pointermove", move);
  }, []);

  useEffect(
    () => () => {
      [...cards, ...panels, ...letters].forEach((m) => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
      rails.geometry.dispose();
      (rails.material as THREE.Material).dispose();
    },
    [cards, panels, letters, rails],
  );

  useFrame(({ clock }) => {
    // The DOM has an intro step, one step per card and a trailing step. Card
    // k's step centred in the viewport puts card k CARD_DISTANCE ahead; the
    // intro (steps = -1) starts a full spacing further back, in the glyphs.
    const steps = progress.current.value * (images.length + 1) - 1;
    const z = -(steps + 1) * SPACING + CARD_DISTANCE;
    camera.position.set(pointer.current.x * 0.35, -pointer.current.y * 0.2, z);
    camera.lookAt(pointer.current.x * 0.1, 0, z - 10);

    // A phone is narrow: pull the cards toward the middle so they stay on screen.
    const spread = Math.min(1, Math.max(0.2, size.width / size.height / 1.6));
    cards.forEach((m) => {
      m.position.x = (m.userData.side as number) * 1.25 * spread;
      m.scale.setScalar(Math.min(1, Math.max(0.42, spread * 1.3)));
      const d = z - m.position.z; // how far ahead of the camera
      const u = (m.material as THREE.ShaderMaterial).uniforms;
      u.uProgress.value = smooth(15, 5, d);
      u.uTime.value = clock.elapsedTime;
      u.uOpacity.value = 1 - smooth(26, 32, d);
    });
    panels.forEach((m) => {
      m.position.x = (m.userData.side as number) * 3.3 * Math.max(0.55, spread);
      const d = z - m.position.z;
      const u = (m.material as THREE.ShaderMaterial).uniforms;
      u.uProgress.value = smooth(13, 4, d);
      u.uTime.value = clock.elapsedTime;
      u.uOpacity.value = (1 - smooth(22, 30, d)) * 0.85;
    });
    letters.forEach((m) => {
      const d = z - m.position.z;
      const u = (m.material as THREE.ShaderMaterial).uniforms;
      u.uTime.value = clock.elapsedTime;
      u.uOpacity.value = (1 - smooth(20, 32, d)) * smooth(-1, 2, d) * 0.55;
    });
  });

  return (
    <>
      <color attach="background" args={[colours.ink]} />
      <fog attach="fog" args={[colours.ink, 8, 34]} />
      <primitive object={rails} />
      {letters.map((m) => (
        <primitive key={m.uuid} object={m} />
      ))}
      {panels.map((m) => (
        <primitive key={m.uuid} object={m} />
      ))}
      {cards.map((m) => (
        <primitive key={m.uuid} object={m} />
      ))}
    </>
  );
}

export default function HallCanvas({ active, ...props }: Props) {
  return (
    <Canvas
      flat
      dpr={[1, 2]}
      frameloop={active ? "always" : "never"}
      camera={{ fov: 50, near: 0.1, far: 80, position: [0, 0, 0] }}
      gl={{ antialias: true, alpha: false }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Hall {...props} />
    </Canvas>
  );
}
