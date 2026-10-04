"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./clock.module.css";

/**
 * Eye geometry, measured from the 2048×2048 Gemini originals, so the overlay
 * lands exactly on the painted eyes.
 *
 * The eye shape itself is not drawn: it is /clock/eye-mask.png, built from the
 * portrait's own pixels (everything inside each eye that is not skin, grown by
 * 4px). An ellipse was tried first and left a sliver of the painted pupil and a
 * white crescent under the closed lid, because the eyes are not ellipses. The
 * whites are pure #FFFFFF, so a masked white patch hides the painted pupil.
 */
const EYES = [
  { x: 600, width: 300, cx: 754.5, pupil: { cx: 756, cy: 1007 } },
  { x: 1140, width: 310, cx: 1292.5, pupil: { cx: 1292, cy: 1007 } },
];
const EYE_BAND = { y: 900, height: 230 };
const LASH_Y = 1010;
const PUPIL_R = 59;
const HIGHLIGHT = { dx: 24, dy: -18, r: 17 };
// How far a pupil may travel from rest. The eye is far wider than it is tall
// (242 × 155 around a 118 pupil), so it glances sideways and only nudges up
// and down; the mask clips the rest, which reads as looking up or down.
const REACH = { x: 42, y: 20 };
const SKIN = "#df9d7a";
const INK = "#362724";

const WINK_CLICKS = 5;
const WINK_WINDOW_MS = 2000;

/**
 * The portrait in the middle of the clock: Ice's illustrated face, as two
 * images (neutral and smiling) that crossfade, plus an SVG layer that redraws
 * the pupils so they can follow the cursor, and the eyelids so it can blink.
 *
 * Everything that moves runs on refs and the DOM, not React state, because it
 * updates on every pointer move.
 */
export function Portrait({
  smiling,
  lookAt,
}: {
  smiling: boolean;
  /** The element to look at instead of the cursor, e.g. the object the hand points to. */
  lookAt: () => HTMLElement | null;
}) {
  const overlayRef = useRef<SVGSVGElement>(null);
  const pupilRefs = useRef<(SVGGElement | null)[]>([]);
  const clicks = useRef<number[]>([]);
  const [hovered, setHovered] = useState(false);
  const [greeting, setGreeting] = useState(false);
  const [winking, setWinking] = useState(false);

  useEffect(() => {
    const svg = overlayRef.current;
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
      const scale = box.width / 2048;
      const target = lookAt()?.getBoundingClientRect();
      const point = target
        ? { x: target.left + target.width / 2, y: target.top + target.height / 2 }
        : pointer;
      EYES.forEach((eye, i) => {
        const pupil = pupilRefs.current[i];
        if (!pupil) return;
        let dx = 0;
        let dy = 0;
        if (point) {
          const ex = box.left + eye.pupil.cx * scale;
          const ey = box.top + eye.pupil.cy * scale;
          const angle = Math.atan2(point.y - ey, point.x - ex);
          const pull = Math.min(1, Math.hypot(point.x - ex, point.y - ey) / 260);
          dx = Math.cos(angle) * REACH.x * pull;
          dy = Math.sin(angle) * REACH.y * pull;
        }
        pupil.setAttribute("transform", `translate(${dx.toFixed(1)} ${dy.toFixed(1)})`);
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

  // The wink keeps the neutral face, so the closed eye reads as a wink rather
  // than as both eyes smiling shut.
  const showSmile = (smiling || hovered || greeting) && !winking;
  const classes = [styles.portraitRoot, showSmile ? styles.smile : "", winking ? styles.wink : ""].join(" ");

  return (
    <div
      className={classes}
      aria-hidden="true"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* The disc behind the head. Not decoration: black hair vanishes against the
          near-black page without it, and it hides the hand's arm. */}
      <div className={styles.disc} />
      <div className={styles.face}>
        {/* The neutral face decides LCP, so it is preloaded; the smile is not. */}
        <Image
          className={styles.portrait}
          src="/clock/face-neutral.webp"
          alt=""
          width={840}
          height={840}
          sizes="(max-width: 767px) 260px, 420px"
          priority
        />
        <Image
          className={`${styles.portrait} ${styles.portraitSmile}`}
          src="/clock/face-smile.webp"
          alt=""
          width={840}
          height={840}
          sizes="(max-width: 767px) 260px, 420px"
        />
        <svg ref={overlayRef} className={styles.eyeLayer} viewBox="0 0 2048 2048">
          <defs>
            <mask id="portrait-eyes" maskUnits="userSpaceOnUse" x="0" y="0" width="2048" height="2048">
              <image href="/clock/eye-mask.png" x="0" y="0" width="2048" height="2048" />
            </mask>
          </defs>
          {EYES.map((eye, i) => (
            <g key={i} className={i === 1 ? styles.eyeRight : undefined}>
              <g mask="url(#portrait-eyes)">
                {/* Covers the painted pupil and highlight. */}
                <rect x={eye.x} y={EYE_BAND.y} width={eye.width} height={EYE_BAND.height} fill="#fff" />
                <g
                  ref={(el) => {
                    pupilRefs.current[i] = el;
                  }}
                  className={styles.pupil}
                >
                  <circle cx={eye.pupil.cx} cy={eye.pupil.cy} r={PUPIL_R} fill={INK} />
                  <circle
                    cx={eye.pupil.cx + HIGHLIGHT.dx}
                    cy={eye.pupil.cy + HIGHLIGHT.dy}
                    r={HIGHLIGHT.r}
                    fill="#fff"
                  />
                </g>
              </g>
              {/* The eyelid: hidden until a blink or wink closes it over the eye. */}
              <g className={styles.lid}>
                <rect
                  x={eye.x}
                  y={EYE_BAND.y}
                  width={eye.width}
                  height={EYE_BAND.height}
                  fill={SKIN}
                  mask="url(#portrait-eyes)"
                />
                <path
                  d={`M${eye.cx - 118} ${LASH_Y} Q${eye.cx} ${LASH_Y + 30} ${eye.cx + 118} ${LASH_Y}`}
                  fill="none"
                  stroke={INK}
                  strokeWidth="14"
                  strokeLinecap="round"
                />
              </g>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
