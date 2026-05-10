"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
  const handleStartJourney = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("journey");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      aria-label="Hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Layer 1: subtle ice-blue grid, masked to fade at edges */}
      <div aria-hidden className="absolute inset-0 bg-grid-ice mask-radial-fade" />

      {/* Layer 2: ambient glow — top-right ice halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] w-[680px] h-[680px] rounded-full bg-ice-500/10 blur-[120px]"
      />
      {/* Layer 3: ambient glow — bottom-left subtle counterweight */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 w-[520px] h-[520px] rounded-full bg-ice-700/10 blur-[120px]"
      />

      {/* Layer 4: tiny accent particles (decorative) */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Particle className="top-[18%] left-[12%]" delay={0} />
        <Particle className="top-[32%] right-[16%]" delay={0.6} />
        <Particle className="top-[64%] left-[22%]" delay={1.2} />
        <Particle className="bottom-[18%] right-[10%]" delay={1.8} />
        <Particle className="top-[48%] left-[58%]" delay={2.4} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 max-w-4xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
          }}
          className="flex flex-col items-start"
        >
          {/* Creator Badge & Availability */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mb-10">
            <div className="relative h-16 w-16 overflow-hidden rounded-full border border-white/10 bg-charcoal-900 shrink-0">
              <Image
                src="/assets/Ice-img.webp"
                alt={personalInfo.name}
                fill
                sizes="64px"
                className="object-cover"
                priority
              />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-ice-400/20 bg-ice-400/5 text-ice-200 text-xs font-mono tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ice-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-ice-400" />
              </span>
              {siteContent.availability}
            </div>
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
            className="text-lg md:text-xl text-charcoal-300 max-w-2xl leading-relaxed mb-12"
          >
            {siteContent.heroSubtitle}
          </motion.p>

          {/* CTA — Start the Journey */}
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
      </div>

      {/* Scroll hint at bottom of viewport */}
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

function Particle({
  className = "",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      className={`absolute h-1 w-1 rounded-full bg-ice-300 shadow-[0_0_12px_2px_rgba(147,216,249,0.6)] ${className}`}
      animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
      transition={{ duration: 4, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}
