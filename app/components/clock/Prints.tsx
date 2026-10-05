"use client";

import { useEffect, useState, ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { clockContent } from "../../data";
import type { ClockPrint } from "./types";
import styles from "./clock.module.css";

/**
 * The Work object: a stack of photo prints that fans out at stage 1. Each print
 * turns over to its case study's one-liner and a link through.
 *
 * The screenshot is wrapped in a named <ViewTransition>, and the case page wraps
 * its hero in the same name, so following the link grows this photo into the
 * page header instead of cutting to it.
 */
export function Prints({
  stage,
  prints,
  caseCount,
}: {
  stage: number;
  prints: ClockPrint[];
  caseCount: number;
}) {
  const { work } = clockContent;
  const [flipped, setFlipped] = useState<string | null>(null);
  // True once the fan-in has finished: its 60ms-per-print stagger should not
  // delay a print turning back later (see .settled in clock.module.css).
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    if (stage < 1) return;
    const id = setTimeout(() => setSettled(true), 900);
    return () => clearTimeout(id);
  }, [stage]);

  return (
    <div
      className={`${styles.printsWrap} ${stage >= 1 ? styles.fanned : ""} ${settled ? styles.settled : ""}`}
    >
      <ul className={styles.prints}>
        {prints.map((print) => {
          const isFlipped = flipped === print.id;
          return (
            <li key={print.id} className={`${styles.print} ${isFlipped ? styles.printFlipped : ""}`}>
              <button
                type="button"
                className={`${styles.printSide} ${styles.printFront}`}
                onClick={() => setFlipped(print.id)}
                // The concept mark is in the name too: aria-label replaces the
                // visible text for screen readers.
                aria-label={`${print.title}${print.concept ? `, ${work.conceptLabel}` : ""}: turn over`}
                inert={isFlipped}
              >
                <ViewTransition name={`case-hero-${print.id}`}>
                  <span className={styles.printPhoto}>
                    <Image src={print.image} alt="" fill sizes="(max-width: 767px) 42vw, 230px" />
                  </span>
                </ViewTransition>
                <span className={styles.printCaption}>
                  {print.title}
                  {print.concept && <span className={styles.printConcept}>{work.conceptLabel}</span>}
                </span>
              </button>

              <div className={`${styles.printSide} ${styles.printBack}`} inert={!isFlipped}>
                <h3>{print.title}</h3>
                <p>{print.sub}</p>
                <p className={styles.printStack}>{print.stack.join(" · ")}</p>
                <div className={styles.printActions}>
                  <Link href={`/cases/${print.id}`} className={styles.printRead}>
                    {work.readLabel} →
                  </Link>
                  <button type="button" className={styles.printTurnBack} onClick={() => setFlipped(null)}>
                    {work.turnBack}
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <p className={styles.objectFooter}>
        <span>{work.hint}</span>
        <Link href={work.allHref}>
          {work.allLabel} ({caseCount}) →
        </Link>
      </p>
    </div>
  );
}
