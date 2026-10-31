import type { Metadata } from "next";
import Link from "next/link";
import { cases, leadCaseIds, personalInfo, services, siteContent } from "@/app/data";
import { GridLines } from "@/app/world/GridLines";
import { SmoothScroll } from "@/app/world/SmoothScroll";
import { WorldFooter } from "@/app/world/WorldFooter";
import { WorldNav } from "@/app/world/WorldNav";
import { WorldShell } from "@/app/world/WorldShell";
import { AskSiteLazy } from "@/app/world/AskSiteLazy";
import { Door } from "@/app/world/effects/crystallize/Door";
import { Hall } from "@/app/world/effects/crystallize/Hall";
import { Loader } from "@/app/world/effects/crystallize/Loader";
import { Reveal } from "@/app/world/effects/crystallize/Reveal";
import { Scramble } from "@/app/world/effects/crystallize/Scramble";
import styles from "./home.module.css";

/**
 * The homepage, in the Crystallize world. It grew out of the /lab/crystallize
 * prototype and replaced the Stack home on 2026-10-25. Title, description and
 * JSON-LD come from the root layout; the world's code only enhances HTML that
 * is already complete without JS.
 *
 * Hero (plain nav, what and where in one label, the name small above two
 * large roles, availability, two doors, the work cycling in glyphs) →
 * statement → door →
 * the glyph hall (the work) → close.
 *
 * Posters are the projects' real screenshots until the clips exist (Ice,
 * 2026-10-25).
 */
export const metadata: Metadata = {
  // English only since 2026-10-25: /th, /sv and /da redirect here, so no
  // hreflang alternates (they would point at redirects).
  alternates: { canonical: "https://taninwatkaewpankan.xyz" },
};

// Never advertise how the code gets written (Ice, 2026-10-25: telling people
// about agents cuts both ways; some like it, some stop trusting the work).
const STATEMENT =
  "Most of building good software is judgment: what is worth building, what to cut, and how it should feel when it is done.";

const lead = leadCaseIds.flatMap((id) =>
  cases.filter((c) => c.id === id),
);
const slides = lead.map((c) => ({ src: c.images[0], title: c.title }));
const projects = [
  ...lead.map((c) => ({ id: c.id, title: c.title, sub: c.sub, tag: c.tag, image: c.images[0], clip: c.clip })),
  // The hall's last room, kept free for the next client (prototype, Ice
  // 2026-10-31). The price is read from services, never typed here.
  {
    id: "yours",
    title: "Your business, here",
    sub: `A website for your local business, custom-built in code. ${services.offers[0].priceRange}.`,
    tag: "Your project",
    image: "/assets/yours/your-project.webp",
    href: "/services",
    linkLabel: "Build mine",
  },
];


export default function Home() {
  return (
    <WorldShell>
      <Loader />
      <SmoothScroll />

      <main id="main-content">
        <div className={styles.outside}>
          <GridLines />

          <section className={styles.hero} aria-label="Introduction">
            <WorldNav workHref="#work-title" home className={styles.heroNav} />

            {/* Ice, 2026-10-25: no explanatory line under the roles; they say
                what he does. What and where live in this one quiet label.
                (The game design degree belongs on the About page.) */}
            <p className={styles.where}>Design and engineering from Copenhagen, Denmark</p>

            {/* The roles lead; the name sits above them, smaller (Ice,
                2026-10-25). All of it is the heading, so search and screen
                readers get "Taninwat Kaewpankan (Ice), Full-stack Engineer,
                Creative Developer". roleLabel stays "Full-stack Engineer" for
                the CV, metadata and search. */}
            <h1 className={styles.headline}>
              <span className={styles.name}>
                {personalInfo.name} <em>({personalInfo.nickname})</em>
                <span className="sr-only">,</span>
              </span>
              <Scramble as="span" className={styles.line} text={siteContent.roleLabel} trigger="loader" />
              <span className="sr-only">,</span>
              <Scramble as="span" className={styles.line} text="Creative Developer" trigger="loader" />
            </h1>

            <div className={styles.intro}>
              <p className={styles.status}>Open to full-time roles and client projects</p>
              <div className={styles.ctas}>
                <Link className={styles.ctaPrimary} href="/about">
                  Hire me <span aria-hidden="true">→</span>
                </Link>
                <Link className={styles.ctaSecondary} href="/services">
                  Build my website <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            <Reveal className={styles.band} slides={slides} trigger="hero" wide sizes="(min-width: 900px) 50vw, 100vw" />
          </section>

          <section className={styles.statement} aria-label="How I work">
            <Scramble className={styles.statementText} text={STATEMENT} trigger="scroll" />
          </section>
        </div>

        <Door />

        <div data-tone="ink" className={styles.inside}>
          <Hall projects={projects} />

          <section className={styles.close} aria-labelledby="close-title">
            <h2 id="close-title" className={styles.closeTitle}>
              What brings you here?
            </h2>
            <ul className={styles.doors}>
              <li>
                <Link href="/about">Hire me</Link>
              </li>
              <li>
                <Link href="/services">Build mine</Link>
                {/* The floor, so a client sees it before clicking (Ice, 2026-10-31). */}
                <span className={styles.doorNote}>{services.offers[0].priceRange.replace("From", "from")}</span>
              </li>
            </ul>
            <AskSiteLazy className={styles.askSite} />
          </section>

        </div>
      </main>

      {/* Outside <main>, so it is the page's contentinfo landmark; in the ink
          tone, so the dark room runs to the bottom of the page. */}
      <div data-tone="ink" className={styles.inside}>
        <WorldFooter />
      </div>
    </WorldShell>
  );
}
