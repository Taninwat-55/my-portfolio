"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { marqueeImages } from "../data";

function MarqueeRow({
  images,
  x,
}: {
  images: string[];
  x: MotionValue<number>;
}) {
  return (
    <motion.div
      className="flex gap-3 w-max"
      style={{ x, willChange: "transform" }}
    >
      {[...images, ...images, ...images].map((src, i) => (
        <Image
          key={`${src}-${i}`}
          src={src}
          alt=""
          width={420}
          height={270}
          loading="lazy"
          className="rounded-2xl object-cover shrink-0 w-105 h-67.5"
        />
      ))}
    </motion.div>
  );
}

export function Marquee() {
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax runs on framer motion values, not React state. The previous version
  // called setOffset on every scroll event, which re-rendered this component —
  // and all 24 <Image> children — once per scroll frame. useTransform writes the
  // transform straight to the DOM and never touches the render cycle.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rowOneX = useTransform(scrollYProgress, [0, 1], [-200, 300]);
  const rowTwoX = useTransform(scrollYProgress, [0, 1], [200, -300]);

  const row1 = marqueeImages.slice(0, 4);
  const row2 = marqueeImages.slice(4);

  return (
    <section
      ref={sectionRef}
      aria-label="Screenshots of shipped work"
      // relative is load-bearing: useScroll needs a non-static target to measure
      // offsets against. The old version read offsetTop by hand so it didn't care.
      className="relative bg-night-900 pt-24 sm:pt-32 md:pt-40 pb-16 overflow-hidden"
    >
      <div className="flex flex-col gap-3 -rotate-2 scale-[1.06]">
        <MarqueeRow images={row1} x={rowOneX} />
        <MarqueeRow images={row2} x={rowTwoX} />
      </div>
    </section>
  );
}
