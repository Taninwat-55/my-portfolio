"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { FadeIn } from "../components/FadeIn";
import { LiveProjectButton } from "../components/LiveProjectButton";
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

        {/* Image grid */}
        <div className="grid grid-cols-[2fr_3fr] gap-3 sm:gap-4">
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
          <div className={`group relative overflow-hidden ${cardRadius}`}>
            <Image
              src={card.images[2]}
              alt={`${card.title} screenshot 3`}
              fill
              sizes="(max-width: 768px) 60vw, 690px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
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
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-12 sm:mb-16 md:mb-20"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Projects
        </h2>
      </FadeIn>

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
