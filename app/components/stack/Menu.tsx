"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * A menu-bar menu: a <details>, so it opens without JavaScript, plus the three
 * ways a real menu closes. The menu bar lives in the stack layout and survives
 * navigation, and a <details> keeps its open state in the DOM, so without this
 * a menu stays hanging over the next card.
 */
export function Menu({ className, children }: { className: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    ref.current?.removeAttribute("open");
  }, [pathname]);

  useEffect(() => {
    const onPointer = (e: PointerEvent) => {
      const el = ref.current;
      if (el?.open && !el.contains(e.target as Node)) el.removeAttribute("open");
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, []);

  return (
    <details
      ref={ref}
      className={className}
      onKeyDown={(e) => {
        if (e.key === "Escape" && ref.current?.open) {
          ref.current.removeAttribute("open");
          ref.current.querySelector("summary")?.focus();
        }
      }}
    >
      {children}
    </details>
  );
}
