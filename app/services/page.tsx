import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { SkipLink } from "../components/SkipLink";
import { Navbar } from "../components/Navbar";
import { FadeIn } from "../components/FadeIn";
import { SectionHeading } from "../components/SectionHeading";
import { LiveProjectButton } from "../components/LiveProjectButton";
import { ChatWidget } from "../components/ChatWidget";
import { ServicesEnquiryForm } from "../components/ServicesEnquiryForm";
import {
  personalInfo,
  siteContent,
  cases,
  services,
  servicesProcess,
  servicesFaq,
} from "../data";

const BASE_URL = "https://taninwatkaewpankan.xyz";
const PAGE_URL = `${BASE_URL}/services`;

// Leads with the price because the number is the differentiator: nearly every
// competing page says "contact us for a quote". A description that answers the
// question in the SERP earns the click, and gives answer engines something
// concrete enough to quote.
const DESCRIPTION = `Freelance web development in Copenhagen. Small-business websites ${services.offers[0].priceRange}, built in Webflow or coded from scratch. Also web app frontends and redesign work. Published prices, fixed scope, written quote before anything starts.`;

export const metadata: Metadata = {
  title: "Services",
  description: DESCRIPTION,
  // Danish terms sit alongside the English ones because the buyer most likely
  // to convert searches in Danish even though the page is in English.
  keywords: [
    "freelance web developer Copenhagen",
    "freelance webudvikler København",
    "hjemmeside til lille virksomhed",
    "hvad koster en hjemmeside",
    "Webflow developer Denmark",
    "Webflow udvikler Danmark",
    "React Next.js freelancer Copenhagen",
    "web app frontend freelance",
    "website redesign Denmark",
    "hjemmeside pris",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Services | Ice — Taninwat Kaewpankan",
    description: DESCRIPTION,
    url: PAGE_URL,
    type: "website",
    locale: "en_DK",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Ice — Taninwat Kaewpankan",
    description: DESCRIPTION,
  },
};

/**
 * The freelance page.
 *
 * A different visitor than the homepage serves: usually non-technical, deciding
 * whether to spend money rather than whether to book an interview. Hence no
 * PillNav (its links are bare hashes that would be inert here), no HireModal
 * (it offers a CV download, which is the wrong artefact for this reader), and
 * no restatement of siteContent.whatIDo — that is a capability list written for
 * employers.
 *
 * Server component. Every interactive piece below is already a client leaf,
 * which keeps the metadata export and the JSON-LD in this file.
 */
