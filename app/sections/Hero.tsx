"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDown, Linkedin, Mail } from "lucide-react";
import { personalInfo, siteContent } from "../data";
import { Magnetic } from "../components/Magnetic";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

const BADGES = [
  { label: "Ships end-to-end", top: "8%",  left: "-52%", delay: 0 },
  { label: "0 → 1 Builder",    top: "32%", left: "-52%", delay: 0.6 },
  { label: "Equity Partner",   top: "62%", left: "-50%", delay: 1.1 },
  { label: "Copenhagen, DK",   top: "84%", left: "-44%", delay: 0.3 },
  { label: "Product-sharp",    top: "16%", right: "-50%", delay: 0.9 },
  { label: "Full-stack",       top: "50%", right: "-44%", delay: 0.4 },
  { label: "Nordisk Film · DR", top: "78%",right: "-54%", delay: 1.4 },
];

function FloatingBadge({
  label,
  style,
  delay,
  reduced,
}: {
  label: string;
  style: React.CSSProperties;
  delay: number;
  reduced: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8 + delay, duration: 0.5, ease: EASE }}
      className="absolute"
      style={style}
    >
      <motion.div
        animate={reduced ? {} : { y: [0, -5, 0] }}
        transition={{
          duration: 3 + delay * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
        }}
        className="whitespace-nowrap font-mono text-[11px] tracking-wide text-ink-600 bg-sand-50/90 backdrop-blur-sm border border-border px-2.5 py-1 rounded-full shadow-sm"
      >
        {label}
      </motion.div>
    </motion.div>
  );
}

// ── Character — Option B: frosted glass container with glow ───────────────────
function CharacterBubble({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative mx-auto lg:mx-0 shrink-0 mt-10 lg:mt-0">
      {/* Floating badges */}
      {BADGES.map((b) => {
        const { label, delay, top, ...pos } = b;
        return (
          <FloatingBadge
            key={label}
            label={label}
            style={{ top, ...pos } as React.CSSProperties}
            delay={delay}
            reduced={reduced}
          />
        );
      })}

      {/* Glass container */}
      <motion.div
        animate={reduced ? {} : { y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-44 h-[315px] lg:w-60 lg:h-[427px] rounded-3xl overflow-hidden"
        style={{
          background: "#59918A",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.18), " +
            "0 8px 32px rgba(89,145,138,0.50), " +
            "0 0 80px 20px rgba(89,145,138,0.20)",
        }}
      >
        <video
          src="/character.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-label="Animated avatar"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Frosted vignette at edges */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 48%, rgba(247,244,240,0.10) 68%, rgba(247,244,240,0.28) 100%)",
          }}
        />

        {/* Top glass highlight */}
        <div
          className="absolute inset-x-4 top-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.6) 40%, rgba(255,255,255,0.6) 60%, transparent)",
          }}
        />
      </motion.div>
    </div>
  );
}

// ── Marquee ────────────────────────────────────────────────────────────────────
function TechMarquee() {
  const reduced = useReducedMotion() ?? false;
  const items = [...siteContent.techMarquee, ...siteContent.techMarquee];

  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-t border-b border-border py-4"
      style={{
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        maskImage:
          "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
      }}
    >
      <motion.div
        className="flex gap-14 w-max"
        animate={reduced ? {} : { x: ["0%", "-50%"] }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="font-mono text-sm text-ink-300 tracking-wide whitespace-nowrap inline-flex items-center gap-14"
          >
            {item}
            <span className="text-clay-400 text-xs">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────────
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

  return (
    <section aria-label="Hero" className="relative min-h-screen flex flex-col justify-between overflow-hidden">

      {/* Main content */}
      <div className="relative z-10 w-full container mx-auto px-6 max-w-5xl flex-1 flex flex-col justify-center py-24">
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
          }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">

            {/* Left: text */}
            <div className="flex-1 flex flex-col items-start">

              <motion.div variants={fadeUp} className="flex items-center gap-2.5 mb-10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-clay-500 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-clay-500" />
                </span>
                <span className="text-sm text-ink-500">{siteContent.availability}</span>
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="text-sm font-medium text-ink-400 tracking-widest uppercase mb-2"
              >
                {siteContent.heroIntro}
              </motion.p>

              <motion.h1
                variants={fadeUp}
                className="font-sans text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] text-ink-900 mb-5 max-w-xl"
              >
                {siteContent.heroHook.map((line, li) => (
                  <span key={li} className="block">
                    {line.split(" ").map((word, wi) => (
                      <span
                        key={wi}
                        className={siteContent.heroHookAccents.has(word) ? "text-clay-500" : undefined}
                      >
                        {word}{" "}
                      </span>
                    ))}
                  </span>
                ))}
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-base md:text-lg text-ink-500 max-w-sm leading-relaxed mb-12"
              >
                {siteContent.heroPhilosophy}
              </motion.p>

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
            </div>

            {/* Right: character with floating badges */}
            <motion.div variants={fadeUp}>
              <CharacterBubble reduced={prefersReducedMotion} />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Marquee strip */}
      <div className="relative z-10 w-full">
        <TechMarquee />
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#about"
        onClick={handleScrollDown}
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-ink-300 hover:text-ink-500 transition-colors"
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
