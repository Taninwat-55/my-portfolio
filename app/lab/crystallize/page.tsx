import type { Metadata } from "next";
import Link from "next/link";
import { cases, clockContent, personalInfo, siteContent } from "@/app/data";
import { GridLines } from "@/app/world/GridLines";
import { LocalTime } from "@/app/world/LocalTime";
import { recentCommits } from "@/app/world/recentCommits";
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
 * Hero (who, where, now, the work cycling in glyphs) → statement → door →
 * the glyph hall (the work) → close.
 *
 * Posters are the projects' real screenshots until the clips exist (Ice,
 * 2026-10-25). DRAFT copy: the statement is a placeholder for Ice to rewrite.
 */
export const metadata: Metadata = {
  title: "Crystallize lab",
  robots: { index: false, follow: false },
};

const STATEMENT =
  "Agents write a lot of my code now. The judgment is still mine: what is worth building, what to cut, and how it should feel when it is done.";

// Saep stays out until its redesign; Millennial has no screens to show.
const lead = ["trailr", "bevisly", "mockmate", "racha", "lumina"].flatMap((id) =>
  cases.filter((c) => c.id === id),
);
const slides = lead.map((c) => ({ src: c.images[0], title: c.title }));
const projects = lead.map((c) => ({ id: c.id, title: c.title, sub: c.sub, tag: c.tag, image: c.images[0] }));

const FACTS = [
  siteContent.roleLabel,
  "React · Next.js · TypeScript · PostgreSQL",
  "Builds with AI agents",
  "Websites for small businesses",
];

export default function CrystallizeLab() {
  const commits = recentCommits(3);

  return (
    <div data-world="crystallize" className={`${worldFontVariables} ${styles.world}`}>
      <WorldBoot />
      <Loader />
      <SmoothScroll />

      <main id="main-content">
        <div className={styles.outside}>
          <GridLines />

          <section className={styles.hero} aria-label="Introduction">
            <div className={styles.strip}>
              <p className={styles.mark}>Ice</p>

              {commits.length > 0 && (
                <div className={styles.log}>
                  <p className={styles.kicker}>Build log</p>
                  <ul>
                    {commits.map((c) => (
                      <li key={c.subject}>
                        <span className={styles.logText}>&gt; {c.subject}</span>
                        <span className={styles.logWhen}>{c.when}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <nav className={styles.nav} aria-label="Main">
                <a href="#work-title">Work</a>
                <Link href="/engineer">About</Link>
                <a href={`mailto:${personalInfo.email}`}>Contact</a>
              </nav>

              <p className={styles.where}>
                Copenhagen
                <LocalTime />
              </p>

              <p className={styles.avail}>
                {clockContent.availability} <Link href="/engineer">Hire me →</Link>
              </p>
            </div>

            <Reveal className={styles.band} slides={slides} trigger="hero" wide />

            <Scramble as="h1" className={styles.name} text={personalInfo.name} trigger="loader" />

            <ul className={styles.facts}>
              {FACTS.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
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
