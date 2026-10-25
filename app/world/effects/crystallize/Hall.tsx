"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useWorldMode } from "../../useWorldMode";
import styles from "./crystallize.module.css";

const HallCanvas = dynamic(() => import("./HallCanvas"), { ssr: false });

export type HallProject = {
  id: string;
  title: string;
  sub: string;
  tag: string;
  image: string;
  /** The project's other screenshots, for the hall's walls. */
  screens: string[];
};

/**
 * The glyph hall: where the door lets out. Scrolling walks the camera down a
 * dark hall whose walls are giant letters made of characters, past project
 * screenshots that crystallize out of loose glyphs as you approach.
 *
 * The page underneath is plain HTML steps: an intro, one step per project
 * (number, title, line, link) and a trailing step. Each step is a screen
 * tall, and its card arrives in 3D as its caption reaches the middle of the
 * screen. The quiet world (and no JS) gets the same steps as a list with the
 * real screenshots.
 */
export function Hall({ projects }: { projects: HallProject[] }) {
  const section = useRef<HTMLElement>(null);
  const progress = useRef({ value: 0 });
  const mode = useWorldMode();
  const [near, setNear] = useState(false);
  const [mounted, setMounted] = useState(false);
  const images = useMemo(() => projects.map((p) => p.image), [projects]);
  const walls = useMemo(
    () => projects.flatMap((p, project) => p.screens.map((src) => ({ src, project }))),
    [projects],
  );

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

  const total = String(projects.length).padStart(2, "0");

  return (
    <section ref={section} className={styles.hall} data-mode={mode ?? "pending"} aria-labelledby="work-title">
      <div className={styles.hallStage} aria-hidden="true">
        {mode === "full" && mounted && (
          <HallCanvas images={images} walls={walls} progress={progress} root={section} active={near} />
        )}
      </div>

      <div className={styles.hallIntro}>
        <p className={styles.hallKicker}>Work</p>
        <h2 id="work-title" className={styles.hallTitle}>
          Selected work
        </h2>
      </div>

      <ol className={styles.hallList}>
        {projects.map((p, k) => (
          <li key={p.id} className={styles.hallStep} data-side={k % 2 === 0 ? "left" : "right"}>
            <div className={styles.hallCaption}>
              <p className={styles.hallKicker}>
                No. {String(k + 1).padStart(2, "0")} / {total} · {p.tag}
              </p>
              <h3 className={styles.hallName}>{p.title}</h3>
              <p className={styles.hallSub}>{p.sub}</p>
              <Link className={styles.hallLink} href={`/cases/${p.id}`}>
                Open the case <span aria-hidden="true">→</span>
              </Link>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element -- quiet world and no-JS only; the full world draws it in WebGL */}
            <img className={styles.hallImage} src={p.image} alt={`${p.title}, screenshot`} loading="lazy" />
          </li>
        ))}
      </ol>

      <div className={styles.hallEnd} aria-hidden="true" />
    </section>
  );
}
