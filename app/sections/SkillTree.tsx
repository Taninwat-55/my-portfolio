"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Compass,
  Code2,
  Lock,
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
  /** x position on the 0–100 canvas, used for both HTML positioning and SVG */
  x: number;
  subskills: SubSkill[];
};

const CLASSES: ClassDef[] = [
  {
    id: "designer",
    title: "Designer",
    tagline: "Creating immersive experiences",
    icon: Layers,
    color: "#a899d4",
    glow: "rgba(168, 153, 212, 0.18)",
    x: 18,
    subskills: [
      {
        name: "Game Design",
        level: "BA · Uppsala 2019—22",
        highlight:
          "Trained in engagement loops, system design, and interactive narrative — applies directly to product UX.",
      },
      {
        name: "Interaction",
        level: "Daily driver",
        highlight:
          "I design state transitions and micro-interactions before I write the component.",
      },
      {
        name: "Motion",
        level: "Framer Motion",
        highlight:
          "Scroll-linked animations, layoutId pills, and SVG path draws — used across this site.",
      },
      {
        name: "Accessibility",
        level: "WCAG-conscious",
        highlight:
          "ARIA labels, focus rings, and semantic structure baked in from the first commit.",
      },
    ],
  },
  {
    id: "strategist",
    title: "Strategist",
    tagline: "Solving business problems",
    icon: Compass,
    color: "#d8b06b",
    glow: "rgba(216, 176, 107, 0.18)",
    x: 50,
    subskills: [
      {
        name: "MSc Business",
        level: "Uppsala · 2022—23",
        highlight:
          "Specialized in entrepreneurship — unit economics, market sizing, GTM strategy.",
      },
      {
        name: "Discovery",
        level: "User interviews",
        highlight:
          "Run interviews and synthesize patterns into shippable scope, not feature lists.",
      },
      {
        name: "Stakeholders",
        level: "Cross-functional",
        highlight:
          "Bridged design, eng, and business at Trailr.ai during a complete platform overhaul.",
      },
      {
        name: "Prioritization",
        level: "Tradeoff thinking",
        highlight:
          "Helped scope the Trailr.ai MVP — kept the value, dropped the weight.",
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
    x: 82,
    subskills: [
      {
        name: "React / Next.js",
        level: "Production",
        highlight:
          "Shipped Bevisly SaaS, the Trailr.ai overhaul, and this site — App Router, RSC, the whole stack.",
      },
      {
        name: "TypeScript",
        level: "Strict mode",
        highlight:
          "Type-safe API boundaries everywhere. I refuse to write JS for anything beyond a script.",
      },
      {
        name: "Tailwind v4",
        level: "Native @theme",
        highlight:
          "Custom token scales and an @theme-based design system. No CSS-in-JS, no runtime cost.",
      },
      {
        name: "Performance",
        level: "95+ Lighthouse",
        highlight:
          "Achieved on Racha Beauty & Wellness — image optimization, font subsetting, route prefetch.",
      },
    ],
  },
];

// 4 evenly-spaced sub-skill slot positions across the canvas width
const SUBSKILL_X = [12.5, 37.5, 62.5, 87.5];

// Y positions on the 0–100 canvas
const CLASS_Y = 22;
const SUB_Y = 78;

// ─── Section ────────────────────────────────────────────────────────────────

export function SkillTree() {
  const [active, setActive] = useState<ClassId | null>(null);
  const [hovered, setHovered] = useState<ClassId | null>(null);

  const focused = active ?? hovered;
  const focusedClass = focused ? CLASSES.find((c) => c.id === focused)! : null;
  const activeClass = active ? CLASSES.find((c) => c.id === active)! : null;

  return (
    <section
      id="journey"
      aria-label="Skill Tree — Three Classes"
      className="relative py-32 md:py-40 border-t border-white/5"
    >
      <div className="container mx-auto px-6 max-w-6xl">
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
            Click a class to unlock its branch. Hover sub-skills for level and
            context. The mood shifts when you play.
          </motion.p>
        </motion.div>

        {/* ─── Desktop tree canvas ─────────────────────────────────────── */}
        <div className="hidden md:block">
          <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-white/5 bg-charcoal-900/30">
            {/* Background tint — cross-fades on focus change */}
            <AnimatePresence mode="sync">
              {focusedClass && (
                <motion.div
                  key={focusedClass.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse 80% 60% at 50% 35%, ${focusedClass.glow}, transparent 70%)`,
                  }}
                />
              )}
            </AnimatePresence>

            {/* Decorative grid */}
            <div className="absolute inset-0 bg-grid-ice mask-radial-fade opacity-25 pointer-events-none" />

            {/* SVG branch lines layer */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              <AnimatePresence mode="wait">
                {activeClass && (
                  <BranchLines key={activeClass.id} cls={activeClass} />
                )}
              </AnimatePresence>
            </svg>

            {/* Class nodes */}
            {CLASSES.map((cls) => (
              <ClassNode
                key={cls.id}
                cls={cls}
                isActive={active === cls.id}
                isDimmed={!!active && active !== cls.id}
                onSelect={() =>
                  setActive((prev) => (prev === cls.id ? null : cls.id))
                }
                onHover={(state) => setHovered(state ? cls.id : null)}
              />
            ))}

            {/* Sub-skill row — actual skills (when active) or ghosts (when idle) */}
            {activeClass ? (
              <AnimatePresence mode="wait">
                <SubSkillRow key={activeClass.id} cls={activeClass} />
              </AnimatePresence>
            ) : (
              <GhostSkillRow />
            )}

            {/* Idle hint */}
            <AnimatePresence>
              {!active && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.25em] uppercase text-charcoal-500 flex items-center gap-2"
                >
                  <Lock size={10} />
                  Click a class to unlock the tree
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ─── Mobile stacked layout ──────────────────────────────────── */}
        <div className="md:hidden">
          <MobileTree
            active={active}
            onSelect={(id) =>
              setActive((prev) => (prev === id ? null : id))
            }
          />
        </div>
      </div>
    </section>
  );
}

// ─── Class node (desktop) ───────────────────────────────────────────────────

function ClassNode({
  cls,
  isActive,
  isDimmed,
  onSelect,
  onHover,
}: {
  cls: ClassDef;
  isActive: boolean;
  isDimmed: boolean;
  onSelect: () => void;
  onHover: (state: boolean) => void;
}) {
  const Icon = cls.icon;
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onFocus={() => onHover(true)}
      onBlur={() => onHover(false)}
      aria-expanded={isActive}
      aria-label={`${cls.title} — ${cls.tagline}`}
      animate={{
        opacity: isDimmed ? 0.32 : 1,
        scale: isActive ? 1.06 : 1,
      }}
      whileHover={{ scale: isActive ? 1.06 : 1.04 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
      style={{ top: `${CLASS_Y}%`, left: `${cls.x}%` }}
    >
      {/* Pulse ring (idle only) */}
      {!isActive && (
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full border"
          style={{ borderColor: cls.color, opacity: 0.5 }}
          animate={{ scale: [1, 1.18], opacity: [0.45, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        />
      )}

      <div
        className="relative w-28 h-28 lg:w-32 lg:h-32 rounded-full flex flex-col items-center justify-center gap-1.5 border-2 backdrop-blur-sm transition-colors duration-300 group-focus-visible:ring-2 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-charcoal-950"
        style={{
          borderColor: isActive ? cls.color : "rgba(255,255,255,0.10)",
          background: isActive
            ? `radial-gradient(circle at center, ${cls.glow}, rgba(20,22,26,0.7))`
            : "rgba(20,22,26,0.55)",
        }}
      >
        <Icon size={26} strokeWidth={1.6} style={{ color: cls.color }} />
        <div
          className="font-mono text-[10px] tracking-[0.22em] uppercase"
          style={{ color: cls.color }}
        >
          {cls.title}
        </div>
      </div>

      {/* Tagline below the node */}
      <div className="mt-3 max-w-[10rem] mx-auto text-center text-[11px] text-charcoal-300 leading-snug">
        {cls.tagline}
      </div>
    </motion.button>
  );
}

// ─── Branch lines (desktop) ─────────────────────────────────────────────────

function BranchLines({ cls }: { cls: ClassDef }) {
  // Class node bottom edge in canvas coords (radius ~ 8 units of 100)
  const startY = CLASS_Y + 9;
  const endY = SUB_Y - 9;

  return (
    <>
      {SUBSKILL_X.map((sx, i) => {
        const x1 = cls.x;
        const x2 = sx;
        // Cubic bezier — control points pull toward the midpoint vertically
        const cy1 = startY + (endY - startY) * 0.55;
        const cy2 = startY + (endY - startY) * 0.45;
        const d = `M ${x1} ${startY} C ${x1} ${cy1}, ${x2} ${cy2}, ${x2} ${endY}`;
        return (
          <motion.path
            key={`${cls.id}-${i}`}
            d={d}
            stroke={cls.color}
            strokeWidth="0.35"
            strokeOpacity="0.7"
            fill="none"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            exit={{ pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 0.6, delay: i * 0.07, ease: "easeOut" },
              opacity: { duration: 0.3, delay: i * 0.07 },
            }}
          />
        );
      })}
    </>
  );
}

// ─── Sub-skill row (desktop, active) ────────────────────────────────────────

function SubSkillRow({ cls }: { cls: ClassDef }) {
  return (
    <>
      {cls.subskills.map((skill, i) => (
        <SubSkillNode
          key={`${cls.id}-${skill.name}`}
          skill={skill}
          color={cls.color}
          glow={cls.glow}
          x={SUBSKILL_X[i]}
          delay={0.35 + i * 0.08}
        />
      ))}
    </>
  );
}

function SubSkillNode({
  skill,
  color,
  glow,
  x,
  delay,
}: {
  skill: SubSkill;
  color: string;
  glow: string;
  x: number;
  delay: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ top: `${SUB_Y}%`, left: `${x}%` }}
      initial={{ opacity: 0, scale: 0.7, y: -8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.7, y: -8 }}
      transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        aria-label={`${skill.name}. ${skill.level}. ${skill.highlight}`}
        className="px-3.5 py-2 rounded-full border font-mono text-[10px] tracking-[0.18em] uppercase backdrop-blur-sm transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-950"
        style={{
          borderColor: `${color}55`,
          background: glow,
          color,
        }}
      >
        {skill.name}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="tooltip"
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-3.5 rounded-lg border bg-charcoal-900/95 backdrop-blur-md shadow-2xl pointer-events-none z-10"
            style={{ borderColor: `${color}40` }}
          >
            <div
              className="font-mono text-[10px] tracking-[0.18em] uppercase mb-1.5"
              style={{ color }}
            >
              {skill.level}
            </div>
            <div className="text-[12px] text-charcoal-200 leading-relaxed">
              {skill.highlight}
            </div>
            {/* Tooltip arrow */}
            <div
              aria-hidden
              className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-2 h-2 rotate-45 border-r border-b"
              style={{
                borderColor: `${color}40`,
                background: "rgba(20,22,26,0.95)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Ghost sub-skill placeholders (idle) ────────────────────────────────────

function GhostSkillRow() {
  return (
    <>
      {SUBSKILL_X.map((x, i) => (
        <motion.div
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ top: `${SUB_Y}%`, left: `${x}%` }}
          animate={{ opacity: [0.25, 0.5, 0.25] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        >
          <div className="px-3.5 py-2 rounded-full border border-white/10 bg-white/[0.02] font-mono text-[10px] tracking-[0.2em] uppercase text-charcoal-500 inline-flex items-center gap-1.5">
            <Lock size={9} strokeWidth={1.5} />
            Locked
          </div>
        </motion.div>
      ))}
    </>
  );
}

// ─── Mobile tree (stacked accordion) ────────────────────────────────────────

function MobileTree({
  active,
  onSelect,
}: {
  active: ClassId | null;
  onSelect: (id: ClassId) => void;
}) {
  const activeClass = active ? CLASSES.find((c) => c.id === active)! : null;

  return (
    <div className="relative rounded-3xl border border-white/5 bg-charcoal-900/30 overflow-hidden">
      {/* tinted background */}
      <AnimatePresence mode="sync">
        {activeClass && (
          <motion.div
            key={activeClass.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 50% 30%, ${activeClass.glow}, transparent 70%)`,
            }}
          />
        )}
      </AnimatePresence>

      <div className="relative divide-y divide-white/5">
        {CLASSES.map((cls) => {
          const isActive = active === cls.id;
          const Icon = cls.icon;
          return (
            <div key={cls.id}>
              <button
                type="button"
                onClick={() => onSelect(cls.id)}
                aria-expanded={isActive}
                className="w-full flex items-center gap-4 p-5 text-left focus:outline-none focus-visible:bg-white/[0.02]"
              >
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2"
                  style={{
                    borderColor: isActive ? cls.color : "rgba(255,255,255,0.1)",
                    background: isActive ? cls.glow : "rgba(20,22,26,0.55)",
                  }}
                >
                  <Icon size={20} strokeWidth={1.6} style={{ color: cls.color }} />
                </div>
                <div className="flex-1">
                  <div
                    className="font-mono text-[10px] tracking-[0.22em] uppercase mb-0.5"
                    style={{ color: cls.color }}
                  >
                    {cls.title}
                  </div>
                  <div className="text-zinc-100 text-sm font-medium">
                    {cls.tagline}
                  </div>
                </div>
                <div
                  className="font-mono text-[10px] uppercase tracking-wider"
                  style={{ color: isActive ? cls.color : "rgb(82,86,94)" }}
                >
                  {isActive ? "Locked-in" : "Tap"}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 space-y-3">
                      {cls.subskills.map((skill) => (
                        <div
                          key={skill.name}
                          className="rounded-xl border p-3.5"
                          style={{
                            borderColor: `${cls.color}33`,
                            background: cls.glow,
                          }}
                        >
                          <div className="flex items-center justify-between gap-3 mb-1">
                            <span
                              className="font-mono text-[11px] tracking-[0.18em] uppercase"
                              style={{ color: cls.color }}
                            >
                              {skill.name}
                            </span>
                            <span className="font-mono text-[10px] uppercase tracking-wider text-charcoal-400">
                              {skill.level}
                            </span>
                          </div>
                          <div className="text-[13px] text-charcoal-200 leading-relaxed">
                            {skill.highlight}
                          </div>
                        </div>
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
