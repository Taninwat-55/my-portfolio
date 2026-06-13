import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ExternalLink, Github, FileText } from "lucide-react";
import { cases } from "../../data";
import { Navbar } from "../../components/Navbar";
import { SkipLink } from "../../components/SkipLink";
import { FadeIn } from "../../components/FadeIn";
import { ContactButton } from "../../components/ContactButton";

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
      title: `${caseStudy.title} | Ice — Taninwat Kaewpankan`,
      description: caseStudy.sub,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${caseStudy.title} | Ice — Taninwat Kaewpankan`,
      description: caseStudy.sub,
    },
  };
}

// ─── Page ───────────────────────────────────────────────────────────────────

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <FadeIn y={30}>
      <div className="mb-12 md:mb-16">
        <div className="text-crystal-500 text-xs tracking-[0.25em] uppercase mb-4">
          {label}
        </div>
        <p className="text-frost/80 font-light leading-relaxed text-base md:text-lg max-w-3xl">
          {children}
        </p>
      </div>
    </FadeIn>
  );
}

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
    <div className="min-h-screen bg-night-900 text-frost">
      <SkipLink />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkJsonLd) }}
      />
      <Navbar backLinkHref="/#projects" backLinkText="Back to Projects" />

      <main id="main-content" className="container mx-auto px-6 pt-28 md:pt-36 pb-24 max-w-5xl">
        {/* Header */}
        <header className="mb-14 md:mb-20">
          <FadeIn y={20}>
            <span className="inline-block text-crystal-500 bg-crystal-500/10 rounded-full text-xs uppercase tracking-wider px-3 py-1 mb-6">
              {caseStudy.tag}
            </span>
          </FadeIn>
          <FadeIn delay={0.1} y={40}>
            <h1
              className="hero-heading font-black uppercase leading-none tracking-tight mb-6"
              style={{ fontSize: "clamp(2.6rem, 9vw, 110px)" }}
            >
              {caseStudy.title}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2} y={20}>
            <p className="text-frost/70 font-light text-lg md:text-xl max-w-2xl leading-relaxed">
              {caseStudy.sub}
            </p>
          </FadeIn>

          {/* Links */}
          <FadeIn delay={0.3} y={20}>
            <div className="flex flex-wrap items-center gap-3 mt-8">
              {caseStudy.links.demo && (
                <a
                  href={caseStudy.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-frost text-frost font-medium uppercase tracking-widest px-6 py-2.5 text-sm hover:bg-frost/10 transition-colors"
                >
                  <ExternalLink size={15} strokeWidth={1.5} />
                  {caseStudy.links.demoLabel ?? "Live Project"}
                </a>
              )}
              {caseStudy.links.code && (
                <a
                  href={caseStudy.links.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-frost/30 text-frost/70 font-medium uppercase tracking-widest px-6 py-2.5 text-sm hover:text-frost hover:border-frost/60 transition-colors"
                >
                  <Github size={15} strokeWidth={1.5} />
                  Code
                </a>
              )}
              {caseStudy.links.docs && (
                <a
                  href={caseStudy.links.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-frost/30 text-frost/70 font-medium uppercase tracking-widest px-6 py-2.5 text-sm hover:text-frost hover:border-frost/60 transition-colors"
                >
                  <FileText size={15} strokeWidth={1.5} />
                  PRD
                </a>
              )}
            </div>
          </FadeIn>
        </header>

        {/* Hero image */}
        <FadeIn y={40}>
          <div className="relative w-full overflow-hidden rounded-[28px] md:rounded-[40px] border border-frost/10 mb-14 md:mb-20 aspect-[16/9]">
            <Image
              src={caseStudy.images[0]}
              alt={`${caseStudy.title} — main screenshot`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
        </FadeIn>

        {/* Metrics */}
        <FadeIn y={30}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14 md:mb-20">
            {caseStudy.metrics.map((m) => (
              <div
                key={m.k}
                className="rounded-2xl bg-white/3 border border-frost/10 p-6 text-center"
              >
                <div className="text-frost font-medium text-xl md:text-2xl mb-1">
                  {m.v}
                </div>
                <div className="text-frost/40 text-xs uppercase tracking-wider">
                  {m.k}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Body */}
        <Section label="Overview">{caseStudy.overview}</Section>
        <Section label="The Challenge">{caseStudy.challenge}</Section>
        <Section label="The Approach">{caseStudy.stackWhy}</Section>
        <Section label="The Work">{caseStudy.engineering}</Section>

        {/* Stack */}
        <FadeIn y={20}>
          <div className="mb-14 md:mb-20">
            <div className="text-crystal-500 text-xs tracking-[0.25em] uppercase mb-4">
              Stack & Skills
            </div>
            <div className="flex flex-wrap gap-2">
              {caseStudy.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-frost/15 bg-white/3 text-frost/70 text-sm font-light px-4 py-1.5"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Gallery */}
        {caseStudy.images.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
            {caseStudy.images.slice(1).map((src, i) => (
              <FadeIn key={src} delay={i * 0.1} y={30}>
                <div className="relative w-full overflow-hidden rounded-[24px] border border-frost/10 aspect-[16/10]">
                  <Image
                    src={src}
                    alt={`${caseStudy.title} — screenshot ${i + 2}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 512px"
                    className="object-cover"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        )}

        {/* CTA */}
        <FadeIn y={30}>
          <div className="flex flex-col items-center gap-6 pt-10 border-t border-frost/10 text-center">
            <p className="text-frost/60 font-light max-w-md">
              Want to talk about this project — or one we could build together?
            </p>
            <ContactButton />
          </div>
        </FadeIn>
      </main>
    </div>
  );
}
