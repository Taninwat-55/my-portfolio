import type { Metadata } from "next";
import { LandingPage } from "../components/LandingPage";
import { thContent as th, thUnits } from "../data.th";

const BASE_URL = "https://taninwatkaewpankan.xyz";
const PAGE_URL = `${BASE_URL}/th`;

export const metadata: Metadata = {
  title: th.meta.title,
  description: th.meta.description,
  alternates: {
    canonical: PAGE_URL,
    // hreflang is only valid reciprocated, and it has to be complete: the
    // homepage and /sv both declare this page back.
    languages: {
      en: BASE_URL,
      th: PAGE_URL,
      sv: `${BASE_URL}/sv`,
      da: `${BASE_URL}/da`,
    },
  },
  openGraph: {
    title: th.meta.title,
    description: th.meta.description,
    url: PAGE_URL,
    type: "website",
    locale: "th_TH",
  },
};

/**
 * The Thai landing page.
 *
 * Not a translation of /services — a different page for a different reader, per
 * D6 in PLAN.md (standalone language pages, no i18n machinery). Roughly a quarter
 * of the English page's content, aimed at Thai-owned restaurants, massage shops,
 * nail salons and cleaning businesses in Denmark and Sweden.
 *
 * Two things make this niche worth a page of its own. A Danish or Swedish agency
 * structurally cannot sell into it — the language and trust barrier runs both ways
 * — and Racha, the one paying client, is a Thai-owned business, so the proof is
 * already inside the niche rather than adjacent to it.
 *
 * Built to be pasted into a Facebook group, because that is how this community
 * actually finds things: no on-site discovery path is assumed, and the page stands
 * alone without the homepage's context.
 *
 * lang="th" sits on the wrapper because App Router allows only one <html>, which
 * the root layout hard-codes to "en". A wrapper attribute is the correct fix
 * without adding routing machinery for one page.
 *
 * ⚠️ Every Thai string comes from app/data.th.ts and is a Claude draft awaiting
 * Ice's proofread. See the warning at the top of that file.
 */
export default function ThaiPage() {
  return (
    <LandingPage
      lang="th"
      content={th}
      quoteTranslated={th.proof.quoteTh}
      line={{ label: th.contact.lineLabel, id: th.contact.lineId }}
      form={{ ...th.form, messages: th.errors }}
      units={thUnits}
      loose
    />
  );
}
