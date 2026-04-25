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
import {
  TradeoffSimulator,
  type SimulatorData,
} from "./TradeoffSimulator";
import { DecisionModalTrigger } from "../components/DecisionModal";

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
  /** Optional interactive trade-off simulator rendered after Process */
  simulator?: SimulatorData;
  result: string;
  tech: string[];
  image: string | null; // null → render placeholder card
  images?: (string | null)[]; // Array of images or placeholders
  liveUrl?: string;
  codeUrl?: string;
  confidential?: boolean;
};

// ─── Schematics for the Trailr simulator ───────────────────────────────────
// Stylized 100×60 SVGs showing the UI pattern of each option.

const LegoBoxSchematic = (
  <svg
    viewBox="0 0 100 60"
    preserveAspectRatio="xMidYMid meet"
    className="w-[78%] h-[78%]"
    aria-hidden
  >
    <g
      fill="rgba(103,200,245,0.06)"
      stroke="rgba(147,216,249,0.55)"
      strokeWidth="0.7"
      strokeDasharray="1.8 1.4"
    >
      <rect x="10" y="8" width="22" height="18" rx="2.5" />
      <rect x="39" y="8" width="22" height="18" rx="2.5" />
      <rect x="68" y="8" width="22" height="18" rx="2.5" />
      <rect x="10" y="34" width="22" height="18" rx="2.5" />
      <rect x="39" y="34" width="22" height="18" rx="2.5" />
      <rect x="68" y="34" width="22" height="18" rx="2.5" />
    </g>
  </svg>
);

const TimelineSchematic = (
  <svg
    viewBox="0 0 100 60"
    preserveAspectRatio="xMidYMid meet"
    className="w-[78%] h-[78%]"
    aria-hidden
  >
    <g
      stroke="rgba(147,216,249,0.55)"
      strokeWidth="0.8"
      fill="none"
      strokeDasharray="1.2 1"
    >
      <line x1="22" y1="30" x2="36" y2="30" />
      <line x1="46" y1="30" x2="60" y2="30" />
      <line x1="70" y1="30" x2="84" y2="30" />
    </g>
    <g
      stroke="rgba(147,216,249,0.65)"
      strokeWidth="0.8"
      fill="rgba(103,200,245,0.08)"
    >
      <circle cx="17" cy="30" r="5" />
      <circle cx="41" cy="30" r="5" />
      <circle cx="65" cy="30" r="5" />
    </g>
    <circle cx="89" cy="30" r="5" fill="rgba(103,200,245,0.45)" stroke="none" />
  </svg>
);

// ─── Trailr.ai trade-off simulator data ────────────────────────────────────

const trailrSimulator: SimulatorData = {
  context: "Real decision · Trailr.ai navigation overhaul",
  question:
    "Tight pre-launch deadline. The platform needs a new navigation system. Which model do you ship?",
  options: [
    {
      id: "lego",
      name: "Option A · Lego Box",
      subtitle: "Modular workspace cards",
      pitch:
        "Composable modules. Users arrange their own dashboard like an internal tool.",
      schematic: LegoBoxSchematic,
      builder: {
        pros: [
          "Maps 1:1 to React's component model — each module is a clean primitive",
          "Trivial to add new modules later — plug in, register, ship",
        ],
        cons: [
          "Drag-and-drop state means a Zustand store per module surface",
          "~2× more components to scaffold under a tight deadline",
        ],
      },
      strategist: {
        pros: [
          "Future-proof — every customer arranges differently with no extra eng",
          "Feels like an internal tool — power users own their workspace",
        ],
        cons: [
          "Blank-canvas paralysis for new users — no obvious starting point",
          "Hard to communicate the canonical 'happy path' in onboarding",
        ],
      },
    },
    {
      id: "timeline",
      name: "Option B · Timeline",
      subtitle: "Linear stages, one path",
      pitch:
        "Canonical flow from stage 1 to stage N. Users follow the arrow.",
      schematic: TimelineSchematic,
      builder: {
        pros: [
          "Familiar route-based React patterns — fast to scaffold and reason about",
          "Predictable state shape, no per-module orchestration",
        ],
        cons: [
          "Adding new stages later means reshuffling the navigation tree",
          "Branching flows force conditional logic that gets messy",
        ],
      },
      strategist: {
        pros: [
          "Onboarding is obvious — follow the arrow, no blank canvas",
          "Easier to demo, document, and instrument with funnel metrics",
        ],
        cons: [
          "Power users feel boxed in by the linear flow",
          "Customer-specific branching workflows feel forced or impossible",
        ],
      },
    },
  ],
  reveal: {
    shipped: "Timeline spine, modular blocks inside each stage.",
    body:
      "The deadline killed pure Lego Box — but I kept modularity where it actually moved the needle. Inside each timeline stage, users could rearrange the building blocks. We got ~70% of the flexibility for ~40% of the build time, and onboarding stayed obvious for new accounts.",
    lesson:
      "Hybrids look like indecision, but they're often the smart play under real constraints. The trick is being explicit about what you're trading.",
  },
};

