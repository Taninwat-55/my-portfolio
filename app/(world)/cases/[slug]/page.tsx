import { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";
import { notFound } from "next/navigation";
import { cases, conceptPrice, founding, foundingOpen, inShowroom, leadCaseIds, casePage } from "@/app/data";
import { GridLines } from "@/app/world/GridLines";
import { SmoothScroll } from "@/app/world/SmoothScroll";
import { WorldFooter } from "@/app/world/WorldFooter";
import { WorldNav } from "@/app/world/WorldNav";
import { WorldShell } from "@/app/world/WorldShell";
import { MakingVideo } from "@/app/world/MakingVideo";
import { Reveal } from "@/app/world/effects/crystallize/Reveal";
import { caseTitle } from "@/app/world/caseTitle";
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
      // A page-level openGraph replaces the root one rather than merging, so
      // the share card has to be named again.
      images: ["/opengraph-image"],
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

  const copy = casePage;
  const shop = casePage.price;
  const baseUrl = "https://taninwatkaewpankan.xyz";
  const caseUrl = `${baseUrl}/cases/${caseStudy.id}`;
  const sameAs = [caseStudy.links.demo, caseStudy.links.code].filter(Boolean);
  const hero = caseStudy.images[0];
  const next = cases.find((c) => c.id === order[(order.indexOf(caseStudy.id) + 1) % order.length])!;
  const price = inShowroom(caseStudy) ? conceptPrice(caseStudy.showroom!) : null;
  const design = caseStudy.design;

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
            <ViewTransition name={caseTitle(caseStudy.id)}>
              <h1 className={styles.title}>{caseStudy.title}</h1>
            </ViewTransition>
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
                {shop.label}
              </h2>
              <div className={styles.priceBody}>
                <div>
                  <p className={styles.priceSub}>{shop.gets}</p>
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
                  <Link className={styles.button} href={`/contact?like=${caseStudy.id}#enquire`}>
                    {shop.buildLike} <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </section>
          )}

          <div className={styles.story}>
            {/* Overview and challenge are shared; with design facts, the rest
                splits into the two languages the site speaks, side by side. */}
            {copy.sections
              .filter(({ key }) => !design || key === "overview" || key === "challenge")
              .map(({ key, label }) => (
                <section key={key} className={styles.chapter}>
                  <h2 className={styles.label}>{label}</h2>
                  <p className={styles.body}>{caseStudy[key]}</p>
                </section>
              ))}

            {design && (
              <div className={styles.split}>
                <section className={styles.voice} aria-labelledby="design-title">
                  <h2 id="design-title" className={styles.voiceTitle}>
                    Design
                  </h2>
                  {design.notes && <p className={styles.voiceText}>{design.notes}</p>}
                  <p className={styles.label}>Palette</p>
                  <ul className={styles.swatches}>
                    {design.palette.map((c) => (
                      <li key={c.name + c.hex}>
                        <span className={styles.swatch} style={{ background: c.hex }} aria-hidden="true" />
                        <span className={styles.swatchName}>{c.name}</span>
                        <span className={styles.swatchHex}>{c.hex}</span>
                      </li>
                    ))}
                  </ul>
                  <p className={styles.label}>Type</p>
                  <dl className={styles.typeList}>
                    {design.type.map((t) => (
                      <div key={t.role}>
                        <dt>{t.role}</dt>
                        <dd>{t.family}</dd>
                      </div>
                    ))}
                  </dl>
                </section>

                <section className={styles.voice} aria-labelledby="engineering-title">
                  <h2 id="engineering-title" className={styles.voiceTitle}>
                    Engineering
                  </h2>
                  <p className={styles.label}>{copy.sections.find((x) => x.key === "stackWhy")!.label}</p>
                  <p className={styles.voiceText}>{caseStudy.stackWhy}</p>
                  <p className={styles.label}>{copy.sections.find((x) => x.key === "engineering")!.label}</p>
                  <p className={styles.voiceText}>{caseStudy.engineering}</p>
                  <p className={styles.label}>Built with</p>
                  <p className={styles.voiceText}>{caseStudy.stack.join(", ")}</p>
                </section>
              </div>
            )}
          </div>

          {caseStudy.making && caseStudy.making.length > 0 && (
            <section className={styles.making} aria-labelledby="making-title">
              <h2 id="making-title" className={styles.label}>
                The Making
              </h2>
              <ol className={styles.stages}>
                {caseStudy.making.map((stage, i) => (
                  <li key={stage.label} className={styles.stage}>
                    <p className={styles.stageN}>
                      {String(i + 1).padStart(2, "0")} · {stage.label}
                    </p>
                    {stage.video && stage.poster && (
                      <MakingVideo className={styles.stageImage} src={stage.video} poster={stage.poster} label={stage.text} />
                    )}
                    {stage.image && (
                      // eslint-disable-next-line @next/next/no-img-element -- process material, shown as made
                      <img className={styles.stageImage} src={stage.image} alt={stage.alt ?? ""} loading="lazy" />
                    )}
                    <p className={styles.stageText}>{stage.text}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}

          <nav className={styles.next} aria-label="Next project">
            <p className={styles.label}>Next</p>
            <Link className={styles.nextLink} href={`/cases/${next.id}`}>
              <ViewTransition name={caseTitle(next.id)}>
                <span>{next.title}</span>
              </ViewTransition>{" "}
              <span aria-hidden="true">→</span>
            </Link>
            <p className={styles.nextSub}>{next.sub}</p>
          </nav>
        </article>
      </main>
      <WorldFooter />
    </WorldShell>
  );
}
