"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { gsap } from "gsap";
import { useWorldMode } from "../../useWorldMode";
import styles from "./crystallize.module.css";

// three and R3F load only here, after the page is up, never in the first chunk.
const RevealCanvas = dynamic(() => import("./RevealCanvas"), { ssr: false });

type Props = {
  title: string;
  /** The small mono label in the corner. */
  label?: string;
  /** hero: plays once the loader is done. view: plays when scrolled into view. */
  trigger: "hero" | "view";
  className?: string;
};

/**
 * A project's clip box, crystallizing out of a glyph field. The box is real
 * DOM (today a placeholder with the project name; later the <video>), and the
 * WebGL canvas only paints over it during the reveal, then unmounts. No JS,
 * no WebGL or reduced motion: the box just shows.
 *
 * The cursor focuses the field: glyphs near it resolve early.
 */
export function Reveal({ title, label = "Clip", trigger, className }: Props) {
  const figure = useRef<HTMLElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const progress = useRef({ value: 0 });
  const pointer = useRef({ x: -1, y: -1 });
  const mode = useWorldMode();
  const [phase, setPhase] = useState<"idle" | "glyph" | "done">("idle");
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (trigger !== "view" || mode !== "full" || !figure.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(figure.current);
    return () => io.disconnect();
  }, [trigger, mode]);

  const armed = mode === "full" && phase !== "done" && (trigger === "hero" || inView);

  // If the WebGL chunk never arrives, show the box rather than an empty frame.
  useEffect(() => {
    if (!armed) return;
    const timer = setTimeout(() => setPhase((p) => (p === "idle" ? "done" : p)), 4000);
    return () => clearTimeout(timer);
  }, [armed]);

  // Stable, and once only: the canvas calls it when its textures are drawn.
  const started = useRef(false);
  const start = useCallback(() => {
    if (started.current) return;
    started.current = true;
    setPhase("glyph");
    const firstVisit = !document.documentElement.dataset.loaderSeen;
    gsap.to(progress.current, {
      value: 1,
      duration: 1.6,
      delay: trigger === "hero" && firstVisit ? 1.1 : 0.15,
      ease: "power2.inOut",
      onComplete: () => setPhase("done"),
    });
  }, [trigger]);

  const track = (e: PointerEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    pointer.current = { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const state = mode === "quiet" ? "quiet" : phase === "done" ? "done" : "pending";

  return (
    <figure
      ref={figure}
      className={`${styles.reveal} ${className ?? ""}`}
      data-reveal={state}
      onPointerMove={track}
      onPointerLeave={() => (pointer.current = { x: -1, y: -1 })}
    >
      <div ref={box} className={styles.box}>
        <span data-replica className={styles.boxLabel}>
          {label}
        </span>
        <span data-replica className={styles.boxTitle}>
          {title}
        </span>
      </div>
      {armed && (
        <div className={styles.revealCanvas} aria-hidden="true">
          <RevealCanvas box={box} progress={progress} pointer={pointer} onReady={start} />
        </div>
      )}
    </figure>
  );
}