// ─── Schematics for the Bevisly simulator ──────────────────────────────────
// Stylized 100×60 SVGs showing the collision detection patterns.

const DefaultBoundsSchematic = (
  <svg
    viewBox="0 0 100 60"
    preserveAspectRatio="xMidYMid meet"
    className="w-[78%] h-[78%]"
    aria-hidden
  >
    {/* Three columns */}
    <g
      fill="rgba(103,200,245,0.06)"
      stroke="rgba(147,216,249,0.55)"
      strokeWidth="0.7"
      strokeDasharray="1.8 1.4"
    >
      <rect x="5" y="6" width="27" height="48" rx="2.5" />
      <rect x="37" y="6" width="27" height="48" rx="2.5" />
      <rect x="69" y="6" width="27" height="48" rx="2.5" />
    </g>
    {/* Cards inside columns */}
    <g fill="rgba(147,216,249,0.18)" stroke="rgba(147,216,249,0.4)" strokeWidth="0.5">
      <rect x="8" y="12" width="21" height="8" rx="1.5" />
      <rect x="8" y="24" width="21" height="8" rx="1.5" />
      <rect x="40" y="12" width="21" height="8" rx="1.5" />
      <rect x="72" y="12" width="21" height="8" rx="1.5" />
      <rect x="72" y="24" width="21" height="8" rx="1.5" />
    </g>
    {/* Jittering card indicator */}
    <rect x="38" y="23" width="23" height="9" rx="1.5" fill="rgba(245,120,100,0.25)" stroke="rgba(245,120,100,0.6)" strokeWidth="0.6" strokeDasharray="2 1" />
    <line x1="49" y1="32" x2="49" y2="40" stroke="rgba(245,120,100,0.4)" strokeWidth="0.5" strokeDasharray="1 1" />
    <text x="49" y="45" textAnchor="middle" fontSize="4" fill="rgba(245,120,100,0.7)" fontFamily="monospace">?</text>
  </svg>
);

const PriorityIntersectionSchematic = (
  <svg
    viewBox="0 0 100 60"
    preserveAspectRatio="xMidYMid meet"
    className="w-[78%] h-[78%]"
    aria-hidden
  >
    {/* Three columns — the middle one highlighted as target */}
    <g
      fill="rgba(103,200,245,0.06)"
      stroke="rgba(147,216,249,0.35)"
      strokeWidth="0.7"
      strokeDasharray="1.8 1.4"
    >
      <rect x="5" y="6" width="27" height="48" rx="2.5" />
      <rect x="69" y="6" width="27" height="48" rx="2.5" />
    </g>
    {/* Target column — checked first, solid border */}
    <rect x="37" y="6" width="27" height="48" rx="2.5" fill="rgba(121,190,161,0.08)" stroke="rgba(121,190,161,0.55)" strokeWidth="0.8" />
    {/* Cards */}
    <g fill="rgba(147,216,249,0.18)" stroke="rgba(147,216,249,0.4)" strokeWidth="0.5">
      <rect x="8" y="12" width="21" height="8" rx="1.5" />
      <rect x="8" y="24" width="21" height="8" rx="1.5" />
      <rect x="40" y="12" width="21" height="8" rx="1.5" />
      <rect x="72" y="12" width="21" height="8" rx="1.5" />
    </g>
    {/* Dragged card landing in empty space — clearly accepted */}
    <rect x="40" y="30" width="21" height="8" rx="1.5" fill="rgba(121,190,161,0.2)" stroke="rgba(121,190,161,0.6)" strokeWidth="0.6" />
    {/* Priority arrow: column first */}
    <line x1="50" y1="3" x2="50" y2="6" stroke="rgba(121,190,161,0.6)" strokeWidth="0.8" markerEnd="url(#arrowG)" />
    <text x="50" y="56" textAnchor="middle" fontSize="3.5" fill="rgba(121,190,161,0.7)" fontFamily="monospace">col → card</text>
    <defs>
      <marker id="arrowG" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
        <path d="M0,0 L4,2 L0,4" fill="rgba(121,190,161,0.6)" />
      </marker>
    </defs>
  </svg>
);

