import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cases, conceptPrice, founding, foundingOpen, inShowroom, leadCaseIds, stackContent } from "@/app/data";
import { GridLines } from "@/app/world/GridLines";
import { SmoothScroll } from "@/app/world/SmoothScroll";
import { WorldFooter } from "@/app/world/WorldFooter";
import { WorldNav } from "@/app/world/WorldNav";
import { WorldShell } from "@/app/world/WorldShell";
import { Reveal } from "@/app/world/effects/crystallize/Reveal";
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

// The hall's order first, then the rest, so "Next" walks the same route a
// visitor took through the hall and the others still lead somewhere.
const order = [...leadCaseIds, ...cases.map((c) => c.id).filter((id) => !leadCaseIds.includes(id))];

// ─── Page ───────────────────────────────────────────────────────────────────

/**
 * A case in the Crystallize world (step 3 of the site overhaul, 2026-10-25).
 * What a visitor needs in seconds comes first: what it is, the facts, the
 * links, and the screens crystallizing in (clips later). Then the numbers,
 * the price for a Showroom concept, the story, and the door to the next case.
 * "The Making" comes later.
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
  const shop = stackContent.showroom;
  const baseUrl = "https://taninwatkaewpankan.xyz";
  const caseUrl = `${baseUrl}/cases/${caseStudy.id}`;
  const sameAs = [caseStudy.links.demo, caseStudy.links.code].filter(Boolean);
  const hero = caseStudy.images[0];
  const next = cases.find((c) => c.id === order[(order.indexOf(caseStudy.id) + 1) % order.length])!;
  const price = inShowroom(caseStudy) ? conceptPrice(caseStudy.showroom!) : null;

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

  // `scope` is written for the chatbot in full sentences; its opening clause
  // ("Full-stack", "Frontend only") is the fact.
  const facts = [
    { label: "Role", value: caseStudy.role },
    { label: "Scope", value: caseStudy.scope.split(/[:.]/)[0] },
    { label: "Year", value: caseStudy.year },
    { label: "Built with", value: caseStudy.stack.join(", ") },
  ].filter((f) => f.value);

  const links = [
    caseStudy.links.demo && { href: caseStudy.links.demo, label: caseStudy.links.demoLabel ?? "Live site" },
    caseStudy.links.code && { href: caseStudy.links.code, label: copy.code },
    caseStudy.links.docs && { href: caseStudy.links.docs, label: "Docs" },
  ].filter((l): l is { href: string; label: string } => Boolean(l));

  return (
    <WorldShell>
      <SmoothScroll />
      <main id="main-content">
        <article>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkJsonLd) }}
          />

          <header className={styles.head}>
            <GridLines />
            <WorldNav className={styles.nav} />

            <p className={styles.kicker}>
              <Link href="/#work-title">Work</Link> <span aria-hidden="true">/</span> {caseStudy.n} ·{" "}
              {caseStudy.tag}
            </p>
            <h1 className={styles.title}>{caseStudy.title}</h1>
            <p className={styles.sub}>{caseStudy.sub}</p>
            {caseStudy.concept && <p className={styles.concept}>{copy.concept}</p>}

            <div className={styles.side}>
              <dl className={styles.facts}>
                {facts.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
              {links.length > 0 && (
                <ul className={styles.links}>
                  {links.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} target="_blank" rel="noopener noreferrer">
                        {l.label} <span aria-hidden="true">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Reveal
              className={styles.media}
              slides={caseStudy.images.map((src) => ({ src, title: caseStudy.title }))}
              trigger="view"
              wide
            />
          </header>

          <dl className={styles.metrics}>
            {caseStudy.metrics.map((m) => (
              <div key={m.k}>
                <dt>{m.k}</dt>
                <dd>{m.v}</dd>
              </div>
            ))}
          </dl>

          {/* Before the story: a client wants the price before the engineering. */}
          {price && (
            <section className={styles.price} aria-labelledby="price-title">
              <h2 id="price-title" className={styles.label}>
                {shop.priceLabel}
              </h2>
              <div className={styles.priceBody}>
                <div>
                  <p className={styles.priceSub}>{shop.getsLabel}</p>
                  <ul className={styles.gets}>
                    {caseStudy.showroom!.gets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <dl className={styles.receipt}>
                    {price.rows.map((row) => (
                      <div key={row.label}>
                        <dt>{row.label}</dt>
                        <dd>{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className={styles.total}>
                    {shop.total} {price.total}
                  </p>
                  {foundingOpen && (
                    <p className={styles.founding}>
                      {founding.label} {price.founding}
                    </p>
                  )}
                  <p className={styles.terms}>
                    {shop.timeline} {price.timeline}. {shop.terms}
                  </p>
                  <Link className={styles.button} href={`/build?like=${caseStudy.id}`}>
                    {shop.buildLike} <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </section>
          )}

          <div className={styles.story}>
            {copy.sections.map(({ key, label }) => (
              <section key={key} className={styles.chapter}>
                <h2 className={styles.label}>{label}</h2>
                <p className={styles.body}>{caseStudy[key]}</p>
              </section>
            ))}
          </div>

          <nav className={styles.next} aria-label="Next project">
            <p className={styles.label}>Next</p>
            <Link className={styles.nextLink} href={`/cases/${next.id}`}>
              {next.title} <span aria-hidden="true">→</span>
            </Link>
            <p className={styles.nextSub}>{next.sub}</p>
          </nav>
        </article>
      </main>
      <WorldFooter />
    </WorldShell>
  );
}
