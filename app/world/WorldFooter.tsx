import { personalInfo } from "@/app/data";
import styles from "./world.module.css";

/**
 * The foot of every world page, on the same 12-column grid as the sections
 * above it (Ice, 2026-10-26: the single mono row "looked off"): the name in
 * the label column, how to reach him beside it, the registered business on
 * the right. The hairline stops at the margins, like every other rule.
 */
export function WorldFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <p className={styles.footerName}>
          {personalInfo.name} <em>({personalInfo.nickname})</em>
        </p>
        <p className={styles.footerReach}>
          <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
          <span>{personalInfo.location}</span>
        </p>
        <p className={styles.footerLegal}>
          <span>{personalInfo.business.name}</span>
          <span>CVR {personalInfo.business.cvr}</span>
        </p>
      </div>
    </footer>
  );
}
