"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, ViewTransition } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useWorldMode } from "../../useWorldMode";
import { useFirstInteraction } from "../../useFirstInteraction";
import { caseTitle } from "../../caseTitle";
import { frontAt, stepsAt } from "./hallSteps";
import styles from "./crystallize.module.css";

const HallCanvas = dynamic(() => import("./HallCanvas"), { ssr: false });

export type HallProject = {
  id: string;
  title: string;
  sub: string;
  tag: string;
  image: string;
  /** Plays on the card while it is near (full world only). */
  clip?: string;
};

/**
 * The glyph hall: where the door lets out. Scrolling walks the camera down a
 * dark hall past each project's screen, which crystallizes out of loose
 * glyphs as you approach; a giant glyph room number stands opposite it.
 *
 * One sticky screen holds the 3D hall and all the text. The camera stops in
 * front of each card for a while before moving on, and the caption follows
 * the camera, not the scroll: it shows while its card is in front of you.
 * Below the screen, spacers only give the scroll its length (a screen and a
 * half per room). The quiet world (and no JS) gets the same heading and
 * captions as a list with the real screenshots.
 */
export function Hall({ projects }: { projects: HallProject[] }) {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const spacers = useRef<(HTMLDivElement | null)[]>([]);
  const progress = useRef({ value: 0 });
  const mode = useWorldMode();
  const [near, setNear] = useState(false);
  const [mounted, setMounted] = useState(false);
  // -1: the intro (the heading shows); 0…n-1: that card is in front;
  // -2: between two cards (nothing shows); n: past the last.
  const [active, setActive] = useState(-1);
  const images = useMemo(() => projects.map((p) => p.image), [projects]);
  const clips = useMemo(() => projects.map((p) => p.clip), [projects]);
  const full = mode === "full";
  // The DOM owns the captions: the scroll shows them until the canvas is
  // drawing, then the canvas's damped camera does, so they follow its glide.
  // A slow or failed WebGL chunk never leaves the hall without captions.
  const canvasLive = useRef(false);
  const onCanvasActive = useCallback((k: number) => {
    canvasLive.current = true;
    setActive(k);
  }, []);

  useEffect(() => {
    const el = section.current;
    if (!full || !el) return;
    gsap.registerPlugin(ScrollTrigger);
    // The hall rises over the door's last screens unseen, then fades in once
    // pinned, over the door's matching last frame: a crossfade, not a slide.
    const enter = (self: ScrollTrigger) => {
      const fade = (self.scroll() - self.start) / (innerHeight * 0.3);
      stage.current?.style.setProperty("--enter", String(Math.min(1, Math.max(0, fade))));
    };
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        progress.current.value = self.progress;
        enter(self);
        if (!canvasLive.current) setActive(frontAt(stepsAt(self.progress, projects.length), projects.length));
      },
      onRefresh: enter,
    });
    // Mount early (two screens ahead) so textures are ready on arrival.
    const io = new IntersectionObserver(
      ([entry]) => {
        setNear(entry.isIntersecting);
        if (entry.isIntersecting) setMounted(true);
      },
      { rootMargin: "200% 0px" },
    );
    io.observe(el);
    ScrollTrigger.refresh();
    return () => {
      st.kill();
      io.disconnect();
    };
  }, [full, projects.length]);

  // Fetch the hall's code once the visitor first moves, not on load:
  // parsing three.js and the hall in the first seconds blocked a slow phone's
  // main thread (Lighthouse TBT, 2026-10-25). The hall is at least a door's
  // length (three screens) below, so that still gives it time to arrive.
  const awake = useFirstInteraction();
  useEffect(() => {
    if (full && awake) void import("./HallCanvas");
  }, [full, awake]);

  // Tabbing to a caption's link walks the hall to its card.
  const walkTo = useCallback(
    (k: number) => {
      const spacer = spacers.current[k + 1];
      if (!full || !spacer) return;
      const rect = spacer.getBoundingClientRect();
      scrollTo({ top: scrollY + rect.top + rect.height / 2 - innerHeight / 2 });
    },
    [full],
  );

  const total = String(projects.length).padStart(2, "0");
  const phase = active === -1 ? "intro" : active >= projects.length ? "end" : "card";

  return (
    <section ref={section} className={styles.hall} data-mode={mode ?? "pending"} aria-labelledby="work-title">
      <div ref={stage} className={styles.hallStage} data-phase={phase}>
        <div className={styles.hallCanvas} aria-hidden="true">
          {full && mounted && (
            <HallCanvas images={images} clips={clips} progress={progress} root={section} active={near} onActive={onCanvasActive} />
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
            <li
              key={p.id}
              className={styles.hallStep}
              data-side={k % 2 === 0 ? "left" : "right"}
              data-on={active === k}
            >
              <div className={styles.hallCaption}>
                <p className={styles.hallKicker}>
                  No. {String(k + 1).padStart(2, "0")} / {total} · {p.tag}
                </p>
                {/* The name flies into the case page's title (caseTitle). */}
                <ViewTransition name={caseTitle(p.id)}>
                  <h3 className={styles.hallName}>{p.title}</h3>
                </ViewTransition>
                <p className={styles.hallSub}>{p.sub}</p>
                <Link className={styles.hallLink} href={`/cases/${p.id}`} onFocus={() => walkTo(k)}>
                  Open the case <span aria-hidden="true">→</span>
                </Link>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element -- quiet world and no-JS only; the full world draws it in WebGL */}
              <img className={styles.hallImage} src={p.image} alt={`${p.title}, screenshot`} loading="lazy" />
            </li>
          ))}
        </ol>
      </div>

      {/* Scroll distance only: the intro, one room per project, the way out. */}
      {Array.from({ length: projects.length + 2 }, (_, i) => (
        <div
          key={i}
          ref={(el) => {
            spacers.current[i] = el;
          }}
          className={`${styles.hallSpacer} ${i === 0 ? styles.hallSpacerFirst : ""}`}
          aria-hidden="true"
        />
      ))}
    </section>
  );
}
