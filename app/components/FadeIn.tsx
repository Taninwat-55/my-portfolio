"use client";

import { motion } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  /**
   * Render the entrance in CSS instead of framer-motion. USE THIS ABOVE THE FOLD.
   *
   * The default path server-renders opacity:0 and only animates once React has
   * hydrated, which is correct below the fold — whileInView is the whole feature
   * there, and the reader has not scrolled to it yet. Above the fold it is a
   * performance bug: on a throttled phone the first screen stayed invisible until
   * ~435 KB of JS had run, and LCP on the homepage measured 7.9s against 1.9s
   * once the same animation was expressed in CSS. See .fade-enter in globals.css
   * for the measurements.
   *
   * `duration` is not honoured here — the CSS class owns it, so that every
   * first-screen entrance on the site shares one timing.
   */
  immediate?: boolean;
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
  immediate = false,
}: FadeInProps) {
  if (immediate) {
    return (
      <div
        className={className ? `fade-enter ${className}` : "fade-enter"}
        style={
          {
            animationDelay: `${delay}s`,
            "--fade-x": `${x}px`,
            "--fade-y": `${y}px`,
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    );
  }

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
