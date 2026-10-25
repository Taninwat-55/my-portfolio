import type { Metadata } from "next";
import Link from "next/link";
import { GridLines } from "./world/GridLines";
import { WorldFooter } from "./world/WorldFooter";
import { WorldNav } from "./world/WorldNav";
import { WorldShell } from "./world/WorldShell";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

const ways = [
  { href: "/", label: "Home" },
  { href: "/#work-title", label: "Selected work" },
  { href: "/engineer", label: "Hire me" },
  { href: "/services", label: "Build my website" },
];

/**
 * The 404, in the Crystallize world since 2026-10-25. It used to wrap itself
 * in the Stack layout, and because Next renders not-found under the root
 * layout on every route, every page then shipped the Stack's fonts and CSS.
 */
export default function NotFound() {
  return (
    <WorldShell>
      <main id="main-content" className={styles.page}>
        <GridLines />
        <WorldNav className={styles.nav} />
        <p className={styles.kicker}>404</p>
        <h1 className={styles.title}>Nothing here.</h1>
        <p className={styles.lead}>The link may be old, or the page has moved. Here is where most things are.</p>
        <ul className={styles.ways}>
          {ways.map((way) => (
            <li key={way.href}>
              <Link href={way.href}>
                {way.label} <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <WorldFooter />
    </WorldShell>
  );
}
