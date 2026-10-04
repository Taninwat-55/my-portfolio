import type { Metadata } from "next";
import { SkipLink } from "../components/SkipLink";
import { ChatWidget } from "../components/ChatWidget";
import { Clock } from "../components/clock/Clock";

const PAGE_URL = "https://taninwatkaewpankan.xyz/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work by Ice: Trailr AI, Bevisly, MockMate and Racha Beauty, each linking to its case study.",
  alternates: { canonical: PAGE_URL },
};

/** The clock opened on the prints. See app/about/page.tsx for why this exists. */
export default function WorkPage() {
  return (
    <>
      <SkipLink />
      <Clock initialOpen="work" />
      <ChatWidget />
    </>
  );
}
