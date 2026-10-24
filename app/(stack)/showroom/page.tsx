import type { Metadata } from "next";
import Link from "next/link";
import { ditherSize } from "../../components/stack/DitherPicture";
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
    "Websites for businesses, real client work and concepts, each with the published price of a site like it. Priced by scope, not by style.",
  alternates: { canonical: PAGE_URL },
};

/**
 * The Showroom card: the shop floor. One small card per site, with its stamp
 * (real client or concept) and its price; the card opens the case page, which
 * carries the full placard (PricePlacard.tsx). Every figure comes from
 * conceptPrice() in data.ts, so it always agrees with /services.
 */
export default function ShowroomPage() {
  const copy = stackContent.showroom;
  const sites = showroomCases();

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

      <ul className={`${stack.miniGrid} ${styles.spaced}`}>
        {sites.map((c) => {
          const showroom = c.showroom!;
          const price = conceptPrice(showroom);
          const thumb = ditheredSrc(c.images[0], "thumb");
          return (
            <li key={c.id}>
              <Link href={`/cases/${c.id}`} className={stack.mini}>
                {/* eslint-disable-next-line @next/next/no-img-element -- a dither must not be resized (DitherPicture.tsx) */}
                <img src={thumb} alt="" loading="lazy" decoding="async" {...ditherSize(thumb)} />
                <span className={stack.miniTitle}>{c.title}</span>
                <span className={stack.miniMeta}>
                  <span className={stack.miniStamp}>{showroom.client ? copy.client : copy.concept}</span>
                  <span>
                    {showroom.business}. {showroom.style}.
                  </span>
                  <strong className={stack.miniPrice}>{price.total}</strong>
                  {foundingOpen && (
                    <span>
                      {founding.label} {price.founding}
                    </span>
                  )}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <p className={`${stack.body} ${styles.spaced}`}>{copy.more}</p>
      <div className={`${stack.buttons} ${styles.spaced}`}>
        <Link href="/build" className={`${stack.btn} ${stack.btnDefault}`}>
          {stackContent.build.title}
        </Link>
        <Link href="/services" className={stack.btn}>
          {copy.prices}
        </Link>
      </div>
    </div>
  );
}
