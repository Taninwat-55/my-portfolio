"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { buildGlyphAtlas, RAMP, rgb } from "./glyphs";
import { aspectOf, coverScale, glyphFragment, glyphUniforms, loadImage, sceneVertex } from "./glyphShader";
import { frontAt, stepsAt } from "./hallSteps";

export const SPACING = 9; // world units between cards along the hall
export const CARD_DISTANCE = 3.5; // how far in front of the camera a card sits when its step is centred

type Props = {
  images: string[];
  /** A clip per card, or undefined for a still-only card. */
  clips: (string | undefined)[];
  progress: RefObject<{ value: number }>;
  root: RefObject<HTMLElement | null>;
  active: boolean;
  /** Which card is in front (-1 before the first, images.length after the last). */
  onActive: (index: number) => void;
};

const CARD_W = 3.4;
const CARD_H = CARD_W / 1.6;
// Every clip is cut from the recipe's 1440×721 browser viewport (1280×638),
// so a card with a clip takes that shape and shows the whole frame.
const CLIP_ASPECT = 1280 / 638;

/** A shape made of characters: the mask decides where glyphs live. */
const maskFragment = /* glsl */ `
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

/**
 * A room number ("01") in the display face, white on black, as a mask
 * texture. Returns the texture and its aspect, so the plane can match it.
 */
function numeralMask(text: string, fontFamily: string) {
  const height = 640;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  const font = `560px ${fontFamily}`;
  ctx.font = font;
  canvas.width = Math.ceil(ctx.measureText(text).width + 80);
  canvas.height = height;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  ctx.font = font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, canvas.width / 2, height / 2 + 20);
  const t = new THREE.CanvasTexture(canvas);
  t.minFilter = THREE.LinearFilter;
  t.generateMipmaps = false;
  return { texture: t, aspect: canvas.width / height };
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

function playWhenNear(clip: Clip, near: boolean, card: THREE.Mesh) {
  const u = (card.material as THREE.ShaderMaterial).uniforms;
  const { video } = clip;
  if (!near) {
    if (!video.paused) video.pause();
    return;
  }
  if (!video.src) video.src = clip.src;
  if (video.paused) void video.play().catch(() => {});
  if (clip.ready && !clip.swapped) {
    clip.swapped = true;
    u.uTarget.value = clip.texture;
    u.uCover.value.copy(coverScale(card.userData.aspect as number, video.videoWidth / video.videoHeight));
  }
}

/**
 * A card's clip, as a muted looping <video>. It is not fetched until its card
 * first comes near (no src before that), plays only while near, and its
 * texture replaces the screenshot once the first frame has decoded, so the
 * card never flashes blank.
 */
function makeClip(src: string) {
  const video = document.createElement("video");
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = "none";
  const texture = new THREE.VideoTexture(video);
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  return { src, video, texture, ready: false, swapped: false };
}
type Clip = ReturnType<typeof makeClip>;

// The clip plays from when its card starts crystallizing until the camera has passed it.
const CLIP_NEAR = 16;
const CLIP_PAST = -2;

function Hall({ images, clips, progress, root, active, onActive }: Props) {
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
        const material = new THREE.ShaderMaterial({
          uniforms: glyphUniforms(20),
          vertexShader: sceneVertex,
          fragmentShader: glyphFragment,
          transparent: true,
          depthWrite: false,
        });
        const u = material.uniforms;
        u.uSolid.value = 0;
        u.uRes.value.set(1600, 1600 / (clips[k] ? CLIP_ASPECT : CARD_W / CARD_H)); // keeps glyph cells square
        u.uBg.value = rgb(colours.ink);
        u.uInk.value = rgb(colours.paper);
        u.uSignal.value = rgb(colours.signal);
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(CARD_W, CARD_H), material);
        mesh.position.set(side * 1.25, (rand(k) - 0.5) * 0.5, -(k + 1) * SPACING);
        mesh.userData.side = side;
        mesh.userData.aspect = clips[k] ? CLIP_ASPECT : CARD_W / CARD_H;
        mesh.rotation.set(0, -side * 0.22, side * 0.02);
        return mesh;
      }),
    [images, clips, colours],
  );

  // Room numbers: a giant 01, 02… in glyphs opposite each card, matching its
  // caption ("No. 01 / 05"), so you always know which room you're in. They
  // replaced decorative I, C, E letters, which Ice didn't take to
  // (2026-10-25): the numbers do a job, the letters only branded.
  const numerals = useMemo(
    () =>
      images.map((_, k) => {
        const material = new THREE.ShaderMaterial({
          uniforms: {
            uMask: { value: null as THREE.Texture | null },
            uAtlas: { value: null as THREE.Texture | null },
            uGlyphs: { value: RAMP.length },
            uTime: { value: 0 },
            uOpacity: { value: 0 },
            uGrid: { value: new THREE.Vector2(36, 26) },
            uColour: { value: rgb(colours.signal) },
          },
          vertexShader: sceneVertex,
          fragmentShader: maskFragment,
          transparent: true,
          depthWrite: false,
        });
        const side = k % 2 === 0 ? -1 : 1; // opposite the card
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
        mesh.position.set(side * 3.3, 0.35, -(k + 1) * SPACING - 1.2);
        mesh.rotation.y = -side * 0.45;
        mesh.userData.side = side;
        mesh.userData.text = String(k + 1).padStart(2, "0");
        return mesh;
      }),
    [images, colours],
  );

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
    const lines = new THREE.LineSegments(
      geometry,
      new THREE.LineBasicMaterial({ color: new THREE.Color(colours.muted), transparent: true, opacity: 0.35 }),
    );
    // Drawn first: the cards don't write depth, so lines drawn after them
    // showed through the screens.
    lines.renderOrder = -1;
    return lines;
  }, [length, colours]);

  // Textures: the glyph atlas, the room numbers, every screenshot.
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
      made.push(atlas);
      numerals.forEach((m) => {
        const { texture, aspect } = numeralMask(m.userData.text as string, display);
        made.push(texture);
        const u = (m.material as THREE.ShaderMaterial).uniforms;
        u.uAtlas.value = atlas;
        u.uMask.value = texture;
        m.userData.aspect = aspect;
      });
      // Until a screenshot arrives its card is already there, as a field of
      // glyphs over a blank target: on a slow connection the wait looks like
      // the effect, never like empty space. It resolves once loaded.
      const ink = rgb(colours.ink);
      const blank = new THREE.DataTexture(
        new Uint8Array([ink.x * 255, ink.y * 255, ink.z * 255, 255]),
        1,
        1,
      );
      blank.needsUpdate = true;
      made.push(blank);
      cards.forEach((m) => {
        const u = (m.material as THREE.ShaderMaterial).uniforms;
        u.uAtlas.value = atlas;
        u.uTarget.value = blank;
      });
      const shots = await Promise.all(images.map((src) => loadImage(src)));
      if (cancelled) {
        shots.forEach((t) => t.dispose());
        return;
      }
      made.push(...shots);
      cards.forEach((m, k) => {
        const u = (m.material as THREE.ShaderMaterial).uniforms;
        u.uAtlas.value = atlas;
        u.uTarget.value = shots[k];
        u.uCover.value.copy(coverScale(m.userData.aspect as number, aspectOf(shots[k])));
        m.userData.loaded = true;
      });
    })();
    return () => {
      cancelled = true;
      made.forEach((t) => t.dispose());
    };
  }, [root, images, cards, numerals, colours]);

  const videos = useMemo(() => clips.map((src) => (src ? makeClip(src) : null)), [clips]);

  useEffect(() => {
    const listeners = videos.map((c) => {
      if (!c) return null;
      const onData = () => {
        c.ready = true;
      };
      c.video.addEventListener("loadeddata", onData);
      return onData;
    });
    return () => {
      videos.forEach((c, k) => {
        if (!c) return;
        c.video.removeEventListener("loadeddata", listeners[k]!);
        c.video.pause();
        c.video.removeAttribute("src");
        c.video.load();
        c.texture.dispose();
      });
    };
  }, [videos]);

  // The frame loop stops when the hall scrolls away, so pause here too.
  useEffect(() => {
    if (!active) videos.forEach((c) => c?.video.pause());
  }, [active, videos]);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      pointer.current = { x: (e.clientX / innerWidth) * 2 - 1, y: (e.clientY / innerHeight) * 2 - 1 };
    };
    addEventListener("pointermove", move);
    return () => removeEventListener("pointermove", move);
  }, []);

  useEffect(
    () => () => {
      [...cards, ...numerals].forEach((m) => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
      rails.geometry.dispose();
      (rails.material as THREE.Material).dispose();
    },
    [cards, numerals, rails],
  );

  // The camera eases toward where the scroll says it should be instead of
  // snapping there: the glide is what makes the walk feel smooth.
  const eased = useRef<number | null>(null);
  const shown = useRef<number | null>(null);

  useFrame(({ clock }, delta) => {
    // The DOM has an intro step, one step per card and a trailing step. Card
    // k's step centred in the viewport puts card k CARD_DISTANCE ahead; the
    // intro (steps = -1) starts a full spacing further back, in the glyphs.
    const target = stepsAt(progress.current.value, images.length);
    eased.current =
      eased.current === null ? target : THREE.MathUtils.damp(eased.current, target, 3.2, Math.min(delta, 0.1));
    const steps = eased.current;
    const z = -(steps + 1) * SPACING + CARD_DISTANCE;

    // The caption shows while its card is in front: from the moment it has
    // nearly crystallized until just before the camera passes it.
    const front = frontAt(steps, images.length);
    if (front !== shown.current) {
      shown.current = front;
      onActive(front);
    }
    camera.position.set(pointer.current.x * 0.35, -pointer.current.y * 0.2, z);
    camera.lookAt(pointer.current.x * 0.1, 0, z - 10);

    // A phone is narrow: pull the cards toward the middle so they stay on screen.
    const spread = Math.min(1, Math.max(0.2, size.width / size.height / 1.6));
    cards.forEach((m, k) => {
      m.position.x = (m.userData.side as number) * 1.25 * spread;
      m.scale.setScalar(Math.min(1, Math.max(0.42, spread * 1.3)));
      m.scale.y *= CARD_W / CARD_H / (m.userData.aspect as number); // same width, the media's height
      const d = z - m.position.z; // how far ahead of the camera
      const u = (m.material as THREE.ShaderMaterial).uniforms;
      const clip = videos[k];
      if (clip && m.userData.loaded) playWhenNear(clip, d < CLIP_NEAR && d > CLIP_PAST, m);
      u.uProgress.value = m.userData.loaded ? smooth(15, 5, d) : 0;
      u.uTime.value = clock.elapsedTime;
      u.uOpacity.value = 1 - smooth(26, 32, d);
    });
    numerals.forEach((m) => {
      const height = 3.4 * Math.max(0.5, spread);
      m.scale.set(height * ((m.userData.aspect as number) ?? 1), height, 1);
      m.position.x = (m.userData.side as number) * 3.3 * Math.max(0.45, spread);
      const d = z - m.position.z;
      const u = (m.material as THREE.ShaderMaterial).uniforms;
      u.uTime.value = clock.elapsedTime;
      u.uOpacity.value = m.userData.aspect ? (1 - smooth(18, 28, d)) * smooth(-1, 3, d) * 0.6 : 0;
    });
  });

  return (
    <>
      <color attach="background" args={[colours.ink]} />
      <fog attach="fog" args={[colours.ink, 8, 34]} />
      <primitive object={rails} />
      {numerals.map((m) => (
        <primitive key={m.uuid} object={m} />
      ))}
      {cards.map((m) => (
        <primitive key={m.uuid} object={m} />
      ))}
    </>
  );
}

export default function HallCanvas(props: Props) {
  const { active } = props;
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
