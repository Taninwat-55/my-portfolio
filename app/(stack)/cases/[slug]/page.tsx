import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cases, ditheredSrc, stackContent } from "../../../data";
import { DitherPicture } from "../../../components/stack/DitherPicture";
import { DevelopImage } from "../../../components/stack/DevelopImage";
import styles from "../../../components/stack/stack.module.css";

// ─── Static params + metadata ──────────────────────────────────────────────

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = cases.find((c) => c.id === slug);

  if (!caseStudy) return { title: "Case Not Found" };

  const url = `https://taninwatkaewpankan.xyz/cases/${slug}`;

  return {
    title: caseStudy.title,
    description: caseStudy.sub,
    alternates: { canonical: url },
    openGraph: {
      title: `${caseStudy.title} | Ice · Taninwat Kaewpankan`,
      description: caseStudy.sub,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${caseStudy.title} | Ice · Taninwat Kaewpankan`,
      description: caseStudy.sub,
    },
  };
}

// ─── Card ───────────────────────────────────────────────────────────────────

/**
 * A project card in Ice's Stack. The top half is what a visitor needs in
 * seconds: what it is, the facts, the links, and the screenshot, dithered,
 * with the one control that develops it into the real colour site. The
 * write-up sits in a scrolling field underneath, the way HyperCard kept long
 * text inside the card instead of pushing the card longer.
 */
export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = cases.find((c) => c.id === slug);

  if (!caseStudy) notFound();

  const copy = stackContent.project;
  const baseUrl = "https://taninwatkaewpankan.xyz";
  const caseUrl = `${baseUrl}/cases/${caseStudy.id}`;
  const sameAs = [caseStudy.links.demo, caseStudy.links.code].filter(Boolean);
  const hero = caseStudy.images[0];

  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: caseStudy.title,
    headline: caseStudy.sub,
    description: caseStudy.overview,
    url: caseUrl,
    image: `${baseUrl}${hero}`,
    about: caseStudy.tag,
    keywords: caseStudy.stack.join(", "),
    creator: {
      "@type": "Person",
      name: "Taninwat Kaewpankan",
      alternateName: "Ice",
      url: baseUrl,
    },
    ...(sameAs.length ? { sameAs } : {}),
  };

  const alt = `${caseStudy.title}, screenshot`;

  return (
    <article className={styles.caseGrid}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkJsonLd) }}
      />

      <div className={styles.caseHead}>
        <h1 className={styles.title}>{caseStudy.title}</h1>
        <p className={styles.sub}>{caseStudy.sub}</p>
        {caseStudy.concept && <p className={styles.note}>{copy.concept}</p>}

        <dl className={styles.facts}>
          {caseStudy.metrics.map((m) => (
            <div key={m.k} style={{ display: "contents" }}>
              <dt>{m.v}</dt>
              <dd>{m.k}</dd>
            </div>
          ))}
        </dl>

        <p className={styles.builtWith}>
          <strong>Built with</strong> {caseStudy.stack.join(", ")}
        </p>

        <div className={styles.buttons}>
          {caseStudy.links.demo && (
            <a
              href={caseStudy.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.btn} ${styles.btnDefault}`}
            >
              {caseStudy.links.demoLabel ?? "Live site"}
            </a>
          )}
          {caseStudy.links.code && (
            <a href={caseStudy.links.code} target="_blank" rel="noopener noreferrer" className={styles.btn}>
              {copy.code}
            </a>
          )}
          {caseStudy.links.docs && (
            <a href={caseStudy.links.docs} target="_blank" rel="noopener noreferrer" className={styles.btn}>
              Docs
            </a>
          )}
        </div>
      </div>

      <DevelopImage
        colourSrc={hero}
        colourAlt={`${caseStudy.title}, screenshot in colour`}
        developLabel={copy.develop}
        developedLabel={copy.developed}
        hint={copy.developHint}
        windowTitle={caseStudy.links.demo ? new URL(caseStudy.links.demo).host.replace(/^www\./, "") : caseStudy.title}
      >
        <DitherPicture src={ditheredSrc(hero)} alt={alt} priority />
      </DevelopImage>

      <div className={`${styles.scrollField} ${styles.caseText}`} tabIndex={0} aria-label="Case study">
        {copy.sections.map(({ key, label }) => (
          <section key={key} className={styles.scrollSection}>
            <h2 className={styles.heading}>{label}</h2>
            <p className={styles.body}>{caseStudy[key]}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
