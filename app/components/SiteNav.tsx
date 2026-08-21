"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { siteContent } from "../data";

type NavLink = {
  label: string;
  /** Hash target on this page. Its presence opts the item into scroll-spy. */
  id?: string;
  /** Cross-page route. Mutually exclusive with `id`. */
  href?: string;
};

// No compactHidden any more. The whole list shows at every width because it now
// lives in a full-screen panel rather than a pill competing for ~304px.
//
// THE MENU IS A TABLE OF CONTENTS, IN PAGE ORDER. Two things were wrong before.
//
// The order did not match the page: About is the first section after the hero but
// sat third in the menu, so the menu implied a structure the page did not have.
//
// And the behaviour was mixed. "Services" jumped straight to /services while its
// neighbours scrolled, which is what made the old "Work" item feel like it was
// redirecting — clicking two adjacent items did categorically different things. One
// item scrolling and the next teleporting is the inconsistency, not the extra click.
//
// So everything with a section scrolls to it, and each of those sections carries its
// own link onward to the fuller page. CV is the single exception because it has no
// homepage section, and it is marked with an arrow so that is visible before you
// click rather than after.
//
// Garden is deliberately absent: it is post-conversion reading, and a menu is more
// useful when it is short than when it is complete.
const NAV_LINKS: NavLink[] = [
  { label: "About", id: "about" },
  { label: "Services", id: "offers" },
  { label: "Projects", id: "projects" },
  { label: "How it works", id: "process" },
  { label: "CV", href: "/cv" },
];

const OTHER_LANGUAGES = siteContent.languages.filter((l) => l.code !== "en");

/** Focusable descendants, for the focus trap. */
const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Site navigation: a slim bar, and a full-screen panel behind a minimal trigger.
 *
 * This replaces the floating pill, which had run out of room. Five links plus a
 * CTA plus a language chip did not fit ~304px at 320px wide, so three links were
 * being hidden below `sm` — including CV and About — and every new item forced
 * another decision about what to drop. Worse, at 744px the pill sat directly
 * across the portrait's eyes, which is the one screen that has to make a first
 * impression.
 *
 * The panel sets its links in the same oversized uppercase type as the hero
 * marquee, so the menu reads as part of the site's own language rather than as a
 * borrowed component. It also ends the width problem permanently: nothing has to
 * be hidden at any width, ever.
 *
 * What stays in the bar: the wordmark, and the CTA. The CTA is deliberately NOT
 * behind the trigger — this page is written for someone deciding whether to hire,
 * and putting the one action they might take behind a click costs conversions to
 * buy tidiness.
 *
 * The trigger is two rules rather than three, because a hamburger is the generic
 * answer and this site is not generic. It becomes an X when open.
 *
 * Preserved from the pill, and easy to lose in a rewrite: scroll-spy on the hash
 * links, the language link reachable at every width, focus trapping while open,
 * Escape to close, scroll lock, and a reduced-motion path.
 */
