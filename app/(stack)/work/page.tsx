import type { Metadata } from "next";
import Link from "next/link";
import {
  cases,
  ditheredSrc,
  showroomCases,
  stackArchive,
  stackContent,
  stackHref,
  stackOrder,
  type StackCardId,
} from "../../data";
import { ditherSize } from "../../components/stack/DitherPicture";
import styles from "../../components/stack/stack.module.css";

const PAGE_URL = "https://taninwatkaewpankan.xyz/work";

export const metadata: Metadata = {
  title: "All cards",
  description:
    "Every card in Ice's Stack: Racha Beauty, Trailr AI, Bevisly, MockMate, Lumina Spa, Saep Fire Kitchen and Millennial Consulting, plus the archive.",
  alternates: { canonical: PAGE_URL },
};

const TITLES: Partial<Record<StackCardId, string>> = {
  home: stackContent.home.title,
  engineer: stackContent.engineer.title,
  showroom: stackContent.showroom.title,
  build: stackContent.build.title,
};

/**
 * A card's miniature. Case cards show their dithered screenshot; the three
 * cards without one get a picture of themselves: Ice's face, a script window,
 * a blank card's fields.
 */
function MiniArt({ id, thumb }: { id: StackCardId; thumb: string | null }) {
  const src = thumb ?? (id === "home" ? "/stack/ice-portrait-thumb.png" : null);
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element -- a dither must not be resized (DitherPicture.tsx)
    return <img src={src} alt="" loading="lazy" decoding="async" {...ditherSize(src)} />;
  }
  if (id === "engineer") {
    return (
      <span className={`${styles.miniArt} ${styles.miniCode}`} aria-hidden="true">
        <span className={styles.miniBar} />
        {[70, 52, 84, 40, 64, 30, 76].map((w, i) => (
          <i key={i} style={{ width: `${w}%`, marginLeft: `${(i % 3) * 8}%` }} />
        ))}
      </span>
    );
  }
  return (
    <span className={`${styles.miniArt} ${styles.miniForm}`} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

function Mini({ id, n }: { id: StackCardId; n: number }) {
  const caseStudy = cases.find((c) => c.id === id);
  const title = caseStudy?.title ?? TITLES[id] ?? id;
  // The Showroom card wears its first concept's screenshot.
  const pictured = caseStudy ?? (id === "showroom" ? showroomCases()[0] : undefined);
  const thumb = pictured ? ditheredSrc(pictured.images[0], "thumb") : null;
  return (
    <li>
      <Link href={stackHref(id)} className={styles.mini}>
        <MiniArt id={id} thumb={thumb} />
        <span className={styles.miniTitle}>
          {title}
          <small>
            {n} of {stackOrder.length}
          </small>
        </span>
      </Link>
    </li>
  );
}

/**
 * The all-cards view, HyperCard's miniature grid of a stack. Lead work first,
 * then the archive, in stack order, so a card's number here is the number the
 * nav bar shows on it.
 */
export default function WorkPage() {
  const numbered = stackOrder.map((id, i) => ({ id, n: i + 1 }));
  const lead = numbered.filter(({ id }) => !stackArchive.includes(id));
  const archive = numbered.filter(({ id }) => stackArchive.includes(id));
  return (
    <div>
      <div className={styles.gridLead}>
        <h1 className={styles.title}>{stackContent.grid.title}</h1>
        <p className={styles.lead}>{stackContent.grid.lead}</p>
      </div>
      <ul className={styles.miniGrid}>
        {lead.map(({ id, n }) => (
          <Mini key={id} id={id} n={n} />
        ))}
      </ul>
      <h2 className={`${styles.heading} ${styles.archiveHeading}`}>{stackContent.grid.archive}</h2>
      <ul className={styles.miniGrid}>
        {archive.map(({ id, n }) => (
          <Mini key={id} id={id} n={n} />
        ))}
      </ul>
    </div>
  );
}
