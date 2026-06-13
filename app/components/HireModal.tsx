"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
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
            className="fixed inset-0 z-60 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Quick contact options"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{
              duration: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed z-61 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(380px,calc(100vw-2rem))]"
          >
            <div className="rounded-2xl border border-frost/15 bg-night-800 shadow-xl shadow-black/40 overflow-hidden">
              {/* Header */}
              <div className="flex items-start justify-between px-5 pt-5 pb-3">
                <div className="flex items-center gap-3">
                  <Image
                    src="/assets/Ice_3D_Avatar.webp"
                    alt="Ice — 3D avatar"
                    width={48}
                    height={48}
                    className="rounded-full border border-frost/15 bg-night-900 object-cover"
                  />
                  <div>
                    <div className="text-[10px] tracking-[0.25em] uppercase text-crystal-500 mb-1">
                      Quick Actions
                    </div>
                    <div className="text-sm text-frost">
                      Let&apos;s work together
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close contact modal"
                  className="p-1.5 rounded-lg text-frost/40 hover:text-frost hover:bg-white/5 transition-colors"
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
                  className="w-full flex items-center gap-3.5 px-3 py-3 rounded-xl text-left hover:bg-white/5 transition-colors group"
                >
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-crystal-500/10 border border-crystal-500/30 flex items-center justify-center">
                    {copied ? (
                      <Check size={18} strokeWidth={1.8} className="text-crystal-300" />
                    ) : (
                      <Mail size={18} strokeWidth={1.5} className="text-crystal-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-frost">
                      {copied ? "Copied!" : "Copy Email"}
                    </div>
                    <div className="text-[12px] text-frost/50 truncate">
                      {personalInfo.email}
                    </div>
                  </div>
                  <div className="shrink-0 text-[9px] tracking-wider uppercase text-frost/30 group-hover:text-frost/60 transition-colors">
                    {copied ? "" : "1-click"}
                  </div>
                </button>

                {/* Download CV */}
                <a
                  href={siteContent.cvLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-3.5 px-3 py-3 rounded-xl text-left hover:bg-white/5 transition-colors group"
                  onClick={onClose}
                >
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-crystal-500/10 border border-crystal-500/30 flex items-center justify-center">
                    <FileDown size={18} strokeWidth={1.5} className="text-crystal-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-frost">
                      Download CV
                    </div>
                    <div className="text-[12px] text-frost/50">
                      PDF · Opens in new tab
                    </div>
                  </div>
                  <div className="shrink-0 text-[9px] tracking-wider uppercase text-frost/30 group-hover:text-frost/60 transition-colors">
                    PDF
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-3.5 px-3 py-3 rounded-xl text-left hover:bg-white/5 transition-colors group"
                  onClick={onClose}
                >
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-crystal-500/10 border border-crystal-500/30 flex items-center justify-center">
                    <Linkedin size={18} strokeWidth={1.5} className="text-crystal-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-frost">
                      LinkedIn
                    </div>
                    <div className="text-[12px] text-frost/50">
                      Connect with me
                    </div>
                  </div>
                  <div className="shrink-0 text-[9px] tracking-wider uppercase text-frost/30 group-hover:text-frost/60 transition-colors">
                    Profile
                  </div>
                </a>
              </div>

              {/* Footer hint */}
              <div className="px-5 py-3 border-t border-frost/10">
                <div className="text-[10px] tracking-wider uppercase text-frost/30 text-center">
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