export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const scrolledRef = useRef(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  // The bar gains a background only once it has left the hero, so it stays
  // weightless over the portrait. The ref guard keeps setState to the two frames
  // where the threshold is actually crossed rather than every scroll event.
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

  // Scroll-spy: whichever section crosses the middle band owns the active state.
  // Nothing is active while the hero fills the screen.
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
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        setActiveId(visible.length > 0 ? visible[0].target.id : null);
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Crossing into md swaps the panel for the inline nav. Without this the panel
  // would just vanish behind `md:hidden` while `open` stayed true — leaving
  // document.body scroll-locked with nothing on screen to explain why.
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (wide.matches) setOpen(false);
    };
    onChange();
    wide.addEventListener("change", onChange);
    return () => wide.removeEventListener("change", onChange);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    // Return focus to the trigger, or a keyboard user is dropped at the top of
    // the document with no idea where they were.
    triggerRef.current?.focus();
  }, []);

  // Escape, scroll lock, and the focus trap. One effect because they share a
  // lifetime — all three apply exactly while the panel is open.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;

      const items = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!items || items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    // Move focus into the panel so a keyboard user is not left behind it.
    const firstItem = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
    firstItem?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  const linkClass = (isActive: boolean) =>
    `group flex items-baseline gap-4 font-black uppercase leading-[0.95] tracking-tight transition-colors ${
      isActive ? "text-frost" : "text-frost/45 hover:text-frost"
    }`;

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 md:pt-6">
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border px-3 py-2 transition-colors duration-300 sm:px-4 ${
            scrolled || open
              ? "border-frost/10 bg-night-800/80 backdrop-blur-md"
              : "border-transparent bg-transparent"
          }`}
        >
          <Link
            href="/"
            aria-label="Home"
            className="shrink-0 px-1 text-base font-bold tracking-tighter text-frost transition-opacity hover:opacity-70 sm:text-lg"
          >
            Ice<span className="text-crystal-500">.</span>
          </Link>

          {/* The links inline, from md up. Below that they live in the panel.
              A menu is the right answer only when there is no room for the thing
              it hides — at 768px and above there is, and a nav you can already see
              is one fewer tap and one fewer thing to discover. It also brings back
              something the panel had taken away on wide screens: scroll-spy is
              visible again, so the bar shows you where you are while you scroll.

              768px rather than 640px because "How it works" makes this row about
              634px wide, which does not fit inside 640 minus padding. That does
              put iPad Mini portrait (744px) on the panel — one clean breakpoint
              rather than a magic number, and the panel is perfectly usable there. */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-0.5 md:flex lg:gap-1"
          >
            {NAV_LINKS.map((link) => {
              const isActive = Boolean(link.id) && activeId === link.id;
              const base =
                "rounded-full px-3 py-2 text-sm whitespace-nowrap transition-colors";
              return link.href ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`${base} text-frost/60 hover:bg-white/5 hover:text-frost`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={`#${link.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`${base} ${
                    isActive
                      ? "bg-white/8 text-frost"
                      : "text-frost/60 hover:bg-white/5 hover:text-frost"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* In the BAR, not the panel. Item 30b exists because a Thai visitor
                landing on an English page had no signal /th existed, and "a link
                they cannot see is the same as no link" applies just as much to one
                hidden behind a menu — especially for a reader who may not know that
                an English "Menu" is where their language lives. Three characters
                wide; it costs nothing to keep it out here. */}
            {OTHER_LANGUAGES.map((language) => (
              <Link
                key={language.code}
                href={language.href}
                lang={language.code}
                hrefLang={language.code}
                className="shrink-0 px-1 text-sm text-frost/60 transition-colors hover:text-frost"
              >
                {language.label}
              </Link>
            ))}

            {/* Stays in the bar rather than inside the panel: it is the one action
                this page exists to produce. */}
            <Link
              href="/services#enquiry"
              className="group inline-flex shrink-0 items-center gap-1 rounded-full bg-frost px-4 py-2 text-xs font-medium whitespace-nowrap text-night-900 transition-colors hover:bg-crystal-300 sm:text-sm"
            >
              Enquire
              <ArrowUpRight
                size={14}
                strokeWidth={2}
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-px group-hover:-translate-y-px"
              />
            </Link>

            <button
              ref={triggerRef}
              type="button"
              onClick={() => (open ? close() : setOpen(true))}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-frost/15 text-frost transition-colors hover:border-frost/40 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-crystal-500 md:hidden"
            >
              {/* Two rules, not three. A hamburger is the generic answer; this is
                  quieter and becomes an X on open. */}
              <span
                aria-hidden
                className={`absolute h-px w-4 bg-current transition-transform duration-300 ${
                  open ? "rotate-45" : "-translate-y-[3px]"
                }`}
              />
              <span
                aria-hidden
                className={`absolute h-px w-4 bg-current transition-transform duration-300 ${
                  open ? "-rotate-45" : "translate-y-[3px]"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-night-900/97 px-6 pt-24 pb-10 backdrop-blur-xl sm:px-10 md:hidden"
          >
            <nav aria-label="Menu" className="mx-auto w-full max-w-6xl">
              <ul className="flex flex-col gap-1 sm:gap-2">
                {NAV_LINKS.map((link, i) => {
                  const isActive = Boolean(link.id) && activeId === link.id;
                  const content = (
                    <>
                      <span
                        aria-hidden
                        className="w-8 shrink-0 text-[11px] font-medium tracking-[0.25em] text-crystal-500/70 sm:w-12"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        style={{ fontSize: "clamp(2.2rem, 9vw, 6rem)" }}
                        className="transition-transform duration-300 group-hover:translate-x-2"
                      >
                        {link.label}
                      </span>
                      {/* Only on the item that leaves the page, so the one
                          exception to "everything scrolls" announces itself. */}
                      {link.href && (
                        <ArrowUpRight
                          size={20}
                          strokeWidth={2}
                          aria-hidden
                          className="mt-1 shrink-0 self-center text-crystal-500/60 sm:size-7"
                        />
                      )}
                    </>
                  );

                  return (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: reduceMotion ? 0 : 0.06 + i * 0.05,
                        duration: reduceMotion ? 0 : 0.35,
                      }}
                    >
                      {link.href ? (
                        <Link
                          href={link.href}
                          onClick={close}
                          className={linkClass(false)}
                        >
                          {content}
                        </Link>
                      ) : (
                        <a
                          href={`#${link.id}`}
                          onClick={close}
                          aria-current={isActive ? "true" : undefined}
                          className={linkClass(isActive)}
                        >
                          {content}
                        </a>
                      )}
                    </motion.li>
                  );
                })}
              </ul>

              {/* No language link here — it lives in the bar, where it is visible
                  without opening anything.

                  And no CV download either. This is the homepage menu, which after
                  the client-first flip serves someone deciding whether to hire me
                  for a project; a PDF of my employment history is the wrong artefact
                  to hand them, the same reason the CTA stopped opening HireModal.
                  The download lives on /cv, where the audience it is for already is,
                  and in HireModal on that page. */}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
