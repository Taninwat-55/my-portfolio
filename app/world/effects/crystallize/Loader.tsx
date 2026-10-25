import type { CSSProperties } from "react";
import styles from "./crystallize.module.css";

/**
 * The agent log that opens the site: signal before form. Pure CSS, so it
 * paints with the HTML, needs no JavaScript to finish, and dismisses itself
 * at ~1.3 s whatever happens. The hero is already rendered underneath.
 *
 * Hidden when WorldBoot has marked it seen this session, and under reduced
 * motion. aria-hidden: it says nothing a screen reader needs.
 *
 * CLAIM INTEGRITY: every line is a real command or check from building this
 * site (2026-10-25). Replace them with newer real lines, never invented ones.
 */
const LINES = [
  "> git rm -r app/(stack)/garden posts",
  "> npm install three @react-three/fiber gsap lenis",
  "> contrast: signal on paper 5.1:1 ok",
  "> npx tsc --noEmit ok",
  "> crystallizing",
];

export function Loader() {
  return (
    <div className={styles.loader} aria-hidden="true">
      <div className={styles.log}>
        {LINES.map((line, i) => (
          <p
            key={line}
            className={styles.logLine}
            style={{ "--n": line.length, "--i": i } as CSSProperties}
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
