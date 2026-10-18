import { Metadata } from "next";
import { getSortedPostsData } from "../../lib/posts";
import { GardenList } from "./GardenList";
import stack from "../../components/stack/stack.module.css";
import styles from "../../components/stack/reading.module.css";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes on building products, engineering, product thinking, and the occasional interactive tool embedded right inside the post.",
  alternates: {
    canonical: "https://taninwatkaewpankan.xyz/garden",
  },
  openGraph: {
    title: "Writing | Ice · Taninwat Kaewpankan",
    description:
      "Notes on building products, engineering, product thinking, and the occasional interactive tool embedded right inside the post.",
    url: "https://taninwatkaewpankan.xyz/garden",
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing | Ice · Taninwat Kaewpankan",
    description:
      "Notes on building products, engineering, product thinking, and the occasional interactive tool embedded right inside the post.",
  },
};

/** The writing card: every note, newest first, as a ruled list. */
export default function GardenIndex() {
  // Only what the list shows: the full text of every note stays out of the
  // client component's props.
  const entries = getSortedPostsData().map(({ slug, title, date, category, readTime, excerpt }) => ({
    slug,
    title,
    date,
    category,
    readTime,
    excerpt,
  }));

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={stack.title}>Writing</h1>
        <p className={stack.lead}>
          Notes on building products, engineering, product thinking, and the occasional tool that runs
          right inside the post.
        </p>
      </header>
      <GardenList posts={entries} />
    </div>
  );
}
