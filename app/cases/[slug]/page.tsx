import { Metadata } from "next";
import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, Github, FileText } from "lucide-react";
import { cases } from "../../data";
import { PageShell } from "../../components/PageShell";
import { FadeIn } from "../../components/FadeIn";
import { PaperSheet } from "../../components/paper/PaperSheet";
import { PageHeader } from "../../components/paper/PageHeader";
import { Print } from "../../components/paper/Print";
import { Tag } from "../../components/paper/Tag";
import { InkLink } from "../../components/paper/InkLink";
import styles from "./case.module.css";

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

// ─── Page ───────────────────────────────────────────────────────────────────

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className={styles.section}>
      <h2>{label}</h2>
      <p>{children}</p>
    </section>
  );
}

// Alternating turns, so the screenshots read as prints dropped on the desk.
const GALLERY_TILTS = [-1.5, 1.2, -0.8];

/**
 * A case study: the back of its print, opened big. The print's photo is on
 * top, the write-up is the sheet below it, and the other screenshots lie on
 * the desk under the sheet.
 */
export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = cases.find((c) => c.id === slug);

  if (!caseStudy) notFound();

  const baseUrl = "https://taninwatkaewpankan.xyz";
  const caseUrl = `${baseUrl}/cases/${caseStudy.id}`;
  const sameAs = [caseStudy.links.demo, caseStudy.links.code].filter(Boolean);

  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: caseStudy.title,
    headline: caseStudy.sub,
    description: caseStudy.overview,
    url: caseUrl,
    image: `${baseUrl}${caseStudy.images[0]}`,
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

  return (
    // Back to the prints on the clock homepage: /#projects stopped existing
    // when the long-scroll homepage was replaced.
    <PageShell back={{ href: "/work", label: "Work" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkJsonLd) }}
      />

      {/* The print's photo. Shares its name with the print on /work (and on
          /projects), so opening a case study grows that photo into this one.
          No FadeIn here: it holds the image at opacity 0 until hydration, which
          would make the transition grow into nothing. Preloaded at high
          priority, since it is the likely LCP element (Next 16 replaced
          `priority` with `preload`; the old prop left it at Low). */}
      <div className={styles.hero}>
        <ViewTransition name={`case-hero-${caseStudy.id}`}>
          <span className={styles.heroPhoto}>
            <Image
              src={caseStudy.images[0]}
              alt={`${caseStudy.title}, main screenshot`}
              fill
              preload
              fetchPriority="high"
              sizes="(max-width: 960px) 100vw, 900px"
            />
          </span>
        </ViewTransition>
      </div>

      <PaperSheet as="article" className={styles.sheet}>
        <PageHeader kicker={caseStudy.tag} title={caseStudy.title} lead={caseStudy.sub} />

        <FadeIn immediate delay={0.1} y={12} className={styles.actions}>
          {caseStudy.links.demo && (
            <InkLink href={caseStudy.links.demo} primary external>
              <ExternalLink size={15} strokeWidth={1.75} aria-hidden />
              {caseStudy.links.demoLabel ?? "Live Project"}
            </InkLink>
          )}
          {caseStudy.links.code && (
            <InkLink href={caseStudy.links.code} external>
              <Github size={15} strokeWidth={1.75} aria-hidden />
              Code
            </InkLink>
          )}
          {caseStudy.links.docs && (
            <InkLink href={caseStudy.links.docs} external>
              <FileText size={15} strokeWidth={1.75} aria-hidden />
              PRD
            </InkLink>
          )}
        </FadeIn>

        {/* The result lands before the reading starts. */}
        <dl className={styles.figures}>
          {caseStudy.metrics.map((m) => (
            <div key={m.k}>
              <dt>{m.k}</dt>
              <dd>{m.v}</dd>
            </div>
          ))}
        </dl>

        <Section label="Overview">{caseStudy.overview}</Section>
        <Section label="The Challenge">{caseStudy.challenge}</Section>
        <Section label="The Approach">{caseStudy.stackWhy}</Section>
        <Section label="The Work">{caseStudy.engineering}</Section>

        <section className={styles.section}>
          <h2>Stack & Skills</h2>
          <div className={styles.stack}>
            {caseStudy.stack.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
        </section>

        <p className={styles.signoff}>
          Want to talk about this one, or something we could build together?{" "}
          <Link href="/contact">
            Write me a postcard <span aria-hidden="true">→</span>
          </Link>
        </p>
      </PaperSheet>

      {caseStudy.images.length > 1 && (
        <ul className={styles.gallery} aria-label={`More from ${caseStudy.title}`}>
          {caseStudy.images.slice(1).map((src, i) => (
            <li key={src}>
              <FadeIn delay={i * 0.1} y={24}>
                <Print
                  image={src}
                  alt={`${caseStudy.title}, screenshot ${i + 2}`}
                  ratio="16 / 10"
                  tilt={GALLERY_TILTS[i % GALLERY_TILTS.length]}
                  sizes="(max-width: 640px) 100vw, 450px"
                />
              </FadeIn>
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  );
}
