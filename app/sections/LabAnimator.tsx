"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/**
 * Wraps the Lab section's content in a scroll-triggered fade-up with stagger.
 * Kept as a thin client wrapper so the parent section can stay a server component
 * (which is what allows it to read MDX posts directly via fs).
 */
export function LabAnimator({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={fadeUp}>
              {child}
            </motion.div>
          ))
        : (
          <motion.div variants={fadeUp}>{children}</motion.div>
        )}
    </motion.div>
  );
}
