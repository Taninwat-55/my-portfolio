"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { personalInfo, siteContent } from "../data";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const { scrollY } = useScroll();

  const portraitY = useTransform(
    scrollY,
    [0, 600],
    prefersReducedMotion ? [0, 0] : [0, -60]
  );
  const portraitOpacity = useTransform(
    scrollY,
    [0, 500],
    prefersReducedMotion ? [1, 1] : [1, 0]
  );
  const glowY = useTransform(
    scrollY,
    [0, 600],
    prefersReducedMotion ? [0, 0] : [0, 30]
  );
  const textOpacity = useTransform(
    scrollY,
    [0, 400],
    prefersReducedMotion ? [1, 1] : [1, 0]
  );

  const handleStartJourney = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("journey");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      aria-label="Hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background: subtle ice-blue grid */}
      <div aria-hidden className="absolute inset-0 bg-grid-ice mask-radial-fade" />

      {/* Background: ambient glow — top-right */}
      <motion.div
        aria-hidden
        style={{ y: glowY }}
        className="pointer-events-none absolute -top-40 right-[-10%] w-[680px] h-[680px] rounded-full bg-ice-500/10 blur-[120px]"
      />
      {/* Background: ambient glow — bottom-left */}
      <motion.div
        aria-hidden
        style={{ y: glowY }}
        className="pointer-events-none absolute -bottom-32 -left-32 w-[520px] h-[520px] rounded-full bg-ice-700/10 blur-[120px]"
      />

      {/* Two-column layout */}
      <div className="relative z-10 w-full container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center min-h-screen pt-16">

          {/* LEFT: text content */}
          <motion.div
            style={{ opacity: textOpacity }}
            className="w-full md:w-[55%] flex flex-col z-10 order-2 md:order-1 py-12 md:py-0"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
              }}
              className="flex flex-col items-start"
            >
              {/* Availability badge */}
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-ice-400/20 bg-ice-400/5 text-ice-200 text-xs font-mono tracking-wide mb-10"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ice-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-ice-400" />
                </span>
                {siteContent.availability}
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                className="font-sans text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05] text-zinc-50 mb-6"
              >
                {siteContent.heroIntro}
                <br />
                <span className="text-charcoal-300 font-normal">I </span>
                <span className="bg-gradient-to-r from-ice-200 via-ice-300 to-ice-500 bg-clip-text text-transparent">
                  make product decisions
                </span>
                <span className="text-charcoal-300 font-normal"> — then </span>
                <span className="text-zinc-50">build the thing myself.</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeUp}
                className="text-lg md:text-xl text-charcoal-300 max-w-xl leading-relaxed mb-12"
              >
                {siteContent.heroSubtitle}
              </motion.p>

              {/* CTA */}
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-5">
                <a
                  href="#journey"
                  onClick={handleStartJourney}
                  className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-ice-400 text-charcoal-950 font-medium text-sm tracking-wide hover:bg-ice-300 transition-all shadow-[0_0_0_0_rgba(103,200,245,0)] hover:shadow-[0_0_40px_-4px_rgba(103,200,245,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ice-300 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-950"
                >
                  Start the Journey
                  <ArrowDown
                    size={16}
                    className="transition-transform group-hover:translate-y-0.5"
                  />
                </a>

                <div className="flex items-center gap-5 text-charcoal-300">
                  <a
                    href={personalInfo.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="hover:text-ice-300 transition-colors"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href={personalInfo.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="hover:text-ice-300 transition-colors"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    aria-label="Email"
                    className="hover:text-ice-300 transition-colors"
                  >
                    <Mail size={20} />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* RIGHT: portrait */}
          <div className="w-full md:w-[45%] relative flex justify-center md:justify-end items-end order-1 md:order-2 h-[45vh] md:h-screen shrink-0">
            <motion.div
              style={{ y: portraitY, opacity: portraitOpacity }}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              className="relative w-full h-full"
            >
              <Image
                src="/assets/Ice-in-navy-blazer_cleanup.webp"
                alt="Taninwat Kaewpankan — Frontend Developer and Product Engineer"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-contain object-bottom"
                style={{
                  filter:
                    "drop-shadow(0 0 60px rgba(103, 200, 245, 0.25)) drop-shadow(0 0 20px rgba(103, 200, 245, 0.1))",
                }}
                priority
              />
            </motion.div>
          </div>

        </div>
      </div>

      {/* Bottom fade into next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-charcoal-950"
      />

      {/* Scroll hint */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-400 font-mono text-[10px] tracking-[0.2em] uppercase"
      >
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block h-8 w-px bg-gradient-to-b from-charcoal-400 to-transparent"
        />
      </motion.div>
    </section>
  );
}
