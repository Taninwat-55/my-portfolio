"use client";

import { motion } from "framer-motion";
import { siteContent } from "../data";

export function WhatIDo() {
  return (
    <section id="what-i-do" aria-label="What I Do" className="py-24 md:py-32 bg-sand-200">
      <div className="container mx-auto px-6 max-w-5xl">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium text-clay-500 tracking-widest uppercase mb-16"
        >
          What I do
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {siteContent.whatIDo.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col"
            >
              <div className="w-8 h-px bg-clay-500 mb-5" aria-hidden />
              <h3 className="text-base font-semibold text-ink-900 mb-3">{item.title}</h3>
              <p className="text-sm leading-relaxed text-ink-500">{item.body}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
