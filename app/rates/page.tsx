import type { Metadata } from "next";
import { SkipLink } from "../components/SkipLink";
import { LazyChatWidget } from "../components/LazyChatWidget";
import { Clock } from "../components/clock/Clock";

const PAGE_URL = "https://taninwatkaewpankan.xyz/rates";

export const metadata: Metadata = {
  title: "Rates",
  description:
    "What a website, a web app frontend or a redesign costs with Ice, in Danish kroner. Full details on /services.",
  alternates: { canonical: PAGE_URL },
};

/** The clock opened on the receipt. See app/about/page.tsx for why this exists. */
export default function RatesPage() {
  return (
    <>
      <SkipLink />
      <Clock initialOpen="services" />
      <LazyChatWidget />
    </>
  );
}
