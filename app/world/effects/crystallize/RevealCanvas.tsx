"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RAMP, buildGlyphAtlas, drawReplica, rgb } from "./glyphs";

type Props = {
  box: RefObject<HTMLElement | null>;
  progress: RefObject<{ value: number }>;
  pointer: RefObject<{ x: number; y: number }>;
  onReady: () => void;
};

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

/*
 * Per cell: read the target's ink at the cell centre, draw the ramp glyph
 * for that much ink, and once the cell's threshold passes, show the target's
 * real pixels instead. Thresholds are a left-to-right sweep plus noise, so it
 * crystallizes in patches rather than wiping. The pointer raises progress
 * within ~140px of itself.
 */
const fragmentShader = /* glsl */ `
  uniform sampler2D uTarget;
  uniform sampler2D uAtlas;
  uniform float uProgress;
  uniform float uTime;
  uniform float uCell;
  uniform float uGlyphs;
  uniform vec2 uRes;
  uniform vec2 uPointer;
  uniform vec3 uBg;
  uniform vec3 uInk;
  uniform vec3 uSignal;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  void main() {
    vec2 px = vUv * uRes;
    vec2 cell = floor(px / uCell);
    vec2 inCell = fract(px / uCell);
    vec2 centre = (cell + 0.5) * uCell / uRes;

    vec3 target = texture2D(uTarget, vUv).rgb;
    vec3 sampled = texture2D(uTarget, centre).rgb;
    float ink = clamp(length(sampled - uBg) / max(length(uInk - uBg), 0.001), 0.0, 1.0);

    float p = uProgress;
    if (uPointer.x >= 0.0) {
      p += (1.0 - smoothstep(0.0, 140.0, distance(px, uPointer))) * 0.5;
    }
    float threshold = (cell.x * uCell / uRes.x) * 0.35 + hash(cell) * 0.65;
    float resolved = smoothstep(threshold - 0.06, threshold + 0.02, p * 1.08);

    float flicker = hash(cell + floor(uTime * 10.0));
    // Every unresolved cell carries a glyph: a light base (: - =) everywhere,
    // denser glyphs where the target has ink.
    float index = floor(clamp(0.22 + ink * 0.7 + (flicker - 0.5) * 0.24, 0.1, 0.999) * uGlyphs);
    float glyph = texture2D(uAtlas, vec2((index + inCell.x) / uGlyphs, inCell.y)).r;
    vec3 glyphColour = mix(uBg, mix(uSignal, uInk, ink), glyph);

    gl_FragColor = vec4(mix(glyphColour, target, resolved), 1.0);
  }
`;

/** Per frame: progress, time, size and pointer into the shader. */
function tick(
  material: THREE.ShaderMaterial | null,
  progress: number,
  time: number,
  size: { width: number; height: number },
  pointer: { x: number; y: number },
) {
  const u = material?.uniforms;
  if (!u) return;
  u.uProgress.value = progress;
  u.uTime.value = time;
  u.uRes.value.set(size.width, size.height);
  u.uPointer.value.set(pointer.x, pointer.x < 0 ? -1 : size.height - pointer.y);
}

function Field({ box, progress, pointer, onReady }: Props) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const size = useThree((s) => s.size);
  const uniforms = useMemo(
    () => ({
      uTarget: { value: null as THREE.Texture | null },
      uAtlas: { value: null as THREE.Texture | null },
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uCell: { value: 11 },
      uGlyphs: { value: RAMP.length },
      uRes: { value: new THREE.Vector2(1, 1) },
      uPointer: { value: new THREE.Vector2(-1, -1) },
      uBg: { value: new THREE.Vector3() },
      uInk: { value: new THREE.Vector3() },
      uSignal: { value: new THREE.Vector3() },
    }),
    [],
  );

  useEffect(() => {
    const el = box.current;
    const mat = material.current;
    if (!el || !mat) return;
    let cancelled = false;
    let made: THREE.Texture[] = [];
    document.fonts.ready.then(() => {
      if (cancelled) return;
      const label = el.querySelector<HTMLElement>("[data-replica]");
      const title = el.querySelector<HTMLElement>("[data-replica]:last-child");
      const mono = label ? getComputedStyle(label).fontFamily : "monospace";
      const atlas = buildGlyphAtlas(mono);
      const replica = drawReplica(el);
      made = [atlas, replica.texture];
      const u = mat.uniforms;
      u.uAtlas.value = atlas;
      u.uTarget.value = replica.texture;
      u.uBg.value = rgb(replica.style.backgroundColor);
      u.uInk.value = rgb(title ? getComputedStyle(title).color : "rgb(0,0,0)");
      // Custom properties compute with var() already substituted: a hex.
      u.uSignal.value = rgb(getComputedStyle(el).getPropertyValue("--signal") || "#000");
      onReady();
    });
    return () => {
      cancelled = true;
      made.forEach((t) => t.dispose());
    };
  }, [box, onReady]);

  useFrame(({ clock }) =>
    tick(material.current, progress.current.value, clock.elapsedTime, size, pointer.current),
  );

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

export default function RevealCanvas(props: Props) {
  return (
    <Canvas flat dpr={[1, 2]} gl={{ antialias: false, alpha: false }} style={{ position: "absolute", inset: 0 }}>
      <Field {...props} />
    </Canvas>
  );
}
