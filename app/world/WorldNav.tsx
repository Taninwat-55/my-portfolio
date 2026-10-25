import Link from "next/link";
import { personalInfo } from "@/app/data";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./world.module.css";

/**
 * The world's one nav: Work · About · Contact on the left, the profiles and
 * the theme on the right. Plain links in the page, not sticky: once past the
 * top they're gone, and the work has the screen.
 *
 * `workHref` is "#work-title" on the homepage (the hall is right there) and
 * "/#work-title" everywhere else.
 */
export function WorldNav({ workHref = "/#work-title", className }: { workHref?: string; className?: string }) {
  return (
    <nav className={`${styles.nav} ${className ?? ""}`} aria-label="Main">
      <div className={styles.navLinks}>
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
