import type { Metadata } from "next";
import Link from "next/link";
import {
  cases,
  conceptPrice,
  ditheredSrc,
  inShowroom,
  showroomCases,
  stackContent,
  stackHref,
  stackOrder,
  stackRuns,
  type StackCardId,
} from "../../data";
import { ditherSize } from "../../components/stack/DitherPicture";
import styles from "../../components/stack/stack.module.css";

const PAGE_URL = "https://taninwatkaewpankan.xyz/work";

export const metadata: Metadata = {
  title: "All cards",
  description:
    "Every card in Ice's Stack: websites for businesses (Racha Beauty, Lumina Spa, Saep Fire Kitchen), then Trailr AI, Bevisly, MockMate and Millennial Consulting, plus the archive.",
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
  // The Showroom card wears its first sample's screenshot.
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
        {caseStudy && inShowroom(caseStudy) && (
          <span className={styles.miniMeta}>
            <strong className={styles.miniPrice}>{conceptPrice(caseStudy.showroom!).total}</strong>
          </span>
        )}
      </Link>
    </li>
  );
}

/**
 * The all-cards view, HyperCard's miniature grid of a stack. The Home card,
 * then one headed group per run in stackRuns (clients, engineering, archive),
 * in stack order, so a card's number here is the number the nav bar shows on
 * it. Sites with a Showroom entry show their price under the title.
 */
export default function WorkPage() {
  const number = (id: StackCardId) => stackOrder.indexOf(id) + 1;
  return (
    <div>
      <div className={styles.gridLead}>
        <h1 className={styles.title}>{stackContent.grid.title}</h1>
        <p className={styles.lead}>{stackContent.grid.lead}</p>
      </div>
      <ul className={styles.miniGrid}>
        <Mini id="home" n={number("home")} />
      </ul>
      {stackRuns.map((run) => (
        <section key={run.id} aria-labelledby={`run-${run.id}`}>
          <h2 id={`run-${run.id}`} className={`${styles.heading} ${styles.archiveHeading}`}>
            {stackContent.grid.runs[run.id]}
          </h2>
          <ul className={styles.miniGrid}>
            {run.cards.map((id) => (
              <Mini key={id} id={id} n={number(id)} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
