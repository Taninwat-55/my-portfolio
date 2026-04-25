"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  ExternalLink,
  Lock,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects } from "../data";

// ─── Case-study narratives ──────────────────────────────────────────────────
// Three stories selected to showcase one of each pillar (Designer / Strategist / Builder)
// matching Section 2: Trailr is the in-team builder story, Bevisly is the strategist
// going solo end-to-end, Satoshi is the designer reframing an abstraction.

type Story = {
  number: string;
  slug: string;
  title: string;
  category: string;
  role: string;
  period: string;
  context: string;
  problem: string;
  process: string[];
  result: string;
  tech: string[];
  image: string | null; // null → render placeholder card
  liveUrl?: string;
  codeUrl?: string;
  confidential?: boolean;
};

const stories: Story[] = [
  {
    number: "01",
    slug: "trailr",
    title: "Trailr.ai",
    category: "Frontend Internship",
    role: "Frontend Developer Intern",
    period: "Sep — Dec 2025",
    context:
      "An early-stage Danish AI startup, pre-launch, mid-platform-overhaul.",
    problem:
      "The team was rebuilding the platform's navigation from scratch under a tight pre-launch window. Design specs ran ahead of technical feasibility, state was tangled across components, and the gap between Figma intent and shipped UI was costing sprint time.",
    process: [
      "Architected the navigation system in React + Zustand, replacing tangled prop drilling with a single, predictable source of truth",
      "Translated Figma specs into accessible component primitives — flagging cases where the design implied state the codebase couldn't yet support",
      "Bridged design and engineering at stand-up: surfaced technical constraints early instead of after a sprint closed, which cut rework on three flows",
    ],
    result:
      "Shipped foundational UI for the platform relaunch. Walked away with production React experience in a small, ambiguous-spec environment — the closest analog there is to a Day 1 frontend hire.",
    tech: ["React", "Zustand", "TypeScript", "Figma → Code"],
    image: null, // TODO(user): upload screenshot to /public/assets/trailr.webp and set image: "/assets/trailr.webp"
    confidential: true,
  },
  {
    number: "02",
    slug: "bevisly",
    title: "Bevisly",
    category: "Full-stack SaaS",
    role: "Solo Builder & Founder",
    period: "2025 — present",
    context:
      "A proof-based hiring platform. Built solo, end-to-end, from empty repo to live product.",
    problem:
      "Resumes can't verify real skill. Candidates over-claim, employers over-filter, and the gap eats both sides' time. I wanted to build the alternative: candidates complete real tasks, employers review actual work.",
    process: [
      "Designed the role-based product model — Employer and Candidate as distinct primitives, not user flags — so the data shape mirrors the product shape",
      "Architected the PostgreSQL schema and wrote Supabase Row-Level Security policies so an employer literally cannot read another employer's data — security at the database layer, not the app",
      "Built the proof submission and review flows in React + TypeScript with type-safe API boundaries between the client and Supabase",
    ],
    result:
      "Live at bevisly.com. A working multi-role SaaS with production auth, RLS-enforced data isolation, and a real user path — shipped solo from blank repo.",
    tech: ["React", "TypeScript", "Supabase RLS", "PostgreSQL", "Next.js"],
    image: "/assets/bevisly.webp",
    liveUrl: "https://bevisly.com/",
    codeUrl: "https://github.com/Taninwat-55/bevis-mvp",
  },
  {
    number: "03",
    slug: "satoshi-standard",
    title: "Satoshi Standard",
    category: "FinTech / Product Thinking",
    role: "Solo Build",
    period: "2025",
    context:
      "A Bitcoin price dashboard that reframes the abstraction.",
    problem:
      "Most people can't grasp Bitcoin's value in everyday terms. Quoting BTC at $43,217 is meaningless when you're buying coffee. The product question wasn't \"show the price\" — it was \"make purchasing power tangible.\"",
    process: [
      "Reframed the dashboard around Satoshis (the smallest BTC unit), so a coffee becomes ~110,000 sats — not 0.00000254 BTC",
      "Built a live API integration with controlled re-renders so the UI doesn't flicker on every price tick",
      "Wrote a full Vitest unit-test suite covering the conversion logic — because price math has to be right",
    ],
    result:
      "Live at satoshi-standard.xyz. A small but precise product where the design choice (sats over BTC) carries the value, and the engineering quietly supports it.",
    tech: ["React", "Tailwind", "Vitest", "REST API"],
    image: "/assets/satoshi-standard.webp",
    liveUrl: "https://www.satoshi-standard.xyz/",
    codeUrl: "https://github.com/Taninwat-55/Satoshi-Standard",
  },
];

