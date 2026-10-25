import Link from "next/link";
import type { CaseStudy } from "@/app/data";
import { worldImage } from "./worldImage";
import styles from "./work.module.css";

/**
 * One project as a card: its first screen (the world's 720/1280 copies), the
 * kicker, title and one line, and whatever the page adds underneath (a year,
 * a price). The whole card is the link, to its case page.
 */
export function WorkCard({
  caseStudy: c,
  kicker,
  eager = false,
  children,
}: {
  caseStudy: CaseStudy;
  kicker: string;
  /** The first row: likely the LCP, so it must not wait for lazy loading. */
  eager?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <li>
      <Link href={`/cases/${c.id}`} className={styles.card}>
        {/* eslint-disable-next-line @next/next/no-img-element -- the world's own resized copies (npm run textures) */}
        <img
          className={styles.image}
          {...worldImage(c.images[0])}
          sizes="(min-width: 900px) 33vw, 100vw"
          alt=""
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
          decoding="async"
        />
        <span className={styles.kicker}>{kicker}</span>
        <span className={styles.title}>{c.title}</span>
        <span className={styles.sub}>{c.sub}</span>
        {children}
      </Link>
    </li>
  );
}
