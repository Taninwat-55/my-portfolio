"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { LiveProjectButton } from "../components/LiveProjectButton";
import { SectionHeading } from "../components/SectionHeading";
import { projectCards, type ProjectCard } from "../data";

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
      className="relative z-10 bg-night-900 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-10"
    >
      <SectionHeading
        eyebrow="Selected Work"
        title="Projects"
        className="mb-12 sm:mb-16 md:mb-20"
      />

      {projectCards.map((card, i) => (
        <Card
          key={card.number}
          card={card}
          index={i}
          total={projectCards.length}
          progress={scrollYProgress}
        />
      ))}
    </section>
  );
}
