"use client";

import { motion } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
}

/**
 * Scroll-triggered fade/slide wrapper.
 *
 * This used to accept an `as` prop and build the motion component at runtime via
 * motion.create(), cached in a module-level Map. Nothing in the app ever passed
 * `as`, so every instance was a div anyway — the machinery bought no flexibility
 * and cost a dynamically-created component type on every distinct element.
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
