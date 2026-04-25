"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Variant = "default" | "read" | "external";

/**
 * Site-wide custom cursor. Mounts once at the layout level. Disabled on
 * touch / coarse-pointer devices. Variant is driven by `data-cursor=...`
 * attributes on hovered elements (read | external). Default falls back to
 * a small ice ring.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<Variant>("default");
  const [hidden, setHidden] = useState(false);

  // Raw mouse position
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // Spring-smoothed position (the visible follow)
  const xSpring = useSpring(x, { damping: 28, stiffness: 380, mass: 0.35 });
  const ySpring = useSpring(y, { damping: 28, stiffness: 380, mass: 0.35 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Skip on touch and reduced-motion users
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor-active");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.(
        "[data-cursor]"
      );
      const v = target?.getAttribute("data-cursor") as Variant | null;
      setVariant(v ?? "default");
    };

    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{ x: xSpring, y: ySpring }}
      animate={{ opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.15 }}
    >
      <AnimatePresence mode="popLayout">
        {variant === "default" && (
          <motion.div
            key="default"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="-translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-ice-200/70 bg-ice-200/[0.04] backdrop-blur-[1px]"
          />
        )}

        {variant === "read" && (
          <motion.div
            key="read"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="-translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ice-300 text-charcoal-950 font-mono text-[10px] tracking-[0.18em] uppercase font-semibold shadow-[0_0_24px_-4px_rgba(147,216,249,0.6)]"
          >
            Read
            <ArrowUpRight size={11} strokeWidth={2.5} />
          </motion.div>
        )}

        {variant === "external" && (
          <motion.div
            key="external"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="-translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-ice-200/70 bg-charcoal-950/70 backdrop-blur-sm flex items-center justify-center"
          >
            <ArrowUpRight size={14} strokeWidth={1.8} className="text-ice-200" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