// ─── Bevisly trade-off simulator data ──────────────────────────────────────

const bevislySimulator: SimulatorData = {
  context: "Real decision · Bevisly Kanban board (TalentBoard.tsx)",
  question:
    "Drag-and-drop flicker in a multi-column Kanban. Which collision detection strategy do you ship?",
  options: [
    {
      id: "default",
      name: "Option A · Default Bounds",
      subtitle: "rectIntersection / closestCenter",
      pitch:
        "Use @dnd-kit's built-in collision algorithms. Zero custom code, ships fast.",
      schematic: DefaultBoundsSchematic,
      builder: {
        pros: [
          "Zero custom code — use the library as documented",
          "Well-tested defaults, no edge cases to maintain",
        ],
        cons: [
          "rectIntersection causes jitter between two adjacent cards — the item flickers between columns",
          "closestCenter fails on Kanban because it ignores the empty space at the bottom of a column",
        ],
      },
      strategist: {
        pros: [
          "Faster to ship — less engineering time, more time on features",
          "Easier for other devs to understand — standard library API",
        ],
        cons: [
          "Recruiters dragging candidates into an empty column see no response — feels broken",
          "The jitter makes the UI feel unpolished and unreliable in demos",
        ],
      },
    },
    {
      id: "priority",
      name: "Option B · Priority Intersection",
      subtitle: "Column-first collision strategy",
      pitch:
        "Write a custom collision function that checks column containers before individual cards.",
      schematic: PriorityIntersectionSchematic,
      builder: {
        pros: [
          "Column detection runs first — dragging into empty space works instantly",
          "6px activation constraint prevents accidental drags when users click to review profiles",
        ],
        cons: [
          "Custom collision logic means more code to own and maintain",
          "Requires understanding @dnd-kit internals — not a beginner-friendly pattern",
        ],
      },
      strategist: {
        pros: [
          "Drag experience feels instant and predictable — recruiters trust the UI",
          "Zero jitter means the Kanban board is demo-ready from day one",
        ],
        cons: [
          "Extra engineering time on a feature that 'should just work'",
          "Hard to A/B test — users don't notice good DnD, they only notice bad DnD",
        ],
      },
    },
  ],
  reveal: {
    shipped: "Priority-based intersection with a 6px activation constraint.",
    body:
      "The default algorithms failed visibly in a multi-column layout. I wrote a custom collision function that checks for intersections with Column Containers (droppables) before looking at individual cards. This ensures that even if a recruiter drags a candidate into the empty space of a new column, the UI instantly recognizes the destination. The 6px activation constraint prevents accidental drags when users are just trying to click to review a profile.",
    lesson:
      "The best DnD is invisible DnD. Users never praise good drag-and-drop — they only notice when it's broken. The extra hour writing a custom collision strategy saved every future demo from a 'why is this flickering?' moment.",
  },
};

// ─── Schematics for the Satoshi Standard simulator ─────────────────────────
// Stylized 100×60 SVGs showing data-fetching architecture patterns.

const ComponentFetchSchematic = (
  <svg
    viewBox="0 0 100 60"
    preserveAspectRatio="xMidYMid meet"
    className="w-[78%] h-[78%]"
    aria-hidden
  >
    {/* Three UI components directly calling an API */}
    <g fill="rgba(103,200,245,0.06)" stroke="rgba(147,216,249,0.55)" strokeWidth="0.7">
      <rect x="8" y="6" width="22" height="14" rx="2" />
      <rect x="39" y="6" width="22" height="14" rx="2" />
      <rect x="70" y="6" width="22" height="14" rx="2" />
    </g>
    {/* Labels inside components */}
    <text x="19" y="15" textAnchor="middle" fontSize="3.5" fill="rgba(147,216,249,0.7)" fontFamily="monospace">UI</text>
    <text x="50" y="15" textAnchor="middle" fontSize="3.5" fill="rgba(147,216,249,0.7)" fontFamily="monospace">UI</text>
    <text x="81" y="15" textAnchor="middle" fontSize="3.5" fill="rgba(147,216,249,0.7)" fontFamily="monospace">UI</text>
    {/* Direct arrows to single API */}
    <g stroke="rgba(245,120,100,0.5)" strokeWidth="0.6" strokeDasharray="1.5 1">
      <line x1="19" y1="20" x2="50" y2="36" />
      <line x1="50" y1="20" x2="50" y2="36" />
      <line x1="81" y1="20" x2="50" y2="36" />
    </g>
    {/* Single API box — fragile */}
    <rect x="35" y="36" width="30" height="12" rx="2" fill="rgba(245,120,100,0.12)" stroke="rgba(245,120,100,0.5)" strokeWidth="0.7" />
    <text x="50" y="44" textAnchor="middle" fontSize="3.5" fill="rgba(245,120,100,0.8)" fontFamily="monospace">CoinGecko</text>
    {/* 429 indicator */}
    <text x="50" y="55" textAnchor="middle" fontSize="3.5" fill="rgba(245,120,100,0.6)" fontFamily="monospace">429 → 💥</text>
  </svg>
);

