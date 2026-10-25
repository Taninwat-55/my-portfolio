"use client";

import { useSyncExternalStore } from "react";

/**
 * True once the visitor has moved the pointer, touched, used the wheel or typed. The WebGL
 * effects wait for it: parsing three.js and compiling shaders while the page
 * is still loading blocked a slow phone's main thread for seconds (Lighthouse
 * TBT, 2026-10-25), and what they decorate is already on screen. On a laptop
 * the first mouse move comes within a second.
 */
// No "scroll": the page fires its own on load (Lenis, ScrollTrigger and
// scroll restoration set the position), which woke the effects at once. A
// person's scroll always starts with a wheel, a touch or a key.
const EVENTS = ["pointermove", "pointerdown", "touchstart", "wheel", "keydown"] as const;

let woke = false;
const listeners = new Set<() => void>();

function wake() {
  if (woke) return;
  woke = true;
  EVENTS.forEach((e) => removeEventListener(e, wake));
  listeners.forEach((l) => l());
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  if (!woke && listeners.size === 1) {
    EVENTS.forEach((e) => addEventListener(e, wake, { passive: true }));
  }
  return () => listeners.delete(onChange);
}

export function useFirstInteraction(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => woke,
    () => false,
  );
}
