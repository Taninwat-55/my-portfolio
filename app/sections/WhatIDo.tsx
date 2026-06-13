"use client";

import { FadeIn } from "../components/FadeIn";
import { siteContent } from "../data";

export function WhatIDo() {
  return (
    <section
      id="work"
      className="relative bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="text-night-900 font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          What I Do
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {siteContent.whatIDo.map((item, i) => (
          <FadeIn key={item.title} delay={i * 0.1} y={30}>
            <div
              className="group flex flex-col sm:flex-row gap-4 sm:gap-10 md:gap-14 py-8 sm:py-10 md:py-12"
              style={{
                borderTop: i === 0 ? "none" : "1px solid rgba(12, 12, 12, 0.15)",
              }}
            >
              <span
                className="font-black leading-none shrink-0 text-transparent transition-colors duration-300 group-hover:text-crystal-600 [-webkit-text-stroke:2px_#0C0C0C]"
                style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-3 sm:pt-3">
                <h3
                  className="text-night-900 font-medium uppercase"
                  style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-night-900 font-light leading-relaxed max-w-2xl opacity-60"
                  style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}
                >
                  {item.body}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
