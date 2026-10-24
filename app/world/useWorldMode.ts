"use client";

import { useSyncExternalStore } from "react";

/**
 * Full or quiet. The world's effects are decoration, so a device that can't
 * or shouldn't run them gets the quiet world: the same page, the same type
 * and tones, with crossfades in place of WebGL and scramble.
 *
 * Quiet when any of these hold: reduced motion, data saver, under 4 GB of
 * device memory, or no WebGL2.
 */
export type WorldMode = "full" | "quiet";

let webgl2: boolean | undefined;

function hasWebGL2() {
  if (webgl2 === undefined) {
    const gl = document.createElement("canvas").getContext("webgl2");
    webgl2 = Boolean(gl);
    // The probe would otherwise hold one of the browser's few contexts.
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
  }
  return webgl2;
}

const REDUCED = "(prefers-reduced-motion: reduce)";

export function detectWorldMode(): { mode: WorldMode; reason: string } {
  if (matchMedia(REDUCED).matches) return { mode: "quiet", reason: "reduced motion" };
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
  };
  if (nav.connection?.saveData) return { mode: "quiet", reason: "data saver" };
  if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) {
    return { mode: "quiet", reason: "low device memory" };
  }
  if (!hasWebGL2()) return { mode: "quiet", reason: "no WebGL2" };
  return { mode: "full", reason: "" };
}

function subscribe(onChange: () => void) {
  const query = matchMedia(REDUCED);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** null until the client knows (the server can't), then full or quiet. */
export function useWorldMode(): WorldMode | null {
  return useSyncExternalStore(
    subscribe,
    () => detectWorldMode().mode,
    () => null,
  );
}
