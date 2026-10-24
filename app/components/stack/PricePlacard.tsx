import Link from "next/link";
import { conceptPrice, founding, foundingOpen, stackContent, type CaseStudy } from "../../data";
import { ReceiptRow } from "./ReceiptRow";
import stack from "./stack.module.css";
import styles from "./longcard.module.css";

/**
 * What a site like this one costs: the ladder rung and add-ons it would need,
 * the total, the founding price while spots remain, and the way to ask for
 * one. Shown on a case page when the case has a Showroom entry; every figure
 * comes from conceptPrice(), so it always agrees with /services.
 */
export function PricePlacard({ caseStudy }: { caseStudy: CaseStudy }) {
  const showroom = caseStudy.showroom!;
  const copy = stackContent.showroom;
  const price = conceptPrice(showroom);
  return (
    <section className={stack.window} aria-labelledby={`${caseStudy.id}-price`}>
      <div className={stack.titlebar}>
        {/* A heading, so the price is in the outline between the title and Overview. */}
        <h2 id={`${caseStudy.id}-price`} className={stack.titlebarHeading}>
          {copy.priceLabel}
        </h2>
      </div>
      <div className={`${styles.offerBody} ${styles.offerGrid}`}>
        <div>
          <p className={styles.label}>{copy.getsLabel}</p>
          <ul className={styles.bullets}>
            {showroom.gets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          {price.rows.map((row) => (
            <ReceiptRow key={row.label} label={row.label} value={row.value} />
          ))}
          <p className={styles.bigFigure}>
            {copy.total} {price.total}
            {foundingOpen && (
              <>
                <br />
                <small>
                  {founding.label} {price.founding}
                </small>
              </>
            )}
          </p>
          <p className={styles.rowMeta}>
            {copy.timeline} {price.timeline}. {copy.terms}
          </p>
          <div className={`${stack.buttons} ${styles.spaced}`}>
            <Link href={`/build?like=${caseStudy.id}`} className={`${stack.btn} ${stack.btnDefault}`}>
              {copy.buildLike}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
