import { FadeIn } from "../FadeIn";
import styles from "./paper.module.css";

interface PageHeaderProps {
  title: React.ReactNode;
  /** A short handwritten line above the title. */
  kicker?: React.ReactNode;
  lead?: React.ReactNode;
  /** Set when the header sits on the desk rather than on a PaperSheet. */
  onDesk?: boolean;
}

/**
 * The page's <h1>, with an optional kicker and lead.
 *
 * Always `FadeIn immediate`: a page header is in the first viewport by
 * definition, and the default FadeIn would hold it invisible until hydration
 * (the LCP rule in PLAN.md).
 */
export function PageHeader({ title, kicker, lead, onDesk = false }: PageHeaderProps) {
  return (
    <FadeIn immediate y={12} className={onDesk ? `${styles.header} ${styles.onDesk}` : styles.header}>
      {kicker && <p className={styles.kicker}>{kicker}</p>}
      <h1 className={styles.title}>{title}</h1>
      {lead && <p className={styles.lead}>{lead}</p>}
    </FadeIn>
  );
}
