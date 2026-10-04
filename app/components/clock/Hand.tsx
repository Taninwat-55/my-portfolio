import { forwardRef } from "react";
import styles from "./clock.module.css";

/**
 * The pointing hand, drawn in code and coloured from the portrait's skin tone.
 *
 * It pivots at the portrait's centre and is rotated by ClockHome through the
 * --angle custom property, so pointing never re-renders React.
 *
 * Why the finger sits on the thumb side and not the middle of the fist: one
 * finger raised from the centre of a fist is the middle finger. The index is
 * read as "pointing" only when it rises next to the thumb, with the curled
 * knuckles visible beside it. The drawn version got this wrong twice.
 */
export const Hand = forwardRef<HTMLDivElement>(function Hand(_props, ref) {
  return (
    <div ref={ref} className={`${styles.hand} ${styles.idle}`} aria-hidden="true">
      <div className={styles.sway}>
        <svg viewBox="0 0 64 84">
          <rect className={styles.skin} x="18" y="2" width="14" height="48" rx="7" />
          <rect className={styles.nail} x="21" y="5" width="8" height="11" rx="4" />
          <path className={styles.crease} d="M21 27 H29" />
          <rect className={styles.skin} x="17" y="40" width="38" height="34" rx="11" />
          <path
            className={styles.skin}
            d="M31 46 C31 38 39 37 41 43 C42 37 49 37 50 43 C51 38 57 40 56 47 L56 52 L31 52 Z"
          />
          <path className={styles.crease} d="M33 52 V60 M41 52 V60 M49 52 V59" />
          <path className={styles.skin} d="M8 52 C4 46 10 40 15 43 L27 51 C30 54 28 60 24 60 L16 59 Z" />
          <rect className={styles.cuff} x="19" y="70" width="34" height="14" rx="3" />
        </svg>
        <div className={styles.sleeve} />
      </div>
    </div>
  );
});
