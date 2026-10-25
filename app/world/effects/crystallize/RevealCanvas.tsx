"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { buildGlyphAtlas, drawReplica, rgb } from "./glyphs";
import { aspectOf, coverScale, glyphFragment, glyphUniforms, loadImage, screenVertex } from "./glyphShader";

type Props = {
  box: RefObject<HTMLElement | null>;
  progress: RefObject<{ value: number }>;
  pointer: RefObject<{ x: number; y: number }>;
  onReady: () => void;
  /** Screenshots to resolve into. Without them, the box's own DOM is drawn. */
  images?: string[];
  /** Which image is showing, when cycling. */
  index?: RefObject<number>;
  active?: boolean;
};

/** Per frame: progress, time, size, pointer and the current target. */
function tick(
  material: THREE.ShaderMaterial | null,
  progress: number,
  time: number,
  size: { width: number; height: number },
  pointer: { x: number; y: number },
  target: THREE.Texture | undefined,
) {
  const u = material?.uniforms;
  if (!u) return;
  u.uProgress.value = progress;
  u.uTime.value = time;
  u.uRes.value.set(size.width, size.height);
  u.uPointer.value.set(pointer.x, pointer.x < 0 ? -1 : size.height - pointer.y);
  if (target) {
    u.uTarget.value = target;
    u.uCover.value.copy(coverScale(size.width / size.height, aspectOf(target)));
  }
}

function Field({ box, progress, pointer, onReady, images, index }: Props) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const targets = useRef<THREE.Texture[]>([]);
  const size = useThree((s) => s.size);
  const uniforms = useMemo(() => glyphUniforms(), []);

  useEffect(() => {
    const el = box.current;
    const mat = material.current;
    if (!el || !mat) return;
    let cancelled = false;
    let made: THREE.Texture[] = [];
    (async () => {
      await document.fonts.ready;
      const box = getComputedStyle(el);
      // The mono label may sit in the box or in the figure's caption.
      const label = el.closest("figure")?.querySelector<HTMLElement>("[data-label]");
      const atlas = buildGlyphAtlas(label ? getComputedStyle(label).fontFamily : "monospace");
      let loaded: THREE.Texture[];
      if (images?.length) {
        loaded = await Promise.all(images.map((src) => loadImage(src)));
      } else {
        loaded = [drawReplica(el).texture];
      }
      if (cancelled) {
        [atlas, ...loaded].forEach((t) => t.dispose());
        return;
      }
      made = [atlas, ...loaded];
      targets.current = loaded;
      const u = mat.uniforms;
      u.uAtlas.value = atlas;
      u.uBg.value = rgb(box.backgroundColor);
      u.uInk.value = rgb(box.color);
      // Custom properties compute with var() already substituted: a hex.
      u.uSignal.value = rgb(box.getPropertyValue("--signal") || "#000");
      onReady();
    })();
    return () => {
      cancelled = true;
      made.forEach((t) => t.dispose());
    };
  }, [box, images, onReady]);

  useFrame(({ clock }) =>
    tick(
      material.current,
      progress.current.value,
      clock.elapsedTime,
      size,
      pointer.current,
      targets.current[index?.current ?? 0],
    ),
  );

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={screenVertex}
        fragmentShader={glyphFragment}
      />
    </mesh>
  );
}

export default function RevealCanvas({ active = true, ...props }: Props) {
  return (
    <Canvas
      flat
      dpr={[1, 2]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: false, alpha: false }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Field {...props} />
    </Canvas>
  );
}
