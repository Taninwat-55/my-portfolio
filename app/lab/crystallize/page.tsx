import type { Metadata } from "next";
import Link from "next/link";
import { cases, personalInfo, siteContent } from "@/app/data";
import { GridLines } from "@/app/world/GridLines";
import { SmoothScroll } from "@/app/world/SmoothScroll";
import { WorldBoot } from "@/app/world/WorldBoot";
import { Door } from "@/app/world/effects/crystallize/Door";
import { Loader } from "@/app/world/effects/crystallize/Loader";
import { Reveal } from "@/app/world/effects/crystallize/Reveal";
import { Scramble } from "@/app/world/effects/crystallize/Scramble";
import { worldFontVariables } from "@/app/world/fonts";
import { defaultPairing } from "@/app/world/world.config";
import { LabControls } from "./LabControls";
import "@/app/world/tokens/crystallize.css";
import styles from "./lab.module.css";

/**
 * Phase 1 of the site overhaul: the signature moments, to judge in the
 * browser before anything else is built. Unlinked and noindex. Loader, hero
 * with the glyph-to-clip reveal, statement scramble, the door, and the work
 * room behind it.
 *
 * Clips are labelled boxes until the end of the build (Ice, 2026-10-25).
 * DRAFT copy: the subline and statement are placeholders for Ice to rewrite.
 */
export const metadata: Metadata = {
  title: "Crystallize lab",
  robots: { index: false, follow: false },
};

const SUBLINE = "I design and build web products, from the interface to the database.";
const STATEMENT =
  "Agents write a lot of my code now. The judgment is still mine: what is worth building, what to cut, and how it should feel when it is done.";

const lead = ["trailr", "bevisly", "mockmate"].flatMap((id) => cases.filter((c) => c.id === id));

export default function CrystallizeLab() {
  return (
    <div
      data-world="crystallize"
      data-pairing={defaultPairing}
      className={`${worldFontVariables} ${styles.world}`}
    >
      <WorldBoot />
      <Loader />
      <SmoothScroll />

      <main id="main-content">
        <div className={styles.outside}>
          <GridLines />

          <section className={styles.hero}>
            <div className={styles.heroText}>
              <p className={styles.kicker}>{personalInfo.nickname} · Copenhagen</p>
              <Scramble as="h1" className={styles.name} text={personalInfo.name} trigger="loader" />
              <p className={styles.role}>{siteContent.roleLabel}</p>
              <p className={styles.subline}>{SUBLINE}</p>
            </div>
            <Reveal className={styles.heroClip} title={lead[0]?.title ?? "Project"} trigger="hero" />
          </section>

          <section className={styles.statement} aria-label="How I work">
            <Scramble className={styles.statementText} text={STATEMENT} trigger="scroll" />
          </section>
        </div>

        <Door />

        <div data-tone="ink" className={styles.inside}>
          <GridLines />

          <section className={styles.work} aria-labelledby="work-title">
            <p className={styles.kicker}>Work</p>
            <h2 id="work-title" className={styles.workTitle}>
              Selected work
            </h2>
            <ul className={styles.workList}>
              {lead.map((c) => (
                <li key={c.id} className={styles.workItem}>
                  <Reveal title={c.title} trigger="view" />
                  <div className={styles.caption}>
                    <h3 className={styles.captionTitle}>{c.title}</h3>
                    <p className={styles.captionSub}>{c.sub}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

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
