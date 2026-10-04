import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "./components/PageShell";
import { PaperSheet } from "./components/paper/PaperSheet";
import { PageHeader } from "./components/paper/PageHeader";

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
        <ul className="m-0 grid list-none gap-3 p-0 text-lg">
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
