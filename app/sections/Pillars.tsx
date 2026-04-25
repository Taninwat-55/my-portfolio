"use client";

import { motion } from "framer-motion";
import { Layers, Compass, Code2, type LucideIcon } from "lucide-react";

type Pillar = {
  number: string;
  icon: LucideIcon;
  title: string;
  tagline: string;
  body: string;
  chips: string[];
};

const pillars: Pillar[] = [
  {
    number: "01",
    icon: Layers,
    title: "The Designer",
    tagline: "Creating immersive experiences.",
    body: "Game design taught me to think about engagement loops before features. I architect interfaces where every transition, state, and micro-interaction earns its place — so the surface feels intentional, not decorated.",
    chips: ["BA Game Design", "Interaction Design", "Motion", "Accessibility"],
  },
  {
    number: "02",
    icon: Compass,
    title: "The Strategist",
    tagline: "Solving business problems.",
    body: "A Master's in Business taught me code is downstream of decisions. I translate ambiguous goals into shippable scope, tradeoffs, and roadmaps — and I know which features earn their cost before a line is written.",
    chips: [
      "MSc Business & Economics",
      "Product Discovery",
      "Stakeholder Alignment",
      "Prioritization",
    ],
  },
  {
    number: "03",
    icon: Code2,
    title: "The Builder",
    tagline: "Turning ideas into reality.",
    body: "I ship. From a real-time seat-locking system to a Supabase RLS-backed SaaS to a 95+ Lighthouse commercial site — I write the code that turns plans into products people actually use.",
    chips: ["Frontend Dev (Jensen)", "React / Next.js", "TypeScript", "Performance"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Pillars() {
  return (
    <section
      id="journey"
      aria-label="Identity — The Three Pillars"
      className="relative py-32 md:py-40 border-t border-white/5 overflow-hidden"
    >
      {/* subtle ambient ice glow, top-center */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[480px] rounded-full bg-ice-500/5 blur-[120px]"
      />

      <div className="relative container mx-auto px-6 max-w-6xl">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="max-w-2xl mb-20"
        >
          <motion.div
            variants={fadeUp}
            className="font-mono text-[11px] tracking-[0.3em] uppercase text-ice-400 mb-5"
          >
            02 / Identity
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-zinc-50 mb-5"
          >
            Three disciplines,{" "}
            <span className="bg-gradient-to-r from-ice-200 via-ice-300 to-ice-500 bg-clip-text text-transparent">
              one product mindset.
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg text-charcoal-300 leading-relaxed"
          >
            I don&apos;t just write code. I bring three angles to every product decision —
            game design, business strategy, and software craft — and they reinforce each
            other on the way to a shipped feature.
          </motion.p>
        </motion.div>

        {/* Pillar grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {pillars.map((p) => (
            <PillarCard key={p.number} pillar={p} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function PillarCard({ pillar }: { pillar: Pillar }) {
  const Icon = pillar.icon;
  return (
    <motion.article
      variants={fadeUp}
      className="group relative rounded-2xl border border-white/5 bg-charcoal-900/40 backdrop-blur-sm p-7 md:p-8 flex flex-col h-full transition-colors duration-300 hover:border-ice-400/30"
    >
      {/* subtle inner glow on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top,_rgba(103,200,245,0.08),_transparent_60%)]"
      />

      {/* number */}
      <div className="relative font-mono text-[11px] tracking-[0.25em] uppercase text-charcoal-400 mb-6">
        {pillar.number}
      </div>

      {/* icon */}
      <div className="relative mb-7">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl border border-ice-400/20 bg-ice-400/5 text-ice-300 group-hover:bg-ice-400/10 group-hover:border-ice-400/40 transition-colors">
          <Icon size={22} strokeWidth={1.6} />
        </div>
      </div>

      {/* title */}
      <h3 className="relative font-mono text-[11px] tracking-[0.3em] uppercase text-charcoal-300 mb-3">
        {pillar.title}
      </h3>

      {/* tagline */}
      <p className="relative text-2xl md:text-[26px] font-semibold tracking-tight leading-[1.2] text-zinc-50 mb-5">
        {pillar.tagline}
      </p>

      {/* body */}
      <p className="relative text-sm md:text-[15px] text-charcoal-300 leading-relaxed mb-8">
        {pillar.body}
      </p>

      {/* divider */}
      <div className="relative mt-auto pt-6 border-t border-white/5">
        <div className="flex flex-wrap gap-2">
          {pillar.chips.map((chip) => (
            <span
              key={chip}
              className="font-mono text-[10px] tracking-wide uppercase text-charcoal-300 px-2.5 py-1 rounded-md border border-white/5 bg-white/[0.02]"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
