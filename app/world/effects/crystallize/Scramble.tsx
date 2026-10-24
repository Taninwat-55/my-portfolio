"use client";

import { useEffect, useRef, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useWorldMode } from "../../useWorldMode";
import styles from "./crystallize.module.css";

const GLYPHS = "#%&*+=/<>{}[]01";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  /**
   * loader: resolves as the loader fades, first visit only (on a repeat visit
   * the text is already being read, and read text never moves).
   * scroll: resolves as it scrolls up through the lower half of the viewport.
   */
  trigger: "loader" | "scroll";
};

/**
 * Words that start as signal and settle into type. The real text sits in a
 * visually hidden span from the first byte of HTML, so screen readers and
 * crawlers only ever get the sentence; the scramble runs on an aria-hidden
 * twin. Without JS or in the quiet world, the twin simply shows the text.
 */
export function Scramble({ text, as: Tag = "p", className, trigger }: Props) {
  const visual = useRef<HTMLSpanElement>(null);
  const mode = useWorldMode();

  useEffect(() => {
    const el = visual.current;
    if (!el || mode !== "full") return;
    if (trigger === "loader" && document.documentElement.dataset.loaderSeen) return;

    // Earlier characters settle first, with noise, so it reads line by line
    // without looking like a typewriter.
    const thresholds = Array.from(text, (_, i) => (i / text.length) * 0.6 + Math.random() * 0.4);
    const render = (p: number) => {
      let html = "";
      let glyphs = "";
      Array.from(text).forEach((char, i) => {
        if (char === " " || p >= thresholds[i]) {
          if (glyphs) html += `<span class="${styles.glyph}">${escape(glyphs)}</span>`;
          glyphs = "";
          html += escape(char);
        } else {
          glyphs += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      });
      if (glyphs) html += `<span class="${styles.glyph}">${escape(glyphs)}</span>`;
      el.innerHTML = html;
    };

    if (trigger === "loader") {
      const state = { p: 0 };
      render(0);
      const tween = gsap.to(state, {
        p: 1,
        duration: 1.2,
        delay: 0.5,
        ease: "none",
        onUpdate: () => render(state.p),
      });
      return () => {
        tween.kill();
        el.textContent = text;
      };
    }

    gsap.registerPlugin(ScrollTrigger);
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      end: "top 45%",
      onUpdate: (self) => render(self.progress),
    });
    render(st.progress);
    return () => {
      st.kill();
      el.textContent = text;
    };
  }, [mode, text, trigger]);

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span ref={visual} aria-hidden="true">
        {text}
      </span>
    </Tag>
  );
}
