"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Compass,
  Code2,
  type LucideIcon,
} from "lucide-react";

// ─── Class definitions ──────────────────────────────────────────────────────

type ClassId = "designer" | "strategist" | "builder";

type SubSkill = {
  name: string;
  level: string; // RPG-style level descriptor
  highlight: string; // 1-sentence context
};

type ClassDef = {
  id: ClassId;
  title: string;
  tagline: string;
  icon: LucideIcon;
  color: string; // muted hex (also lives in globals.css)
  glow: string; // rgba for tinted backgrounds
  subskills: SubSkill[];
};

const CLASSES: ClassDef[] = [
  {
    id: "designer",
    title: "Designer",
    tagline: "Engineering the Experience",
    icon: Layers,
    color: "#a899d4",
    glow: "rgba(168, 153, 212, 0.18)",
    subskills: [
      {
        name: "Figma & Prototyping",
        level: "Advanced",
        highlight:
          "Building interactive prototypes in Figma that accurately mirror technical constraints and state logic.",
      },
      {
        name: "Systemic Design",
        level: "Architecture",
        highlight:
          "Creating scalable, themeable component libraries that maintain visual consistency across large platforms.",
      },
      {
        name: "A11y Compliance",
        level: "WCAG 2.1",
        highlight:
          "Ensuring every component is semantically correct, keyboard-navigable, and screen-reader friendly.",
      },
      {
        name: "Motion Engineering",
        level: "Framer Motion",
        highlight:
          "Crafting tactile, fluid transitions that improve user engagement and provide clear feedback.",
      },
      {
        name: "Tailwind CSS",
        level: "Variable-based",
        highlight:
          "Using modern Tailwind patterns and CSS variables to build flexible, high-performance design systems.",
      },
    ],
  },
  {
    id: "strategist",
    title: "Strategist",
    tagline: "Products, people, and the decisions in between",
    icon: Compass,
    color: "#d8b06b",
    glow: "rgba(216, 176, 107, 0.18)",
    subskills: [
      {
        name: "Product Discovery",
        level: "Business MSc",
        highlight:
          "Validating ideas through market research and user interviews before writing a single line of code.",
      },
      {
        name: "Technical Scoping",
        level: "Roadmap Planning",
        highlight:
          "Translating ambiguous product goals into clear technical requirements and realistic sprint targets.",
      },
      {
        name: "Agile Alignment",
        level: "Cross-functional",
        highlight:
          "Bridging the gap between design, product, and engineering to ensure 100% delivery success.",
      },
      {
        name: "Team & Org Leadership",
        level: "Millennial Consulting",
        highlight:
          "Led Millennial Consulting as Head of Organization — managing people, delivery timelines, and cross-functional communication with no formal playbook.",
      },
      {
        name: "Budget & Stakeholder Comms",
        level: "Org-wide",
        highlight:
          "Owned budget decisions and resource allocation across simultaneous consulting projects, and communicated trade-offs clearly to non-technical stakeholders.",
      },
    ],
  },
  {
    id: "builder",
    title: "Builder",
    tagline: "Turning ideas into reality",
    icon: Code2,
    color: "#79bea1",
    glow: "rgba(121, 190, 161, 0.18)",
    subskills: [
      {
        name: "React 19 & Next.js",
        level: "App Router",
        highlight:
          "Shipping with the React Compiler and Server Components for zero-bundle client logic.",
      },
      {
        name: "TypeScript",
        level: "Type-Safe APIs",
        highlight:
          "Implementing end-to-end type safety between frontend, backend, and database layers.",
      },
      {
        name: "Testing (Vitest)",
        level: "Unit Testing",
        highlight:
          "Writing unit test suites that validate core logic — price conversion, state flows, and API adapter behaviour — so refactors don't break what's already working.",
      },
      {
        name: "Supabase & PostgreSQL",
        level: "Row-Level Security",
        highlight:
          "Designing multi-role schemas and writing RLS policies that enforce data isolation at the database layer — not the application layer.",
      },
      {
        name: "State Management",
        level: "Zustand",
        highlight:
          "Architecting high-performance, predictable state flows without the boilerplate of Redux.",
      },
      {
        name: "CI/CD Pipelines",
        level: "GitHub Actions",
        highlight:
          "Automating builds, linting, and deployments to ensure every commit is production-ready.",
      },
    ],
  },
];

