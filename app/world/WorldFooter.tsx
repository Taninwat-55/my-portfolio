import { personalInfo } from "@/app/data";
import styles from "./world.module.css";

/** Email, city and the registered business, at the foot of every world page. */
export function WorldFooter() {
  return (
    <footer className={styles.footer}>
      <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
      <span>{personalInfo.location}</span>
      <span>
        {personalInfo.business.name} · CVR {personalInfo.business.cvr}
      </span>
    </footer>
  );
}
