import type { Metadata } from "next";
import Link from "next/link";
import { LanguageOffer } from "../components/LanguageOffer";
import { DevelopPortrait } from "../components/stack/DevelopPortrait";
import { DitherPicture } from "../components/stack/DitherPicture";
import { stackContent } from "../data";
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
 * The Home card of Ice's Stack (app/(stack)/layout.tsx). It replaced the clock
 * homepage on 2026-10-18. Everything on it renders on the server: the portrait
 * is the likely LCP element and must not wait for hydration. Only the develop
 * button over it is a client component; the dithered picture is passed in.
 */
export default function Home() {
  const { home } = stackContent;
  return (
    <div className={styles.homeGrid}>
      <div>
        <h1 className={styles.title}>{home.title}</h1>
        <p className={styles.lead}>{home.intro}</p>
        <p className={styles.availability}>{home.availability}</p>
        <div className={styles.buttonsStacked}>
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
      </div>
      <DevelopPortrait
        colourSrc="/stack/ice-portrait-colour.webp"
        colourAlt={home.portraitColourAlt}
        label={home.portraitDevelop}
        hint={home.portraitHint}
        developedHint={home.portraitDevelopedHint}
      >
        <DitherPicture src="/stack/ice-portrait.png" alt={home.portraitAlt} priority />
      </DevelopPortrait>
      <LanguageOffer />
    </div>
  );
}
