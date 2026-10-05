import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "./components/PageShell";
import { PaperSheet } from "./components/paper/PaperSheet";
import { PageHeader } from "./components/paper/PageHeader";
import paper from "./components/paper/paper.module.css";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

const ways = [
  { href: "/work", label: "The work", note: "case studies, as prints" },
  { href: "/writing", label: "The notebook", note: "notes and essays" },
  { href: "/contact", label: "A postcard", note: "write to me directly" },
];

/**
 * The 404 page, and the first page on the re-theme foundation (Phase 0): the
 * smallest real page, so it proves PageShell and the paper pieces work before
 * the bigger pages move over.
 */
export default function NotFound() {
  return (
    <PageShell back={{ href: "/", label: "Desk" }}>
      <PaperSheet ruled as="article">
        <PageHeader
          kicker="404"
          title="This page isn't on the desk"
          lead="The link may be old, or the page has moved. Here is where most things are."
        />
        {/* On the lines: each item is whole lines tall, and two blank ruled lines
            follow, like the rest of a notebook page. */}
        {/* text-[18px], not text-lg: text-lg also sets a 28px line height, and a
            utility beats .lines, which would knock the text off the rules. */}
        <ul className={`${paper.lines} list-none p-0 pb-[72px] text-[18px]`}>
          {ways.map((way) => (
            <li key={way.href}>
              <Link href={way.href} className="font-bold no-underline">
                {way.label}
              </Link>{" "}
              <span className="text-paper-soft">
                <span aria-hidden="true">·</span> {way.note}
              </span>
            </li>
          ))}
        </ul>
      </PaperSheet>
    </PageShell>
  );
}