// ─── Section ────────────────────────────────────────────────────────────────

export function SkillTree() {
  const [hovered, setHovered] = useState<ClassId | null>(null);
  const [mobileActive, setMobileActive] = useState<ClassId | null>("designer");

  return (
    <section
      id="journey"
      aria-label="Skill Tree — Three Classes"
      className="relative py-32 md:py-40 border-t border-white/5 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] rounded-[100%] bg-white/[0.02] blur-[120px]"
      />

      <div className="container relative z-10 mx-auto px-6 max-w-6xl">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="max-w-2xl mb-14"
        >
          <motion.div
            variants={fadeUp}
            className="font-mono text-[11px] tracking-[0.3em] uppercase text-ice-400 mb-5"
          >
            02 / Identity — Skill Tree
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-zinc-50 mb-5"
          >
            Three classes,{" "}
            <span className="bg-gradient-to-r from-ice-200 via-ice-300 to-ice-500 bg-clip-text text-transparent">
              one party of one.
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg text-charcoal-300 leading-relaxed"
          >
            Hover over a discipline to explore the specific technical and
            strategic skills I bring to a product team.
          </motion.p>
        </motion.div>

        {/* ─── Desktop layout: Horizontal Accordion ───────────────────── */}
        <div className="hidden md:flex h-[520px] gap-4">
          {CLASSES.map((cls) => {
            const isHovered = hovered === cls.id;
            const isDimmed = hovered !== null && hovered !== cls.id;

            return (
              <motion.div
                key={cls.id}
                layout
                onMouseEnter={() => setHovered(cls.id)}
                onMouseLeave={() => setHovered(null)}
                // Animation logic for flex-grow
                initial={{ flex: 1 }}
                animate={{
                  flex: isHovered ? 2.5 : isDimmed ? 0.75 : 1,
                  opacity: isDimmed ? 0.6 : 1,
                }}
                transition={{ type: "spring", stiffness: 220, damping: 28 }}
                className="relative rounded-3xl overflow-hidden border border-white/10 flex flex-col group cursor-crosshair bg-charcoal-900/40 backdrop-blur-md shadow-2xl"
              >
                {/* Dynamic gradient overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${cls.glow}, transparent 70%)`,
                  }}
                />

                <div className="relative z-10 flex flex-col h-full p-8">
                  {/* Top: Icon & Title */}
                  <div className="flex items-center gap-5 mb-6 whitespace-nowrap">
                    <div
                      className="w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center border transition-colors duration-500"
                      style={{
                        borderColor: isHovered ? cls.color : `${cls.color}40`,
                        background: isHovered ? cls.glow : "rgba(20,22,26,0.5)",
                      }}
                    >
                      <cls.icon size={26} strokeWidth={1.5} style={{ color: cls.color }} />
                    </div>
                    <div className="min-w-0">
                      <h3
                        className="font-mono text-[13px] tracking-[0.25em] uppercase mb-1 truncate"
                        style={{ color: cls.color }}
                      >
                        {cls.title}
                      </h3>
                      <p className="text-zinc-200 font-medium text-lg truncate">
                        {cls.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Main Tech Stack / Overview - Always Visible */}
                  <motion.div layout className="flex flex-wrap gap-2.5 mb-8">
                    {cls.subskills.map((skill) => (
                      <span
                        key={skill.name}
                        className="px-3 py-1.5 rounded-full font-mono text-[10px] tracking-wider uppercase border whitespace-nowrap transition-colors duration-300"
                        style={{
                          borderColor: isHovered ? `${cls.color}50` : `${cls.color}25`,
                          background: isHovered ? `${cls.color}15` : "transparent",
                          color: isHovered ? "#fff" : cls.color,
                        }}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </motion.div>

                  {/* Expanded Content - Detailed Bento cards */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, filter: "blur(4px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, filter: "blur(4px)" }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="grid grid-cols-2 gap-4 flex-1 content-start mt-auto"
                      >
                        {cls.subskills.map((skill, i) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.15 + i * 0.05 }}
                            className="bg-charcoal-950/60 border border-white/5 rounded-2xl p-5 flex flex-col gap-3 hover:bg-white/[0.03] transition-colors"
                          >
                            <div className="flex justify-between items-start gap-4">
                              <span className="font-sans font-semibold text-[15px] text-zinc-100">
                                {skill.name}
                              </span>
                              <span
                                className="font-mono text-[9px] uppercase tracking-wider text-right shrink-0"
                                style={{ color: cls.color }}
                              >
                                {skill.level}
                              </span>
                            </div>
                            <p className="text-[13px] text-charcoal-300 leading-relaxed">
                              {skill.highlight}
                            </p>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ─── Mobile layout: Vertical Stack ────────────────────────────── */}
        <div className="md:hidden space-y-4">
          {CLASSES.map((cls) => {
            const isActive = mobileActive === cls.id;

            return (
              <div
                key={cls.id}
                className="relative rounded-3xl overflow-hidden border border-white/10 bg-charcoal-900/40 backdrop-blur-md"
              >
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                  style={{
                    opacity: isActive ? 1 : 0,
                    background: `radial-gradient(ellipse at 50% 0%, ${cls.glow}, transparent 70%)`,
                  }}
                />

                <button
                  type="button"
                  onClick={() => setMobileActive(isActive ? null : cls.id)}
                  className="relative z-10 w-full flex items-center justify-between p-6 focus:outline-none"
                >
                  <div className="flex items-center gap-4 text-left">
                    <div
                      className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center border"
                      style={{
                        borderColor: isActive ? cls.color : `${cls.color}40`,
                        background: isActive ? cls.glow : "rgba(20,22,26,0.5)",
                      }}
                    >
                      <cls.icon size={22} strokeWidth={1.5} style={{ color: cls.color }} />
                    </div>
                    <div>
                      <h3
                        className="font-mono text-[11px] tracking-[0.2em] uppercase mb-1"
                        style={{ color: cls.color }}
                      >
                        {cls.title}
                      </h3>
                      <p className="text-zinc-100 font-medium text-[15px]">
                        {cls.tagline}
                      </p>
                    </div>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="overflow-hidden relative z-10"
                    >
                      <div className="px-6 pb-6 space-y-3">
                        {cls.subskills.map((skill) => (
                          <div
                            key={skill.name}
                            className="bg-charcoal-950/60 border border-white/5 rounded-2xl p-4 flex flex-col gap-2"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <span className="font-sans font-semibold text-[14px] text-zinc-100">
                                {skill.name}
                              </span>
                              <span
                                className="font-mono text-[9px] uppercase tracking-wider shrink-0"
                                style={{ color: cls.color }}
                              >
                                {skill.level}
                              </span>
                            </div>
                            <p className="text-[13px] text-charcoal-300 leading-relaxed">
                              {skill.highlight}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Subskills Preview (only visible when not active) */}
                <AnimatePresence>
                  {!isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="px-6 pb-6 pt-0"
                    >
                      <div className="flex flex-wrap gap-2">
                        {cls.subskills.map((skill) => (
                          <span
                            key={skill.name}
                            className="px-2.5 py-1 rounded-full font-mono text-[9px] tracking-wider uppercase border"
                            style={{
                              borderColor: `${cls.color}25`,
                              color: cls.color,
                            }}
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Shared ─────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};
