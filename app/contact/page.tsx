import type { Metadata } from "next";
import { SkipLink } from "../components/SkipLink";
import { LazyChatWidget } from "../components/LazyChatWidget";
import { Clock } from "../components/clock/Clock";

const PAGE_URL = "https://taninwatkaewpankan.xyz/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Write Ice a line: email, LinkedIn and GitHub. Open to full-time roles in Copenhagen, and taking on client projects.",
  alternates: { canonical: PAGE_URL },
};

/** The clock opened on the postcard. See app/about/page.tsx for why this exists. */
export default function ContactPage() {
  return (
    <>
      <SkipLink />
      <Clock initialOpen="contact" />
      <LazyChatWidget />
    </>
  );
}
