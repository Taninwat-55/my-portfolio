import Link from "next/link";
import { personalInfo } from "@/app/data";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./world.module.css";

/**
 * The world's one nav: Home · Work · About · Contact on the left, the profiles and
 * the theme on the right. Plain links in the page, not sticky: once past the
 * top they're gone, and the work has the screen.
 *
 * Home is there on every page, the homepage included (marked current), so
 * the row never changes shape: a case page had no way back but Work (Ice,
 * 2026-10-25). `workHref` is "#work-title" on the homepage (the hall is right
 * there) and "/#work-title" everywhere else.
 */
export function WorldNav({
  workHref = "/#work-title",
  home = false,
  className,
}: {
  workHref?: string;
  /** True on the homepage: its Home link is the current page. */
  home?: boolean;
  className?: string;
}) {
  return (
    <nav className={`${styles.nav} ${className ?? ""}`} aria-label="Main">
      <div className={styles.navLinks}>
        <Link href="/" aria-current={home ? "page" : undefined}>
          Home
        </Link>
        <a href={workHref}>Work</a>
        <Link href="/engineer">About</Link>
        <a href={`mailto:${personalInfo.email}`}>Contact</a>
      </div>
      <div className={styles.navLinks}>
        <a href={personalInfo.socials.linkedin} rel="me noopener" target="_blank">
          LinkedIn
        </a>
        <a href={personalInfo.socials.github} rel="me noopener" target="_blank">
          GitHub
        </a>
        <ThemeToggle className={styles.themeToggle} />
      </div>
    </nav>
  );
}
