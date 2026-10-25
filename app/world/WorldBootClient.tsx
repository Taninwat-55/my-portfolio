"use client";

import { useLayoutEffect } from "react";
import { LOADER_KEY } from "./WorldBoot";
import { THEME_EVENT, THEME_KEY } from "./ThemeToggle";

/**
 * WorldBoot's twin for client navigations, where React skips inline scripts
 * (found in review, 2026-10-25: /engineer → / left the door squeezed, the
 * hall's canvas running hidden and a saved dark theme unapplied).
 *
 * The theme goes on every world page's root on mount, since each page brings
 * a new one. The once-per-session flags are set only when the inline script
 * never ran; after a hard load they're already right, and setting
 * loader-seen here would cut the first visit's loader short.
 */
export function WorldBootClient() {
  useLayoutEffect(() => {
    const world = document.querySelector<HTMLElement>("[data-world]");
    try {
      if (world && localStorage.getItem(THEME_KEY) === "dark") {
        world.dataset.tone = "ink";
        dispatchEvent(new Event(THEME_EVENT));
      }
    } catch {}
    const d = document.documentElement;
    if (d.dataset.worldBoot) return;
    d.dataset.worldBoot = "1";
    try {
      if (!matchMedia("(prefers-reduced-motion: reduce)").matches) d.dataset.worldJs = "1";
      if (sessionStorage.getItem(LOADER_KEY)) d.dataset.loaderSeen = "1";
      else sessionStorage.setItem(LOADER_KEY, "1");
    } catch {}
  }, []);

  return null;
}
