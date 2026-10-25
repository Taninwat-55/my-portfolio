"use client";

import { useSyncExternalStore } from "react";

/**
 * Light or dark for the outside of the world. Light (paper) is the default
 * and the concept: light outside, dark inside the door. Dark sets the root's
 * tone to ink, so the whole page reads every colour token in its ink values;
 * the door then warps dark to dark.
 *
 * The choice is remembered in this browser. WorldBoot applies it before the
 * first paint, so a dark-mode visitor never sees a flash of paper.
 */
export const THEME_KEY = "crystallize-theme";
const EVENT = "crystallize-theme";

type Theme = "light" | "dark";

const root = () => document.querySelector<HTMLElement>("[data-world]");

function read(): Theme {
  return root()?.dataset.tone === "ink" ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  addEventListener(EVENT, onChange);
  return () => removeEventListener(EVENT, onChange);
}

function set(theme: Theme) {
  const el = root();
  if (!el) return;
  if (theme === "dark") el.dataset.tone = "ink";
  else delete el.dataset.tone;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {}
  dispatchEvent(new Event(EVENT));
}

/** The current theme, for effects that must redraw in the other colours. */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, read, () => "light");
}

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useTheme();
  const dark = theme === "dark";
  return (
    <button type="button" className={className} aria-pressed={dark} onClick={() => set(dark ? "light" : "dark")}>
      Dark mode
    </button>
  );
}
