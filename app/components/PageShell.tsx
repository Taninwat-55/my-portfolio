import Image from "next/image";
import Link from "next/link";
import { personalInfo, siteContent } from "../data";
import { SkipLink } from "./SkipLink";
import styles from "./paper/paper.module.css";

interface PageShellProps {
  children: React.ReactNode;
  /**
   * The object this page was opened from, e.g. { href: "/work", label: "Work" }.
   * `lang` marks a label in another language than the page (the language pages'
   * "English" link).
   */
  back?: { href: string; label: string; lang?: string };
  /**
   * The page's language, for the footer's current-language mark. The shell's
   * own few words stay English, also on /th, /sv and /da: Ice's rule for
   * those pages is no new copy, and the skip link is marked lang="en".
   */
  lang?: string;
  /**
   * The footer nav's accessible name, in the page's language. An aria-label
   * cannot carry its own lang, so the language pages pass their own word.
   */
  languagesLabel?: string;
  /**
   * The English postcard in the footer. Off on /th, /sv and /da (Ice,
   * 2026-10-05): it would be the one English card on a Thai or Danish sales
   * page, and their own contact section sits right above the footer.
   */
  postcard?: boolean;
}

/**
 * The frame for every page behind the clock: the desk, a small portrait that
 * goes home, a back link to the object the page came from, and a footer with
 * the language links and a postcard. Replaces Navbar (deleted in Phase 6).
 *
 * Not fixed to the top: these are documents to read, and a fixed bar only
 * covers them.
 */
export function PageShell({ children, back, lang = "en", languagesLabel = "Languages", postcard = true }: PageShellProps) {
  return (
    <div className={styles.desk}>
      <SkipLink />
      <header className={styles.top}>
        <Link href="/" className={styles.home} aria-label="Home">
          {/* Eager: it is in the first viewport of every page, and on text-led
              pages Lighthouse picks it as the LCP element; lazy loading held it
              back 1.6 s on /services. It is about 2 KB at this size. */}
          <Image src="/clock/face-neutral.webp" alt="" width={96} height={96} sizes="48px" loading="eager" />
        </Link>
        {back && (
          <Link href={back.href} className={styles.back} lang={back.lang}>
            <span aria-hidden="true">←</span> {back.label}
          </Link>
        )}
      </header>

      <main id="main-content" className={styles.main}>
        {children}
      </main>

      <footer className={styles.bottom}>
        <nav aria-label={languagesLabel} className={styles.languages}>
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

        {postcard && (
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
        )}
      </footer>
    </div>
  );
}
