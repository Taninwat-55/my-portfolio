"use client";

import { FadeIn } from "./FadeIn";

interface SectionHeadingProps {
  /** Short category label above the title. Should not restate the title. */
  eyebrow: string;
  title: string;
  /** Optional line under the title. Rendered uppercase and tracked out. */
  subtitle?: string;
  /** Set when a section uses aria-labelledby to point at this heading. */
  id?: string;
  align?: "left" | "center";
  /** "dark" is for sections on a light background (WhatIDo's white panel). */
  tone?: "light" | "dark";
  /** Per-section title treatment — hero-heading, frost-text, a flat colour, etc. */
  titleClassName?: string;
  /** Overrides the default title clamp where a section wants a smaller cap. */
  titleSize?: string;
  className?: string;
}

/**
 * One heading treatment for every section: a short rule, a tracked-out category
 * label, the oversized title, and an optional subtitle. Sections previously each
 * rolled their own h2 with slightly different sizes and spacing, which read as
 * five near-misses rather than one system.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  id,
  align = "center",
  tone = "light",
  titleClassName = "hero-heading",
  titleSize = "clamp(3rem, 12vw, 160px)",
  className = "",
}: SectionHeadingProps) {
  const isCentered = align === "center";

  const ruleColor = tone === "dark" ? "bg-night-900/30" : "bg-frost/30";
  const labelColor = tone === "dark" ? "text-night-900/50" : "text-frost/50";
  const subtitleColor = tone === "dark" ? "text-night-900/50" : "text-frost/45";

  return (
    <div
      className={`flex flex-col ${
        isCentered ? "items-center text-center" : "items-start text-left"
      } ${className}`}
    >
      <FadeIn delay={0} y={20} className="mb-4 sm:mb-5">
        <div className="flex items-center gap-3">
          <span aria-hidden className={`h-px w-8 ${ruleColor}`} />
          <span
            className={`text-[10px] uppercase tracking-[0.3em] sm:text-xs ${labelColor}`}
          >
            {eyebrow}
          </span>
        </div>
      </FadeIn>

      <FadeIn delay={0.08} y={40}>
        <h2
          id={id}
          className={`font-black uppercase leading-none tracking-tight ${titleClassName}`}
          style={{ fontSize: titleSize }}
        >
          {title}
        </h2>
      </FadeIn>

      {/* Display serif rather than a third tracked-out sans line. The eyebrow is
          already small uppercase sans, so repeating that register underneath the
          title read as two labels stacked around a heading. Sentence-case italic
          serif gives the block three distinct voices instead. */}
      {subtitle && (
        <FadeIn delay={0.16} y={20} className="mt-4">
          <p
            className={`font-display italic text-lg sm:text-xl md:text-2xl ${subtitleColor}`}
          >
            {subtitle}
          </p>
        </FadeIn>
      )}
    </div>
  );
}
