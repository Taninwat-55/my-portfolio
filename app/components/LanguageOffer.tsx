"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
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

  // Requires `offer` as well as a code match: a language with no sentence to
  // show has nothing to offer with, and falling back to English defeats the point.
  const match = siteContent.languages.find(
    (language) =>
      language.code !== "en" &&
      Boolean(language.offer) &&
      codes.includes(language.code)
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
    // A one-bit dialog under the menu bar, top right: the stack's message box
    // owns the bottom of the screen, and this is the homepage's only overlay.
    <div
      role="region"
      aria-label={`${offer.label} version available`}
      className="fixed top-14 right-3 z-50 flex max-w-[calc(100vw-1.5rem)] items-center gap-3 rounded-lg border-[3px] border-black bg-white py-2 pr-2 pl-4 text-black"
    >
      <Link
        href={offer.href}
        lang={offer.code}
        hrefLang={offer.code}
        className="text-[15px] font-bold whitespace-nowrap underline decoration-2 underline-offset-4 hover:bg-black hover:text-white hover:no-underline"
      >
        {/* Written in the language being offered — an English sentence is the one
            thing this particular reader may not parse. Comes from the registry in
            data.ts rather than being hard-coded here, which it was until Swedish
            arrived and turned a shortcut into a bug: a Swedish visitor was being
            offered /sv in Thai. */}
        <span lang={offer.code}>{offer.offer ?? offer.label}</span>
      </Link>

      <button
        type="button"
        onClick={() => dismiss(offer)}
        aria-label="Dismiss"
        // A classic Mac close box, an empty square that fills when pressed,
        // drawn small inside a 44px tap area.
        className="group grid h-11 w-11 shrink-0 place-items-center"
      >
        <span className="h-5 w-5 border-2 border-black bg-white group-hover:bg-black group-active:bg-black" />
      </button>
    </div>
  );
}
