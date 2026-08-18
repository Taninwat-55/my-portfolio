import type { Metadata } from "next";
import { FileDown } from "lucide-react";
import { SkipLink } from "../components/SkipLink";
import { Navbar } from "../components/Navbar";
import { FadeIn } from "../components/FadeIn";
import { ContactButton } from "../components/ContactButton";
import { cvData, siteContent, personalInfo, type CvEntry } from "../data";

const BASE_URL = "https://taninwatkaewpankan.xyz";
const PAGE_URL = `${BASE_URL}/cv`;

export const metadata: Metadata = {
  title: "CV",
  description: `${cvData.title} in Copenhagen. Full CV: skills, experience, projects and education, with a PDF download.`,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `CV | ${personalInfo.nickname} — ${personalInfo.name}`,
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
 * Fully static: no "use client", no framer-motion, no scroll runway.
 */
function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-frost/10 pt-8 mt-8 first:border-0 first:pt-0 first:mt-0">
      <h2 className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-frost/40 mb-5">
        {label}
      </h2>
      {children}
    </div>
  );
}

function Entry({ entry }: { entry: CvEntry }) {
  return (
    <div className="mb-7 last:mb-0">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
        <span className="text-frost font-medium text-base sm:text-lg">{entry.org}</span>
        <span className="shrink-0 text-[11px] sm:text-xs uppercase tracking-wider text-frost/40">
          {entry.period}
        </span>
      </div>
      <div className="mt-1 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-4">
        <span className="text-crystal-500 text-sm sm:text-[15px]">{entry.role}</span>
        <span className="shrink-0 text-[11px] sm:text-xs text-frost/30">{entry.place}</span>
      </div>
      <ul className="mt-3.5 space-y-2.5">
        {entry.bullets.map((b) => (
          <li
            key={b}
            className="relative pl-5 text-sm sm:text-[15px] font-light leading-relaxed text-frost/65"
          >
            <span
              aria-hidden
              className="absolute left-0 top-[0.65em] h-1 w-1 rounded-full bg-crystal-500/60"
            />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CvPage() {
  return (
    <div className="min-h-screen bg-night-900 text-frost" style={{ overflowX: "clip" }}>
      <SkipLink />
      <Navbar />

      <main id="main-content" className="px-4 pt-28 pb-20 sm:px-6 sm:pt-32 md:px-10">
        <div className="mx-auto max-w-3xl">
          {/* Page-level h1 written here rather than via SectionHeading, which
              renders an h2 — every page on the site has exactly one h1, and the
              treatment matches /services. */}
          <header className="mb-10">
            <FadeIn y={20}>
              <div className="mb-4 flex items-center gap-3">
                <span aria-hidden className="h-px w-8 bg-frost/30" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-frost/50 sm:text-xs">
                  Track Record
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.08} y={40}>
              <h1
                className="frost-text font-black uppercase leading-none tracking-tight mb-5"
                style={{ fontSize: "clamp(2.6rem, 9vw, 110px)" }}
              >
                {siteContent.roleLabel}
              </h1>
            </FadeIn>

            <FadeIn delay={0.16} y={20}>
              <p className="mb-8 font-display italic text-xl text-frost/45 md:text-2xl">
                {personalInfo.name} · {personalInfo.location}
              </p>
            </FadeIn>

            {/* A download, not a paywall — the page below is complete either way. */}
            <FadeIn delay={0.24} y={20}>
              <a
                href={siteContent.cv.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border border-crystal-500/40 px-6 py-3 text-sm font-medium text-frost transition-colors hover:border-crystal-500 hover:bg-white/3 focus:outline-none focus-visible:ring-2 focus-visible:ring-crystal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-night-900"
              >
                <FileDown size={17} strokeWidth={1.6} aria-hidden className="text-crystal-500" />
                {siteContent.cv.label}
                <span className="text-[10px] uppercase tracking-wider text-frost/35">PDF</span>
              </a>
            </FadeIn>
          </header>

          <FadeIn delay={0.08} y={24}>
            <div className="rounded-3xl border border-frost/15 bg-white/3 px-5 py-9 sm:px-8 sm:py-12 md:px-12">
              <p className="text-frost/80 font-light leading-relaxed text-[15px] sm:text-lg">
                {cvData.summary}
              </p>

              {/* Moved here from the homepage's About section, where it was being
                  read by someone deciding whether to spend money. "How does he
                  work" is a hiring question, so it belongs on this page. */}
              <p className="mt-5 border-l-2 border-crystal-500/30 pl-5 text-frost/60 font-light leading-relaxed text-sm sm:text-[15px]">
                {siteContent.howIWork}
              </p>

              <Block label="Skills">
                {cvData.skills.map((group) => (
                  <div key={group.label} className="mb-5 last:mb-0">
                    <div className="text-frost text-sm font-medium mb-3">{group.label}</div>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-frost/12 bg-white/3 px-3 py-1 text-[11px] sm:text-xs text-frost/60"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </Block>

              <Block label="Experience">
                {cvData.experience.map((entry) => (
                  <Entry key={entry.org} entry={entry} />
                ))}
              </Block>

              <Block label="Projects">
                {cvData.projects.map((entry) => (
                  <Entry key={entry.org} entry={entry} />
                ))}
              </Block>

              <Block label="Education">
                {cvData.education.map((ed) => (
                  <div key={ed.degree} className="mb-5 last:mb-0">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                      <span className="text-frost font-medium text-base">{ed.school}</span>
                      <span className="shrink-0 text-[11px] sm:text-xs uppercase tracking-wider text-frost/40">
                        {ed.period}
                      </span>
                    </div>
                    <div className="mt-1 text-frost/60 font-light text-sm sm:text-[15px]">
                      {ed.degree}
                    </div>
                  </div>
                ))}
              </Block>

              <Block label="Additional">
                {cvData.additional.map((row) => (
                  <div
                    key={row.label}
                    className="mb-3 last:mb-0 flex flex-col sm:flex-row sm:gap-4"
                  >
                    <span className="shrink-0 sm:w-44 text-frost text-sm font-medium">
                      {row.label}
                    </span>
                    <span className="text-frost/60 font-light text-sm sm:text-[15px]">
                      {row.value}
                    </span>
                  </div>
                ))}
              </Block>
            </div>
          </FadeIn>

          {/* HireModal's home now that the pill nav no longer opens it. Its three
              actions — copy email, CV download, LinkedIn — are a recruiter set
              end to end, so this is the page they belong on. */}
          <FadeIn delay={0.12} y={20}>
            <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-frost/55 font-light leading-relaxed text-sm">
                Open to full-time frontend roles in Denmark, Sweden or remote across the EU.
              </p>
              <ContactButton label="Get in touch" className="shrink-0" />
            </div>
          </FadeIn>
        </div>
      </main>
    </div>
  );
}
