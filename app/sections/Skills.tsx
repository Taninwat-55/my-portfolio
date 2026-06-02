"use client";

import { motion, useReducedMotion } from "framer-motion";
import { skills } from "../data";

const EASE = [0.22, 1, 0.36, 1] as const;

function SkillDots({ level }: { level: number }) {
  return (
    <span className="flex gap-1" aria-label={`Level ${level} of 3`}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`block w-1.5 h-1.5 rounded-full ${
            i < level ? "bg-clay-500" : "bg-thread"
          }`}
        />
      ))}
    </span>
  );
}

export function Skills() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section id="skills" aria-label="Skills" className="py-24 md:py-32 border-t border-border">
      <div className="container mx-auto px-6 max-w-5xl">

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-sm font-medium text-clay-500 tracking-widest uppercase mb-12"
        >
          Skills
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 border border-border rounded-2xl overflow-hidden">
          {skills.map((col, ci) => (
            <motion.div
              key={col.group}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{
                duration: 0.6,
                delay: reduced ? 0 : ci * 0.1,
                ease: EASE,
              }}
              className={`bg-sand-50 p-7 md:p-8 ${
                ci < skills.length - 1
                  ? "border-b border-border md:border-b-0 md:border-r"
                  : ""
              }`}
            >
              <h3 className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-300 mb-5 flex items-center gap-2">
                <span className="text-clay-400">▹</span>
                {col.group}
              </h3>

              <ul>
                {col.items.map(([name, level], ii) => (
                  <li
                    key={name}
                    className={`flex items-center justify-between py-2.5 ${
                      ii < col.items.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <span className="text-sm font-medium text-ink-700">{name}</span>
                    <SkillDots level={level} />
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
