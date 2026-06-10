"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  Suspense,
  type ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";
import type { Mode } from "../data";

const STORAGE_KEY = "portfolio-mode";

const ModeContext = createContext<Mode>("pm");

/** Active site mode. Default is "pm"; "dev" is opt-in via ?mode=dev or stored preference. */
export function useMode(): Mode {
  return useContext(ModeContext);
}

function isMode(value: string | null): value is Mode {
  return value === "pm" || value === "dev";
}

/**
 * Reads `?mode=` (which also persists to localStorage), else falls back to a
 * previously stored preference. Isolated so it can sit inside <Suspense> —
 * useSearchParams() requires it and it keeps the rest of the tree static.
 */
function ModeSync({ onResolve }: { onResolve: (mode: Mode) => void }) {
  const params = useSearchParams();

  useEffect(() => {
    const fromUrl = params.get("mode");
    if (isMode(fromUrl)) {
      onResolve(fromUrl);
      try {
        localStorage.setItem(STORAGE_KEY, fromUrl);
      } catch {
        /* storage unavailable — URL param still applies for this session */
      }
      return;
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (isMode(stored)) onResolve(stored);
    } catch {
      /* ignore */
    }
  }, [params, onResolve]);

  return null;
}

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("pm");

  return (
    <ModeContext.Provider value={mode}>
      <Suspense fallback={null}>
        <ModeSync onResolve={setMode} />
      </Suspense>
      {children}
    </ModeContext.Provider>
  );
}
