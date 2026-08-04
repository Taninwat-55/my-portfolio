"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HireModal } from "./HireModal";

const NAV_LINKS = [
  { label: "About", id: "about" },
  { label: "Work", id: "work" },
  { label: "Projects", id: "projects" },
];

/**
 * Floating pill navigation for the homepage.
 *
 * Fixed rather than in-flow on purpose: the old hero nav scrolled away, which
 * put "Say hi" out of reach for anyone reading further down the page. Subpages
 * keep their own <Navbar />, which does a different job (back-links).
 */
export function PillNav() {
  const [contactOpen, setContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const scrolledRef = useRef(false);

  // Shadow appears only once the pill has left the hero, so it stays weightless
  // over the portrait and gains a lift once it floats over content. The ref guard
  // means setState is only called on the two frames where the threshold is
  // actually crossed, not on every scroll event.
  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 100;
      if (next === scrolledRef.current) return;
      scrolledRef.current = next;
      setScrolled(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy — whichever section crosses the middle band of the viewport owns
  // the active pill. Nothing is active while the hero fills the screen.
  useEffect(() => {
    const sections = NAV_LINKS.map(({ id }) =>
      document.getElementById(id)
    ).filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
        setActiveId(visible.length > 0 ? visible[0].target.id : null);
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
        <nav
          aria-label="Main navigation"
          className={`inline-flex max-w-full items-center gap-0.5 rounded-full border border-frost/10 bg-night-800/70 p-1.5 backdrop-blur-md transition-shadow duration-300 sm:gap-1 ${
            scrolled ? "shadow-lg shadow-black/40" : "shadow-none"
          }`}
        >
          <Link
            href="/"
            aria-label="Home"
            className="shrink-0 px-1.5 text-sm font-bold tracking-tighter text-frost transition-opacity hover:opacity-70 sm:px-3 sm:text-base"
          >
            Ice<span className="text-crystal-500">.</span>
          </Link>

          <span aria-hidden className="mx-0.5 hidden h-5 w-px bg-frost/15 sm:block" />

          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`rounded-full px-2 py-1.5 text-xs whitespace-nowrap transition-colors sm:px-4 sm:py-2 sm:text-sm ${
                  isActive
                    ? "bg-night-700 text-frost"
                    : "text-frost/60 hover:bg-night-700/60 hover:text-frost"
                }`}
              >
                {link.label}
              </a>
            );
          })}

          <span aria-hidden className="mx-0.5 hidden h-5 w-px bg-frost/15 sm:block" />

          <button
            type="button"
            onClick={() => setContactOpen(true)}
            className="group inline-flex shrink-0 items-center gap-1 rounded-full bg-frost px-3 py-1.5 text-xs font-medium whitespace-nowrap text-night-900 transition-colors hover:bg-crystal-300 sm:px-4 sm:py-2 sm:text-sm"
          >
            Say hi
            <ArrowUpRight
              size={14}
              strokeWidth={2}
              className="transition-transform duration-200 group-hover:translate-x-px group-hover:-translate-y-px"
            />
          </button>
        </nav>
      </div>

      <HireModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
