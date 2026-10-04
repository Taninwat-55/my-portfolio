import Link from "next/link";
import { clockContent } from "../../data";
import type { ClockNote } from "./types";
import styles from "./clock.module.css";

/**
 * The Writing object: a notebook whose cover swings open at stage 1 onto the
 * newest notes. Each line links to the full post on /garden.
 */
export function Notebook({ stage, notes }: { stage: number; notes: ClockNote[] }) {
  const { writing } = clockContent;

  return (
    <div className={`${styles.notebook} ${stage >= 1 ? styles.notebookOpen : ""}`}>
      <div className={styles.notebookPages}>
        <h2>{writing.title}</h2>
        <ol>
          {notes.map((note) => (
            <li key={note.slug}>
              <Link href={`/garden/${note.slug}`}>
                <span>{note.title}</span>
                <time>{note.date}</time>
              </Link>
            </li>
          ))}
        </ol>
        <Link href={writing.allHref} className={styles.notebookAll}>
          {writing.allLabel} →
        </Link>
      </div>
      <div className={styles.notebookCover} aria-hidden="true">
        <span>{writing.title}</span>
      </div>
    </div>
  );
}
