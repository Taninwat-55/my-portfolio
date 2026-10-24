"use client";

import { useEffect, useSyncExternalStore } from "react";
import { LOADER_KEY } from "@/app/world/WorldBoot";
import { defaultPairing, type Pairing } from "@/app/world/world.config";
import { detectWorldMode, useWorldMode } from "@/app/world/useWorldMode";
import styles from "./lab.module.css";

/**
 * Prototype-only controls: flip between the two type pairings (remembered in
 * this browser), replay the loader, and see whether the full or quiet world
 * is running and why. Deleted with the lab once the choices are made.
 */
const KEY = "crystallize-pairing";
const EVENT = "crystallize-pairing";

const root = () => document.querySelector<HTMLElement>("[data-world]");

function readPairing(): Pairing {
  return root()?.dataset.pairing === "b" ? "b" : "a";
}

function subscribe(onChange: () => void) {
  addEventListener(EVENT, onChange);
  return () => removeEventListener(EVENT, onChange);
}

function choose(pairing: Pairing) {
  const el = root();
  if (el) el.dataset.pairing = pairing;
  try {
    localStorage.setItem(KEY, pairing);
  } catch {}
  dispatchEvent(new Event(EVENT));
}

function replayLoader() {
  try {
    sessionStorage.removeItem(LOADER_KEY);
  } catch {}
  scrollTo(0, 0);
  location.reload();
}

export function LabControls() {
  const pairing = useSyncExternalStore(subscribe, readPairing, () => defaultPairing);
  const mode = useWorldMode();

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === "a" || saved === "b") choose(saved);
    } catch {}
  }, []);

  return (
    <aside className={styles.controls} aria-label="Prototype controls">
      <div className={styles.controlRow} role="group" aria-label="Type pairing">
        {(["a", "b"] as const).map((p) => (
          <button key={p} type="button" aria-pressed={pairing === p} onClick={() => choose(p)}>
            Type {p.toUpperCase()}
          </button>
        ))}
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
