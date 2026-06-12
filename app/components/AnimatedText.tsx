"use client";

import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

function Char({
  char,
  progress,
  range,
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return <motion.span style={{ opacity }}>{char}</motion.span>;
}

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const words = useMemo(() => {
    const result: { word: string; start: number }[] = [];
    let acc = 0;
    for (const word of text.split(" ")) {
      result.push({ word, start: acc });
      acc += word.length + 1;
    }
    return result;
  }, [text]);
  const total = text.length;

  return (
    <p ref={ref} className={className} style={style}>
      {words.map(({ word, start }, wi) => {
        return (
          <span key={wi} className="inline-block">
            {word.split("").map((char, ci) => {
              const idx = start + ci;
              return (
                <Char
                  key={ci}
                  char={char}
                  progress={scrollYProgress}
                  range={[idx / total, Math.min((idx + 1) / total + 0.05, 1)]}
                />
              );
            })}
            {wi < words.length - 1 && <span>&nbsp;</span>}
          </span>
        );
      })}
    </p>
  );
}
