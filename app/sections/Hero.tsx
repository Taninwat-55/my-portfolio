"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDown, Linkedin, Mail } from "lucide-react";
import { personalInfo, siteContent } from "../data";
import { Magnetic } from "../components/Magnetic";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const { scrollY } = useScroll();

  const contentOpacity = useTransform(
    scrollY,
    [0, 400],
    prefersReducedMotion ? [1, 1] : [1, 0]
  );
  const contentY = useTransform(
    scrollY,
    [0, 400],
    prefersReducedMotion ? [0, 0] : [0, -40]
  );

  const handleScrollDown = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const taglineParts = ["Engineer", "Builder", "Thinker"];

  return (
    <section aria-label="Hero" className="relative min-h-screen flex items-center">
      <div className="relative z-10 w-full container mx-auto px-6 max-w-5xl">
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
          }}
          className="flex flex-col items-start"
        >
          {/* Availability */}
          <motion.div variants={fadeUp} className="flex items-center gap-2.5 mb-12">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-clay-500 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-clay-500" />
            </span>
            <span className="text-sm text-ink-500">{siteContent.availability}</span>
          </motion.div>

          {/* Name */}
          <motion.p
            variants={fadeUp}
            className="text-sm font-medium text-ink-400 tracking-widest uppercase mb-4"
          >
            {siteContent.heroIntro}
          </motion.p>

          {/* Tagline */}
          <motion.h1
            variants={fadeUp}
            className="font-sans text-6xl md:text-8xl font-extrabold tracking-tight leading-none text-ink-900 mb-6"
          >
            {taglineParts.map((word, i) => (
              <span key={word}>
                {word}
                <span className="text-clay-500">.</span>
                {i < taglineParts.length - 1 && " "}
              </span>
            ))}
          </motion.h1>

          {/* Sub-line */}
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-ink-500 max-w-md leading-relaxed mb-12"
          >
            {siteContent.heroSubtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-clay-500 text-white text-sm font-medium hover:bg-clay-600 transition-colors"
              >
                <Mail size={14} />
                Get in touch
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-ink-700 text-sm font-medium hover:border-clay-400 hover:text-clay-500 transition-colors"
              >
                <Linkedin size={14} />
                LinkedIn
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#about"
        onClick={handleScrollDown}
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-ink-300 hover:text-ink-500 transition-colors"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={15} />
        </motion.div>
      </motion.a>
    </section>
  );
}
