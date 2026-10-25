"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

type Props = {
  progress: RefObject<{ value: number }>;
  /** The GridLines element on the stage: the rails start exactly where its lines are. */
  rails: RefObject<HTMLDivElement | null>;
  active: boolean;
};

const FOV = 50;
const CAM_Z = 5;
const DEPTH = 40; // tunnel length
const RINGS = 10;
const MIN_RAILS = 16; // a 4-column phone grid is too sparse for a tunnel

const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
const easeOut = (t: number) => 1 - (1 - t) ** 3;
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

/**
 * Progress 0 to 1, in three overlapping acts:
 *   0.00–0.35  fold: each vertical grid line swings back on its hinge into a
 *              rail of a corridor (left lines to the left wall, right to the
 *              right, the middle ones to floor and ceiling).
 *   0.12–0.42  rings fade in along the corridor; the doorway appears at its end.
 *   0.30–0.95  travel: the camera walks down the corridor to the doorway.
 *   0.72–0.96  tone: paper turns to ink, so the doorway filling the screen
 *              is the dark room the work section opens in.
 */
function Tunnel({ progress, rails }: Omit<Props, "active">) {
  const { size, scene, camera } = useThree();
  const railsPx = useRef<number[]>([]);
  const pointer = useRef({ x: 0, y: 0 });

  const colours = useMemo(() => {
    const root = rails.current?.closest<HTMLElement>("[data-world]");
    const read = (name: string) =>
      new THREE.Color((root && getComputedStyle(root).getPropertyValue(name).trim()) || "#888");
    return {
      paper: read("--paper"),
      ink: read("--ink"),
      lineOnPaper: read("--line-on-paper"),
      mutedOnPaper: read("--muted-on-paper"),
      mutedOnInk: read("--muted-on-ink"),
      signalOnPaper: read("--signal-on-paper"),
      signalOnInk: read("--signal-on-ink"),
    };
  }, [rails]);

  const segments = MIN_RAILS + RINGS * 4 + 4;
  const { lines, positions, vertexColours } = useMemo(() => {
    const positions = new Float32Array(segments * 6);
    // RGBA: a line that hasn't arrived yet must draw nothing at all. Painting
    // it in the background colour instead overwrote real lines beneath it.
    const vertexColours = new Float32Array(segments * 8);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(vertexColours, 4));
    const lines = new THREE.LineSegments(
      geometry,
      new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, depthWrite: false }),
    );
    lines.frustumCulled = false;
    return { lines, positions, vertexColours };
  }, [segments]);

  const portal = useMemo(() => {
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({ color: colours.ink, transparent: true, opacity: 0, fog: false }),
    );
    mesh.position.z = -DEPTH;
    return mesh;
  }, [colours]);

  // Fog distances are from the camera, so they hold while it travels: the
  // flat lines (5 away at the start) stay crisp, the far corridor fades.
  useEffect(() => {
    scene.fog = new THREE.Fog(colours.paper, CAM_Z + 0.5, CAM_Z + DEPTH * 0.7);
    scene.background = colours.paper.clone();
    return () => {
      scene.fog = null;
    };
  }, [scene, colours]);

  // Where the DOM lines are, in px from the stage's left edge.
  useEffect(() => {
    const el = rails.current;
    if (!el) return;
    const left = el.getBoundingClientRect().left;
    const spans = Array.from(el.children).filter((s) => s.getClientRects().length > 0);
    const xs = spans.map((s) => s.getBoundingClientRect().left - left);
    const last = spans.at(-1);
    if (last) xs.push(last.getBoundingClientRect().right - left - 1);
    railsPx.current = xs;
  }, [rails, size.width, size.height]);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      pointer.current = { x: (e.clientX / innerWidth) * 2 - 1, y: (e.clientY / innerHeight) * 2 - 1 };
    };
    addEventListener("pointermove", move);
    return () => removeEventListener("pointermove", move);
  }, []);

  useEffect(() => () => {
    lines.geometry.dispose();
    (lines.material as THREE.Material).dispose();
    portal.geometry.dispose();
    (portal.material as THREE.Material).dispose();
  }, [lines, portal]);

  const bg = useMemo(() => new THREE.Color(), []);
  const railColour = useMemo(() => new THREE.Color(), []);
  const frameColour = useMemo(() => new THREE.Color(), []);

  useFrame(() => {
    const p = progress.current.value;
    const hh = CAM_Z * Math.tan(THREE.MathUtils.degToRad(FOV / 2));
    const hw = (hh * size.width) / size.height;

    const fold = easeOut(clamp01(p / 0.35));
    const ringsIn = clamp01((p - 0.12) / 0.3);
    const travel = easeInOut(clamp01((p - 0.3) / 0.65));
    const dark = easeInOut(clamp01((p - 0.72) / 0.24));

    bg.copy(colours.paper).lerp(colours.ink, dark);
    railColour.copy(colours.lineOnPaper).lerp(colours.mutedOnPaper, fold).lerp(colours.mutedOnInk, dark);
    frameColour.copy(colours.signalOnPaper).lerp(colours.signalOnInk, dark);
    (scene.background as THREE.Color).copy(bg);
    if (scene.fog instanceof THREE.Fog) scene.fog.color.copy(bg);

    const camZ = THREE.MathUtils.lerp(CAM_Z, -DEPTH + 0.6, travel);
    // A rail's near end is left behind as the camera walks in; some GPUs then
    // drop the whole segment. Clamping it just ahead keeps it on the same line.
    const ahead = (z: number) => Math.min(z, camZ - 0.5);

    let v = 0;
    const put = (x: number, y: number, z: number, c: THREE.Color, alpha: number) => {
      positions.set([x, y, z], v * 3);
      vertexColours.set([c.r, c.g, c.b, alpha], v * 4);
      v++;
    };

    // Rails: the DOM's lines first, then extras that only exist in the tunnel.
    const xs = railsPx.current.length ? railsPx.current : [0, size.width];
    for (let i = 0; i < MIN_RAILS; i++) {
      const real = i < xs.length;
      const flatX = (xs[i % xs.length] / size.width - 0.5) * 2 * hw;
      const u = MIN_RAILS > 1 ? i / (MIN_RAILS - 1) : 0;
      const angle = (i % 2 === 0 ? 1 : -1) * Math.PI * (1 - (real ? (flatX / hw + 1) / 2 : u));
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const reach = Math.min(hw / Math.max(Math.abs(cos), 1e-4), hh / Math.max(Math.abs(sin), 1e-4));
      const tx = cos * reach;
      const ty = sin * reach;
      const alpha = real ? 1 : fold;
      put(THREE.MathUtils.lerp(flatX, tx, fold), THREE.MathUtils.lerp(-hh, ty, fold), ahead(0), railColour, alpha);
      put(THREE.MathUtils.lerp(flatX, tx, fold), THREE.MathUtils.lerp(hh, ty, fold), ahead(-DEPTH * fold), railColour, alpha);
    }

    // Rings along the corridor, and the doorway's frame at its end.
    const rect = (z: number, c: THREE.Color, alpha: number, s = 1) => {
      const x = hw * s;
      const y = hh * s;
      const corners: [number, number][] = [[-x, -y], [x, -y], [x, y], [-x, y]];
      corners.forEach(([ax, ay], k) => {
        const [bx, by] = corners[(k + 1) % 4];
        put(ax, ay, z, c, alpha);
        put(bx, by, z, c, alpha);
      });
    };
    for (let k = 0; k < RINGS; k++) {
      const stagger = clamp01(ringsIn * 1.6 - (k / RINGS) * 0.6);
      rect((-DEPTH * (k + 1)) / (RINGS + 1), railColour, stagger * fold);
    }
    rect(-DEPTH + 0.01, frameColour, ringsIn);

    lines.geometry.attributes.position.needsUpdate = true;
    lines.geometry.attributes.color.needsUpdate = true;

    portal.scale.set(hw * 2, hh * 2, 1);
    (portal.material as THREE.MeshBasicMaterial).opacity = ringsIn;
    (portal.material as THREE.MeshBasicMaterial).color.copy(colours.ink);

    // No sway while flat: the lines must sit exactly on the page's own lines.
    const sway = 0.18 * fold * (1 - travel * 0.7);
    camera.position.set(pointer.current.x * sway, -pointer.current.y * sway, camZ);
  });

  return (
    <>
      <primitive object={lines} />
      <primitive object={portal} />
    </>
  );
}

export default function DoorCanvas({ active, ...props }: Props) {
  return (
    <Canvas
      // dpr 1: WebGL lines are one device pixel, so at dpr 1 they match the
      // DOM's 1px hairlines at the hand-off instead of thinning to half.
      dpr={1}
      // flat: no filmic tone mapping, so ink renders as the ink token and the
      // hand-off to the work section's CSS background is seamless.
      flat
      frameloop={active ? "always" : "never"}
      camera={{ fov: FOV, position: [0, 0, CAM_Z], near: 0.05, far: 200 }}
      gl={{ antialias: true, alpha: false }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Tunnel {...props} />
    </Canvas>
  );
}
