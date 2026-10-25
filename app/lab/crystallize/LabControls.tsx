"use client";

import { LOADER_KEY } from "@/app/world/WorldBoot";
import { detectWorldMode, useWorldMode } from "@/app/world/useWorldMode";
import styles from "./lab.module.css";

/**
 * Prototype-only controls: replay the loader, and see whether the full or
 * quiet world is running and why. Deleted with the lab.
 */
function replayLoader() {
  try {
    sessionStorage.removeItem(LOADER_KEY);
  } catch {}
  scrollTo(0, 0);
  location.reload();
}

export function LabControls() {
  const mode = useWorldMode();

  return (
    <aside className={styles.controls} aria-label="Prototype controls">
      <button type="button" onClick={replayLoader}>
        Replay loader
      </button>
      <p className={styles.controlNote}>
        {mode === null
          ? "Effects: checking"
          : mode === "full"
            ? "Effects: full"
            : `Effects: quiet (${detectWorldMode().reason})`}
      </p>
    </aside>
  );
}
