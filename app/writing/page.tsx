import type { Metadata } from "next";
import { SkipLink } from "../components/SkipLink";
import { ChatWidget } from "../components/ChatWidget";
import { Clock } from "../components/clock/Clock";

const PAGE_URL = "https://taninwatkaewpankan.xyz/writing";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Ice's newest notes on building products: MVP scoping, performance, stakeholders and shipping at a startup.",
  alternates: { canonical: PAGE_URL },
};

/** The clock opened on the notebook. See app/about/page.tsx for why this exists. */
export default function WritingPage() {
  return (
    <>
      <SkipLink />
      <Clock initialOpen="writing" />
      <ChatWidget />
    </>
  );
}
