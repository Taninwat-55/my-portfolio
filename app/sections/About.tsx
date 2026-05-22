"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { siteContent } from "../data";

const CHAPTERS = [
  { label: "Sweden" },
  { label: "England" },
  { label: "Uppsala" },
  { label: "Denmark" },
  { label: "Trailr AI" },
  { label: "Copenhagen" },
];

function StoryParagraph({ text }: { text: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="text-lg leading-relaxed text-ink-700"
    >
      {text}
    </motion.p>
  );
}

export function About() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.7", "end 0.3"],
  });

  const lineScaleY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [0, 1]
  );

  // Drive active chapter purely from scroll position — one at a time
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const chapter = Math.min(
      CHAPTERS.length - 1,
      Math.floor(latest * CHAPTERS.length)
    );
    setActiveChapter(chapter);
  });

  return (
    <section id="about" ref={sectionRef} aria-label="About" className="py-24 md:py-36">
      <div className="container mx-auto px-6 max-w-5xl">

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative w-20 h-20 rounded-full overflow-hidden ring-2 ring-clay-200 mb-8"
        >
          <Image
            src="/assets/Ice-in-navy-blazer_cleanup.webp"
            alt="Taninwat Kaewpankan"
            fill
            className="object-cover object-top"
            sizes="80px"
          />
        </motion.div>

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium text-clay-500 tracking-widest uppercase mb-16"
        >
          The story
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-[160px_1fr] gap-12 lg:gap-20">

          {/* LEFT: sticky timeline */}
          <div className="hidden lg:block">
            <div className="sticky top-1/3 flex flex-col items-center">
              <div className="relative flex flex-col items-center gap-0">

                {/* Background track */}
                <div className="absolute top-3 bottom-3 w-px bg-thread" aria-hidden />

                {/* Animated fill */}
                <motion.div
                  aria-hidden
                  style={{ scaleY: lineScaleY, originY: 0 }}
                  className="absolute top-3 bottom-3 w-px bg-clay-500"
                />

                {CHAPTERS.map((chapter, i) => {
                  const isActive = i <= activeChapter;
                  return (
                    <div key={chapter.label} className="relative flex items-center gap-3 py-6">
                      <motion.div
                        animate={{
                          backgroundColor: isActive ? "#C4713E" : "#D4CFC9",
                          scale: isActive ? 1.2 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                        className="relative z-10 w-2.5 h-2.5 rounded-full flex-shrink-0"
                      />
                      <motion.span
                        animate={{ color: isActive ? "#C4713E" : "#9E9892" }}
                        transition={{ duration: 0.3 }}
                        className="text-xs font-medium whitespace-nowrap"
                      >
                        {chapter.label}
                      </motion.span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: story paragraphs */}
          <div className="flex flex-col gap-6">
            {siteContent.aboutStory.map((paragraph, i) => (
              <StoryParagraph key={i} text={paragraph} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
