"use client";

import { motion } from "framer-motion";

// Motion components are cached per element type so they are not recreated
// (and remounted) on every render.
const motionCache = new Map<React.ElementType, React.ElementType>();

function getMotionComponent(as: React.ElementType): React.ElementType {
  let component = motionCache.get(as);
  if (!component) {
    component = motion.create(as);
    motionCache.set(as, component);
  }
  return component;
}

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: React.ElementType;
  className?: string;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = "div",
  className,
}: FadeInProps) {
  const Component = getMotionComponent(as);

  return (
    // eslint-disable-next-line react-hooks/static-components -- components are cached at module level, never recreated
    <Component
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
}
