import Link from "next/link";
import { clockContent } from "../../data";
import type { ClockRate } from "./types";
import styles from "./clock.module.css";

/**
 * The Services object: a till receipt that prints out of a slot at stage 1.
 * Every price comes from services.offers via Clock.tsx, so it matches /services.
 */
export function Receipt({ stage, rates }: { stage: number; rates: ClockRate[] }) {
  const { rates: copy } = clockContent;

  return (
    <div className={`${styles.receiptWrap} ${stage >= 1 ? styles.receiptPrinted : ""}`}>
      <div className={styles.receiptSlot} />
      <div className={styles.receiptClip}>
        <div className={styles.receipt} tabIndex={0} role="region" aria-label="Services and prices">
          <h2>{copy.heading}</h2>
          <p className={styles.receiptCentre}>{copy.place}</p>
          <hr />
          <dl>
            {rates.map((rate) => (
              <div key={rate.name}>
                <dt>{rate.name}</dt>
                <dd>{rate.price}</dd>
              </div>
            ))}
          </dl>
          <hr />
          <p className={styles.receiptCentre}>{copy.footnote}</p>
          <div className={styles.receiptBarcode} aria-hidden="true" />
          <p className={styles.receiptLinks}>
            <Link href={copy.detailsHref}>{copy.detailsLabel}</Link>
            <Link href={copy.ctaHref}>{copy.ctaLabel} →</Link>
          </p>
          <p className={styles.receiptCentre}>{copy.thanks}</p>
        </div>
      </div>
    </div>
  );
}
