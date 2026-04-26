"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap } from "lucide-react";
import {
  TradeoffSimulator,
  type SimulatorData,
} from "../sections/TradeoffSimulator";

// ─── Decision Modal ─────────────────────────────────────────────────────────

export function DecisionModalTrigger({
  data,
  title,
}: {
  data: SimulatorData;
  title: string;
}) {
  const [open, setOpen] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    },
    []
  );

  useEffect(() => {
    if (open) {
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }
  }, [open, onKeyDown]);

  return (
    <>
      {/* Trigger button — compact, fits in the narrative flow */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Play the interactive decision simulator for ${title}`}
        className="group w-full text-left rounded-xl border border-white/5 bg-charcoal-900/40 hover:border-ice-400/30 hover:bg-charcoal-900/60 transition-all duration-300 p-5 mt-2"
      >
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-ice-400/10 border border-ice-400/20 flex items-center justify-center group-hover:bg-ice-400/15 group-hover:border-ice-400/40 transition-all">
            <Zap size={18} className="text-ice-300" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-ice-400 mb-1">
              Decision Point · {title}
            </div>
            <div className="text-sm text-charcoal-200 leading-relaxed line-clamp-1">
              {data.question}
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-ice-300 group-hover:text-ice-200 transition-colors shrink-0">
            Play
            <motion.span
              className="inline-block"
              animate={{ x: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </div>
        </div>
      </button>

      {/* Modal overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            onClick={() => setOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-charcoal-950/85 backdrop-blur-md" />

            {/* Modal panel */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-charcoal-950 shadow-2xl shadow-black/40"
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="sticky top-4 right-4 float-right z-10 w-8 h-8 rounded-full bg-charcoal-900/80 border border-white/10 flex items-center justify-center text-charcoal-300 hover:text-zinc-50 hover:border-white/20 transition-colors mr-4 mt-4"
                aria-label="Close decision modal"
              >
                <X size={16} />
              </button>

              {/* Header */}
              <div className="px-6 pt-6 pb-4 md:px-8 md:pt-8 border-b border-white/5">
                <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-ice-400 mb-3">
                  Interactive · Trade-off Simulator
                </div>
                <p className="text-sm text-charcoal-300 leading-relaxed max-w-xl">
                  Pick a path, weigh both lenses, then see the call I made.
                </p>
              </div>

              {/* Simulator */}
              <div className="p-4 md:p-6">
                <TradeoffSimulator data={data} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
