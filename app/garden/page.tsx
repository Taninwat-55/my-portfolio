import { Metadata } from "next";
import Link from "next/link";
import { getSortedPostsData } from "../lib/posts";
import { PageShell } from "../components/PageShell";
import { PaperSheet } from "../components/paper/PaperSheet";
import { PageHeader } from "../components/paper/PageHeader";
import styles from "./notebook.module.css";

export const metadata: Metadata = {
  title: "Garden",
  description:
    "Notes on building products, engineering, product thinking, and the occasional interactive tool embedded right inside the post.",
  alternates: {
    canonical: "https://taninwatkaewpankan.xyz/garden",
  },
  openGraph: {
    title: "Garden | Ice · Taninwat Kaewpankan",
    description:
      "Notes on building products, engineering, product thinking, and the occasional interactive tool embedded right inside the post.",
    url: "https://taninwatkaewpankan.xyz/garden",
  },
  twitter: {
    card: "summary_large_image",
    title: "Garden | Ice · Taninwat Kaewpankan",
    description:
      "Notes on building products, engineering, product thinking, and the occasional interactive tool embedded right inside the post.",
  },
};

/** The notebook's contents page: every note, newest first, written on its lines. */
export default function GardenIndex() {
  const allPosts = getSortedPostsData();

  return (
    <PageShell back={{ href: "/writing", label: "Writing" }}>
      <PaperSheet className={styles.notebook}>
        <PageHeader
          kicker="The notebook"
          title="Garden"
          lead="Notes on building products, engineering, product thinking, and the occasional tool that runs right inside the post."
        />

        <ol className={`${styles.lined} ${styles.contents}`}>
          {allPosts.map((post) => (
            <li key={post.slug}>
              <h2 className={styles.entryTitle}>
                <Link href={`/garden/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className={styles.entryMeta}>
                {post.category} <span aria-hidden="true">·</span>{" "}
                <time dateTime={post.date}>{post.date}</time> <span aria-hidden="true">·</span>{" "}
                {post.readTime}
              </p>
              <p className={styles.entryExcerpt}>{post.excerpt}</p>
            </li>
          ))}
        </ol>
      </PaperSheet>
    </PageShell>
  );
}
