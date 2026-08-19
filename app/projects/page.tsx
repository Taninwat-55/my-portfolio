import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SkipLink } from "../components/SkipLink";
import { Navbar } from "../components/Navbar";
import { FadeIn } from "../components/FadeIn";
import { cases } from "../data";

const BASE_URL = "https://taninwatkaewpankan.xyz";
const PAGE_URL = `${BASE_URL}/projects`;

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Every project with a write-up: client work, product work at an AI startup, full-stack side projects, and the organisation I ran. Each one links to how it was built and why.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Projects | Ice — Taninwat Kaewpankan",
    description:
      "Every project with a write-up — client work, product work, and full-stack builds.",
    url: PAGE_URL,
    type: "website",
  },
};

/**
 * The complete index of case studies.
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
    <div className="min-h-screen bg-night-900 text-frost" style={{ overflowX: "clip" }}>
      <SkipLink />
      <Navbar />

      <main id="main-content" className="px-5 pt-28 pb-20 sm:px-6 sm:pt-32 md:px-10">
        <div className="mx-auto max-w-5xl">
          {/* h1 written directly rather than via SectionHeading, which emits an h2.
              Every page on the site has exactly one h1. */}
          <header className="mb-12 md:mb-16">
            <FadeIn y={20}>
              <div className="mb-4 flex items-center gap-3">
                <span aria-hidden className="h-px w-8 bg-frost/30" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-frost/50 sm:text-xs">
                  Everything
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.08} y={40}>
              <h1
                className="hero-heading mb-5 font-black uppercase leading-none tracking-tight"
                style={{ fontSize: "clamp(2.6rem, 9vw, 110px)" }}
              >
                Projects
              </h1>
            </FadeIn>

            <FadeIn delay={0.16} y={20}>
              <p className="max-w-2xl font-display text-lg italic leading-relaxed text-frost/55 md:text-xl">
                Client work, product work, and things I built to find out whether I
                could. Each one has a write-up covering what the hard part actually
                was.
              </p>
            </FadeIn>
          </header>

          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {ordered.map((project, i) => (
              <FadeIn key={project.id} delay={Math.min(i, 5) * 0.06} y={24}>
                <li className="h-full">
                  <Link
                    href={`/cases/${project.id}`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-frost/10 bg-white/3 transition-colors hover:border-frost/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-crystal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-night-900"
                  >
                    {/* Uniform 16:9 by design — a grid of cards at seven different
                        heights reads as broken. The source screenshots span 1.59:1
                        (racha, mockmate) to 1.96:1 (millennial), so object-cover
                        crops a little either way and 16:9 sits near the middle where
                        it crops least. This is a CARD ratio, not any image's own
                        ratio — do not "correct" it to a specific file's dimensions.

                        Ratio box + fill, never width/height: declaring dimensions
                        that disagree with the file is what left a wrong-shaped
                        placeholder on /th. */}
                    <div className="relative aspect-[16/9] overflow-hidden border-b border-frost/10">
                      <Image
                        src={project.images[0]}
                        alt={`${project.title} — ${project.tag} project`}
                        fill
                        sizes="(min-width: 640px) 420px, 90vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      {/* No project.n badge here. It numbers the `cases` array, and
                          this page sorts client work first, so the sequence read
                          07 · 01 · 02 … which looks like a bug. Renumbering by
                          display position would then disagree with the number the
                          case study page itself shows, so the honest fix is to drop
                          a decoration that was never carrying meaning on an index. */}
                      <div className="mb-3">
                        <span className="text-xs uppercase tracking-[0.25em] text-crystal-500">
                          {project.tag}
                        </span>
                      </div>

                      <h2 className="mb-2.5 text-xl font-medium text-frost md:text-2xl">
                        {project.title}
                      </h2>
                      <p className="text-sm font-light leading-relaxed text-frost/60">
                        {project.sub}
                      </p>

                      <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-frost/50 transition-colors group-hover:text-frost">
                        Read the case study
                        <ArrowRight
                          size={14}
                          strokeWidth={1.5}
                          aria-hidden
                          className="transition-transform duration-200 group-hover:translate-x-0.5"
                        />
                      </span>
                    </div>
                  </Link>
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
