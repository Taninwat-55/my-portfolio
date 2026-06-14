"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
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

  // Gaze tilt — the portrait leans toward the cursor on two axes so the flat
  // render reads as if it's tracking you. Disabled for reduced-motion users.
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 90, damping: 22, mass: 0.5 });
  const springY = useSpring(pointerY, { stiffness: 90, damping: 22, mass: 0.5 });
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4.5, 4.5]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [3.5, -3.5]);

  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (e: PointerEvent) => {
      pointerX.set(e.clientX / window.innerWidth - 0.5);
      pointerY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduceMotion, pointerX, pointerY]);

  return (
    <section
      className="relative h-screen flex flex-col"
      style={{ overflowX: "clip" }}
    >
      {/* Navbar */}
      <FadeIn delay={0} y={-20}>
        <nav
          aria-label="Main navigation"
          className="relative z-30 flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8"
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

      {/* Frost glow behind the portrait — pulled to the right */}
      <div
        aria-hidden
        className="absolute right-[-12%] bottom-[-12%] w-130 h-130 md:w-180 md:h-180 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(142, 201, 232, 0.16) 0%, rgba(142, 201, 232, 0.05) 45%, transparent 70%)",
        }}
      />

      {/* Hero portrait — offset right, cropped by the viewport edge */}
      <div className="absolute z-10 w-56 right-[-16%] top-[14%] sm:top-auto sm:bottom-0 sm:right-[-6%] sm:w-80 md:right-[-2%] md:w-[34vw] lg:right-[3%] lg:w-[36vw]">
        <FadeIn delay={0.6} y={30}>
          <motion.div
            style={{
              rotateX: reduceMotion ? 0 : rotateX,
              rotateY: reduceMotion ? 0 : rotateY,
              transformPerspective: 900,
              transformStyle: "preserve-3d",
            }}
          >
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
          </motion.div>
        </FadeIn>
      </div>

      {/* Left cluster — vertically centered in the negative space */}
      <div className="relative z-20 my-auto px-6 md:px-10 py-8">
        {/* Status pill */}
        <FadeIn delay={0.3} y={20}>
          <div className="mb-5 sm:mb-7 flex w-fit items-center gap-2.5 rounded-full border border-frost/15 bg-white/3 backdrop-blur-sm px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-clay-500 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-clay-500" />
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.22em] uppercase text-frost/60 whitespace-nowrap">
              Open to work · Copenhagen
            </span>
          </div>
        </FadeIn>

        {/* Stacked name */}
        <div className="overflow-hidden">
          <FadeIn delay={0.15} y={40}>
            <h1 className="text-left">
              <span className="block ml-1 sm:ml-2 font-medium uppercase tracking-[0.18em] text-frost/55 text-sm sm:text-base md:text-xl">
                Hi, I&apos;m
              </span>
              <span className="frost-text block font-black uppercase tracking-tight leading-[0.78] text-[30vw] sm:text-[25vw] md:text-[22vw] lg:text-[20vw]">
                Ice
              </span>
            </h1>
          </FadeIn>
        </div>

        {/* Tagline + contact — stacked beneath the name */}
        <FadeIn delay={0.45} y={20}>
          <div className="mt-5 sm:mt-6 flex flex-col items-start gap-6 sm:gap-7">
            <p
              className="text-frost font-light uppercase tracking-wide leading-snug max-w-55 md:max-w-72"
              style={{ fontSize: "clamp(0.75rem, 1.3vw, 1.4rem)" }}
            >
              {siteContent.heroTagline}
            </p>
            <ContactButton />
          </div>
        </FadeIn>
      </div>

      <HireModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  );
}
