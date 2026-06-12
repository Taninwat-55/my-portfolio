"use client";

import { useState } from "react";
import { HireModal } from "./HireModal";

interface ContactButtonProps {
  label?: string;
  className?: string;
}

export function ContactButton({ label = "Contact Me", className = "" }: ContactButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        style={{
          background:
            "linear-gradient(123deg, #1A0A00 7%, #C4713E 37%, #8B3E10 72%, #E8965A 100%)",
          boxShadow:
            "0px 4px 4px rgba(196, 113, 62, 0.25), 4px 4px 12px #8B3E10 inset",
          outline: "2px solid #FFFFFF",
          outlineOffset: "-3px",
        }}
        className={`rounded-full text-white font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base transition-transform duration-200 hover:scale-[1.04] active:scale-[0.98] ${className}`}
      >
        {label}
      </button>

      <HireModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
