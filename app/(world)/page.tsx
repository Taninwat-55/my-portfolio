import type { Metadata } from "next";
import Link from "next/link";
import { cases, personalInfo, siteContent } from "@/app/data";
import { GridLines } from "@/app/world/GridLines";
import { SmoothScroll } from "@/app/world/SmoothScroll";
import { ThemeToggle } from "@/app/world/ThemeToggle";
import { WorldBoot } from "@/app/world/WorldBoot";
import { Door } from "@/app/world/effects/crystallize/Door";
import { Hall } from "@/app/world/effects/crystallize/Hall";
import { Loader } from "@/app/world/effects/crystallize/Loader";
import { Reveal } from "@/app/world/effects/crystallize/Reveal";
import { Scramble } from "@/app/world/effects/crystallize/Scramble";
import { worldFontVariables } from "@/app/world/fonts";
import { LabControls } from "./LabControls";
import "@/app/world/tokens/crystallize.css";
import styles from "./lab.module.css";

/**
 * The site overhaul's prototype: the signature moments, to judge in the
 * browser before anything else is built. Unlinked and noindex.
 *
 * Hero (plain nav, what and where in one label, the name small above two
 * large roles, availability, two doors, the work cycling in glyphs) →
 * statement → door →
 * the glyph hall (the work) → close.
 *
 * Posters are the projects' real screenshots until the clips exist (Ice,
 * 2026-10-25). DRAFT copy: the statement is a placeholder for Ice to rewrite.
 */
export const metadata: Metadata = {
  title: "Crystallize lab",
  robots: { index: false, follow: false },
};

// Never advertise how the code gets written (Ice, 2026-10-25: telling people
// about agents cuts both ways; some like it, some stop trusting the work).
const STATEMENT =
  "Most of building good software is judgment: what is worth building, what to cut, and how it should feel when it is done.";

// Saep stays out until its redesign; Millennial has no screens to show.
const lead = ["trailr", "bevisly", "mockmate", "racha", "lumina"].flatMap((id) =>
  cases.filter((c) => c.id === id),
);
const slides = lead.map((c) => ({ src: c.images[0], title: c.title }));
const projects = lead.map((c) => ({ id: c.id, title: c.title, sub: c.sub, tag: c.tag, image: c.images[0] }));


export default function CrystallizeLab() {
  return (
    // suppressHydrationWarning: WorldBoot may set data-tone="ink" (a saved
    // dark theme) on this element before React hydrates it.
    <div data-world="crystallize" className={`${worldFontVariables} ${styles.world}`} suppressHydrationWarning>
      <WorldBoot />
      <Loader />
      <SmoothScroll />

      <main id="main-content">
        <div className={styles.outside}>
          <GridLines />

          <section className={styles.hero} aria-label="Introduction">
            {/* Plain links in the page, not sticky: once past the hero they're
                gone, and the work has the screen. */}
            <nav className={styles.nav} aria-label="Main">
              <div className={styles.navLinks}>
                <a href="#work-title">Work</a>
                <Link href="/engineer">About</Link>
                <a href={`mailto:${personalInfo.email}`}>Contact</a>
              </div>
              <div className={styles.navLinks}>
                <a href={personalInfo.socials.linkedin} rel="me noopener" target="_blank">
                  LinkedIn
                </a>
                <a href={personalInfo.socials.github} rel="me noopener" target="_blank">
                  GitHub
                </a>
                <ThemeToggle className={styles.themeToggle} />
              </div>
            </nav>

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
                <Link className={styles.ctaPrimary} href="/engineer">
                  Hire me <span aria-hidden="true">→</span>
                </Link>
                <Link className={styles.ctaSecondary} href="/services">
                  Build my website <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            <Reveal className={styles.band} slides={slides} trigger="hero" wide />
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
                <Link href="/engineer">Hire me</Link>
              </li>
              <li>
                <Link href="/services">Build mine</Link>
              </li>
              <li>
                <span className={styles.soon}>Ask the site (phase 4)</span>
              </li>
            </ul>
          </section>
        </div>
      </main>

      <LabControls />
    </div>
  );
}
