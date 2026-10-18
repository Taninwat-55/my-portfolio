import { Metadata } from "next";
import { getSortedPostsData } from "../lib/posts";
import { PageShell } from "../components/PageShell";
import { PaperSheet } from "../components/paper/PaperSheet";
import { PageHeader } from "../components/paper/PageHeader";
import { GardenList } from "./GardenList";
import styles from "./notebook.module.css";

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

/** The notebook's contents page: every note, newest first, written on its lines. */
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
    <PageShell back={{ href: "/", label: "Home" }}>
      <PaperSheet className={styles.notebook}>
        <PageHeader
          kicker="The notebook"
          title="Writing"
          lead="Notes on building products, engineering, product thinking, and the occasional tool that runs right inside the post."
        />

        <GardenList posts={entries} />
      </PaperSheet>
    </PageShell>
  );
}
