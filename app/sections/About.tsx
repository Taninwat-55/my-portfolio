"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FadeIn } from "../components/FadeIn";
import { AnimatedText } from "../components/AnimatedText";
import { siteContent } from "../data";

// Clustered as a loose still-life on one side — overlapping, staggered,
// each object drifting on its own rhythm. Positioned within the cluster column.
const FLOATING_OBJECTS = [
  {
    src: "/assets/about/laptop.webp",
    alt: "3D laptop icon",
    className: "absolute top-[10%] left-[12%] w-40 sm:w-52 md:w-60 z-20",
    delay: 0.18,
    x: 40,
    rotate: -7,
    floatY: 22,
    floatDur: 7.5,
  },
  {
    src: "/assets/about/compass.webp",
    alt: "3D compass icon",
    className: "absolute top-0 right-[6%] w-24 sm:w-32 md:w-40 z-10",
    delay: 0.1,
    x: 60,
    rotate: -12,
    floatY: 16,
    floatDur: 6.5,
  },
  {
    src: "/assets/about/crystal.webp",
    alt: "3D geometric crystal object",
    className: "absolute bottom-[14%] left-[2%] w-20 sm:w-28 md:w-32 z-30",
    delay: 0.3,
    x: -40,
    rotate: 8,
    floatY: 13,
    floatDur: 5.5,
  },
  {
    src: "/assets/about/plant.webp",
    alt: "3D plant group",
    className: "absolute bottom-0 right-[10%] w-32 sm:w-44 md:w-52 z-20",
    delay: 0.25,
    x: 60,
    rotate: -7,
    floatY: 18,
    floatDur: 8,
  },
];

export function About() {
  const [storyOpen, setStoryOpen] = useState(false);

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center px-5 sm:px-8 md:px-10 py-20 bg-night-900"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        {/* Left on desktop, top on mobile: the still-life cluster */}
        <div
          aria-hidden
          className="relative order-first h-72 sm:h-96 lg:h-[32rem]"
        >
          {FLOATING_OBJECTS.map((img) => (
            <div key={img.src} className={img.className}>
              <FadeIn delay={img.delay} x={img.x} y={0} duration={0.9}>
                <motion.div
                  animate={{ y: [0, -img.floatY, 0] }}
                  transition={{
                    duration: img.floatDur,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: img.delay,
                  }}
                  style={{ rotate: img.rotate }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={420}
                    height={420}
                    className="h-auto w-full select-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                    draggable={false}
                  />
                </motion.div>
              </FadeIn>
            </div>
          ))}
        </div>

        {/* Right on desktop, below cluster on mobile: the text column */}
        <div className="flex flex-col items-start gap-8 sm:gap-10">
          <FadeIn delay={0} y={40}>
            <h2
              className="hero-heading text-left font-black uppercase leading-none tracking-tight"
              style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
            >
              About me
            </h2>
          </FadeIn>

          <AnimatedText
            text={siteContent.aboutAnimated}
            className="text-frost font-medium text-left leading-relaxed max-w-xl"
            style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }}
          />

          {/* The full story — expandable */}
          <FadeIn delay={0.1} y={20} className="w-full flex flex-col items-start">
            <button
              type="button"
              onClick={() => setStoryOpen((v) => !v)}
              aria-expanded={storyOpen}
              className="inline-flex items-center gap-2.5 rounded-full border border-frost/30 text-frost/80 font-medium uppercase tracking-widest px-7 py-3 text-xs sm:text-sm hover:border-frost/60 hover:text-frost hover:bg-white/3 transition-colors duration-200"
            >
              {storyOpen ? "Close the story" : "Read my story"}
              <ChevronDown
                size={15}
                strokeWidth={1.5}
                className={`transition-transform duration-300 ${storyOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence initial={false}>
              {storyOpen && (
                <motion.div
                  key="story"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                  className="overflow-hidden w-full"
                >
                  <div className="max-w-2xl pt-12 sm:pt-14 text-left">
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
                    <div className="mt-10 text-frost/40 text-sm font-light italic">
                      — Ice
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
