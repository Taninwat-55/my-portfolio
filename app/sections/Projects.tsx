"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { cases, siteContent, type CaseStudy } from "../data";
import { useMode } from "../components/ModeContext";

const EASE = [0.22, 1, 0.36, 1] as const;
const SLIDE_DURATION = 4000;

// ── Image slider ──────────────────────────────────────────────────────────────

function ImageSlider({ images, title, tag }: { images: string[]; title: string; tag: string }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduced = useReducedMotion() ?? false;

  const go = useCallback((next: number, dir: number) => {
    setDirection(dir);
    setCurrent(next);
  }, []);

  const prev = () => go((current - 1 + images.length) % images.length, -1);
  const next = useCallback(() => go((current + 1) % images.length, 1), [current, go, images.length]);

  // Auto-advance
  useEffect(() => {
    if (images.length <= 1 || reduced) return;
    const id = setInterval(next, SLIDE_DURATION);
    return () => clearInterval(id);
  }, [next, images.length, reduced]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div className="relative w-full aspect-[16/9] bg-sand-200 overflow-hidden rounded-t-[20px] group">

      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease: EASE }}
          className="absolute inset-0"
        >
          <Image
            src={images[current]}
            alt={`${title} screenshot ${current + 1}`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 900px"
            priority={current === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Tag pill */}
      <span className="absolute top-4 left-4 z-10 font-mono text-[11px] tracking-[0.14em] uppercase text-ink-700 bg-sand-50/80 backdrop-blur-sm border border-border px-3 py-1.5 rounded-full">
        {tag}
      </span>

      {/* Nav arrows — only when multiple images */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous screenshot"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-sand-50/80 backdrop-blur-sm border border-border flex items-center justify-center text-ink-500 opacity-0 group-hover:opacity-100 hover:bg-sand-50 transition-all"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            onClick={next}
            aria-label="Next screenshot"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-sand-50/80 backdrop-blur-sm border border-border flex items-center justify-center text-ink-500 opacity-0 group-hover:opacity-100 hover:bg-sand-50 transition-all"
          >
            <ChevronRight size={15} />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i, i > current ? 1 : -1)}
                aria-label={`Screenshot ${i + 1}`}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "bg-sand-50 w-4" : "bg-sand-50/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ── Text-forward header (for cases without screenshots, e.g. Trailr) ──────────

function TextForwardHeader({ tag, title }: { tag: string; title: string }) {
  return (
    <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-[20px] bg-gradient-to-br from-clay-100 via-sand-100 to-sand-200 flex items-center justify-center">
      <span className="absolute top-4 left-4 z-10 font-mono text-[11px] tracking-[0.14em] uppercase text-ink-700 bg-sand-50/80 backdrop-blur-sm border border-border px-3 py-1.5 rounded-full">
        {tag}
      </span>
      <span aria-hidden className="font-bold text-4xl md:text-6xl tracking-tight text-clay-500/25 select-none px-6 text-center">
        {title}
      </span>
    </div>
  );
}

// ── Featured case study card ──────────────────────────────────────────────────

