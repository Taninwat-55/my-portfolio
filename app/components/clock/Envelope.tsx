import Link from "next/link";
import { clockContent, siteContent } from "../../data";
import styles from "./clock.module.css";

/**
 * The About object: a sealed envelope that opens into a letter.
 *
 * `stage` is driven by ClockHome so the sequence can wait for the fly-in:
 *   0  sealed
 *   1  the flap opens and the seal falls away
 *   2  the letter rises out, still folded
 *   3  the envelope drops away and the letter unfolds to reading size
 *
 * A direct visit to /about renders at stage 3, so the letter is readable in the
 * server HTML before any JavaScript runs.
 */
export function Envelope({ stage }: { stage: 0 | 1 | 2 | 3 }) {
  const { letter } = clockContent;
  const paragraphs = siteContent.aboutStory;
  const stageClass = [styles.s1, styles.s2, styles.s3].slice(0, stage).join(" ");

  return (
    <div className={`${styles.envelope} ${stageClass}`}>
      <div className={styles.envelopeBack} />
      <article className={styles.letter} tabIndex={0} aria-labelledby="letter-greeting">
        <p id="letter-greeting">{letter.greeting}</p>
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
        <p className={styles.signature}>{letter.signature}</p>
        <footer className={styles.letterFacts}>
          <dl>
            {siteContent.aboutFacts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
          <div className={styles.letterLinks}>
            <Link className={styles.cvLink} href={letter.cvLink.href}>
              {letter.cvLink.label} <span aria-hidden="true">→</span>
            </Link>
            <Link className={styles.cvButton} href={siteContent.cv.href} target="_blank">
              {siteContent.cv.label}
            </Link>
          </div>
        </footer>
      </article>
      <div className={styles.envelopeFront} />
      <div className={styles.envelopeFlap} />
      <span className={styles.seal} aria-hidden="true">
        I
      </span>
    </div>
  );
}
