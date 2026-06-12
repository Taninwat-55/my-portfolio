"use client";

import { useState } from "react";
import Image from "next/image";
import { FadeIn } from "../components/FadeIn";
import { Magnet } from "../components/Magnet";
import { ContactButton } from "../components/ContactButton";
import { HireModal } from "../components/HireModal";
import { siteContent } from "../data";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
];

const navLinkClasses =
  "text-frost font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200";

export function Hero() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <section
      className="relative h-screen flex flex-col"
      style={{ overflowX: "clip" }}
    >
      {/* Navbar */}
      <FadeIn delay={0} y={-20}>
        <nav
          aria-label="Main navigation"
          className="flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8"
        >
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className={navLinkClasses}>
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => setContactOpen(true)}
            className={navLinkClasses}
          >
            Contact
          </button>
        </nav>
      </FadeIn>

      {/* Hero heading */}
      <div className="overflow-hidden">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading w-full text-center font-black uppercase tracking-tight leading-none whitespace-nowrap text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5">
            Hi, i&apos;m Ice
          </h1>
        </FadeIn>
      </div>

      {/* Frost glow behind the portrait */}
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 bottom-[-10%] w-130 h-130 md:w-180 md:h-180 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(142, 201, 232, 0.16) 0%, rgba(142, 201, 232, 0.05) 45%, transparent 70%)",
        }}
      />

      {/* Hero portrait */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-70 sm:w-90 md:w-110 lg:w-130 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0">
        <FadeIn delay={0.6} y={30}>
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <Image
              src="/assets/Ice_3D_Avatar.webp"
              alt="3D avatar of Ice — Taninwat Kaewpankan"
              width={1040}
              height={1040}
              priority
              className="w-full h-auto select-none"
              draggable={false}
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* Bottom bar */}
      <div className="relative z-20 mt-auto flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 pointer-events-none">
        <FadeIn delay={0.35} y={20} className="pointer-events-auto">
          <div className="flex flex-col items-start gap-3 sm:gap-4">
            <div className="flex items-center gap-2.5 rounded-full border border-frost/15 bg-white/3 backdrop-blur-sm px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-clay-500 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-clay-500" />
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.22em] uppercase text-frost/60 whitespace-nowrap">
                Open to work · Copenhagen
              </span>
            </div>
            <p
              className="text-frost font-light uppercase tracking-wide leading-snug max-w-40 sm:max-w-55 md:max-w-65"
              style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}
            >
              {siteContent.heroTagline}
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.5} y={20} className="pointer-events-auto">
          <ContactButton />
        </FadeIn>
      </div>

      <HireModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  );
}
