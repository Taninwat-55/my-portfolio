"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  X,
  Code2,
  Compass,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

export type LensTake = {
  pros: string[];
  cons: string[];
};

export type SimOption = {
  id: string;
  name: string; // e.g. "Lego Box"
  subtitle: string; // e.g. "Modular workspace cards"
  pitch: string; // 1-line in the card
  /** Inline SVG schematic showing the UI pattern. Drawn in a 100×60 viewBox. */
  schematic: React.ReactNode;
  builder: LensTake;
  strategist: LensTake;
};

export type SimReveal = {
  /** Short label for the chosen path, e.g. "Timeline + modular blocks" */
  shipped: string;
  /** 2–3 sentence explanation of why */
  body: string;
  /** Single-line lesson */
  lesson: string;
};

export type SimulatorData = {
  /** The decision question, posed to the user */
  question: string;
  /** Optional context line above the question */
  context?: string;
  options: [SimOption, SimOption];
  reveal: SimReveal;
};

// ─── Component ──────────────────────────────────────────────────────────────

export function TradeoffSimulator({ data }: { data: SimulatorData }) {
  const [chosenId, setChosenId] = useState<string | null>(null);
  const [viewed, setViewed] = useState<Set<string>>(new Set());
  const [revealed, setRevealed] = useState(false);

  const optA = data.options[0];
  const optB = data.options[1];
  const chosen = chosenId === optA.id ? optA : chosenId === optB.id ? optB : null;
  const other = chosen
    ? chosen.id === optA.id
      ? optB
      : optA
    : null;

  const bothViewed = viewed.has(optA.id) && viewed.has(optB.id);

  const choose = (id: string) => {
    setChosenId(id);
    setViewed((s) => new Set(s).add(id));
  };

  const reset = () => {
    setChosenId(null);
    setViewed(new Set());
    setRevealed(false);
  };

  // Phase: 'choose' | 'compare' | 'reveal'
  const phase = revealed ? "reveal" : chosen ? "compare" : "choose";

  return (
    <div
      role="region"
      aria-label="Trade-off simulator"
      className="not-prose relative rounded-2xl border border-white/5 bg-charcoal-900/50 backdrop-blur-sm overflow-hidden"
    >
      {/* Top label bar */}
      <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-ice-400">
          <span className="h-1.5 w-1.5 rounded-full bg-ice-400" />
          Decision Point
        </div>
        <PhasePips phase={phase} />
      </div>

      <div className="p-5 md:p-7">
        {/* Question */}
        {data.context && (
          <div className="font-mono text-[11px] tracking-wider uppercase text-charcoal-400 mb-2">
            {data.context}
          </div>
        )}
        <h4 className="text-lg md:text-xl font-semibold tracking-tight text-zinc-50 mb-6 leading-snug">
          {data.question}
        </h4>

        {/* Body switches based on phase */}
        <AnimatePresence mode="wait">
          {phase === "choose" && (
            <motion.div
              key="choose"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <OptionCard option={optA} onChoose={() => choose(optA.id)} />
              <OptionCard option={optB} onChoose={() => choose(optB.id)} />
            </motion.div>
          )}

          {phase === "compare" && chosen && other && (
            <motion.div
              key="compare"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <SelectedPanel option={chosen} />

              {/* Switch row + reveal CTA */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-white/5">
                <SwitchInline
                  option={other}
                  viewed={viewed.has(other.id)}
                  onSwitch={() => choose(other.id)}
                />

                <div className="flex items-center gap-4 ml-auto">
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-charcoal-400 hidden sm:block">
                    {bothViewed
                      ? "✓ Both reviewed"
                      : `Compare both (${viewed.size}/2)`}
                  </div>
                  <button
                    type="button"
                    disabled={!bothViewed}
                    onClick={() => setRevealed(true)}
                    className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-mono uppercase tracking-[0.18em] transition-all disabled:opacity-40 disabled:cursor-not-allowed enabled:border-ice-400/40 enabled:bg-ice-400/10 enabled:text-ice-200 enabled:hover:bg-ice-400/20 enabled:hover:border-ice-300/60 disabled:border-white/10 disabled:bg-white/[0.02] disabled:text-charcoal-500"
                  >
                    Reveal what I shipped
                    <ArrowRight
                      size={14}
                      className="transition-transform group-enabled:group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {phase === "reveal" && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              <RevealPanel reveal={data.reveal} onReset={reset} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Phase pips (top right) ─────────────────────────────────────────────────

function PhasePips({ phase }: { phase: "choose" | "compare" | "reveal" }) {
  const phases = ["choose", "compare", "reveal"] as const;
  return (
    <div className="flex items-center gap-1.5">
      {phases.map((p) => {
        const active = phase === p;
        const past = phases.indexOf(phase) > phases.indexOf(p);
        return (
          <span
            key={p}
            className={`h-1.5 rounded-full transition-all ${
              active
                ? "w-6 bg-ice-400"
                : past
                  ? "w-1.5 bg-ice-400/60"
                  : "w-1.5 bg-white/10"
            }`}
          />
        );
      })}
    </div>
  );
}

// ─── Option card (Phase 1) ──────────────────────────────────────────────────

function OptionCard({
  option,
  onChoose,
}: {
  option: SimOption;
  onChoose: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChoose}
      className="group text-left rounded-xl border border-white/5 bg-charcoal-900/60 p-5 hover:border-ice-400/30 hover:bg-charcoal-900/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ice-300 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-950"
    >
      {/* Schematic */}
      <div className="aspect-[5/3] rounded-lg bg-charcoal-950/60 border border-white/5 mb-4 flex items-center justify-center overflow-hidden">
        {option.schematic}
      </div>

      <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-ice-400 mb-1.5">
        {option.name}
      </div>
      <div className="text-zinc-100 font-semibold text-base mb-2">
        {option.subtitle}
      </div>
      <p className="text-sm text-charcoal-300 leading-relaxed mb-5">
        {option.pitch}
      </p>

      <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-ice-300 group-hover:text-ice-200">
        Try this path
        <ArrowRight
          size={12}
          className="transition-transform group-hover:translate-x-1"
        />
      </span>
    </button>
  );
}

// ─── Selected panel (Phase 2 — chosen side) ────────────────────────────────

function SelectedPanel({ option }: { option: SimOption }) {
  return (
    <motion.div
      layout
      className="rounded-xl border border-white/5 bg-charcoal-900/60 p-5 md:p-7"
    >
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0 w-24 h-14 rounded-md bg-charcoal-950/60 border border-white/5 flex items-center justify-center overflow-hidden">
          {option.schematic}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-ice-400 mb-1">
            ▸ Selected · {option.name}
          </div>
          <div className="text-zinc-100 font-semibold text-base md:text-lg">
            {option.subtitle}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        <LensCard lens="builder" take={option.builder} />
        <LensCard lens="strategist" take={option.strategist} />
      </div>
    </motion.div>
  );
}

// ─── Switch inline (Phase 2 — compact horizontal switcher) ─────────────────

function SwitchInline({
  option,
  viewed,
  onSwitch,
}: {
  option: SimOption;
  viewed: boolean;
  onSwitch: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSwitch}
      className="group inline-flex items-center gap-3 pl-2 pr-4 py-2 rounded-full border border-white/5 bg-white/[0.02] hover:border-ice-400/30 hover:bg-white/[0.04] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ice-300 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-950"
    >
      {/* Mini schematic */}
      <span className="flex items-center justify-center w-9 h-9 rounded-full bg-charcoal-950/60 border border-white/5 overflow-hidden flex-shrink-0">
        <span className="block w-7 h-7">{option.schematic}</span>
      </span>

      <span className="flex flex-col items-start leading-tight">
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-charcoal-400 inline-flex items-center gap-1.5">
          Other path
          {viewed && <Check size={10} className="text-ice-400" />}
        </span>
        <span className="text-sm text-zinc-200 font-medium">
          {option.name}
        </span>
      </span>

      <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-ice-300 ml-1">
        Try
        <ArrowRight
          size={11}
          className="transition-transform group-hover:translate-x-1"
        />
      </span>
    </button>
  );
}

// ─── Lens card (pros / cons under one role) ────────────────────────────────

function LensCard({
  lens,
  take,
}: {
  lens: "builder" | "strategist";
  take: LensTake;
}) {
  const meta = useMemo(
    () =>
      lens === "builder"
        ? {
            label: "Builder says",
            color: "var(--color-builder)",
            glow: "rgba(121, 190, 161, 0.10)",
            border: "rgba(121, 190, 161, 0.35)",
            Icon: Code2,
          }
        : {
            label: "Strategist says",
            color: "var(--color-strategist)",
            glow: "rgba(216, 176, 107, 0.10)",
            border: "rgba(216, 176, 107, 0.35)",
            Icon: Compass,
          },
    [lens]
  );
  const { Icon, label, color, glow, border } = meta;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg border p-4"
      style={{ borderColor: border, background: glow }}
    >
      <div
        className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase mb-4"
        style={{ color }}
      >
        <Icon size={12} strokeWidth={1.6} />
        {label}
      </div>

      <ul className="space-y-2.5 mb-4">
        {take.pros.map((pro, i) => (
          <ProConItem key={i} kind="pro" color={color} text={pro} />
        ))}
      </ul>
      <ul className="space-y-2.5">
        {take.cons.map((con, i) => (
          <ProConItem key={i} kind="con" text={con} />
        ))}
      </ul>
    </motion.div>
  );
}

function ProConItem({
  kind,
  text,
  color,
}: {
  kind: "pro" | "con";
  text: string;
  color?: string;
}) {
  return (
    <li className="flex gap-2.5 items-start text-[13px] leading-relaxed">
      <span
        className="flex-shrink-0 mt-0.5"
        style={{ color: kind === "pro" ? color : "rgb(120,124,132)" }}
      >
        {kind === "pro" ? <Check size={13} /> : <X size={13} />}
      </span>
      <span className={kind === "pro" ? "text-zinc-100" : "text-charcoal-400"}>
        {text}
      </span>
    </li>
  );
}

// ─── Reveal panel (Phase 3) ─────────────────────────────────────────────────

function RevealPanel({
  reveal,
  onReset,
}: {
  reveal: SimReveal;
  onReset: () => void;
}) {
  return (
    <div className="relative rounded-xl border border-ice-400/20 bg-gradient-to-br from-ice-400/[0.04] to-charcoal-900/40 p-5 md:p-6">
      <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase text-ice-300 mb-4">
        <CheckCircle2 size={12} strokeWidth={1.8} />
        What I actually shipped
      </div>

      <div className="text-zinc-50 text-2xl md:text-3xl font-semibold tracking-tight leading-snug mb-5">
        {reveal.shipped}
      </div>

      <p className="text-[15px] text-charcoal-200 leading-relaxed mb-6 max-w-2xl">
        {reveal.body}
      </p>

      <div className="rounded-lg border border-white/5 bg-charcoal-950/40 p-4 mb-6">
        <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-ice-400 mb-2">
          Lesson
        </div>
        <div className="text-zinc-100 text-[15px] leading-relaxed italic">
          {reveal.lesson}
        </div>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-charcoal-300 hover:text-ice-300 transition-colors"
      >
        <RotateCcw
          size={12}
          className="transition-transform group-hover:-rotate-180 duration-500"
        />
        Play again
      </button>
    </div>
  );
}
