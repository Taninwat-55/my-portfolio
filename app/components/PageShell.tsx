import Image from "next/image";
import Link from "next/link";
import { personalInfo, siteContent } from "../data";
import { SkipLink } from "./SkipLink";
import styles from "./paper/paper.module.css";

interface PageShellProps {
  children: React.ReactNode;
  /** The object this page was opened from, e.g. { href: "/work", label: "Work" }. */
  back?: { href: string; label: string };
  /**
   * The page's language, for the footer's current-language mark. The shell's
   * own few words are still English; Phase 5 adds their translations, taken
   * from the proofread language files rather than written fresh.
   */
  lang?: string;
}

/**
 * The frame for every page behind the clock: the desk, a small portrait that
 * goes home, a back link to the object the page came from, and a footer with
 * the language links and a postcard. Replaces Navbar (deleted in Phase 6).
 *
 * Not fixed to the top: these are documents to read, and a fixed bar only
 * covers them.
 */
export function PageShell({ children, back, lang = "en" }: PageShellProps) {
  return (
    <div className={styles.desk}>
      <SkipLink />
      <header className={styles.top}>
        <Link href="/" className={styles.home} aria-label="Home">
          <Image src="/clock/face-neutral.webp" alt="" width={96} height={96} sizes="48px" />
        </Link>
        {back && (
          <Link href={back.href} className={styles.back}>
            <span aria-hidden="true">←</span> {back.label}
          </Link>
        )}
      </header>

      <main id="main-content" className={styles.main}>
        {children}
      </main>

      <footer className={styles.bottom}>
        <nav aria-label="Languages" className={styles.languages}>
          {siteContent.languages.map((language) => (
            <Link
              key={language.code}
              href={language.href}
              lang={language.code}
              // "true", not "page": this is the current language, but its link
              // goes to that language's front page, not to this page.
              aria-current={language.code === lang ? "true" : undefined}
            >
              {language.label}
            </Link>
          ))}
        </nav>

        <div className={styles.postcard}>
          <p className={styles.postcardLine}>Got a role or a project in mind?</p>
          <a href={`mailto:${personalInfo.email}`} className={styles.postcardEmail}>
            {personalInfo.email}
          </a>
          <Link href="/contact" className={styles.postcardLink}>
            Write me a postcard →
          </Link>
          <span className={styles.postcardStamp} aria-hidden="true" />
        </div>
      </footer>
    </div>
  );
}