export default function ServicesPage() {
  // Read the proof case from the source of truth rather than restating it, so
  // this page cannot drift from /cases/racha or grow a metric that is not in
  // data.ts already.
  const proofCase = cases.find((c) => c.id === services.proof.caseId);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${PAGE_URL}#business`,
        name: `${personalInfo.name} — Freelance Web Development`,
        url: PAGE_URL,
        description: DESCRIPTION,
        image: `${PAGE_URL}/opengraph-image`,
        // Free text, not a structured Offer.price. schema.org's `price` is a
        // single exact figure; publishing a range's low end there would put the
        // structured data out of step with what the page visibly says.
        // Spans the cheapest thing sold (the standalone audit) to the top of
        // the website band.
        priceRange: "3.500 – 25.000 DKK",
        areaServed: [
          { "@type": "Country", name: "Denmark" },
          { "@type": "Country", name: "Sweden" },
          { "@type": "AdministrativeArea", name: "European Union (remote)" },
        ],
        availableLanguage: ["da", "en", "sv"],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Copenhagen",
          addressCountry: "DK",
        },
        // sameAs is what lets an answer engine tie this business to the same
        // person it already knows from LinkedIn and GitHub, rather than
        // treating it as an unverifiable third entity.
        provider: {
          "@type": "Person",
          name: personalInfo.name,
          alternateName: personalInfo.nickname,
          url: BASE_URL,
          jobTitle: siteContent.roleLabel,
          knowsLanguage: ["Thai", "English", "Swedish", "Danish"],
          sameAs: [personalInfo.socials.linkedin, personalInfo.socials.github],
        },
        knowsAbout: [
          "Web development",
          "Webflow",
          "React",
          "Next.js",
          "TypeScript",
          "Website performance",
          "Web accessibility",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Freelance web development services",
          itemListElement: services.offers.map((offer) => ({
            "@type": "Offer",
            "@id": `${PAGE_URL}#${offer.id}`,
            url: `${PAGE_URL}#${offer.id}`,
            priceCurrency: "DKK",
            // The machine-readable form of "a small number of selected projects".
            availability: "https://schema.org/LimitedAvailability",
            itemOffered: {
              "@type": "Service",
              name: offer.name,
              serviceType: offer.name,
              description: offer.tagline,
              provider: { "@type": "Person", name: personalInfo.name, url: BASE_URL },
            },
          })),
        },
        ...(proofCase && {
          subjectOf: {
            "@type": "CreativeWork",
            name: proofCase.title,
            url: `${BASE_URL}/cases/${proofCase.id}`,
          },
        }),
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: servicesFaq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Services", item: PAGE_URL },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "Services | Ice — Taninwat Kaewpankan",
        description: DESCRIPTION,
        inLanguage: "en",
        about: { "@id": `${PAGE_URL}#business` },
        breadcrumb: { "@id": `${PAGE_URL}#breadcrumbs` },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-night-900 text-frost">
      <SkipLink />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar backLinkHref="/" backLinkText="Back to Home" />

      <main
        id="main-content"
        className="container mx-auto px-6 pt-28 md:pt-36 pb-24 max-w-5xl"
      >
        {/* ── Positioning ───────────────────────────────────────────────── */}
        <header className="mb-14 md:mb-20">
          <FadeIn y={20}>
            <div className="text-crystal-500 text-xs tracking-[0.25em] uppercase mb-4">
              {services.intro.eyebrow}
            </div>
          </FadeIn>

          <FadeIn delay={0.1} y={40}>
            <h1
              className="hero-heading font-black uppercase leading-none tracking-tight mb-6"
              style={{ fontSize: "clamp(2.6rem, 9vw, 110px)" }}
            >
              {services.intro.title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.2} y={20}>
            <p className="text-frost/70 font-display italic text-xl md:text-2xl max-w-2xl leading-relaxed mb-7">
              {services.intro.lead}
            </p>
          </FadeIn>

          <FadeIn delay={0.3} y={20}>
            <p className="text-frost/65 font-light leading-relaxed text-base md:text-lg max-w-2xl mb-8">
              {services.intro.body}
            </p>
          </FadeIn>

          <FadeIn delay={0.4} y={20}>
            <div className="flex flex-wrap gap-2">
              {services.intro.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-frost/15 bg-white/3 text-frost/70 text-sm font-light px-4 py-1.5"
                >
                  {chip}
                </span>
              ))}
            </div>
          </FadeIn>
        </header>

        {/* ── Qualification, before price ───────────────────────────────── */}
        <section aria-labelledby="fit-heading" className="mb-14 md:mb-20">
          <SectionHeading
            id="fit-heading"
            eyebrow="Fit"
            title="Who this is for"
            align="left"
            titleClassName="text-frost"
            titleSize="clamp(1.8rem, 5vw, 3.2rem)"
            className="mb-8 md:mb-10"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <FadeIn y={30}>
              <div className="h-full rounded-2xl bg-white/3 border border-frost/10 p-6 md:p-8">
                <div className="text-crystal-500 text-xs tracking-[0.25em] uppercase mb-4">
                  A good fit
                </div>
                <ul className="space-y-3">
                  {services.audience.fit.map((item) => (
                    <li
                      key={item}
                      className="relative pl-5 text-sm sm:text-[15px] font-light leading-relaxed text-frost/65"
                    >
                      <span
                        aria-hidden
                        className="absolute left-0 top-[0.65em] h-1 w-1 rounded-full bg-crystal-500/60"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.1} y={30}>
              <div className="h-full rounded-2xl bg-white/3 border border-frost/10 p-6 md:p-8">
                <div className="text-frost/40 text-xs tracking-[0.25em] uppercase mb-4">
                  Probably not
                </div>
                <ul className="space-y-3">
                  {services.audience.notFit.map((item) => (
                    <li
                      key={item}
                      className="relative pl-5 text-sm sm:text-[15px] font-light leading-relaxed text-frost/45"
                    >
                      <span
                        aria-hidden
                        className="absolute left-0 top-[0.65em] h-1 w-1 rounded-full bg-frost/25"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── The offers ────────────────────────────────────────────────── */}
        <section aria-labelledby="offers-heading" className="mb-14 md:mb-20">
          <SectionHeading
            id="offers-heading"
            eyebrow="What I Build"
            title="Three ways in"
            align="left"
            titleClassName="hero-heading"
            titleSize="clamp(1.8rem, 5vw, 3.2rem)"
            className="mb-8 md:mb-10"
          />

          <div className="flex flex-col gap-4 md:gap-6">
            {services.offers.map((offer, i) => (
              <FadeIn key={offer.id} delay={i * 0.1} y={30}>
                <article
                  id={offer.id}
                  className="scroll-mt-28 rounded-2xl bg-white/3 border border-frost/10 hover:border-frost/25 transition-colors duration-300 p-6 md:p-10"
                >
                  <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-8 md:gap-12">
                    <div>
                      <span
                        aria-hidden
                        className="block font-black leading-none text-frost/15 mb-4"
                        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
                      >
                        {offer.n}
                      </span>
                      <h3
                        className="text-frost font-medium uppercase tracking-tight mb-3"
                        style={{ fontSize: "clamp(1.15rem, 2.4vw, 1.75rem)" }}
                      >
                        {offer.name}
                      </h3>
                      <p className="text-frost/70 font-display italic text-lg leading-relaxed mb-4">
                        {offer.tagline}
                      </p>
                      <p className="text-frost/50 font-light text-sm leading-relaxed">
                        {offer.forWho}
                      </p>

                    </div>

                    <div>
                      <div className="text-crystal-500 text-xs tracking-[0.25em] uppercase mb-4">
                        What&apos;s included
                      </div>
                      <ul className="space-y-2.5">
                        {offer.includes.map((item) => (
                          <li
                            key={item}
                            className="relative pl-5 text-sm sm:text-[15px] font-light leading-relaxed text-frost/65"
                          >
                            <span
                              aria-hidden
                              className="absolute left-0 top-[0.65em] h-1 w-1 rounded-full bg-crystal-500/60"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>

                    </div>
                  </div>

                  {/* The two build routes, priced separately. A page that shows
                      one number for "a website" leaves the client to discover
                      the monthly fee later; showing both side by side is the
                      only way they can choose before they contact me. */}
                  {offer.tracks && (
                    <div className="mt-8 border-t border-frost/10 pt-8">
                      <div className="text-crystal-500 text-[10px] tracking-[0.25em] uppercase mb-5">
                        Two ways to build it, priced separately
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                        {offer.tracks.map((track) => (
                          <div
                            key={track.id}
                            className="flex flex-col rounded-xl border border-frost/10 bg-white/3 p-5 md:p-6"
                          >
                            <h4
                              className="text-frost font-medium uppercase tracking-tight"
                              style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)" }}
                            >
                              {track.name}
                            </h4>
                            <p className="mt-1.5 text-frost/70 font-display italic text-base leading-relaxed">
                              {track.oneLiner}
                            </p>
                            <p className="mt-3 text-frost/45 font-light text-xs leading-relaxed">
                              <span className="text-frost/60">Best if:</span> {track.bestFor}
                            </p>

                            <div className="mt-5 flex flex-col divide-y divide-frost/10 border-t border-frost/10">
                              {track.rungs.map((rung) => (
                                <div key={rung.scope} className="py-3">
                                  {/* Both nowrap: at 320px inside the card
                                      "1–3 pages" was breaking after the dash. */}
                                  <div className="flex items-baseline justify-between gap-3">
                                    <span className="whitespace-nowrap text-frost font-medium text-sm">
                                      {rung.scope}
                                    </span>
                                    <span className="shrink-0 whitespace-nowrap text-frost/85 font-medium text-sm tabular-nums">
                                      {rung.price}
                                    </span>
                                  </div>
                                  <p className="mt-1 text-frost/40 font-light text-xs leading-relaxed">
                                    {rung.detail}
                                  </p>
                                  <p className="mt-1 text-frost/30 font-light text-[11px] uppercase tracking-wider">
                                    {rung.timeline}
                                  </p>
                                </div>
                              ))}
                            </div>

                            <dl className="mt-auto space-y-2 border-t border-frost/10 pt-4">
                              <div className="flex items-baseline justify-between gap-3">
                                <dt className="text-frost/40 text-[10px] uppercase tracking-[0.2em]">
                                  Then, per year
                                </dt>
                                <dd className="shrink-0 text-frost/80 text-sm tabular-nums">
                                  {track.runningCost}
                                </dd>
                              </div>
                              <div className="flex items-baseline justify-between gap-3">
                                <dt className="text-frost/40 text-[10px] uppercase tracking-[0.2em]">
                                  You can edit
                                </dt>
                                <dd className="shrink-0 text-frost/60 text-xs text-right max-w-[55%]">
                                  {track.editing}
                                </dd>
                              </div>
                            </dl>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Answers "what am I paying for, if not pages?" before the
                      client has to ask it. */}
                  {offer.includedInEvery && (
                    <div className="mt-8 border-t border-frost/10 pt-8">
                      <div className="text-crystal-500 text-[10px] tracking-[0.25em] uppercase mb-3">
                        {offer.includedInEvery.label}
                      </div>
                      <p className="mb-5 max-w-3xl text-frost/55 font-light text-sm leading-relaxed">
                        {offer.includedInEvery.body}
                      </p>
                      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-2.5">
                        {offer.includedInEvery.items.map((item) => (
                          <li
                            key={item}
                            className="relative pl-5 text-sm font-light leading-relaxed text-frost/65"
                          >
                            <span
                              aria-hidden
                              className="absolute left-0 top-[0.65em] h-1 w-1 rounded-full bg-crystal-500/60"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Price stays text-frost. An accent-coloured figure reads as
                      a sale banner rather than a rate. */}
                  <dl className="mt-8 pt-6 border-t border-frost/10 flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-12">
                    <div>
                      <dt className="text-frost/40 text-[10px] uppercase tracking-[0.25em] mb-1.5">
                        Price
                      </dt>
                      <dd className="text-frost font-medium text-xl md:text-2xl">
                        {offer.priceRange}
                      </dd>
                      {offer.priceNote && (
                        <dd className="text-frost/40 font-light text-xs mt-1.5 max-w-xs leading-relaxed">
                          {offer.priceNote}
                        </dd>
                      )}
                    </div>
                    <div>
                      <dt className="text-frost/40 text-[10px] uppercase tracking-[0.25em] mb-1.5">
                        Typical timeline
                      </dt>
                      <dd className="text-frost/80 font-light text-base">
                        {offer.timeline}
                      </dd>
                    </div>
                    <a
                      href="#enquiry"
                      className="sm:ml-auto inline-flex items-center gap-2 rounded-full border border-frost/30 text-frost/70 font-medium uppercase tracking-widest px-6 py-2.5 text-sm hover:text-frost hover:border-frost/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-crystal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-night-900"
                    >
                      Enquire
                      <ArrowRight size={15} strokeWidth={1.5} aria-hidden />
                    </a>
                  </dl>
                </article>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── Running costs ─────────────────────────────────────────────── */}
        {/* Sits directly after the offers because "and then what do I pay every
            year?" is the very next question, and answering it before it is
            asked is worth more than any claim about being trustworthy. */}
        <section aria-labelledby="running-heading" className="mb-14 md:mb-20">
          <SectionHeading
            id="running-heading"
            eyebrow={services.runningCosts.eyebrow}
            title={services.runningCosts.title}
            align="left"
            titleClassName="text-frost"
            titleSize="clamp(1.8rem, 5vw, 3.2rem)"
            className="mb-6 md:mb-8"
          />

          <FadeIn y={20}>
            <p className="text-frost/65 font-light leading-relaxed text-base md:text-lg max-w-2xl mb-8">
              {services.runningCosts.lead}
            </p>
          </FadeIn>

          <FadeIn delay={0.1} y={30}>
            <div className="rounded-2xl bg-white/3 border border-frost/10 overflow-hidden">
              {/* Below sm this becomes stacked cards rather than a scrolling
                  table. A side-scrolling comparison hides one of the two columns
                  off-screen with no affordance, which defeats the only thing
                  this section exists to do. Exactly one of the two renderings is
                  ever displayed, so `hidden` keeps the other out of the
                  accessibility tree and nothing is announced twice. */}
              <div className="divide-y divide-frost/10 sm:hidden">
                {services.runningCosts.rows.map((row) => (
                  <div key={row.label} className="px-5 py-5">
                    <div className="text-frost text-sm font-medium">{row.label}</div>
                    <div className="mt-3 flex gap-3">
                      <div className="flex-1 rounded-lg border border-frost/10 bg-white/3 px-3 py-2.5">
                        <div className="text-[9px] uppercase tracking-[0.2em] text-crystal-500 mb-1">
                          Webflow
                        </div>
                        <div className="text-frost/85 text-sm tabular-nums">
                          {row.webflow}
                        </div>
                      </div>
                      <div className="flex-1 rounded-lg border border-frost/10 bg-white/3 px-3 py-2.5">
                        <div className="text-[9px] uppercase tracking-[0.2em] text-crystal-500 mb-1">
                          Coded
                        </div>
                        <div className="text-frost/85 text-sm tabular-nums">
                          {row.coded}
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-frost/40 font-light text-xs leading-relaxed">
                      {row.why}
                    </p>
                  </div>
                ))}
              </div>

              <div className="hidden overflow-x-auto sm:block">
                <table className="w-full border-collapse text-left">
                  <caption className="sr-only">
                    Yearly running costs compared: Webflow versus a coded site
                  </caption>
                  <thead>
                    <tr className="border-b border-frost/10">
                      <th scope="col" className="px-5 py-4 text-[10px] uppercase tracking-[0.25em] text-frost/40 font-normal">
                        Per year
                      </th>
                      <th scope="col" className="px-5 py-4 text-[10px] uppercase tracking-[0.25em] text-crystal-500 font-normal">
                        Webflow
                      </th>
                      <th scope="col" className="px-5 py-4 text-[10px] uppercase tracking-[0.25em] text-crystal-500 font-normal">
                        Coded
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.runningCosts.rows.map((row) => (
                      <tr key={row.label} className="border-b border-frost/10 last:border-0 align-top">
                        <th scope="row" className="px-5 py-4 font-normal">
                          <span className="block text-frost text-sm font-medium">
                            {row.label}
                          </span>
                          <span className="mt-1 block max-w-xs text-frost/40 font-light text-xs leading-relaxed">
                            {row.why}
                          </span>
                        </th>
                        <td className="px-5 py-4 text-frost/80 text-sm whitespace-nowrap tabular-nums">
                          {row.webflow}
                        </td>
                        <td className="px-5 py-4 text-frost/80 text-sm whitespace-nowrap tabular-nums">
                          {row.coded}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* The number that actually matters, and the one no competing
                  quote will show you: build price plus five years of running
                  cost, same site both ways. */}
              <div className="border-t border-frost/10 px-5 py-6 sm:px-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
                  <span className="text-crystal-500 text-[10px] uppercase tracking-[0.25em]">
                    {services.runningCosts.fiveYear.label}
                  </span>
                  <span className="text-frost/35 font-light text-xs">
                    {services.runningCosts.fiveYear.note}
                  </span>
                </div>
                <div className="divide-y divide-frost/10 border-y border-frost/10">
                  {services.runningCosts.fiveYear.rows.map((row) => (
                    <div
                      key={row.scope}
                      className="flex flex-col gap-2 py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                    >
                      <span className="text-frost text-sm font-medium">{row.scope}</span>
                      <div className="flex gap-6 sm:gap-10">
                        <span className="text-frost/75 text-sm tabular-nums">
                          <span className="text-frost/35 text-[10px] uppercase tracking-[0.2em] mr-2">
                            Webflow
                          </span>
                          {row.webflow}
                        </span>
                        <span className="text-frost/75 text-sm tabular-nums">
                          <span className="text-frost/35 text-[10px] uppercase tracking-[0.2em] mr-2">
                            Coded
                          </span>
                          {row.coded}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-5 text-frost/70 font-light leading-relaxed text-sm sm:text-[15px] max-w-3xl">
                  {services.runningCosts.verdict}
                </p>
                <p className="mt-4 text-frost/35 font-light text-xs leading-relaxed max-w-3xl">
                  {services.runningCosts.note}
                </p>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* ── Process ───────────────────────────────────────────────────── */}
        <section aria-labelledby="process-heading" className="mb-14 md:mb-20">
          <SectionHeading
            id="process-heading"
            eyebrow="How It Works"
            title="Four steps"
            align="left"
            titleClassName="text-frost"
            titleSize="clamp(1.8rem, 5vw, 3.2rem)"
            className="mb-8 md:mb-10"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {servicesProcess.map((step, i) => (
              <FadeIn key={step.n} delay={i * 0.1} y={30}>
                <div className="h-full flex flex-col rounded-2xl bg-white/3 border border-frost/10 p-6">
                  <div className="flex items-baseline justify-between gap-3 mb-4">
                    <span className="text-crystal-500 text-xs tracking-[0.25em] uppercase">
                      {step.n}
                    </span>
                    <span className="text-frost/30 text-[11px] uppercase tracking-wider">
                      {step.duration}
                    </span>
                  </div>
                  <h3 className="text-frost font-medium text-lg mb-3">
                    {step.title}
                  </h3>
                  {/* mb-5 rather than a margin on the footer below: that one
                      uses mt-auto to sit flush with the card base, which would
                      collapse to zero gap on a card with long copy. */}
                  <p className="mb-5 text-frost/60 font-light text-sm leading-relaxed">
                    {step.body}
                  </p>
                  <p className="mt-auto pt-5 border-t border-frost/10 text-frost/40 font-light text-xs leading-relaxed">
                    <span className="text-frost/55">You get:</span> {step.youGet}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── Handover and scope boundaries ─────────────────────────────── */}
        {/* Straight after Process, whose last step is handover. The "not in the
            price" column is the same move as the "Probably not" column further
            up: on a page arguing that the claims are honest, the fastest way to
            prove it is to say what you do not do. */}
        <section aria-labelledby="handover-heading" className="mb-14 md:mb-20">
          <SectionHeading
            id="handover-heading"
            eyebrow={services.handover.eyebrow}
            title={services.handover.title}
            align="left"
            titleClassName="text-frost"
            titleSize="clamp(1.8rem, 5vw, 3.2rem)"
            className="mb-6 md:mb-8"
          />

          <FadeIn y={20}>
            <p className="text-frost/65 font-light leading-relaxed text-base md:text-lg max-w-2xl mb-8">
              {services.handover.lead}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <FadeIn y={30}>
              <div className="h-full rounded-2xl bg-white/3 border border-frost/10 p-6 md:p-8">
                <div className="text-crystal-500 text-xs tracking-[0.25em] uppercase mb-4">
                  You walk away with
                </div>
                <ul className="space-y-3">
                  {services.handover.youGet.map((item) => (
                    <li
                      key={item}
                      className="relative pl-5 text-sm sm:text-[15px] font-light leading-relaxed text-frost/65"
                    >
                      <span
                        aria-hidden
                        className="absolute left-0 top-[0.65em] h-1 w-1 rounded-full bg-crystal-500/60"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.1} y={30}>
              <div className="h-full rounded-2xl bg-white/3 border border-frost/10 p-6 md:p-8">
                <div className="text-frost/40 text-xs tracking-[0.25em] uppercase mb-3">
                  {services.handover.notIncludedLabel}
                </div>
                <p className="mb-5 text-frost/45 font-light text-xs leading-relaxed">
                  {services.handover.notIncludedLead}
                </p>
                <dl className="space-y-4">
                  {services.handover.notIncluded.map((entry) => (
                    <div key={entry.item}>
                      <dt className="text-frost/75 font-medium text-sm">
                        {entry.item}
                      </dt>
                      <dd className="mt-1 text-frost/45 font-light text-xs leading-relaxed">
                        {entry.detail}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── Client proof ──────────────────────────────────────────────── */}
        {proofCase && (
          <section aria-labelledby="proof-heading" className="mb-14 md:mb-20">
            <SectionHeading
              id="proof-heading"
              eyebrow="Selected Client Work"
              title={proofCase.title}
              align="left"
              titleClassName="text-frost"
              titleSize="clamp(1.8rem, 5vw, 3.2rem)"
              className="mb-8 md:mb-10"
            />

            <FadeIn y={30}>
              <div className="rounded-2xl bg-white/3 border border-frost/10 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative aspect-[4/3] md:aspect-auto md:min-h-full">
                    <Image
                      src={proofCase.images[0]}
                      alt={`${proofCase.title} website homepage`}
                      fill
                      sizes="(max-width: 768px) 100vw, 512px"
                      className="object-cover"
                    />
                  </div>

                  <div className="p-6 md:p-10">
                    <p className="text-frost font-display italic text-xl md:text-2xl leading-relaxed mb-5">
                      {services.proof.headline}
                    </p>
                    <p className="text-frost/65 font-light leading-relaxed text-sm sm:text-base mb-8">
                      {services.proof.body}
                    </p>

                    {/* Values come straight from the case study. Only the
                        labels are reworded, for a non-technical reader. */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                      {proofCase.metrics.map((metric) => (
                        <div
                          key={metric.k}
                          className="rounded-xl bg-white/3 border border-frost/10 p-4"
                        >
                          <div className="text-frost font-medium text-lg mb-1">
                            {metric.v}
                          </div>
                          <div className="text-frost/40 text-[10px] uppercase tracking-wider leading-snug">
                            {services.proof.plainLabels[metric.k] ?? metric.k}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Renders only once a real, approved quote exists. See the
                        note on services.testimonial in data.ts. */}
                    {services.testimonial && (
                      <figure className="mb-8 border-l-2 border-crystal-500/40 pl-5">
                        <blockquote className="text-frost/80 font-display italic text-lg leading-relaxed">
                          &ldquo;{services.testimonial.text}&rdquo;
                        </blockquote>
                        <figcaption className="mt-3 text-frost/40 text-xs uppercase tracking-wider">
                          {services.testimonial.author} · {services.testimonial.role}
                        </figcaption>
                      </figure>
                    )}

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                      <LiveProjectButton
                        label="Visit the site"
                        href={proofCase.links.demo}
                        external
                        className="px-6! py-2.5! text-sm!"
                      />
                      <Link
                        href={`/cases/${proofCase.id}`}
                        className="text-frost/50 hover:text-frost text-sm font-light underline underline-offset-4 decoration-frost/20 hover:decoration-frost/50 transition-colors"
                      >
                        Read the full case study
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </section>
        )}

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <section aria-labelledby="faq-heading" className="mb-14 md:mb-20">
          <SectionHeading
            id="faq-heading"
            eyebrow="Questions"
            title="Straight answers"
            align="left"
            titleClassName="text-frost"
            titleSize="clamp(1.8rem, 5vw, 3.2rem)"
            className="mb-8 md:mb-10"
          />

          {/* Native <details> rather than an animated accordion: no client
              boundary, keyboard-accessible for free, and it still works if the
              bundle never arrives. */}
          <div className="flex flex-col gap-3">
            {servicesFaq.map((item, i) => (
              <FadeIn key={item.q} delay={i * 0.08} y={20}>
                <details className="group rounded-2xl bg-white/3 border border-frost/10 hover:border-frost/25 open:border-frost/25 transition-colors duration-300">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none rounded-2xl px-6 py-5 text-frost font-medium text-base md:text-lg [&::-webkit-details-marker]:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-crystal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-night-900">
                    {item.q}
                    <ChevronDown
                      size={18}
                      strokeWidth={1.5}
                      aria-hidden
                      className="shrink-0 text-frost/40 transition-transform duration-300 group-open:rotate-180"
                    />
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-frost/65 font-light leading-relaxed text-sm sm:text-base max-w-2xl">
                      {item.a}
                    </p>
                  </div>
                </details>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── Enquiry ───────────────────────────────────────────────────── */}
        <section
          id="enquiry"
          aria-labelledby="enquiry-heading"
          className="scroll-mt-28"
        >
          <FadeIn y={30}>
            <div className="pt-10 border-t border-frost/10">
              <div className="max-w-2xl mx-auto text-center mb-10">
                <div className="text-crystal-500 text-xs tracking-[0.25em] uppercase mb-4">
                  {services.cta.eyebrow}
                </div>
                <h2
                  id="enquiry-heading"
                  className="hero-heading font-black uppercase leading-none tracking-tight mb-5"
                  style={{ fontSize: "clamp(2rem, 6vw, 3.75rem)" }}
                >
                  {services.cta.title}
                </h2>
                <p className="text-frost/65 font-light leading-relaxed text-base md:text-lg">
                  {services.cta.body}
                </p>
              </div>

              <div className="max-w-2xl mx-auto rounded-2xl bg-white/3 border border-frost/10 p-6 md:p-8">
                <ServicesEnquiryForm />
              </div>

              {/* Plenty of small-business owners will never fill in a form. */}
              <p className="mt-6 text-center text-frost/40 font-light text-sm">
                {services.cta.fallback}{" "}
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-frost/70 hover:text-crystal-300 underline underline-offset-4 transition-colors"
                >
                  {personalInfo.email}
                </a>
              </p>
            </div>
          </FadeIn>
        </section>
      </main>

      <ChatWidget variant="services" />
    </div>
  );
}
