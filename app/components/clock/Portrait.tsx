"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./clock.module.css";

// Where the pupils sit at rest, in the SVG's 200×200 space.
const PUPILS = [
  { cx: 77, cy: 93 },
  { cx: 123, cy: 93 },
];
// How far a pupil may travel from rest. Kept small so the eyes glance rather
// than roll.
const REACH = 4.5;

const WINK_CLICKS = 5;
const WINK_WINDOW_MS = 2000;

/**
 * The portrait in the middle of the clock. PLACEHOLDER ART: the drawn face is a
 * stand-in for the illustrated SVG portrait. When that arrives, keep the class
 * names on the eyes, pupils and mouths and only the drawing changes.
 *
 * Everything alive here runs on refs and the DOM, not React state, because it
 * updates on every pointer move. Re-rendering the face 60 times a second to move
 * two circles would be the slowest possible way to do it.
 */
export function Portrait({
  smiling,
  lookAt,
}: {
  smiling: boolean;
  /** The element to look at instead of the cursor, e.g. the object the hand points to. */
  lookAt: () => HTMLElement | null;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pupilRefs = useRef<(SVGCircleElement | null)[]>([]);
  const clicks = useRef<number[]>([]);
  const [hovered, setHovered] = useState(false);
  const [greeting, setGreeting] = useState(false);
  const [winking, setWinking] = useState(false);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const finePointer = matchMedia("(pointer: fine)").matches;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Touch screens have no hover, so the smile plays once by itself.
    const greetTimers: number[] = [];
    if (!finePointer) {
      greetTimers.push(
        window.setTimeout(() => setGreeting(true), 1000),
        window.setTimeout(() => setGreeting(false), 2600),
      );
    }
    if (reduce) return () => greetTimers.forEach((id) => window.clearTimeout(id));

    let frame = 0;
    let pointer: { x: number; y: number } | null = null;

    // Glance toward a point on screen, or back to rest when there is none.
    const aim = () => {
      frame = 0;
      const box = svg.getBoundingClientRect();
      const scale = box.width / 200;
      const target = lookAt()?.getBoundingClientRect();
      const point = target
        ? { x: target.left + target.width / 2, y: target.top + target.height / 2 }
        : pointer;
      PUPILS.forEach((rest, i) => {
        const pupil = pupilRefs.current[i];
        if (!pupil) return;
        let dx = 0;
        let dy = 0;
        if (point) {
          const ex = box.left + rest.cx * scale;
          const ey = box.top + rest.cy * scale;
          const angle = Math.atan2(point.y - ey, point.x - ex);
          const distance = Math.min(1, Math.hypot(point.x - ex, point.y - ey) / 240);
          dx = Math.cos(angle) * REACH * distance;
          dy = Math.sin(angle) * REACH * distance;
        }
        pupil.setAttribute("transform", `translate(${dx.toFixed(2)} ${dy.toFixed(2)})`);
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(aim);
    };
    const onMove = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY };
      schedule();
    };

    if (finePointer) window.addEventListener("pointermove", onMove);
    // The pointed-at object can change without the pointer moving (keyboard).
    const poll = window.setInterval(schedule, 250);

    // Blink every 3 to 6 seconds, like a person rather than a metronome.
    let blinkTimer = 0;
    const blink = () => {
      svg.classList.add(styles.blink);
      window.setTimeout(() => svg.classList.remove(styles.blink), 140);
      blinkTimer = window.setTimeout(blink, 3000 + Math.random() * 3000);
    };
    blinkTimer = window.setTimeout(blink, 2500);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.clearInterval(poll);
      window.clearTimeout(blinkTimer);
      greetTimers.forEach((id) => window.clearTimeout(id));
      cancelAnimationFrame(frame);
    };
  }, [lookAt]);

  // The easter egg: five clicks inside two seconds earns a wink.
  const onClick = () => {
    const now = Date.now();
    clicks.current = [...clicks.current.filter((t) => now - t < WINK_WINDOW_MS), now];
    if (clicks.current.length >= WINK_CLICKS) {
      clicks.current = [];
      setWinking(true);
      window.setTimeout(() => setWinking(false), 900);
    }
  };

  const classes = [
    styles.face,
    smiling || hovered || greeting || winking ? styles.smile : "",
    winking ? styles.wink : "",
  ].join(" ");

  return (
    <div
      className={classes}
      aria-hidden="true"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <svg ref={svgRef} viewBox="0 0 200 200">
        <rect className={styles.faceBg} width="200" height="200" />
        <path className={styles.faceBody} d="M30 200 C40 160 70 150 100 150 C130 150 160 160 170 200 Z" />
        <ellipse className={styles.faceHead} cx="100" cy="92" rx="66" ry="72" />
        <path
          className={styles.faceHair}
          d="M36 84 C34 34 70 16 102 18 C140 20 168 42 164 86 C152 62 132 52 104 54 C78 52 52 60 36 84 Z"
        />
        <path className={styles.faceLine} d="M64 70 Q76 64 88 70" />
        <path className={styles.faceLine} d="M112 70 Q124 64 136 70" />
        <g className={styles.eyes}>
          {PUPILS.map((pupil, i) => (
            <g key={i} className={i === 1 ? styles.eyeRight : undefined}>
              <circle className={styles.eyeWhite} cx={pupil.cx - 1} cy="92" r="12" />
              <circle
                ref={(el) => {
                  pupilRefs.current[i] = el;
                }}
                className={styles.pupil}
                cx={pupil.cx}
                cy={pupil.cy}
                r="5.5"
              />
            </g>
          ))}
        </g>
        <path className={`${styles.faceLine} ${styles.mouthNeutral}`} d="M84 134 Q100 130 116 134" />
        <path className={`${styles.faceLine} ${styles.mouthSmile}`} d="M78 126 Q100 152 122 126" />
        <text className={styles.faceTag} x="100" y="186" textAnchor="middle">
          placeholder portrait
        </text>
      </svg>
    </div>
  );
}
