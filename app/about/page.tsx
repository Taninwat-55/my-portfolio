import type { Metadata } from "next";
import { SkipLink } from "../components/SkipLink";
import { ChatWidget } from "../components/ChatWidget";
import { ClockHome } from "../components/clock/ClockHome";

const PAGE_URL = "https://taninwatkaewpankan.xyz/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "A letter from Ice: Thailand to Sweden at 16, Uppsala University, leading Millennial Consulting, Frontend Development at Jensen, and now Trailr AI in Copenhagen.",
  alternates: { canonical: PAGE_URL },
};

/**
 * The same clock as the homepage, opened on the envelope. Clicking About on the
 * homepage pushes this URL without leaving the page, so a shared /about link and
 * a click land on the same thing. Rendered open on the server, so the letter is
 * in the HTML for search engines and for anyone without JavaScript.
 */
export default function AboutPage() {
  return (
    <>
      <SkipLink />
      <ClockHome initialOpen="about" />
      <ChatWidget />
    </>
  );
}