// Projects to show in the "and more" rail — everything not in the featured stories
const featuredSlugIds = new Set([99, 2]); // Bevisly + Satoshi (Trailr is not in `projects`)
const railProjects = projects.filter((p) => !featuredSlugIds.has(p.id));

// ─── Section ────────────────────────────────────────────────────────────────

export function CaseStudies() {
  return (
    <section
      id="case-studies"
      aria-label="Case Studies"
      className="relative border-t border-white/5 overflow-hidden"
    >
      {/* Section header */}
      <div className="relative pt-28 md:pt-36 pb-12 container mx-auto px-6 max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="max-w-2xl"
        >
          <motion.div
            variants={fadeUp}
            className="font-mono text-[11px] tracking-[0.3em] uppercase text-ice-400 mb-5"
          >
            03 / Case Studies
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-zinc-50 mb-5"
          >
            Real products,{" "}
            <span className="bg-gradient-to-r from-ice-200 via-ice-300 to-ice-500 bg-clip-text text-transparent">
              real tradeoffs.
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg text-charcoal-300 leading-relaxed"
          >
            Three projects, three angles. Scroll through each one — the screenshot
            stays with you while the story unfolds beside it.
          </motion.p>
        </motion.div>
      </div>

      {/* Stories — each is a tall block with sticky media + scrolling narrative */}
      <div className="container mx-auto px-6 max-w-6xl">
        {stories.map((story) => (
          <StoryBlock key={story.slug} story={story} />
        ))}
      </div>

      {/* "And more" rail */}
      <MoreRail />
    </section>
  );
}

// ─── Story block ────────────────────────────────────────────────────────────

