"use client";

import { clockContent } from "../../data";
import { hourOf, minuteOf, useVisitorTime } from "./useCopenhagenTime";
import styles from "./clock.module.css";

const TICKS = Array.from({ length: 12 }, (_, i) => i * 30);

/**
 * A small analog clock on the wall, showing Copenhagen's time. It replaced the
 * "13:35 local time" text rather than joining it: one clock, not two.
 *
 * Hour and minute hands only. A sweeping second hand would be motion in the
 * corner of the eye forever, on a page that already has eyes, a hand and a lamp.
 * The time is also there as text: visually hidden for screen readers, and as a
 * hover note that adds the visitor's own time when it differs.
 */
export function WallClock({ time }: { time: string | null }) {
  const own = useVisitorTime();
  const { desk } = clockContent;

  const hour = time ? hourOf(time) : 0;
  const minute = time ? minuteOf(time) : 0;
  const label = time
    ? [
        desk.clockLabel.replace("{time}", time),
        own && own !== time ? desk.yourTime.replace("{time}", own) : null,
      ]
        .filter(Boolean)
        .join(" · ")
    : null;

  return (
    <div className={styles.wallClock}>
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <circle className={styles.clockFace} cx="32" cy="32" r="29" />
        {TICKS.map((deg) => (
          <line
            key={deg}
            className={styles.clockTick}
            x1="32"
            y1={deg % 90 === 0 ? 7 : 8.5}
            x2="32"
            y2="11.5"
            transform={`rotate(${deg} 32 32)`}
          />
        ))}
        {/* No hands until the browser knows the time: a wrong time is worse than none. */}
        {time && (
          <>
            <line
              className={styles.clockHour}
              x1="32"
              y1="34"
              x2="32"
              y2="18"
              transform={`rotate(${(hour % 12) * 30 + minute * 0.5} 32 32)`}
            />
            <line
              className={styles.clockMinute}
              x1="32"
              y1="35"
              x2="32"
              y2="11"
              transform={`rotate(${minute * 6} 32 32)`}
            />
          </>
        )}
        <circle className={styles.clockPin} cx="32" cy="32" r="2.2" />
      </svg>
      {label && (
        <>
          <span className={styles.visuallyHidden}>{label}</span>
          <span className={styles.clockNote} aria-hidden="true">
            {label}
          </span>
        </>
      )}
    </div>
  );
}
