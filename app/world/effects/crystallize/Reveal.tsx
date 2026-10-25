"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import { gsap } from "gsap";
import { useFirstInteraction } from "../../useFirstInteraction";
import { useWorldMode } from "../../useWorldMode";
import { worldImage } from "../../worldImage";
import styles from "./crystallize.module.css";

// three and R3F load only here, after the page is up, never in the first chunk.
const RevealCanvas = dynamic(() => import("./RevealCanvas"), { ssr: false });

type Slide = { src: string; title: string };

type Props = {
  /** One project (a labelled box), or several screenshots to cycle through. */
  title?: string;
  slides?: Slide[];
  /** The small mono label in the corner (single box only). */
  label?: string;
  /** hero: plays once the loader is done. view: plays when scrolled into view. */
  trigger: "hero" | "view";
  /** A wide band (the hero) instead of a 16:10 box. */
  wide?: boolean;
  /** The poster's rendered width, for srcset (the <img> sizes attribute). */
  sizes?: string;
  className?: string;
};

const HOLD = 2.6; // seconds a screenshot stays resolved before dissolving

/**
 * Work crystallizing out of a glyph field. The box is real DOM: a labelled
 * placeholder, or the first screenshot as an <img>, visible from the first
 * paint. The WebGL canvas fades in over it once its textures are ready, so a
 * slow or missing WebGL chunk never leaves an empty frame (and the poster,
 * not the effect, is what the browser counts as painted). With several slides it keeps cycling: resolve,
 * hold, dissolve back to signal, next. No JS, no WebGL or reduced motion: the
 * box (or first screenshot) just shows.
 *
 * The cursor focuses the field: glyphs near it resolve early.
 */
export function Reveal({ title, slides, label = "Clip", trigger, wide, sizes = "100vw", className }: Props) {
  const figure = useRef<HTMLElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const progress = useRef({ value: 0 });
  const pointer = useRef({ x: -1, y: -1 });
  const index = useRef(0);
  const mode = useWorldMode();
  const [phase, setPhase] = useState<"idle" | "glyph" | "done">("idle");
  const [inView, setInView] = useState(trigger === "hero");
  const [onScreen, setOnScreen] = useState(true);
  const [shown, setShown] = useState(0);
  const cycling = (slides?.length ?? 0) > 1;
  // Stable, so the canvas doesn't reload its textures on every render.
  const images = useMemo(() => slides?.map((s) => s.src), [slides]);

  // view: start when 30% visible. Both: stop drawing while off screen.
  useEffect(() => {
    if (mode !== "full" || !figure.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setOnScreen(entry.isIntersecting);
        if (entry.intersectionRatio >= 0.3) setInView(true);
      },
      { threshold: [0, 0.3] },
    );
    io.observe(figure.current);
    return () => io.disconnect();
  }, [mode]);

  const awake = useFirstInteraction();
  const armed = mode === "full" && phase !== "done" && inView && awake;

  // If the WebGL chunk never arrives, show the box rather than an empty frame.
  useEffect(() => {
    if (!armed) return;
    const timer = setTimeout(() => setPhase((p) => (p === "idle" ? "done" : p)), 5000);
    return () => clearTimeout(timer);
  }, [armed]);

  useEffect(() => () => gsap.killTweensOf(progress.current), []);

  // Stable, and once only: the canvas calls it when its textures are ready.
  const started = useRef(false);
  const start = useCallback(() => {
    if (started.current) return;
    started.current = true;
    setPhase("glyph");
    const firstVisit = !document.documentElement.dataset.loaderSeen;
    const p = progress.current;
    const resolve = (delay = 0) =>
      gsap.to(p, {
        value: 1,
        duration: 1.6,
        delay,
        ease: "power2.inOut",
        onComplete: () => (cycling ? dissolve() : setPhase("done")),
      });
    const dissolve = () =>
      gsap.to(p, {
        value: 0,
        duration: 0.9,
        delay: HOLD,
        ease: "power2.in",
        onComplete: () => {
          index.current = (index.current + 1) % (slides?.length ?? 1);
          setShown(index.current);
          resolve();
        },
      });
    resolve(trigger === "hero" && firstVisit ? 1.1 : 0.15);
  }, [cycling, slides?.length, trigger]);

  const track = (e: PointerEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    pointer.current = { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const state = mode === "quiet" ? "quiet" : phase === "done" ? "done" : "pending";
  const slide = slides?.[shown];
  const count = slides?.length ?? 0;

  return (
    <figure
      ref={figure}
      className={`${styles.reveal} ${className ?? ""}`}
      data-reveal={state}
      data-canvas={phase === "glyph" ? "on" : undefined}
      onPointerMove={track}
      onPointerLeave={() => (pointer.current = { x: -1, y: -1 })}
    >
      <div ref={box} className={`${styles.box} ${wide ? styles.boxWide : ""}`}>
        {slides?.length ? (
          // eslint-disable-next-line @next/next/no-img-element -- the poster the canvas paints over; same file the texture loads
          <img
            className={styles.boxImage}
            {...worldImage(slides[0].src)}
            sizes={sizes}
            alt={`${slides[0].title}, screenshot`}
            fetchPriority={trigger === "hero" ? "high" : undefined}
          />
        ) : (
          <>
            <span data-replica data-label className={styles.boxLabel}>
              {label}
            </span>
            <span data-replica className={styles.boxTitle}>
              {title}
            </span>
          </>
        )}
        {/* Inside the box, so it covers the box and not the caption below. */}
        {armed && (
          <div className={styles.revealCanvas} aria-hidden="true">
            <RevealCanvas
              box={box}
              progress={progress}
              pointer={pointer}
              onReady={start}
              images={images}
              index={index}
              active={onScreen}
            />
          </div>
        )}
      </div>
      {slide && (
        <figcaption className={styles.slideLabel} data-label>
          <span>
            {String(shown + 1).padStart(2, "0")}/{String(count).padStart(2, "0")}
          </span>
          <span>{slide.title}</span>
        </figcaption>
      )}
    </figure>
  );
}
