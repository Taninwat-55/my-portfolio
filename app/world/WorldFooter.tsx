import Link from "next/link";
import { personalInfo } from "@/app/data";
import styles from "./world.module.css";

const PAGES = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/showroom", label: "Showroom" },
  { href: "/cv", label: "CV" },
];

/**
 * The foot of every world page, on the same 12-column grid as the sections
 * above it (Ice, 2026-10-26: the single mono row "looked off", then the
 * middle sat empty): the name in the label column, how to reach him, the
 * pages, and the registered business on the right. The hairline stops at the
 * margins, like every other rule.
 */
export function WorldFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <p className={styles.footerName}>
          {personalInfo.name} <em>({personalInfo.nickname})</em>
        </p>
        <ul className={styles.footerReach}>
          <li>
            <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
          </li>
          <li className={styles.footerMuted}>{personalInfo.location}</li>
          <li>
            <a href={personalInfo.socials.linkedin} rel="me noopener" target="_blank">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={personalInfo.socials.github} rel="me noopener" target="_blank">
              GitHub
            </a>
          </li>
        </ul>
        <nav className={styles.footerPages} aria-label="Pages">
          <ul>
            {PAGES.map((p) => (
              <li key={p.href}>
                <Link href={p.href}>{p.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className={styles.footerLegal}>
          <span>{personalInfo.business.name}</span>
          <span>CVR {personalInfo.business.cvr}</span>
        </p>
      </div>
    </footer>
  );
}