const AdapterPatternSchematic = (
  <svg
    viewBox="0 0 100 60"
    preserveAspectRatio="xMidYMid meet"
    className="w-[78%] h-[78%]"
    aria-hidden
  >
    {/* UI components */}
    <g fill="rgba(103,200,245,0.06)" stroke="rgba(147,216,249,0.55)" strokeWidth="0.7">
      <rect x="8" y="4" width="22" height="12" rx="2" />
      <rect x="39" y="4" width="22" height="12" rx="2" />
      <rect x="70" y="4" width="22" height="12" rx="2" />
    </g>
    <text x="19" y="12" textAnchor="middle" fontSize="3.5" fill="rgba(147,216,249,0.7)" fontFamily="monospace">UI</text>
    <text x="50" y="12" textAnchor="middle" fontSize="3.5" fill="rgba(147,216,249,0.7)" fontFamily="monospace">UI</text>
    <text x="81" y="12" textAnchor="middle" fontSize="3.5" fill="rgba(147,216,249,0.7)" fontFamily="monospace">UI</text>
    {/* Arrows to adapter layer */}
    <g stroke="rgba(121,190,161,0.5)" strokeWidth="0.6">
      <line x1="19" y1="16" x2="50" y2="24" />
      <line x1="50" y1="16" x2="50" y2="24" />
      <line x1="81" y1="16" x2="50" y2="24" />
    </g>
    {/* Adapter / abstraction layer */}
    <rect x="28" y="24" width="44" height="10" rx="2.5" fill="rgba(121,190,161,0.1)" stroke="rgba(121,190,161,0.55)" strokeWidth="0.8" />
    <text x="50" y="31" textAnchor="middle" fontSize="3.5" fill="rgba(121,190,161,0.8)" fontFamily="monospace">cryptoApi</text>
    {/* Arrows to multiple providers */}
    <g stroke="rgba(121,190,161,0.4)" strokeWidth="0.5" strokeDasharray="1.5 1">
      <line x1="38" y1="34" x2="19" y2="42" />
      <line x1="50" y1="34" x2="50" y2="42" />
      <line x1="62" y1="34" x2="81" y2="42" />
    </g>
    {/* Provider boxes */}
    <g fill="rgba(121,190,161,0.06)" stroke="rgba(121,190,161,0.35)" strokeWidth="0.6">
      <rect x="7" y="42" width="24" height="10" rx="2" />
      <rect x="38" y="42" width="24" height="10" rx="2" />
      <rect x="69" y="42" width="24" height="10" rx="2" />
    </g>
    <text x="19" y="49" textAnchor="middle" fontSize="3" fill="rgba(121,190,161,0.7)" fontFamily="monospace">CoinGecko</text>
    <text x="50" y="49" textAnchor="middle" fontSize="3" fill="rgba(121,190,161,0.7)" fontFamily="monospace">Mempool</text>
    <text x="81" y="49" textAnchor="middle" fontSize="3" fill="rgba(121,190,161,0.7)" fontFamily="monospace">CoinCap</text>
  </svg>
);

// ─── Satoshi Standard trade-off simulator data ─────────────────────────────

