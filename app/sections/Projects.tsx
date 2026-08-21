"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { FadeIn } from "../components/FadeIn";
import { LiveProjectButton } from "../components/LiveProjectButton";
import { SectionHeading } from "../components/SectionHeading";
import {
  projectCards,
  secondaryProjectCards,
  cases,
  type ProjectCard,
} from "../data";

const cardRadius = "rounded-[40px] sm:rounded-[50px] md:rounded-[60px]";

function Card({
  card,
  index,
  total,
  progress,
}: {
  card: ProjectCard;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  // Every card used to render the same small-small-left / big-right bento, so
  // four projects read as one template stamped four times. Odd-indexed cards now
  // flip it, which gives the deck a rhythm as you scroll through it. The header
  // row deliberately does NOT mirror — the number stays top-left so the reading
  // order is identical on every card.
  const mirrored = index % 2 === 1;

  const stackedPair = (
    <div className="flex flex-col gap-3 sm:gap-4">
      <div
        className={`group relative overflow-hidden ${cardRadius}`}
        style={{ height: "clamp(130px, 16vw, 230px)" }}
      >
        <Image
          src={card.images[0]}
          alt={`${card.title} screenshot 1`}
          fill
          sizes="(max-width: 768px) 40vw, 460px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div
        className={`group relative overflow-hidden ${cardRadius}`}
        style={{ height: "clamp(160px, 22vw, 340px)" }}
      >
        <Image
          src={card.images[1]}
          alt={`${card.title} screenshot 2`}
          fill
          sizes="(max-width: 768px) 40vw, 460px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
    </div>
  );

  const heroShot = (
    <div className={`group relative overflow-hidden ${cardRadius}`}>
      <Image
        src={card.images[2]}
        alt={`${card.title} screenshot 3`}
        fill
        sizes="(max-width: 768px) 60vw, 690px"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
    </div>
  );

  return (
    <div className="h-[85vh] sticky top-24 md:top-32 flex items-start justify-center">
      <motion.div
        style={{ scale, top: `${index * 28}px` }}
        className={`relative w-full max-w-6xl ${cardRadius} border-2 border-frost/60 bg-night-900 p-4 sm:p-6 md:p-8 origin-top`}
      >
        {/* Top row */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-2 sm:px-4 pb-4 sm:pb-6">
          <div className="flex items-center gap-4 sm:gap-8">
            <span
              className="hero-heading font-black leading-none"
              style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
            >
              {card.number}
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-crystal-500 text-xs sm:text-sm uppercase tracking-widest">
                {card.category}
              </span>
              <h3
                className="text-frost font-medium uppercase leading-tight"
                style={{ fontSize: "clamp(1.1rem, 2.6vw, 2.4rem)" }}
              >
                {card.title}
              </h3>
            </div>
          </div>
          <LiveProjectButton
            label={card.buttonLabel}
            href={card.href}
            external={card.external}
          />
        </div>

        {/* Image bento — 5/7 on even cards, 7/5 on odd, matching the reference's
            asymmetric spans. The hero shot always takes the wider column. */}
        <div
          className={`grid gap-3 sm:gap-4 ${
            mirrored ? "grid-cols-[7fr_5fr]" : "grid-cols-[5fr_7fr]"
          }`}
        >
          {mirrored ? (
            <>
              {heroShot}
              {stackedPair}
            </>
          ) : (
            <>
              {stackedPair}
              {heroShot}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative z-10 bg-night-900 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-28"
    >
      <SectionHeading
        eyebrow="Selected Work"
        title="Projects"
        className="mb-6 sm:mb-8"
      />

      {/* A second entry point, at the TOP. The one after the deck was
          unfindable in practice: three sticky cards are ~255vh of scrolling, and
          the next section pulls up over this one by 40px, so the link at the end
          sat in a sliver nobody reaches. This is also just the better place for
          it — arriving at the section is when you decide whether to scroll all
          three or jump to the full list. */}
      <div className="mb-12 flex justify-center sm:mb-16 md:mb-20">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-frost/50 transition-colors hover:text-frost focus:outline-none focus-visible:ring-2 focus-visible:ring-crystal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-night-900"
        >
          Or see all {cases.length} projects
          <ArrowRight
            size={14}
            strokeWidth={1.5}
            aria-hidden
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      {projectCards.map((card, i) => (
        <Card
          key={card.number}
          card={card}
          index={i}
          total={projectCards.length}
          progress={scrollYProgress}
        />
      ))}

      {/* ─── The secondary row. Item 42. ────────────────────────────────────
          🔒 DELIBERATELY SUBORDINATE, and every choice here is that constraint:
          tag, title and one clamped line — no big number, a 2xl radius against
          the deck's 40–60px, a 16:9 thumbnail instead of a three-image bento,
          and roughly a third the height of a featured card. If these ever read
          as equals there is no "3 + 3", only six equal projects, and the
          curation the deck is doing disappears. Anything that makes them bigger
          defeats the reason they exist.

          `relative z-20` for the same reason the link below it carries it: the
          deck above is sticky and scales as it settles, so without its own
          stacking context the last featured card rides over this row.

          Cards link to /cases/[id], not to the live demos. The demos are one
          click further on, on a page that can say "concept piece, not a client"
          in full — and internal links are also what stopped /cases/satoshi and
          /cases/cinema being orphans in the first place. */}
      <div className="relative z-20 mt-14 sm:mt-20">
        <h3 className="mb-5 text-center text-[0.65rem] font-medium uppercase tracking-[0.25em] text-frost/40 sm:mb-6 sm:text-xs">
          Also built
        </h3>

        <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          {secondaryProjectCards.map((card, i) => (
            <FadeIn key={card.id} delay={i * 0.08} y={20}>
              <li className="h-full list-none">
                <Link
                  href={`/cases/${card.id}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-frost/10 bg-white/3 transition-colors hover:border-frost/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-crystal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-night-900"
                >
                  {/* Ratio box + fill, never width/height — declaring dimensions
                      that disagree with the file is what left a wrong-shaped
                      placeholder on /th. 16:9 is the CARD's ratio, matching
                      /projects, not any one screenshot's. */}
                  <div className="relative aspect-[16/9] overflow-hidden border-b border-frost/10">
                    <Image
                      src={card.image}
                      alt={`${card.title} — ${card.tag} project`}
                      fill
                      sizes="(min-width: 640px) 360px, 90vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <span className="text-[0.65rem] uppercase tracking-[0.25em] text-crystal-500">
                      {card.tag}
                    </span>
                    <h4 className="mt-2 text-base font-medium text-frost">
                      {card.title}
                    </h4>
                    {/* Clamped, not truncated per-card in the data: the blurb is
                        the case study's own, and three lines holds the longest of
                        them (Saep, 135 chars) at the narrowest column. */}
                    <p className="mt-1.5 line-clamp-3 text-xs font-light leading-relaxed text-frost/60">
                      {card.sub}
                    </p>
                  </div>
                </Link>
              </li>
            </FadeIn>
          ))}
        </ul>
      </div>

      {/* Now the natural next step rather than the only one — the row above
          answers "is there more?" and this answers "show me all of it".
          The pill nav keeps pointing at this section's hash so it retains
          scroll-spy. Deliberately after the deck: a visitor who scrolled all
          three cards is the one who wants more. */}
      <div className="relative z-20 mt-12 flex justify-center sm:mt-16">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 rounded-full border border-frost/30 px-7 py-3 text-sm font-medium uppercase tracking-widest text-frost/70 transition-colors hover:border-frost/60 hover:text-frost focus:outline-none focus-visible:ring-2 focus-visible:ring-crystal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-night-900"
        >
          See all projects
          <ArrowRight
            size={15}
            strokeWidth={1.5}
            aria-hidden
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </section>
  );
}
