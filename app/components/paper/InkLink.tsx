import Link from "next/link";
import styles from "./paper.module.css";

interface InkLinkProps {
  href: string;
  children: React.ReactNode;
  /** Filled ink instead of an outline: the page's main action. */
  primary?: boolean;
  /** Opens in a new tab, for links off the site and files like the CV PDF. */
  external?: boolean;
}

/** An ink pill on paper, used for a page's actions (case study links, the CV download). */
export function InkLink({ href, children, primary = false, external = false }: InkLinkProps) {
  const className = primary ? `${styles.ink} ${styles.inkPrimary}` : styles.ink;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
