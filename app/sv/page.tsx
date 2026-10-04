import type { Metadata } from "next";
import { Train } from "lucide-react";
import { LandingPage } from "../components/LandingPage";
import { svContent as sv, svUnits, svPrice } from "../data.sv";

const BASE_URL = "https://taninwatkaewpankan.xyz";
const PAGE_URL = `${BASE_URL}/sv`;

export const metadata: Metadata = {
  title: sv.meta.title,
  description: sv.meta.description,
  alternates: {
    canonical: PAGE_URL,
    // hreflang is only valid reciprocated, and it has to be complete: every
    // language variant lists every other one, so the homepage and /th both name
    // this page back.
    languages: {
      en: BASE_URL,
      th: `${BASE_URL}/th`,
      sv: PAGE_URL,
      da: `${BASE_URL}/da`,
    },
  },
  openGraph: {
    title: sv.meta.title,
    description: sv.meta.description,
    url: PAGE_URL,
    type: "website",
    locale: "sv_SE",
  },
};

/**
 * The Swedish landing page.
 *
 * Not a translation of /services — a different page for a different reader, per
 * D6 in PLAN.md (standalone language pages, no i18n machinery). Aimed at small
 * businesses in Skåne: Malmö, Lund, Helsingborg.
 *
 * WHY THIS WAS THE CHEAP ONE. /da is blocked on finding a Danish proofreader,
 * because a page arguing "I do careful work" is destroyed by one clumsy sentence.
 * Swedish has no such gate: Ice writes it fluently, so he is the native reviewer
 * and the correction loop is a conversation rather than a dependency.
 *
 * THE ARGUMENT IS GEOGRAPHY PLUS LANGUAGE. Copenhagen to Malmö is about 35
 * minutes by train, so in-person meetings are real without Malmö agency
 * overheads — and he is a Swedish citizen educated in Sweden, so this is a native
 * page rather than a translated one. Both claims are load-bearing and both are
 * true, which is why they sit in the hero rather than in an FAQ.
 *
 * Written for search rather than for pasting into a group, which is the other way
 * it differs from /th: a Skåne owner googles "hemsida småföretag Malmö" instead of
 * asking a community, so the town names appear in the copy on purpose.
 *
 * lang="sv" sits on the wrapper because App Router allows only one <html>, which
 * the root layout hard-codes to "en".
 */
export default function SwedishPage() {
  return (
    <LandingPage
      lang="sv"
      content={sv}
      // The geography claim: 35 minutes from Malmö. Highlighted for the same
      // reason /th highlights its language note.
      note={sv.hero.locationNote}
      noteIcon={Train}
      quoteTranslated={sv.proof.quoteSv}
      contactAside={sv.contact.meetingNote}
      form={{ ...sv.form, messages: sv.errors }}
      units={svUnits}
      price={svPrice}
    />
  );
}
