"use client";

import { LOADER_KEY } from "@/app/world/WorldBoot";
import { detectWorldMode, useWorldMode } from "@/app/world/useWorldMode";
import styles from "./lab.module.css";

/**
 * Prototype-only controls: replay the loader, switch between the two worlds
 * (Crystallize and Nordic light, same design, different light), and see
 * whether the full or quiet world is running and why. Deleted with the lab.
 */
function replayLoader() {
  try {
    sessionStorage.removeItem(LOADER_KEY);
  } catch {}
  scrollTo(0, 0);
  location.reload();
}

// Applied by WorldBoot before paint; a reload redraws every effect in it.
function switchWorld() {
  const nordic = document.querySelector<HTMLElement>("[data-world]")?.dataset.world === "nordic";
  try {
    localStorage.setItem("world", nordic ? "crystallize" : "nordic");
  } catch {}
  location.reload();
}

export function LabControls() {
  const mode = useWorldMode();

  return (
    <aside className={styles.controls} aria-label="Prototype controls">
      <div className={styles.controlRow}>
        <button type="button" onClick={switchWorld}>
          Switch world
        </button>
        <button type="button" onClick={replayLoader}>
          Replay loader
        </button>
      </div>
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
