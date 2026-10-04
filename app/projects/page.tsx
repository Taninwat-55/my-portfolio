import type { Metadata } from "next";
import { PageShell } from "../components/PageShell";
import { FadeIn } from "../components/FadeIn";
import { PageHeader } from "../components/paper/PageHeader";
import { Print } from "../components/paper/Print";
import { cases } from "../data";

const BASE_URL = "https://taninwatkaewpankan.xyz";
const PAGE_URL = `${BASE_URL}/projects`;

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Every project with a write-up: client work, product work at an AI startup, full-stack side projects, and the organisation I ran. Each one links to how it was built and why.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Projects | Ice · Taninwat Kaewpankan",
    description:
      "Every project with a write-up: client work, product work, and full-stack builds.",
    url: PAGE_URL,
    type: "website",
  },
};

/**
 * The complete index of case studies: all the prints laid out on the desk.
 *
 * This exists because two of them were unreachable. `cases` holds seven entries
 * and the homepage's `projectCards` featured five, so /cases/satoshi and
 * /cases/cinema were linked from nowhere at all — building, prerendering and
 * sitting in sitemap.xml while no visitor or crawler could arrive by following a
 * link. Orphan pages get minimal crawl priority and no internal link equity.
 *
 * The important detail is that this page maps over `cases` rather than a curated
 * list. A hand-maintained second list is what caused the problem, so the fix is
 * not "add the two missing ones" — it is making it impossible to have missing
 * ones. Add a case study and it appears here automatically.
 *
 * `projectCards` on the homepage deliberately stays curated and separate: some of
 * its cards point at live sites rather than case studies, which is an editorial
 * choice about what a visitor should see first, not duplication to be collapsed.
 */
// Alternating turns, so the grid reads as prints laid out by hand, not tiles.
const TILTS = [-1.5, 1, -0.6, 1.4, -1.1, 0.7];

export default function ProjectsPage() {
  // Client work first — this site is written for someone deciding whether to hire
  // me, and a paid engagement answers that better than a side project does. A sort
  // rather than an explicit id list, because another hand-maintained ordering array
  // is the same trap that orphaned two pages here.
  const ordered = [...cases].sort((a, b) => {
    const rank = (tag: string) => (tag === "Client Work" ? 0 : 1);
    return rank(a.tag) - rank(b.tag);
  });

  return (
    <PageShell back={{ href: "/work", label: "Work" }}>
      {/* h1 via PageHeader. Every page on the site has exactly one h1. */}
      <PageHeader
        onDesk
        kicker="Everything"
        title="Projects"
        lead="Client work, product work, and things I built to find out whether I could. Each one has a write-up covering what the hard part actually was."
      />

      <ul className="m-0 grid list-none grid-cols-1 gap-x-8 gap-y-12 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {ordered.map((project, i) => (
          <li key={project.id}>
            {/* The print carries the case's ViewTransition name, so opening one
                grows its photo into the case study's hero, as on /work.

                4:5 like the clock's prints, with the photo anchored to the top
                of the screenshot. This is a PRINT ratio, not any image's own
                ratio, so do not "correct" it to a specific file's dimensions.
                Ratio box + fill, never width/height: declaring dimensions that
                disagree with the file is what left a wrong-shaped placeholder
                on /th.

                Never inside a FadeIn: pressing Back from a case study plays the
                view transition into this print, and a print held at opacity 0
                would make it shrink into nothing. Only the text fades. */}
            <Print
              href={`/cases/${project.id}`}
              image={project.images[0]}
              caption={project.title}
              tilt={TILTS[i % TILTS.length]}
              transitionName={`case-hero-${project.id}`}
              sizes="(min-width: 1024px) 290px, (min-width: 640px) 45vw, 90vw"
            />
            {/* No project.n badge here. It numbers the `cases` array, and this
                page sorts client work first, so the sequence read 07 · 01 · 02
                … which looks like a bug. Renumbering by display position would
                then disagree with the number the case study page itself shows,
                so the honest fix is to drop a decoration that was never
                carrying meaning on an index. */}
            {/* The first row is in the first viewport, so its text fades in
                through CSS (FadeIn immediate, the LCP rule in PLAN.md). */}
            <FadeIn immediate={i < 3} delay={Math.min(i, 5) * 0.06} y={12}>
              <p className="mt-4 mb-1 text-xs font-medium uppercase tracking-[0.12em] text-ink-soft">
                {project.tag}
              </p>
              <p className="m-0 text-sm leading-relaxed text-frost/80">{project.sub}</p>
            </FadeIn>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
