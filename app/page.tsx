import type { Metadata } from "next";
import { SkipLink } from "./components/SkipLink";
import { LazyChatWidget } from "./components/LazyChatWidget";
import { LanguageOffer } from "./components/LanguageOffer";
import { Clock } from "./components/clock/Clock";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://taninwatkaewpankan.xyz",
    // Reciprocates the declarations on /th and /sv. hreflang is ignored unless
    // every variant names every other one, so all three lists must stay in sync.
    languages: {
      en: "https://taninwatkaewpankan.xyz",
      th: "https://taninwatkaewpankan.xyz/th",
      sv: "https://taninwatkaewpankan.xyz/sv",
      da: "https://taninwatkaewpankan.xyz/da",
    },
  },
};

/**
 * The clock homepage (branch clock-redesign). The previous long-scroll
 * homepage's sections still live in app/sections and are no longer rendered
 * here; they are deleted only once the clock has replaced everything they did.
 */
export default function Home() {
  return (
    <>
      <SkipLink />
      <Clock />
      <LazyChatWidget />
      <LanguageOffer />
    </>
  );
}
