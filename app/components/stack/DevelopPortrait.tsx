"use client";

import { useState } from "react";
import styles from "./stack.module.css";

/**
 * The Home card's portrait, developed in colour when pressed: the one exception
 * to "colour is a client's real work", because the person is real too. The
 * dithered picture (server-rendered, passed as children) stays the LCP element;
 * the colour original is laid over it, using the same develop reveal as
 * DevelopImage. The button covers the picture rather than wrapping it, so the
 * picture keeps its own alt text. The colour file is not requested until
 * someone shows intent (hover, focus or press). The colour file is
 * public/stack/ice-portrait-colour.webp, made from the dither's own source by
 * npm run dither, so the two line up.
 */
export function DevelopPortrait({
  colourSrc,
  colourAlt,
  label,
  hint,
  developedHint,
  children,
}: {
  colourSrc: string;
  colourAlt: string;
  /** The button's accessible name; aria-pressed carries the state. */
  label: string;
  hint: string;
  developedHint: string;
  children: React.ReactNode;
}) {
  const [armed, setArmed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [developed, setDeveloped] = useState(false);
  const arm = () => setArmed(true);
  // On touch there is no hover, so the first tap is also the first sign of
  // intent: the reveal waits for the file rather than stippling over nothing.
  const shown = developed && loaded;

  return (
    <div className={`${styles.caseArt} ${styles.portrait}`}>
      <figure className={`${styles.art} ${styles.develop} ${shown ? styles.developed : ""}`}>
        {children}
        {armed && (
          // eslint-disable-next-line @next/next/no-img-element -- a 720px webp made for this, shown as is
          <img
            src={colourSrc}
            alt={shown ? colourAlt : ""}
            aria-hidden={shown ? undefined : true}
            className={styles.colour}
            decoding="async"
            onLoad={() => setLoaded(true)}
          />
        )}
        <button
          type="button"
          className={styles.portraitButton}
          aria-label={label}
          aria-pressed={developed}
          onPointerEnter={arm}
          onPointerDown={arm}
          onFocus={arm}
          onClick={() => {
            arm();
            setDeveloped((d) => !d);
          }}
        />
      </figure>
      <p className={styles.developHint}>{developed ? developedHint : hint}</p>
    </div>
  );
}
