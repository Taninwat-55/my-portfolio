"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, FileDown, Linkedin, Check, X } from "lucide-react";
import { personalInfo, siteContent } from "../data";

interface HireModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HireModal({ isOpen, onClose }: HireModalProps) {
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = personalInfo.email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-charcoal-950/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Quick contact options"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{
              duration: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed z-[61] top-20 right-4 sm:right-8 md:right-12 w-[min(360px,calc(100vw-2rem))] origin-top-right"
          >
            <div className="rounded-2xl border border-white/10 bg-charcoal-900/95 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-5 pt-5 pb-3">
                <div>
                  <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-ice-400 mb-1">
                    Quick Actions
                  </div>
                  <div className="text-sm text-charcoal-300">
                    Let&apos;s work together
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close contact modal"
                  className="p-1.5 rounded-lg text-charcoal-400 hover:text-zinc-100 hover:bg-white/5 transition-colors"
                >
                  <X size={16} strokeWidth={1.5} />
                </button>
              </div>

              {/* Actions */}
              <div className="px-3 pb-3 space-y-1">
                {/* Copy Email */}
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="w-full flex items-center gap-3.5 px-3 py-3 rounded-xl text-left hover:bg-white/[0.04] transition-colors group"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-ice-400/10 border border-ice-400/20 flex items-center justify-center transition-colors group-hover:bg-ice-400/15">
                    {copied ? (
                      <Check size={18} strokeWidth={1.8} className="text-green-400" />
                    ) : (
                      <Mail size={18} strokeWidth={1.5} className="text-ice-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-zinc-100">
                      {copied ? "Copied!" : "Copy Email"}
                    </div>
                    <div className="text-[12px] text-charcoal-400 truncate">
                      {personalInfo.email}
                    </div>
                  </div>
                  <div className="flex-shrink-0 font-mono text-[9px] tracking-wider uppercase text-charcoal-500 group-hover:text-charcoal-300 transition-colors">
                    {copied ? "" : "1-click"}
                  </div>
                </button>

                {/* Download CV */}
                <a
                  href={siteContent.cvLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-3.5 px-3 py-3 rounded-xl text-left hover:bg-white/[0.04] transition-colors group"
                  onClick={onClose}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-ice-400/10 border border-ice-400/20 flex items-center justify-center transition-colors group-hover:bg-ice-400/15">
                    <FileDown size={18} strokeWidth={1.5} className="text-ice-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-zinc-100">
                      Download CV
                    </div>
                    <div className="text-[12px] text-charcoal-400">
                      PDF · Opens in new tab
                    </div>
                  </div>
                  <div className="flex-shrink-0 font-mono text-[9px] tracking-wider uppercase text-charcoal-500 group-hover:text-charcoal-300 transition-colors">
                    PDF
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-3.5 px-3 py-3 rounded-xl text-left hover:bg-white/[0.04] transition-colors group"
                  onClick={onClose}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-ice-400/10 border border-ice-400/20 flex items-center justify-center transition-colors group-hover:bg-ice-400/15">
                    <Linkedin size={18} strokeWidth={1.5} className="text-ice-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-zinc-100">
                      LinkedIn
                    </div>
                    <div className="text-[12px] text-charcoal-400">
                      Connect with me
                    </div>
                  </div>
                  <div className="flex-shrink-0 font-mono text-[9px] tracking-wider uppercase text-charcoal-500 group-hover:text-charcoal-300 transition-colors">
                    Profile
                  </div>
                </a>
              </div>

              {/* Footer hint */}
              <div className="px-5 py-3 border-t border-white/5">
                <div className="font-mono text-[10px] tracking-wider uppercase text-charcoal-500 text-center">
                  Press ESC to close
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
