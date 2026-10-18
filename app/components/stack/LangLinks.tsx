"use client";

import { usePathname } from "next/navigation";
import { siteContent } from "../../data";
import styles from "./stack.module.css";

/**
 * The menu bar's language links. A client component only to know which
 * language is current: the menu bar lives in the stack layout, which cannot
 * see the page. /th, /sv and /da are themselves; everything else is English.
 */
export function LangLinks() {
  const pathname = usePathname();
  const current =
    siteContent.languages.find((l) => l.href !== "/" && (pathname === l.href || pathname.startsWith(`${l.href}/`)))
      ?.code ?? "en";
  return (
    <nav aria-label="Languages" className={styles.langs}>
      {siteContent.languages.map((lang) => (
        <a
          key={lang.code}
          href={lang.href}
          hrefLang={lang.code}
          lang={lang.code}
          aria-current={lang.code === current ? "true" : undefined}
          aria-label={lang.label}
        >
          {/* The endonym where there is room; the code on a phone's bar. */}
          <span className={styles.langLong}>{lang.label}</span>
          <span className={styles.langShort} aria-hidden="true">
            {lang.code.toUpperCase()}
          </span>
        </a>
      ))}
    </nav>
  );
}
