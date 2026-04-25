"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

/**
 * Wraps the app in a Lenis smooth-scroll context. Native CSS `scroll-smooth`
 * has been removed from <html> — Lenis handles all scroll easing now,
 * including in-page anchor jumps via element.scrollIntoView().
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