function StoryBlock({ story }: { story: Story }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Image entrance/exit driven by scroll position within this block
  const imageOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    [0.4, 1, 1, 0.4]
  );
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 0.98]);

  // Vertical scroll-progress bar fill within the block
  const progressHeight = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "100%"]);

  return (
    <div
      ref={ref}
      className="relative grid md:grid-cols-[1fr_1fr] gap-10 md:gap-16 py-24 md:py-32 border-t border-white/5"
    >
      {/* ── Sticky media column ── */}
      <div className="md:sticky md:top-24 md:self-start">
        <motion.div
          style={{ opacity: imageOpacity, scale: imageScale }}
          className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/5 bg-charcoal-900/50"
        >
          {story.image ? (
            <Image
              src={story.image}
              alt={`${story.title} screenshot`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <ImagePlaceholder title={story.title} category={story.category} />
          )}

          {/* category badge in corner */}
          <div className="absolute top-4 left-4">
            <Badge variant="ice">{story.category}</Badge>
          </div>
        </motion.div>

        {/* Caption row under the image */}
        <div className="mt-4 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-charcoal-400">
          <span>{story.role}</span>
          <span>{story.period}</span>
        </div>
      </div>

      {/* ── Narrative column ── */}
      <div className="relative">
        {/* progress bar — left edge of column on desktop */}
        <div
          aria-hidden
          className="hidden md:block absolute -left-8 top-2 bottom-2 w-px bg-white/5 overflow-hidden"
        >
          <motion.div
            style={{ height: progressHeight }}
            className="w-full bg-gradient-to-b from-ice-300 via-ice-400 to-ice-500/0"
          />
        </div>

        <div className="space-y-14 md:space-y-20">
          {/* Header */}
          <NarrativeBlock>
            <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-charcoal-400 mb-4">
              Chapter {story.number}
            </div>
            <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-50 mb-4">
              {story.title}
            </h3>
            <p className="text-base md:text-lg text-charcoal-200 leading-relaxed">
              {story.context}
            </p>
          </NarrativeBlock>

          {/* Problem */}
          <NarrativeBlock>
            <SectionLabel>The Problem</SectionLabel>
            <p className="text-base md:text-lg text-charcoal-100 leading-relaxed">
              {story.problem}
            </p>
          </NarrativeBlock>

          {/* Process */}
          <NarrativeBlock>
            <SectionLabel>The Process</SectionLabel>
            <ul className="space-y-4">
              {story.process.map((step, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex gap-4 text-charcoal-100 leading-relaxed"
                >
                  <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-ice-400" />
                  <span className="text-[15px] md:text-base">{step}</span>
                </motion.li>
              ))}
            </ul>
          </NarrativeBlock>

          {/* Result */}
          <NarrativeBlock>
            <SectionLabel>The Result</SectionLabel>
            <p className="text-base md:text-lg text-zinc-100 leading-relaxed">
              {story.result}
            </p>
          </NarrativeBlock>

          {/* Tech + CTAs */}
          <NarrativeBlock>
            <SectionLabel>Stack</SectionLabel>
            <div className="flex flex-wrap gap-2 mb-8">
              {story.tech.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {story.confidential ? (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-charcoal-300 text-xs font-mono uppercase tracking-wider">
                  <Lock size={14} /> Confidential — Pre-launch
                </div>
              ) : (
                <>
                  {story.liveUrl && (
                    <Button asChild variant="default" size="default">
                      <a
                        href={story.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${story.title} live site`}
                      >
                        <ExternalLink /> Visit Live
                      </a>
                    </Button>
                  )}
                  {story.codeUrl && (
                    <Button asChild variant="ghost" size="default">
                      <a
                        href={story.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${story.title} source code`}
                      >
                        <Github /> View Code
                      </a>
                    </Button>
                  )}
                </>
              )}
            </div>
          </NarrativeBlock>
        </div>
      </div>
    </div>
  );
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function NarrativeBlock({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-ice-400 mb-3">
      {children}
    </div>
  );
}

function ImagePlaceholder({
  title,
  category,
}: {
  title: string;
  category: string;
}) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900">
      {/* faint grid */}
      <div className="absolute inset-0 bg-grid-ice mask-radial-fade opacity-50" />
      <div className="relative text-center px-8">
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-ice-400 mb-3">
          {category}
        </div>
        <div className="text-3xl md:text-4xl font-semibold text-zinc-100 mb-3">
          {title}
        </div>
        <div className="font-mono text-[10px] tracking-wider text-charcoal-400">
          [ Asset pending — confidential project ]
        </div>
      </div>
    </div>
  );
}

// ─── More-projects rail ─────────────────────────────────────────────────────

function MoreRail() {
  return (
    <div className="relative pt-24 md:pt-32 pb-32 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-6xl mb-10">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-ice-400 mb-3">
              And the rest
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-50">
              Side projects, client work, experiments.
            </h3>
          </div>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-ice-300 hover:text-ice-200 transition-colors"
          >
            View full archive
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {railProjects.slice(0, 8).map((p) => (
            <Link
              key={p.id}
              href="/projects"
              className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-white/5 bg-charcoal-900/50 hover:border-ice-400/30 transition-colors"
            >
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <div className="font-mono text-[9px] tracking-wider uppercase text-ice-400/80 mb-1">
                  {p.category}
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm font-semibold text-zinc-100 truncate">
                    {p.title}
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="flex-shrink-0 text-charcoal-400 group-hover:text-ice-300 transition-colors"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
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
