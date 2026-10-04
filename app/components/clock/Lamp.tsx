"use client";

import { useRef } from "react";
import { clockContent } from "../../data";
import styles from "./clock.module.css";

// How far the bead can be pulled, and how far counts as a tug that switches.
const MAX_PULL = 46;
const TUG = 20;

/**
 * The pendant over the portrait: a cable from the very top of the page, a
 * Danish-style layered shade, and a pull cord with a bead.
 *
 * The bead is the control. Pull it down and let go (it springs back), click it,
 * or press Enter or Space on it. Clicking the shade works too, as a bigger
 * target for the mouse, but it is not focusable: one control, announced once.
 * ClockHome decides whether the lamp is on.
 */
export function Lamp({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  const rigRef = useRef<HTMLDivElement>(null);
  const pull = useRef<{ startY: number; dy: number } | null>(null);
  // When the last tug switched the lamp, in event time, so the click that follows
  // it is ignored without a flag that could stick if that click never came.
  const tuggedAt = useRef(-Infinity);

  const setPull = (dy: number) => rigRef.current?.style.setProperty("--pull", `${dy}px`);

  const onPointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    pull.current = { startY: event.clientY, dy: 0 };
    rigRef.current?.classList.add(styles.pulling);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!pull.current) return;
    pull.current.dy = Math.min(MAX_PULL, Math.max(0, event.clientY - pull.current.startY));
    setPull(pull.current.dy);
  };

  const onPointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
    const dy = pull.current?.dy ?? 0;
    pull.current = null;
    rigRef.current?.classList.remove(styles.pulling);
    setPull(0); // springs back through the CSS transition
    if (dy >= TUG) {
      tuggedAt.current = event.timeStamp; // the click that follows must not switch it back
      onToggle();
    }
  };

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.timeStamp - tuggedAt.current < 400) return;
    // A plain click or a key press: play a small tug so the cord still moves.
    const rig = rigRef.current;
    rig?.classList.remove(styles.tug);
    void rig?.offsetWidth; // restart the animation
    rig?.classList.add(styles.tug);
    onToggle();
  };

  return (
    <div ref={rigRef} className={`${styles.lampRig} ${on ? styles.lampOn : ""}`}>
      <div className={styles.cable} aria-hidden="true" />
      <svg className={styles.shades} viewBox="0 0 140 70" aria-hidden="true" onClick={onToggle}>
        <ellipse className={styles.bulb} cx="70" cy="62" rx="20" ry="6" />
        <path className={styles.shade} d="M50 10 Q70 2 90 10 L98 27 Q70 19 42 27 Z" />
        <path className={styles.shade} d="M36 25 Q70 14 104 25 L117 45 Q70 35 23 45 Z" />
        <path className={styles.shade} d="M20 43 Q70 31 120 43 L135 64 Q70 53 5 64 Z" />
      </svg>
      <div className={styles.cone} aria-hidden="true" />
      <div className={styles.cord} aria-hidden="true" />
      <button
        type="button"
        className={styles.bead}
        aria-pressed={on}
        aria-label={clockContent.desk.lampLabel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClick={onClick}
      />
    </div>
  );
}
