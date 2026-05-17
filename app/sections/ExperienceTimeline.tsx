"use client";

import { motion } from "framer-motion";
import { experience } from "../data";

const WORK_COLOR = "#67c8f5";   // ice-400
const EDU_COLOR  = "#a899d4";   // designer

export function ExperienceTimeline() {
  return (
    <section
      id="experience"
      aria-label="Experience"
      className="relative border-t border-white/5 py-32 md:py-40 overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-white/[0.02] blur-[120px]"
      />

      <div className="relative container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="mb-20"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
            }}
            className="font-mono text-[11px] tracking-[0.3em] uppercase text-ice-400 mb-5"
          >
            03 / Experience
          </motion.div>
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
            }}
            className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05] text-zinc-50"
          >
            The path that built{" "}
            <span className="bg-gradient-to-r from-ice-200 via-ice-300 to-ice-500 bg-clip-text text-transparent">
              the perspective.
            </span>
          </motion.h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical rail */}
          <div
            aria-hidden
            className="absolute left-[5px] top-2 bottom-2 w-px bg-ice-400/15"
          />

          <div className="space-y-12">
            {experience.map((entry, index) => {
              const isWork = entry.type === "work";
              const dotColor = isWork ? WORK_COLOR : EDU_COLOR;
              const badgeBg = isWork ? "bg-ice-400/8 border-ice-400/20 text-ice-300" : "bg-[#a899d4]/8 border-[#a899d4]/20 text-[#a899d4]";

              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: index * 0.05,
                  }}
                  className="relative pl-10"
                >
                  {/* Dot */}
                  <div
                    aria-hidden
                    style={{ borderColor: dotColor }}
                    className="absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 bg-charcoal-950"
                  />

                  {/* Type badge */}
                  <div
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase mb-3 border ${badgeBg}`}
                  >
                    {isWork ? "Work" : "Education"}
                  </div>

                  <h3 className="text-zinc-50 font-semibold text-lg leading-snug mb-1">
                    {entry.role}
                  </h3>
                  <div className="font-mono text-[12px] text-charcoal-400 tracking-wide mb-3">
                    {entry.organization} · {entry.period}
                  </div>
                  <p className="text-charcoal-300 text-sm leading-relaxed max-w-2xl">
                    {entry.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
