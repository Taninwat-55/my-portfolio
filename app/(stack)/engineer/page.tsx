import type { Metadata } from "next";
import Link from "next/link";
import { readFileSync } from "node:fs";
import path from "node:path";
import { cases, stackContent, stackHref } from "../../data";
import { PixelIcon } from "../../components/stack/PixelIcon";
import styles from "../../components/stack/stack.module.css";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Engineer",
  description:
    "Ice (Taninwat Kaewpankan), full-stack engineer in Copenhagen: React, Next.js, TypeScript, Node.js and PostgreSQL. Product engineer at Trailr AI; before that, Head of Organization at Millennial Consulting.",
  alternates: { canonical: "https://taninwatkaewpankan.xyz/engineer" },
};

/**
 * The real function, read from the build script at build time, so the code
 * on this card can never drift from the code that made the stack's pictures.
 */
function atkinsonSource() {
  const file = readFileSync(path.join(process.cwd(), "scripts/dither-images.mjs"), "utf8");
  const start = file.indexOf("function atkinson");
  const end = file.indexOf("\n}\n", start);
  if (start < 0 || end < 0) throw new Error("atkinson() not found in scripts/dither-images.mjs");
  return file.slice(start, end + 2);
}

/**
 * The Engineer card. What a hiring manager needs in one screen: title,
 * stack, each skill linked to the card that proves it, and the CV, beside a
 * script window holding real code from this site.
 */
export default function EngineerPage() {
  const copy = stackContent.engineer;
  return (
    <div className={styles.engGrid}>
      <div>
        <h1 className={styles.title}>{copy.title}</h1>
        <p className={styles.lead}>{copy.lead}</p>
        <ul className={styles.stackList} aria-label="Stack">
          {copy.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <h2 className={`${styles.heading} ${styles.proofLabel}`}>{copy.proofLabel}</h2>
        <ul className={styles.proof}>
          {copy.proof.map((p) => (
            <li key={p.id}>
              <Link href={stackHref(p.id)}>
                <span className={styles.proofSkill}>{p.skill}</span>
                <span className={styles.proofWork}>
                  <strong>{cases.find((c) => c.id === p.id)?.title}</strong>
                  {p.line}
                </span>
                <PixelIcon name="next" />
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.buttons}>
          <Link href={copy.cv.href} className={`${styles.btn} ${styles.btnDefault}`}>
            {copy.cv.label}
          </Link>
          <a href={copy.pdf.href} className={styles.btn}>
            {copy.pdf.label}
          </a>
        </div>
      </div>
      <div>
        <section className={styles.window} aria-label={copy.scriptTitle}>
          <div className={styles.titlebar}>
            <i className={styles.closeBox} aria-hidden="true" />
            <span>{copy.scriptTitle}</span>
          </div>
          <pre className={styles.script} tabIndex={0}>
            <code>{atkinsonSource()}</code>
          </pre>
        </section>
        <p className={styles.scriptNote}>{copy.scriptNote}</p>
      </div>
    </div>
  );
}
