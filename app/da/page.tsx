import type { Metadata } from "next";
import { Languages, PenLine } from "lucide-react";
import { LandingPage } from "../components/LandingPage";
import { daContent as da, daUnits } from "../data.da";

const BASE_URL = "https://taninwatkaewpankan.xyz";
const PAGE_URL = `${BASE_URL}/da`;

/**
 * THE PUBLISH SWITCH. One flag, three behaviours.
 *
 * While true: the page is excluded from search, carries a visible draft banner,
 * and declares no hreflang. Reachable only by typing the URL, which is exactly
 * what a proofreader needs and nothing more.
 *
 * TO PUBLISH — after item 28 passes, and not before:
 *   1. Set this to false.
 *   2. Add `{ path: '/da', ... }` to app/sitemap.ts.
 *   3. Add `{ code: "da", label: "Dansk", href: "/da", offer: "Se siden på dansk" }`
 *      to SITE_LANGUAGES in app/data.ts — that alone gives it the nav chip and the
 *      browser-language banner.
 *   4. Add `da` to the `languages` map here and in app/page.tsx, app/th/page.tsx
 *      and app/sv/page.tsx. hreflang is ignored unless every variant names every
 *      other one.
 *   5. Nothing — the share card is already done. It is listed anyway, because its
 *      absence from this list is exactly why it was missed: the card is the one
 *      published-state asset that lives in a different file, so a checklist that
 *      only covered this file could be followed completely and still ship /da with
 *      an English "Hi, i'm Ice" card. See app/da/opengraph-image.tsx (item 43).
 *      If you add another page-level asset, add it here in the same commit.
 *
 * ✅ PUBLISHED 2026-08-22, once item 28 passed. The nav-island warning that used to
 * sit here was real and was acted on: the fourth chip took the row from 556px to
 * 619px, which measured 86% of the viewport at the old 720px breakpoint, so the
 * breakpoint moved to 800. The measurements and what that cost are in PLAN.md's
 * log for 2026-08-22; SiteNav.tsx itself went with the old homepage.
 */
const DRAFT = false;

export const metadata: Metadata = {
  title: da.meta.title,
  description: da.meta.description,
  alternates: {
    canonical: PAGE_URL,
    // Published 2026-08-22, once item 28 passed. hreflang is only valid
    // reciprocated and it has to be complete: every variant lists every other
    // one, so the homepage, /th and /sv all name this page back.
    languages: {
      en: BASE_URL,
      th: `${BASE_URL}/th`,
      sv: `${BASE_URL}/sv`,
      da: PAGE_URL,
    },
  },
  robots: DRAFT ? { index: false, follow: false } : undefined,
  openGraph: {
    title: da.meta.title,
    description: da.meta.description,
    url: PAGE_URL,
    type: "website",
    locale: "da_DK",
  },
};

/**
 * The Danish landing page. UNLISTED AND UNPROOFREAD — see DRAFT above.
 *
 * Not a translation of /services — a different page for a different reader, per
 * D6 in PLAN.md (standalone language pages, no i18n machinery). Aimed at small
 * Danish businesses.
 *
 * BUILT BEFORE THE PROOFREAD, ON PURPOSE. The original plan had item 28 (find a
 * Danish native) blocking item 27 (build the page), which Ice spotted was
 * impossible: you cannot proofread copy that does not exist. Asking a Dane to
 * read forty sentences is also a far smaller favour than asking them to write a
 * page, so the draft comes first and stays invisible until it passes.
 *
 * THE HARD PART IS NOT THE COPY, IT IS THE LANGUAGE HONESTY. Ice speaks Danish at
 * beginner level, and this page's whole argument is that he does careful work.
 * So the meeting-language line is in the hero rather than in an FAQ (item 29), the
 * contact section offers written-first contact and never implies a Danish phone
 * call, and the one Danish-site claim in `why` is deliberately the narrowest true
 * version: one site, one client, still running.
 *
 * lang="da" sits on the wrapper because App Router allows only one <html>, which
 * the root layout hard-codes to "en".
 */
export default function DanishPage() {
  return (
    <LandingPage
      lang="da"
      content={da}
      // The language note: written-first, beginner Danish, said up front.
      // Item 29: it used to be buried in servicesFaq.
      note={da.hero.languageNote}
      noteIcon={Languages}
      quoteTranslated={da.proof.quoteDa}
      contactAside={da.contact.writtenFirst}
      form={{ ...da.form, messages: da.errors }}
      units={daUnits}
      banner={
        /* The draft banner. Deliberately unmissable and deliberately in
           English: its audience is Ice and whoever he sends the link to, not
           a Danish customer. It also means the page can never be shared as
           finished by accident — the only way to lose it is to flip DRAFT,
           which is the same act as publishing. */
        DRAFT && (
          <div lang="en" className="mb-10 rounded-md bg-sticky px-5 py-4 text-paper-ink">
            <div className="mb-1.5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em]">
              <PenLine size={13} strokeWidth={2} aria-hidden />
              Draft — not published
            </div>
            <p className="text-sm leading-relaxed">
              The Danish on this page was drafted by an AI and has not been read
              by a native speaker. It is excluded from Google and linked from
              nowhere on the site. If you are reading it as a favour: corrections
              of any size are welcome, including ones that feel pedantic.
            </p>
          </div>
        )
      }
    />
  );
}
