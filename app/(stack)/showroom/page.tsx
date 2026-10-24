import type { Metadata } from "next";
import Link from "next/link";
import { DitherPicture } from "../../components/stack/DitherPicture";
import { ReceiptRow } from "../../components/stack/ReceiptRow";
import stack from "../../components/stack/stack.module.css";
import styles from "../../components/stack/longcard.module.css";
import {
  conceptPrice,
  ditheredSrc,
  founding,
  foundingOpen,
  foundingSpotsLine,
  foundingTerms,
  showroomCases,
  stackContent,
} from "../../data";

const PAGE_URL = "https://taninwatkaewpankan.xyz/showroom";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Showroom",
  description:
    "Sample websites for made-up Copenhagen businesses, each with the published price a real business would pay for one like it. Priced by scope, not by style.",
  alternates: { canonical: PAGE_URL },
};

/**
 * The Showroom card: concept sites, each with a placard saying what a site
 * like it would cost. Every figure comes from conceptPrice() in data.ts, which
 * reads the same ladder and add-ons /services shows, so the two pages cannot
 * disagree.
 */
export default function ShowroomPage() {
  const copy = stackContent.showroom;
  const concepts = showroomCases();

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <h1 className={stack.title}>{copy.title}</h1>
        <p className={stack.lead}>{copy.lead}</p>
        {foundingOpen && (
          <p className={`${stack.body} ${styles.introBody}`}>
            <strong>{founding.label}.</strong> {foundingTerms} {foundingSpotsLine}
          </p>
        )}
      </header>

      <div className={`${styles.stackOf} ${styles.section}`}>
        {concepts.map((c) => {
          const showroom = c.showroom!;
          const price = conceptPrice(showroom);
          const host = new URL(c.links.demo).host.replace(/^www\./, "");
          return (
            <article key={c.id} id={c.id} className={`${stack.window} ${styles.offer}`}>
              <div className={stack.titlebar}>
                <i className={stack.closeBox} aria-hidden="true" />
                <span>{host}</span>
              </div>
              <div className={styles.offerBody}>
                <div className={styles.offerGrid}>
                  <div>
                    <DitherPicture src={ditheredSrc(c.images[0])} alt={`${c.title}, screenshot`} />
                    <h2 id={`${c.id}-title`} className={`${stack.heading} ${styles.spaced}`}>
                      {c.title}
                    </h2>
                    <p className={styles.tagline}>
                      {showroom.business}, in {showroom.style.toLowerCase()}
                    </p>
                    <p className={stack.note}>{copy.concept}</p>
                    <p className={`${styles.label} ${styles.spaced}`}>{copy.getsLabel}</p>
                    <ul className={styles.bullets}>
                      {showroom.gets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className={styles.label}>{copy.priceLabel}</p>
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
                      <Link
                        href={`/build?like=${c.id}`}
                        className={`${stack.btn} ${stack.btnDefault}`}
                        aria-describedby={`${c.id}-title`}
                      >
                        {copy.buildLike}
                      </Link>
                      <a
                        href={c.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={stack.btn}
                        aria-describedby={`${c.id}-title`}
                      >
                        {copy.live}
                      </a>
                      <Link href={`/cases/${c.id}`} className={stack.btn} aria-describedby={`${c.id}-title`}>
                        {copy.caseStudy}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <p className={`${stack.body} ${styles.spaced}`}>{copy.more}</p>
    </div>
  );
}