function FeaturedCard({ c, index }: { c: CaseStudy; index: number }) {
  const reduced = useReducedMotion() ?? false;
  const mode = useMode();
  const isPm = mode === "pm";
  const buildLabel = isPm ? "The decisions" : "How I built it";
  const buildBody = isPm && c.pmEngineering ? c.pmEngineering : c.engineering;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.7, delay: reduced ? 0 : index * 0.1, ease: EASE }}
      className="border border-border rounded-[22px] overflow-hidden bg-sand-50 hover:border-clay-300 transition-colors mb-7"
    >
      {c.images.length > 0 ? (
        <ImageSlider images={c.images} title={c.title} tag={c.tag} />
      ) : (
        <TextForwardHeader tag={c.tag} title={c.title} />
      )}

      <div className="p-7 md:p-10">
        <div className="font-mono text-[13px] text-clay-500 tracking-[0.1em] mb-3">
          CASE STUDY · {c.n}
        </div>

        <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-ink-900 leading-tight mb-2">
          {c.title}
        </h3>
        <p className="font-mono text-[13px] text-ink-400 mb-6">{c.sub}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-300 mb-1.5">
              The problem
            </h4>
            <p className="text-sm text-ink-600 leading-relaxed">{c.challenge}</p>
          </div>
          <div>
            <h4 className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-300 mb-1.5">
              {buildLabel}
            </h4>
            <p className="text-sm text-ink-600 leading-relaxed">{buildBody}</p>
          </div>
        </div>

        {/* Metrics */}
        <div className="flex flex-wrap gap-6 border-t border-b border-border py-4 mb-5">
          {c.metrics.map((m) => (
            <div key={m.k}>
              <div className="text-2xl md:text-3xl font-bold tracking-tight text-ink-900">{m.v}</div>
              <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-400">{m.k}</div>
            </div>
          ))}
        </div>

        {/* Stack + links */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {c.stack.map((s) => (
              <span key={s} className="font-mono text-[11px] text-ink-600 px-2.5 py-1 border border-border rounded-md bg-sand-100">
                {s}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            {c.links.demo && (
              <a href={c.links.demo} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-clay-500 text-white text-sm font-medium hover:bg-clay-600 transition-colors">
                <ArrowUpRight size={14} /> {c.links.demoLabel ?? "Live demo"}
              </a>
            )}
            {c.links.code && (
              <a href={c.links.code} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-ink-700 text-sm font-medium hover:border-clay-400 hover:text-clay-500 transition-colors">
                <Github size={14} /> Source code
              </a>
            )}
            {c.links.docs && (
              <a href={c.links.docs} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-ink-700 text-sm font-medium hover:border-clay-400 hover:text-clay-500 transition-colors">
                <FileText size={14} /> Read PRD
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ── Mini card ─────────────────────────────────────────────────────────────────

function MiniCard({ c, index }: { c: CaseStudy; index: number }) {
  const reduced = useReducedMotion() ?? false;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.6, delay: reduced ? 0 : index * 0.08, ease: EASE }}
      className="border border-border rounded-xl overflow-hidden bg-sand-50 hover:border-clay-300 transition-colors flex flex-col"
    >
      <ImageSlider images={c.images} title={c.title} tag={c.tag} />

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-ink-900 mb-1">{c.title}</h3>
        <p className="text-sm text-ink-500 leading-relaxed mb-4 flex-1">{c.sub}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {c.stack.slice(0, 4).map((s) => (
            <span key={s} className="font-mono text-[11px] text-ink-600 px-2 py-0.5 border border-border rounded bg-sand-100">
              {s}
            </span>
          ))}
          {c.stack.length > 4 && (
            <span className="font-mono text-[11px] text-ink-400 px-2 py-0.5">+{c.stack.length - 4}</span>
          )}
        </div>

        <div className="flex gap-2">
          {c.links.demo && (
            <a href={c.links.demo} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-clay-500 text-white text-xs font-medium hover:bg-clay-600 transition-colors">
              <ArrowUpRight size={12} /> Demo
            </a>
          )}
          {c.links.code && (
            <a href={c.links.code} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border text-ink-700 text-xs font-medium hover:border-clay-400 hover:text-clay-500 transition-colors">
              <Github size={12} /> Code
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export function Projects() {
  const mode = useMode();
  const { featuredCaseIds, miniCaseIds, projectsHeading } = siteContent[mode];
  const byId = new Map(cases.map((c) => [c.id, c]));
  const resolve = (ids: string[]) =>
    ids.map((id) => byId.get(id)).filter((c): c is CaseStudy => Boolean(c));
  const featured = resolve(featuredCaseIds);
  const mini = resolve(miniCaseIds);

  return (
    <section id="projects" aria-label="Projects" className="py-24 md:py-32 border-t border-border">
      <div className="container mx-auto px-6 max-w-5xl">

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-sm font-medium text-clay-500 tracking-widest uppercase mb-4"
        >
          Selected work
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
          className="text-3xl md:text-4xl font-bold tracking-tight text-ink-900 mb-16"
        >
          {projectsHeading}
        </motion.h2>

        {featured.map((c, i) => (
          <FeaturedCard key={c.n} c={c} index={i} />
        ))}

        {mini.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            {mini.map((c, i) => (
              <MiniCard key={c.n} c={c} index={i} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
