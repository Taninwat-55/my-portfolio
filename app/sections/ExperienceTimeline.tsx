"use client";

import { motion } from "framer-motion";
import { experience } from "../data";

export function ExperienceTimeline() {
  return (
    <section
      id="experience"
      aria-label="Experience"
      className="relative py-24 md:py-36 border-t border-border"
    >
      <div className="container mx-auto px-6 max-w-4xl">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium text-clay-500 tracking-widest uppercase mb-16"
        >
          Background
        </motion.p>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical rail */}
          <div
            aria-hidden
            className="absolute left-[5px] top-2 bottom-2 w-px bg-thread"
          />

          <div className="space-y-10">
            {experience.map((entry, index) => {
              const isWork = entry.type === "work";

              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: index * 0.04,
                  }}
                  className="relative pl-10"
                >
                  {/* Dot */}
                  <div
                    aria-hidden
                    className={`absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 bg-sand-100 ${
                      isWork ? "border-clay-500" : "border-ink-300"
                    }`}
                  />

                  {/* Type badge */}
                  <div
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wider uppercase mb-3 ${
                      isWork
                        ? "bg-clay-100 text-clay-600"
                        : "bg-sand-200 text-ink-500"
                    }`}
                  >
                    {isWork ? "Work" : "Education"}
                  </div>

                  <h3 className="text-ink-900 font-semibold text-lg leading-snug mb-1">
                    {entry.role}
                  </h3>
                  <div className="text-xs text-ink-400 tracking-wide mb-3">
                    {entry.organization} · {entry.period}
                  </div>
                  <p className="text-sm leading-relaxed text-ink-500 max-w-2xl">
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
