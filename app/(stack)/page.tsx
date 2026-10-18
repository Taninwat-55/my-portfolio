import type { Metadata } from "next";
import Link from "next/link";
import { LanguageOffer } from "../components/LanguageOffer";
import { DitherPicture, ditherSize } from "../components/stack/DitherPicture";
import { cases, ditheredSrc, stackContent, stackHref } from "../data";
import styles from "../components/stack/stack.module.css";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://taninwatkaewpankan.xyz",
    // Reciprocates the declarations on /th, /sv and /da. hreflang is ignored
    // unless every variant names every other one, so all four lists must stay
    // in sync.
    languages: {
      en: "https://taninwatkaewpankan.xyz",
      th: "https://taninwatkaewpankan.xyz/th",
      sv: "https://taninwatkaewpankan.xyz/sv",
      da: "https://taninwatkaewpankan.xyz/da",
    },
  },
};

/**
 * The Home card of Ice's Stack (app/(stack)/layout.tsx). The work leads: three
 * project cards in miniature, one of each kind, under a small ID photo and one
 * sentence. Everything renders on the server, so nothing in the first viewport
 * waits for hydration.
 */
export default function Home() {
  const { home } = stackContent;
  const featured = home.featured.map((f) => {
    const caseStudy = cases.find((c) => c.id === f.id)!;
    return { ...f, title: caseStudy.title, thumb: ditheredSrc(caseStudy.images[0], "thumb") };
  });

  return (
    <div>
      <div className={styles.homeHead}>
        <figure className={`${styles.art} ${styles.idPhoto}`}>
          <DitherPicture src="/stack/ice-portrait-id.png" alt={home.portraitAlt} priority single />
        </figure>
        <div>
          <h1 className={styles.title}>{home.title}</h1>
          <p className={styles.lead}>{home.intro}</p>
          <p className={styles.availability}>{home.availability}</p>
        </div>
      </div>

      <ul className={`${styles.miniGrid} ${styles.featured}`} aria-label="Featured work">
        {featured.map((f) => (
          <li key={f.id}>
            <Link href={stackHref(f.id)} className={styles.mini}>
              {/* eslint-disable-next-line @next/next/no-img-element -- a dither must not be resized (DitherPicture.tsx) */}
              <img src={f.thumb} alt="" fetchPriority="high" decoding="async" {...ditherSize(f.thumb)} />
              <span className={styles.miniTitle}>{f.title}</span>
              <span className={styles.miniLine}>{f.line}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.buttons}>
        {home.buttons.map((button, i) => (
          <Link
            key={button.href}
            href={button.href}
            className={`${styles.btn} ${i === 0 ? styles.btnDefault : ""}`}
          >
            {button.label}
          </Link>
        ))}
      </div>
      <p className={`${styles.hint} ${styles.keysHint}`}>{home.hint}</p>
      <LanguageOffer />
    </div>
  );
}
