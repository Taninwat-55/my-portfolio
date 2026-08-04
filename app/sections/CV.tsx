"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValueEvent,
} from "framer-motion";
import { FileDown } from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import { cvData, siteContent, type CvEntry } from "../data";

const CV_HREF = siteContent.cv.href;

// The veil. Scroll pulls it down from 12% to 55% of the sheet and no further —
// the rest is what the download is for. Deliberate: see the CTA copy.
const REVEAL_FROM = "12%";
const REVEAL_TO = "55%";
const REVEAL_ENDS_AT = 0.72; // fraction of the pinned runway
const CTA_APPEARS_AT = 0.22;

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-frost/10 pt-8 mt-8 first:border-0 first:pt-0 first:mt-0">
      <h3 className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-frost/40 mb-5">
        {label}
      </h3>
      {children}
    </div>
  );
}

function Entry({ entry }: { entry: CvEntry }) {
  return (
    <div className="mb-7 last:mb-0">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
        <span className="text-frost font-medium text-base sm:text-lg">
          {entry.org}
        </span>
        <span className="shrink-0 text-[11px] sm:text-xs uppercase tracking-wider text-frost/40">
          {entry.period}
        </span>
      </div>
      <div className="mt-1 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-4">
        <span className="text-crystal-500 text-sm sm:text-[15px]">{entry.role}</span>
        <span className="shrink-0 text-[11px] sm:text-xs text-frost/30">
          {entry.place}
        </span>
      </div>
      <ul className="mt-3.5 space-y-2.5">
        {entry.bullets.map((b) => (
          <li
            key={b}
            className="relative pl-5 text-sm sm:text-[15px] font-light leading-relaxed text-frost/65"
          >
            <span className="absolute left-0 top-[0.65em] h-1 w-1 rounded-full bg-crystal-500/60" />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CV() {
  const runwayRef = useRef<HTMLDivElement>(null);
  const [ctaVisible, setCtaVisible] = useState(false);

  // Progress across the pinned runway: 0 when it locks, 1 when it releases.
  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ["start start", "end end"],
  });

  const reveal = useTransform(
    scrollYProgress,
    [0, REVEAL_ENDS_AT],
    [REVEAL_FROM, REVEAL_TO],
    { clamp: true },
  );

  // Solid down to `reveal`, then a soft falloff into nothing.
  const mask = useMotionTemplate`linear-gradient(to bottom, #000 0%, #000 ${reveal}, transparent calc(${reveal} + 20%))`;

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v >= CTA_APPEARS_AT) setCtaVisible(true);
  });

  return (
    <section
      id="cv"
      aria-labelledby="cv-heading"
      className="relative z-10 bg-night-900 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-16"
    >
      <SectionHeading
        id="cv-heading"
        eyebrow="Track Record"
        title="CV"
        subtitle={cvData.title}
        titleClassName="frost-text"
      />

      {/* Scroll runway — gives the pinned sheet room to unveil */}
      <div ref={runwayRef} className="relative h-[170vh] sm:h-[200vh] mt-10">
        <div className="sticky top-[8vh] sm:top-[10vh]">
          <motion.div
            style={{ maskImage: mask, WebkitMaskImage: mask }}
            className="mx-auto max-w-3xl max-h-[68vh] sm:max-h-[72vh] overflow-hidden rounded-3xl border border-frost/15 bg-white/3 px-5 sm:px-8 md:px-12 py-9 sm:py-12"
          >
            <p className="text-frost/80 font-light leading-relaxed text-[15px] sm:text-lg">
              {cvData.summary}
            </p>

            <Block label="Skills">
              {cvData.skills.map((group) => (
                <div key={group.label} className="mb-5 last:mb-0">
                  <div className="text-frost text-sm font-medium mb-3">
                    {group.label}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-frost/12 bg-white/3 px-3 py-1 text-[11px] sm:text-xs text-frost/60"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </Block>

            <Block label="Experience">
              {cvData.experience.map((entry) => (
                <Entry key={entry.org} entry={entry} />
              ))}
            </Block>

            <Block label="Projects">
              {cvData.projects.map((entry) => (
                <Entry key={entry.org} entry={entry} />
              ))}
            </Block>

            <Block label="Education">
              {cvData.education.map((ed) => (
                <div key={ed.degree} className="mb-5 last:mb-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                    <span className="text-frost font-medium text-base">
                      {ed.school}
                    </span>
                    <span className="shrink-0 text-[11px] sm:text-xs uppercase tracking-wider text-frost/40">
                      {ed.period}
                    </span>
                  </div>
                  <div className="mt-1 text-frost/60 font-light text-sm sm:text-[15px]">
                    {ed.degree}
                  </div>
                </div>
              ))}
            </Block>

            <Block label="Additional">
              {cvData.additional.map((row) => (
                <div key={row.label} className="mb-3 last:mb-0 flex flex-col sm:flex-row sm:gap-4">
                  <span className="shrink-0 sm:w-44 text-frost text-sm font-medium">
                    {row.label}
                  </span>
                  <span className="text-frost/60 font-light text-sm sm:text-[15px]">
                    {row.value}
                  </span>
                </div>
              ))}
            </Block>
          </motion.div>

          {/* Sits in the falloff, so the veil reads as an invitation */}
          <motion.div
            initial={false}
            animate={{ opacity: ctaVisible ? 1 : 0, y: ctaVisible ? 0 : 14 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto mt-6 flex max-w-3xl flex-col items-center gap-2.5"
          >
            <a
              href={CV_HREF}
              target="_blank"
              rel="noopener noreferrer"
              aria-hidden={!ctaVisible}
              tabIndex={ctaVisible ? 0 : -1}
              className={`${
                ctaVisible ? "pointer-events-auto" : "pointer-events-none"
              } inline-flex items-center gap-2.5 rounded-full border border-crystal-500/40 bg-night-900/85 px-6 py-3 text-sm font-medium text-frost backdrop-blur-md transition-colors hover:border-crystal-500`}
            >
              <FileDown size={17} strokeWidth={1.6} className="text-crystal-500" />
              Unlock the full CV
              <span className="text-[10px] uppercase tracking-wider text-frost/35">
                PDF
              </span>
            </a>
            <span className="text-[11px] text-frost/30">
              You&apos;re seeing about half. The rest is in the file.
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
