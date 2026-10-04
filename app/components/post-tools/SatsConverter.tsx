"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Bitcoin } from "lucide-react";

type SatsConverterProps = {
  /** USD per BTC. Defaults to a recent rate. */
  rate?: number;
  /** Optional caption shown below the inputs. */
  caption?: string;
};

const SATS_PER_BTC = 100_000_000;

const QUICK_PICKS = [
  { label: "Coffee", sats: 100_000 },
  { label: "Pizza", sats: 1_000_000 },
  { label: "1 BTC", sats: SATS_PER_BTC },
];

export function SatsConverter({
  rate = 67_000,
  caption = `Rate locked at $${(67_000).toLocaleString("en-US")}/BTC for this article. Adjust the inputs to play.`,
}: SatsConverterProps) {
  const [sats, setSats] = useState(100_000);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Animated rate display: ticks from 0 → rate when scrolled into view
  const [displayedRate, setDisplayedRate] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 900;
    const animate = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayedRate(Math.round(rate * eased));
      if (t < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, rate]);

  const usd = (sats * rate) / SATS_PER_BTC;

  const onSatsChange = (raw: string) => {
    const n = Number(raw.replace(/[^\d]/g, ""));
    setSats(Number.isFinite(n) ? n : 0);
  };
  const onUsdChange = (raw: string) => {
    const n = Number(raw.replace(/[^\d.]/g, ""));
    if (!Number.isFinite(n)) return;
    setSats(Math.round((n / rate) * SATS_PER_BTC));
  };

  return (
    <div
      ref={ref}
      className="not-prose my-8 overflow-hidden rounded-md border border-paper-rule bg-paper-dim text-paper-ink shadow-[0_6px_18px_rgba(0,0,0,0.18)]"
    >
      {/* Top bar — Garden tool label + animated rate */}
      <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-paper-rule">
        <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-paper-ink">
          <Bitcoin size={12} strokeWidth={1.6} />
          Garden tool · Sats Converter
        </div>
        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-paper-ink">
          1 BTC ={" "}
          <motion.span
            className="text-paper-ink"
            initial={false}
            animate={{ opacity: inView ? 1 : 0.4 }}
          >
            ${displayedRate.toLocaleString("en-US")}
          </motion.span>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-6">
        <Field
          label="Satoshis"
          unit="sats"
          value={sats.toLocaleString("en-US")}
          onChange={onSatsChange}
        />
        <div className="hidden sm:flex items-center justify-center font-mono text-paper-ink">
          ⇌
        </div>
        <Field
          label="US Dollars"
          unit="USD"
          prefix="$"
          value={usd.toLocaleString("en-US", {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}
          onChange={onUsdChange}
        />
      </div>

      {/* Quick picks */}
      <div className="flex flex-wrap items-center gap-2 px-5 pb-5">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-paper-ink mr-1">
          Try
        </span>
        {QUICK_PICKS.map((q) => {
          const active = sats === q.sats;
          return (
            <button
              key={q.label}
              type="button"
              onClick={() => setSats(q.sats)}
              aria-pressed={active}
              className={`px-3 py-1.5 rounded-full border font-mono text-[10px] tracking-[0.18em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper-ink ${
                active
                  ? "border-paper-ink bg-paper-ink text-paper"
                  : "border-paper-rule bg-paper text-paper-ink hover:border-paper-ink"
              }`}
            >
              {q.label} · {q.sats.toLocaleString("en-US")} sats
            </button>
          );
        })}
      </div>

      {caption && (
        <div className="px-5 pb-4 text-[12px] text-paper-ink leading-relaxed">
          {caption}
        </div>
      )}
    </div>
  );
}

// ─── Field ──────────────────────────────────────────────────────────────────

function Field({
  label,
  unit,
  prefix,
  value,
  onChange,
}: {
  label: string;
  unit: string;
  prefix?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-paper-ink mb-2">
        {label}
      </div>
      <div className="relative">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-paper-soft font-mono text-lg">
            {prefix}
          </span>
        )}
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-md bg-paper border border-paper-rule ${
            prefix ? "pl-9" : "pl-4"
          } pr-14 py-3.5 text-paper-ink font-mono text-lg tracking-tight focus:outline-none focus-visible:border-paper-ink focus-visible:ring-2 focus-visible:ring-paper-link transition-colors`}
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[10px] tracking-[0.2em] uppercase text-paper-soft">
          {unit}
        </span>
      </div>
    </label>
  );
}
