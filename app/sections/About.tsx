"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FadeIn } from "../components/FadeIn";
import { AnimatedText } from "../components/AnimatedText";
import { SectionHeading } from "../components/SectionHeading";
import { siteContent } from "../data";

/**
 * The still moment on the page.
 *
 * This used to be a two-column layout with four floating 3D objects drifting on
 * their own timers. They were the last of the old playful aesthetic and 1.44MB
 * of decoration, so the section is now a full-width editorial spread: statement,
 * a rule that draws itself, and the journey facts anchored underneath.
 *
 * Deliberately not scroll-pinned. Projects and CV are both pinned already, and a
 * third would make the page read as one trick repeated.
 */
export function About() {
  const [storyOpen, setStoryOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="relative bg-night-900 px-5 sm:px-8 md:px-10 py-24 sm:py-32 md:py-40"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Who I Am"
          title="About me"
          align="left"
          titleSize="clamp(3rem, 10vw, 140px)"
          className="mb-10 sm:mb-14"
        />

        {/* The statement carries the section now that the objects are gone, so it
            is set at a size that can hold the space on its own. */}
        <AnimatedText
          text={siteContent.aboutAnimated}
          className="text-frost font-light text-left leading-[1.5] max-w-3xl"
          style={{ fontSize: "clamp(1.15rem, 2.6vw, 2rem)" }}
        />

        {/* Same rule as the hero, drawn from the left — one motif, two sections. */}
        <motion.div
          aria-hidden
          initial={{ scaleX: reduceMotion ? 1 : 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: reduceMotion ? 0 : 1.1,
            ease: [0.76, 0, 0.24, 1],
          }}
          style={{ originX: 0 }}
          className="mt-14 sm:mt-20 h-0.5 bg-frost/60"
        />

        {/* Journey facts + the way into the long version, anchored under the rule
            the way the hero anchors its detail in the corners. */}
        <div className="mt-7 sm:mt-9 flex flex-col gap-9 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
          <dl className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
            {siteContent.aboutFacts.map((fact, i) => (
              <FadeIn key={fact.label} delay={i * 0.08} y={20}>
                <dt className="text-[10px] uppercase tracking-[0.3em] text-frost/40">
                  {fact.label}
                </dt>
                <dd className="mt-2 text-sm sm:text-[15px] font-light leading-relaxed text-frost/75">
                  {fact.value}
                </dd>
              </FadeIn>
            ))}
          </dl>

          <FadeIn delay={0.24} y={20} className="shrink-0">
            <button
              type="button"
              onClick={() => setStoryOpen((v) => !v)}
              aria-expanded={storyOpen}
              aria-controls="about-story"
              className="inline-flex items-center gap-2.5 rounded-full border border-frost/25 text-frost/80 font-medium uppercase tracking-widest px-6 py-3 text-xs hover:border-frost/60 hover:text-frost hover:bg-white/3 transition-colors duration-200"
            >
              {storyOpen ? "Close the story" : "Read my story"}
              <ChevronDown
                size={15}
                strokeWidth={1.5}
                className={`transition-transform duration-300 ${
                  storyOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </FadeIn>
        </div>

        <AnimatePresence initial={false}>
          {storyOpen && (
            <motion.div
              key="story"
              id="about-story"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="max-w-2xl pt-14 sm:pt-16 text-left">
                <div className="text-crystal-500 text-[10px] tracking-[0.3em] uppercase mb-8">
                  The long version
                </div>
                <div className="space-y-6">
                  {siteContent.aboutStory.map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-frost/75 font-light leading-[1.85] text-[15px] sm:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="mt-10 text-frost/40 font-display italic text-lg">
                  — Ice
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
