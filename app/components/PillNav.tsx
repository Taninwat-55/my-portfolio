"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteContent } from "../data";

type NavLink = {
  label: string;
  /** Hash target on this page. Its presence opts the item into scroll-spy. */
  id?: string;
  /** Cross-page route. Mutually exclusive with `id`. */
  href?: string;
  /** Dropped below sm. The pill has ~328px at 360px and this list is full. */
  compactHidden?: boolean;
};

// Below sm the pill has ~304px, so most of this list has to go. What stays is
// Projects and Services — proof and offer. Work joins About and CV in the compact
// cut because the page scrolls straight into it a moment later, and the room it
// frees is spent on the language chip, which must be reachable on a phone: the
// audience /th was written for is overwhelmingly mobile, and a language link they
// cannot see is the same as no language link.
const NAV_LINKS: NavLink[] = [
  { label: "Work", id: "work", compactHidden: true },
  { label: "Projects", id: "projects" },
  { label: "Services", href: "/services" },
  { label: "About", id: "about", compactHidden: true },
  { label: "CV", href: "/cv", compactHidden: true },
];

/** Every language other than the one this nav is rendered in. */
const OTHER_LANGUAGES = siteContent.languages.filter((l) => l.code !== "en");

/**
 * Floating pill navigation for the homepage.
 *
 * Fixed rather than in-flow on purpose: the old hero nav scrolled away, which
 * put the CTA out of reach for anyone reading further down the page. Subpages
 * keep their own <Navbar />, which does a different job (back-links).
 *
 * The CTA used to open HireModal, which offers a CV download — the wrong artefact
 * for the client this page is now written for. It links to the enquiry form
 * instead, and HireModal moved to /cv where its email/CV/LinkedIn set belongs.
 *
 * "Enquire" rather than "Start a project": it is the same width as the "Say hi"
 * it replaces, so the ~13px of headroom measured at 320px does not regress, and
 * it avoids two identically-labelled CTAs on the same screen as the hero button.
 */
export function PillNav() {
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
    const sections = NAV_LINKS.filter(
      (link): link is NavLink & { id: string } => Boolean(link.id)
    )
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

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
      {/* px-2 below sm, not px-4. Measured: with Services added the pill needs
          291px, and px-4 leaves only 288px at a 320px viewport — it wrapped by
          three pixels. px-2 gives 304px and ~13px of headroom. */}
      <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-2 pt-4 sm:px-4 md:pt-6">
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
            const base = `rounded-full px-2 py-1.5 text-xs whitespace-nowrap transition-colors sm:px-4 sm:py-2 sm:text-sm ${
              link.compactHidden ? "hidden sm:inline-block" : ""
            }`;

            // A route rather than an anchor, so scroll-spy can never mark it
            // active. It gets a standing accent instead of sitting there
            // looking like a permanently dead pill.
            if (link.href) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${base} text-crystal-500 hover:bg-night-700/60 hover:text-crystal-300`}
                >
                  {link.label}
                </Link>
              );
            }

            const isActive = activeId === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`${base} ${
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

          {/* Never compactHidden. See the note on NAV_LINKS. */}
          {OTHER_LANGUAGES.map((language) => (
            <Link
              key={language.code}
              href={language.href}
              lang={language.code}
              hrefLang={language.code}
              className="shrink-0 rounded-full px-2 py-1.5 text-xs whitespace-nowrap text-frost/60 transition-colors hover:bg-night-700/60 hover:text-frost sm:px-3 sm:py-2 sm:text-sm"
            >
              {language.label}
            </Link>
          ))}

          <Link
            href="/services#enquiry"
            className="group inline-flex shrink-0 items-center gap-1 rounded-full bg-frost px-3 py-1.5 text-xs font-medium whitespace-nowrap text-night-900 transition-colors hover:bg-crystal-300 sm:px-4 sm:py-2 sm:text-sm"
          >
            Enquire
            <ArrowUpRight
              size={14}
              strokeWidth={2}
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-px group-hover:-translate-y-px"
            />
          </Link>
        </nav>
      </div>

    </>
  );
}
