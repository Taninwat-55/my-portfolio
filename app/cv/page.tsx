import type { Metadata } from "next";
import Link from "next/link";
import { FileDown } from "lucide-react";
import { PageShell } from "../components/PageShell";
import { PaperSheet } from "../components/paper/PaperSheet";
import { PageHeader } from "../components/paper/PageHeader";
import { InkLink } from "../components/paper/InkLink";
import { Tag } from "../components/paper/Tag";
import { cvData, siteContent, personalInfo, type CvEntry } from "../data";
import styles from "./cv.module.css";

const BASE_URL = "https://taninwatkaewpankan.xyz";
const PAGE_URL = `${BASE_URL}/cv`;

export const metadata: Metadata = {
  title: "CV",
  description: `${cvData.title} in Copenhagen. Full CV: skills, experience, projects and education, with a PDF download.`,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `CV | ${personalInfo.nickname} · ${personalInfo.name}`,
    description: cvData.summary,
    url: PAGE_URL,
    type: "profile",
    locale: "en_DK",
  },
};

/**
 * The recruiter's page.
 *
 * This content used to live in the middle of the homepage, inside a scroll-pinned
 * sheet with a CSS mask that revealed about half of it and a "Unlock the full CV"
 * download prompt. Both are gone, for reasons worth writing down so they are not
 * reintroduced:
 *
 * The mask never hid anything. Every word was already in the HTML, crawlable, and
 * read aloud in full by screen readers — so it only withheld the CV from sighted
 * visitors, which is the opposite of what a masked teaser is for. The theory was
 * that hiding it visually kept the SEO value while keeping the page tidy, but
 * search engines discount visually hidden text rather than rewarding it. Visible
 * text indexes better, so showing the whole thing serves both goals at once.
 *
 * On a page someone deliberately navigated to in order to read a CV, a veil is
 * friction with nothing behind it. The PDF is still offered at the top, as a
 * download rather than as a paywall.
 *
 * Since the re-theme (Phase 3) it is a paper document in the PDF's order, from
 * the same cvData, so the page and the PDF read the same: name, title, contact
 * line, summary, skills, projects, experience, education, additional.
 *
 * Fully static: no "use client", no scroll runway.
 */
/** Drops the scheme and "www.", as the PDF's contact line does. */
const bare = (url: string) => url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className={styles.section}>
      <h2>{label}</h2>
      {children}
    </section>
  );
}

function Entry({ entry }: { entry: CvEntry }) {
  return (
    <div className={styles.entry}>
      <div className={styles.entryLine}>
        <h3>{entry.org}</h3>
        <span className={styles.dim}>{entry.period}</span>
      </div>
      <div className={styles.entryLine}>
        <span className={styles.role}>{entry.role}</span>
        <span className={styles.dim}>{entry.place}</span>
      </div>
      <ul className={styles.bullets}>
        {entry.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

export default function CvPage() {
  return (
    // Back to the letter: the only link to /cv is at its foot.
    <PageShell back={{ href: "/about", label: "About" }}>
      <PaperSheet as="article" className={styles.document}>
        {/* The PDF's header: name, title, contact line. */}
        <PageHeader
          kicker="Curriculum vitae"
          title={personalInfo.name}
          lead={`${cvData.title} · ${personalInfo.location}`}
        />
        <ul className={styles.contact} aria-label="Contact">
          <li>
            <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
          </li>
          <li>
            <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer">
              {bare(personalInfo.socials.linkedin)}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer">
              {bare(personalInfo.socials.github)}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        </ul>
        {/* A download, not a paywall: the page below is complete either way. */}
        <div className={styles.download}>
          <InkLink href={siteContent.cv.href} primary external>
            <FileDown size={16} strokeWidth={1.75} aria-hidden />
            {siteContent.cv.label}
            <span className={styles.fileType}>PDF</span>
          </InkLink>
        </div>

        <Section label="Summary">
          <p className={styles.summary}>{cvData.summary}</p>
          {/* Page-only: "how does he work" is a hiring question, and the PDF has
              no room for it. */}
          <p className={styles.howIWork}>{siteContent.howIWork}</p>
        </Section>

        <Section label="Skills">
          {cvData.skills.map((group) => (
            <div key={group.label} className={styles.skillGroup}>
              <h3>{group.label}</h3>
              <div className={styles.tags}>
                {group.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </div>
          ))}
        </Section>

        {/* Projects before Experience: the PDF's order, and the reasoning is in
            scripts/build-cv-pdf.mjs. */}
        <Section label="Projects">
          {cvData.projects.map((entry) => (
            <Entry key={entry.org} entry={entry} />
          ))}
        </Section>

        <Section label="Experience">
          {cvData.experience.map((entry) => (
            <Entry key={entry.org} entry={entry} />
          ))}
        </Section>

        <Section label="Education">
          {cvData.education.map((ed) => (
            <div key={ed.degree} className={styles.entry}>
              <div className={styles.entryLine}>
                <h3>{ed.school}</h3>
                <span className={styles.dim}>{ed.period}</span>
              </div>
              {/* Degree · place, as the PDF prints it. */}
              <p className={styles.degree}>
                {ed.degree} <span className={styles.dim}>· {ed.place}</span>
              </p>
            </div>
          ))}
        </Section>

        <Section label="Additional">
          <dl className={styles.extra}>
            {cvData.additional.map((row) => (
              <div key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <div className={styles.signoff}>
          <p>Open to full-time full-stack roles in Denmark, Sweden or remote across the EU.</p>
          <p>
            <Link href="/contact">
              Write me a postcard <span aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </PaperSheet>
    </PageShell>
  );
}