const satoshiSimulator: SimulatorData = {
  context: "Real decision · Satoshi Standard (cryptoApi.js)",
  question:
    "Third-party APIs go down or rate-limit you. How do you protect the UI from provider failures?",
  options: [
    {
      id: "component-fetch",
      name: "Option A · Component-Level Fetching",
      subtitle: "Direct fetch in each component",
      pitch:
        "Each UI component calls CoinGecko directly. Fast to code, zero abstraction overhead.",
      schematic: ComponentFetchSchematic,
      builder: {
        pros: [
          "Zero abstraction — each component owns its own data, easy to reason about",
          "Fastest path to a working prototype, no extra files or patterns to learn",
        ],
        cons: [
          "A single 429 (rate limit) from CoinGecko breaks every component simultaneously",
          "Switching providers means touching every component that fetches — high blast radius",
        ],
      },
      strategist: {
        pros: [
          "Ship a demo in hours, not days — great for validating the idea quickly",
          "No over-engineering risk — you build exactly what you need",
        ],
        cons: [
          "The app is only as reliable as one API — zero resilience in production",
          "Any future provider migration becomes a full rewrite across every component",
        ],
      },
    },
    {
      id: "adapter-pattern",
      name: "Option B · Adapter Pattern",
      subtitle: "Centralized provider abstraction",
      pitch:
        "Build a cryptoApi module with setProvider() and a unified interface that maps to CoinGecko, Mempool, or CoinCap.",
      schematic: AdapterPatternSchematic,
      builder: {
        pros: [
          "setProvider() swaps the data source at runtime — components never know or care",
          "Vitest suite validates each provider independently, so switching is safe",
        ],
        cons: [
          "More upfront code — an abstraction layer, provider mappings, and a test suite",
          "Risk of premature abstraction if only one provider is ever actually used",
        ],
      },
      strategist: {
        pros: [
          "App survives provider outages — switch to Mempool in one line if CoinGecko dies",
          "Future-proof for adding new data sources without touching any UI code",
        ],
        cons: [
          "More engineering time spent on infrastructure instead of user-facing features",
          "The abstraction is invisible to users — hard to 'demo' the value to stakeholders",
        ],
      },
    },
  ],
  reveal: {
    shipped: "Adapter Pattern with runtime provider switching and a full Vitest suite.",
    body:
      "I built a centralized cryptoApi module that abstracts the data source behind a unified interface. A setProvider function maps CoinGecko, Mempool, and CoinCap to the same fetchBitcoinPrices call. Components never import a specific provider — they call the abstraction. I wrote a Vitest suite to ensure that switching providers at runtime correctly delegates the call without breaking the frontend. When CoinGecko rate-limited me during development, I switched to Mempool in one line and the UI never knew.",
    lesson:
      "The best abstractions are the ones your components never have to think about. One hour building a provider adapter saved me from rewriting three components every time an API hiccuped.",
  },
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
    image: null, // Keep for fallback
    images: [null, null, null], // 3 Placeholders
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
    simulator: bevislySimulator,
    result:
      "Live at bevisly.com. A working multi-role SaaS with production auth, RLS-enforced data isolation, and a real user path — shipped solo from blank repo.",
    tech: ["React", "TypeScript", "Supabase RLS", "PostgreSQL", "Next.js"],
    image: "/assets/bevisly.webp",
    images: ["/assets/bevisly.webp", null, null], // Real image + 2 placeholders
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
    simulator: satoshiSimulator,
    result:
      "Live at satoshi-standard.xyz. A small but precise product where the design choice (sats over BTC) carries the value, and the engineering quietly supports it.",
    tech: ["React", "Tailwind", "Vitest", "REST API"],
    image: "/assets/satoshi-standard.webp",
    images: ["/assets/satoshi-standard.webp", null, null], // Real image + 2 placeholders
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
      className="relative py-24 md:py-32 border-t border-white/5"
    >
      <div className="grid md:grid-cols-[1fr_1fr] gap-10 md:gap-16">
      {/* ── Media column ── */}
      <div className="flex flex-col gap-6 md:self-start">
        {(story.images || [story.image]).map((imgSrc, idx) => (
          <motion.div
            key={idx}
            style={{ opacity: imageOpacity, scale: imageScale }}
            className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/5 bg-charcoal-900/50"
          >
            {imgSrc ? (
              <Image
                src={imgSrc}
                alt={`${story.title} screenshot ${idx + 1}`}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            ) : (
              <ImagePlaceholder title={story.title} category={story.category} />
            )}

            {/* category badge in corner, only on the first image */}
            {idx === 0 && (
              <div className="absolute top-4 left-4">
                <Badge variant="ice">{story.category}</Badge>
              </div>
            )}
          </motion.div>
        ))}

        {/* Caption row under the images */}
        <div className="mt-2 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-charcoal-400 px-1">
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

          {/* Decision simulator trigger — opens in a focused modal */}
          {story.simulator && (
            <NarrativeBlock>
              <DecisionModalTrigger data={story.simulator} title={story.title} />
            </NarrativeBlock>
          )}

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
