"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GridLines } from "../../GridLines";
import { useTheme } from "../../ThemeToggle";
import { useWorldMode } from "../../useWorldMode";
import styles from "./crystallize.module.css";

const DoorCanvas = dynamic(() => import("./DoorCanvas"), { ssr: false });

/**
 * The threshold into the work. The section is tall (300vh) with a sticky
 * full-screen stage; scrolling through it drives progress 0 to 1, and the
 * canvas bends the page's own grid lines flat, then into a tunnel, then
 * through a doorway into the dark room where the work lives.
 *
 * Pure decoration, so aria-hidden. The quiet world gets a short cut from
 * paper to ink instead (CSS only).
 */
export function Door() {
  const section = useRef<HTMLElement>(null);
  const rails = useRef<HTMLDivElement>(null);
  const progress = useRef({ value: 0 });
  const mode = useWorldMode();
  const theme = useTheme();
  const [near, setNear] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = section.current;
    if (mode !== "full" || !el) return;
    gsap.registerPlugin(ScrollTrigger);
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        progress.current.value = self.progress;
      },
    });
    // Mount a screen early, and stop drawing once it's well out of view.
    const io = new IntersectionObserver(
      ([entry]) => {
        setNear(entry.isIntersecting);
        if (entry.isIntersecting) setMounted(true);
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(el);
    ScrollTrigger.refresh();
    return () => {
      st.kill();
      io.disconnect();
    };
  }, [mode]);

  return (
    <section ref={section} className={styles.door} data-mode={mode ?? "pending"} aria-hidden="true">
      <div className={styles.doorStage}>
        <GridLines ref={rails} />
        {mode === "full" && mounted && (
          // Keyed by theme: the canvas reads its start colours once.
          <DoorCanvas key={theme} progress={progress} rails={rails} active={near} />
        )}
      </div>
    </section>
  );
}
