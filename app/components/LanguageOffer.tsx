"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { siteContent } from "../data";

type Language = (typeof siteContent.languages)[number];

const DISMISS_KEY = "lang-offer-dismissed";

/**
 * The store behind <LanguageOffer />.
 *
 * This is a store rather than an effect because navigator and localStorage are
 * genuinely external state, read once and then only changed by the user
 * dismissing. Doing it with useEffect + setState meant a cascading render on
 * every mount, and — more importantly — it got dismissal wrong: state reset on
 * client-side navigation, so the banner came back after being dismissed.
 *
 * getSnapshot must return a stable value or React re-renders forever, hence the
 * module-level cache. `undefined` means "not yet computed", distinct from `null`
 * meaning "nothing to offer".
 */
let cached: Language | null | undefined;
let listeners: (() => void)[] = [];

function detect(): Language | null {
  // navigator.languages is ordered by preference and carries regional tags
  // ("th", "th-TH"), so compare primary subtags rather than whole strings.
  const preferred = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];
  const codes = preferred.map((tag) => tag.toLowerCase().split("-")[0]);

  const match = siteContent.languages.find(
    (language) => language.code !== "en" && codes.includes(language.code)
  );
  if (!match) return null;

  try {
    if (localStorage.getItem(`${DISMISS_KEY}-${match.code}`)) return null;
  } catch {
    // Private mode or blocked storage: offer it anyway. A banner shown twice is a
    // far smaller problem than one that never appears.
  }
  return match;
}

function getSnapshot(): Language | null {
  if (cached === undefined) cached = detect();
  return cached;
}

/** Server render has no navigator, so there is nothing to offer and no mismatch. */
const getServerSnapshot = (): Language | null => null;

function subscribe(onChange: () => void) {
  listeners.push(onChange);
  return () => {
    listeners = listeners.filter((l) => l !== onChange);
  };
}

function dismiss(language: Language) {
  try {
    localStorage.setItem(`${DISMISS_KEY}-${language.code}`, "1");
  } catch {
    // Nothing to do — it reappears next visit, which is acceptable.
  }
  cached = null;
  listeners.forEach((l) => l());
}

/**
 * Offers a translated page to visitors whose browser is set to that language.
 *
 * The nav chip is the permanent, always-visible route to /th. This is the other
 * half: the person most likely to need the Thai page is also the least likely to
 * hunt for a language switcher in an English interface, so if their device says
 * they read Thai, say it to them directly.
 *
 * IT OFFERS, IT NEVER REDIRECTS. An automatic redirect breaks the back button,
 * hides the English page from someone who deliberately wanted it, and reads to a
 * crawler as serving different content to different clients. A dismissible link is
 * the whole of the correct behaviour.
 *
 * navigator.language is a hint, not a fact. A Thai speaker in Copenhagen may well
 * carry a phone set to Danish or English and never see this — which is exactly why
 * the nav chip exists and is not hidden on mobile. This catches the easy cases and
 * costs nothing when it misses.
 */
export function LanguageOffer() {
  const offer = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!offer) return null;

  return (
    // Left side on purpose: the chat widget owns bottom-right at the same z-index.
    <div
      role="region"
      aria-label={`${offer.label} version available`}
      className="fixed bottom-5 left-4 z-50 flex max-w-[calc(100vw-2rem)] items-center gap-2 rounded-full border border-frost/15 bg-night-800/90 py-2 pl-4 pr-2 shadow-lg shadow-black/40 backdrop-blur-md sm:left-6"
    >
      <Link
        href={offer.href}
        lang={offer.code}
        hrefLang={offer.code}
        className="group inline-flex items-center gap-2 text-sm font-medium whitespace-nowrap text-frost transition-colors hover:text-crystal-300"
      >
        {/* Written in the language being offered — an English sentence is the one
            thing this particular reader may not parse. */}
        <span lang="th">ดูหน้าภาษาไทย</span>
        <ArrowRight
          size={15}
          strokeWidth={1.8}
          aria-hidden
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </Link>

      <button
        type="button"
        onClick={() => dismiss(offer)}
        aria-label="Dismiss"
        className="shrink-0 rounded-full p-1.5 text-frost/40 transition-colors hover:bg-white/5 hover:text-frost focus:outline-none focus-visible:ring-2 focus-visible:ring-crystal-500"
      >
        <X size={15} strokeWidth={1.8} aria-hidden />
      </button>
    </div>
  );
}
