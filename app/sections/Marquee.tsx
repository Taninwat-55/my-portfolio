"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { marqueeImages } from "../data";

function MarqueeRow({ images, offset }: { images: string[]; offset: number }) {
  return (
    <div
      className="flex gap-3 w-max"
      style={{ transform: `translateX(${offset}px)`, willChange: "transform" }}
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
    </div>
  );
}

export function Marquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionTop = sectionRef.current.offsetTop;
      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const row1 = marqueeImages.slice(0, 4);
  const row2 = marqueeImages.slice(4);

  return (
    <section
      ref={sectionRef}
      aria-label="Screenshots of shipped work"
      className="bg-night-900 pt-24 sm:pt-32 md:pt-40 pb-16 overflow-hidden"
    >
      <div className="flex flex-col gap-3 -rotate-2 scale-[1.06]">
        <MarqueeRow images={row1} offset={offset - 200} />
        <MarqueeRow images={row2} offset={-(offset - 200)} />
      </div>
    </section>
  );
}
