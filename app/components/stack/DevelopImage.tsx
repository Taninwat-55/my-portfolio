"use client";

import { useState } from "react";
import styles from "./stack.module.css";

/**
 * Develop in colour: where the stack shows a client's real work in colour
 * (the only other colour is Ice's portrait, see DevelopPortrait). The dithered picture (server-rendered, passed as children) stays
 * where it is; the colour original is laid over it and comes up through the
 * stipple densities. The colour file is not requested until someone shows
 * intent (hover, focus or press), so it never competes with the first paint.
 */
export function DevelopImage({
  colourSrc,
  colourAlt,
  developLabel,
  developedLabel,
  hint,
  windowTitle,
  children,
}: {
  colourSrc: string;
  colourAlt: string;
  developLabel: string;
  developedLabel: string;
  hint: string;
  /** The window's title bar: the live site's domain, or the project's name. */
  windowTitle: string;
  children: React.ReactNode;
}) {
  const [armed, setArmed] = useState(false);
  const [developed, setDeveloped] = useState(false);
  const arm = () => setArmed(true);

  return (
    <div className={styles.caseArt}>
      <div className={`${styles.window} ${styles.artWindow}`}>
        <div className={styles.titlebar}>
          <i className={styles.closeBox} aria-hidden="true" />
          <span>{windowTitle}</span>
        </div>
        <figure className={`${styles.art} ${styles.develop} ${developed ? styles.developed : ""}`}>
          {children}
          {armed && (
            // eslint-disable-next-line @next/next/no-img-element -- the original webp, shown as is
            <img
              src={colourSrc}
              alt={developed ? colourAlt : ""}
              aria-hidden={developed ? undefined : true}
              className={styles.colour}
              decoding="async"
            />
          )}
        </figure>
      </div>
      <button
        type="button"
        className={styles.btn}
        aria-pressed={developed}
        onPointerEnter={arm}
        onFocus={arm}
        onClick={() => {
          arm();
          setDeveloped((d) => !d);
        }}
      >
        {developed ? developedLabel : developLabel}
      </button>
      <p className={styles.developHint}>{hint}</p>
    </div>
  );
}
