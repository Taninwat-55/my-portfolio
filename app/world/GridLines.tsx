import type { Ref } from "react";
import styles from "./world.module.css";

/**
 * The drawn grid: one hairline at the left edge of every column, and one at
 * the right edge of the last. These are the world's one material. The door
 * measures them and bends the same lines into its tunnel, so the lines a
 * visitor has been looking at since the hero are the lines they walk through.
 *
 * Twelve spans always render; below 900px the CSS shows four, matching the
 * --cols token.
 */
export function GridLines({ ref }: { ref?: Ref<HTMLDivElement> }) {
  return (
    <div ref={ref} className={styles.grid} aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => (
        <span key={i} />
      ))}
    </div>
  );
}
