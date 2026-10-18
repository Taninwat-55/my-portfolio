import type { Metadata } from "next";
import Link from "next/link";
import { stackContent } from "../../data";
import { BlankCard } from "../../components/stack/BlankCard";
import styles from "../../components/stack/stack.module.css";

export const metadata: Metadata = {
  title: "Build mine",
  description:
    "Ask Ice to build your website. Fixed prices agreed in writing before work starts; every enquiry gets a personal reply.",
  alternates: { canonical: "https://taninwatkaewpankan.xyz/build" },
};

/** The Build mine card: a blank card the visitor fills in (BlankCard.tsx). */
export default function BuildPage() {
  const copy = stackContent.build;
  return (
    <div className={styles.buildGrid}>
      <div>
        <h1 className={styles.title}>{copy.title}</h1>
        <p className={styles.lead}>{copy.lead}</p>
        <p className={styles.availability}>{copy.price}</p>
        <p className={styles.hint}>
          <Link href={copy.details.href} className={styles.inlineLink}>
            {copy.details.label}
          </Link>
        </p>
      </div>
      <BlankCard />
    </div>
  );
}
