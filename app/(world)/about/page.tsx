import type { Metadata } from "next";
import Link from "next/link";
import { aboutPage, cvData, siteContent } from "@/app/data";
import { GridLines } from "@/app/world/GridLines";
import { WorldFooter } from "@/app/world/WorldFooter";
import { WorldNav } from "@/app/world/WorldNav";
import { WorldShell } from "@/app/world/WorldShell";
import styles from "@/app/world/page.module.css";

export const metadata: Metadata = {
  title: "About",
  description: aboutPage.description,
  alternates: { canonical: "https://taninwatkaewpankan.xyz/about" },
};

// Every school on the CV, newest first: the game design degree belongs here.
const education = cvData.education.map((e) => `${e.degree.split(",")[0]}, ${e.school}`);

/**
 * About, in the Crystallize world (2026-10-25). Replaces the Stack's /engineer
 * card, which now redirects here; the nav's About and the homepage's Hire me
 * both land on it. Everything on it comes from data.ts: the facts and story
 * from siteContent, education from cvData. Nothing is written for this page
 * alone except its lead.
 */
export default function AboutPage() {
  const facts = [...siteContent.aboutFacts, { label: "Education", value: education.join(" · ") }];

  return (
    <WorldShell>
      <main id="main-content">
        <header className={styles.head}>
          <GridLines />
          <WorldNav className={styles.nav} />
          <p className={styles.kicker}>About</p>
          <h1 className={styles.title}>Taninwat Kaewpankan (Ice)</h1>
          <p className={styles.lead}>{aboutPage.lead}</p>
          <dl className={styles.facts}>
            {facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          <ul className={styles.actions}>
            <li>
              <Link className={styles.button} href={aboutPage.cv.href}>
                {aboutPage.cv.label} <span aria-hidden="true">→</span>
              </Link>
            </li>
            <li>
              <a className={styles.buttonQuiet} href={aboutPage.pdf.href}>
                {aboutPage.pdf.label} <span aria-hidden="true">↓</span>
              </a>
            </li>
            <li>
              <Link className={styles.buttonQuiet} href="/contact">
                Contact <span aria-hidden="true">→</span>
              </Link>
            </li>
          </ul>
        </header>

        <section className={styles.section} aria-labelledby="what-title">
          <h2 id="what-title" className={styles.label}>
            What I do
          </h2>
          <div className={styles.content}>
            <ul className={styles.blocks}>
              {siteContent.whatIDo.map((block) => (
                <li key={block.title}>
                  <h3>{block.title}</h3>
                  <p>{block.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="story-title">
          <h2 id="story-title" className={styles.label}>
            The long way here
          </h2>
          <div className={`${styles.content} ${styles.narrow} ${styles.prose}`}>
            {siteContent.aboutStory.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="mcp-title">
          <h2 id="mcp-title" className={styles.label}>
            {aboutPage.mcp.title}
          </h2>
          <div className={`${styles.content} ${styles.narrow} ${styles.prose}`}>
            <p>{aboutPage.mcp.body}</p>
            <pre className={styles.code} tabIndex={0} role="region" aria-label="Command to connect">
              <code>{aboutPage.mcp.command}</code>
            </pre>
            <p className={styles.note}>{aboutPage.mcp.tools}</p>
          </div>
        </section>

        <nav className={styles.next} aria-label="Where next">
          <p className={styles.label}>Next</p>
          <Link className={styles.nextLink} href="/#work-title">
            The work <span aria-hidden="true">→</span>
          </Link>
          <p className={styles.nextSub}>Five projects, each with a case page: what it is, what I did and how it was built.</p>
        </nav>
      </main>
      <WorldFooter />
    </WorldShell>
  );
}
