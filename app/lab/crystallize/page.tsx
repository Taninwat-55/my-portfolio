import type { Metadata } from "next";
import Link from "next/link";
import { cases, personalInfo, siteContent } from "@/app/data";
import { GridLines } from "@/app/world/GridLines";
import { SmoothScroll } from "@/app/world/SmoothScroll";
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
 * Hero ("Ice, full-stack engineer." with the full name as byline, one line
 * of what he does, two doors, the work cycling in glyphs) → statement → door →
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
const projects = lead.map((c) => ({
  id: c.id,
  title: c.title,
  sub: c.sub,
  tag: c.tag,
  image: c.images[0],
  screens: c.images.slice(1),
}));

// DRAFT: the hero's one line of what he does, for Ice to rewrite.
const DEK = "I design and build web products, from the interface to the database.";

export default function CrystallizeLab() {
  return (
    <div data-world="crystallize" className={`${worldFontVariables} ${styles.world}`}>
      <WorldBoot />
      <Loader />
      <SmoothScroll />

      <main id="main-content">
        <div className={styles.outside}>
          <GridLines />

          <section className={styles.hero} aria-label="Introduction">
            <p className={styles.where}>Copenhagen, Denmark</p>

            {/* Ice and the roles at one size: the name people can remember and
                what he does, read as one phrase. The full name stays in the
                heading as a byline, for recruiters matching a CV and for
                search. */}
            <h1 className={styles.headline}>
              <span className={styles.byline}>{personalInfo.name}</span>
              <Scramble as="span" className={`${styles.line} ${styles.lineName}`} text={`${personalInfo.nickname},`} trigger="loader" />
              <Scramble as="span" className={styles.line} text={`${siteContent.roleLabel.toLowerCase()},`} trigger="loader" />
              {/* Ice, 2026-10-25: both roles, at the same size. roleLabel stays
                  "Full-stack Engineer" for the CV, metadata and search. */}
              <Scramble as="span" className={styles.line} text="creative developer." trigger="loader" />
            </h1>

            <div className={styles.intro}>
              <p className={styles.dek}>{DEK}</p>
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
