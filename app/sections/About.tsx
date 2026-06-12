"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FadeIn } from "../components/FadeIn";
import { AnimatedText } from "../components/AnimatedText";
import { ContactButton } from "../components/ContactButton";
import { siteContent } from "../data";

const CORNER_IMAGES = [
  {
    src: "/assets/about/compass.webp",
    alt: "3D compass icon",
    className:
      "absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-30 sm:w-40 md:w-52.5",
    delay: 0.1,
    x: -80,
  },
  {
    src: "/assets/about/crystal.webp",
    alt: "3D geometric crystal object",
    className:
      "absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-25 sm:w-35 md:w-45",
    delay: 0.25,
    x: -80,
  },
  {
    src: "/assets/about/laptop.webp",
    alt: "3D laptop icon",
    className:
      "absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-30 sm:w-40 md:w-52.5",
    delay: 0.15,
    x: 80,
  },
  {
    src: "/assets/about/plant.webp",
    alt: "3D plant group",
    className:
      "absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-32.5 sm:w-42.5 md:w-55",
    delay: 0.3,
    x: 80,
  },
];

export function About() {
  const [storyOpen, setStoryOpen] = useState(false);

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center px-5 sm:px-8 md:px-10 py-20 bg-night-900"
    >
      {/* Decorative corner objects */}
      {CORNER_IMAGES.map((img) => (
        <div key={img.src} className={img.className} aria-hidden>
          <FadeIn delay={img.delay} x={img.x} y={0} duration={0.9}>
            <Image
              src={img.src}
              alt={img.alt}
              width={420}
              height={420}
              className="w-full h-auto select-none"
              draggable={false}
            />
          </FadeIn>
        </div>
      ))}

      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16 w-full">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
          >
            About me
          </h2>
        </FadeIn>

        <AnimatedText
          text={siteContent.aboutAnimated}
          className="text-frost font-medium text-center leading-relaxed max-w-140"
          style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }}
        />

        {/* The full story — expandable */}
        <FadeIn delay={0.1} y={20} className="w-full flex flex-col items-center">
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
                <div className="max-w-2xl mx-auto pt-12 sm:pt-14 text-left">
                  <div className="text-clay-500 text-[10px] tracking-[0.3em] uppercase mb-8">
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

        <div className="mt-2 sm:mt-4">
          <ContactButton />
        </div>
      </div>
    </section>
  );
}
