import { FadeIn } from "../FadeIn";
import styles from "./paper.module.css";

interface DeskHeadingProps {
  /** For the section's aria-labelledby. */
  id: string;
  title: React.ReactNode;
  /** A short handwritten line above the title. */
  kicker?: React.ReactNode;
  /** In the first viewport: fade in through CSS, not after hydration (the LCP rule). */
  immediate?: boolean;
}

/** A section heading lying on the desk, between paper cards: kicker and h2. */
export function DeskHeading({ id, title, kicker, immediate = false }: DeskHeadingProps) {
  return (
    <FadeIn immediate={immediate} y={16} className={styles.deskHeading}>
      {kicker && <p className={styles.kicker}>{kicker}</p>}
      <h2 id={id} className={styles.deskTitle}>
        {title}
      </h2>
    </FadeIn>
  );
}
