import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronDown, ExternalLink } from "lucide-react";
import { PageShell } from "../components/PageShell";
import { FadeIn } from "../components/FadeIn";
import { LazyChatWidget } from "../components/LazyChatWidget";
import { ServicesEnquiryForm } from "../components/ServicesEnquiryForm";
import { PaperSheet } from "../components/paper/PaperSheet";
import { PaperCard } from "../components/paper/PaperCard";
import { PageHeader } from "../components/paper/PageHeader";
import { DeskHeading } from "../components/paper/DeskHeading";
import { InkLink } from "../components/paper/InkLink";
import { Print } from "../components/paper/Print";
import { Tag } from "../components/paper/Tag";
import paper from "../components/paper/paper.module.css";
import styles from "./services.module.css";
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
const DESCRIPTION = `Freelance web development in Copenhagen. Small-business websites ${services.offers[0].priceRange}, the same price in Webflow or coded from scratch. Also web app frontends and redesign work. Published prices, fixed scope, written quote before anything starts.`;

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
    title: "Services | Ice · Taninwat Kaewpankan",
    description: DESCRIPTION,
    url: PAGE_URL,
    type: "website",
    locale: "en_DK",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Ice · Taninwat Kaewpankan",
    description: DESCRIPTION,
  },
};

/**
 * The freelance page.
 *
 * A different visitor than the homepage serves: usually non-technical, deciding
 * whether to spend money rather than whether to book an interview. Hence no CV
 * download (the wrong artefact for this reader), and no restatement of
 * siteContent.whatIDo: that is a capability list written for employers.
 *
 * Since the re-theme (Phase 4) it is paper on the dark desk: the offers are
 * till receipts like the clock's /rates, the running costs sit on one sheet,
 * the FAQ is a stack of index cards. Reached from that receipt, so the back
 * link returns to it.
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
        name: "Services | Ice · Taninwat Kaewpankan",
        description: DESCRIPTION,
        inLanguage: "en",
        about: { "@id": `${PAGE_URL}#business` },
        breadcrumb: { "@id": `${PAGE_URL}#breadcrumbs` },
      },
    ],
  };

  // A small turn per card, so a row reads as paper put down by hand.
  const tilt = (i: number) => [-0.8, 0.6, -0.4, 0.9][i % 4];

  return (
    <PageShell back={{ href: "/rates", label: "Rates" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Positioning ───────────────────────────────────────────────── */}
      <header className={styles.section}>
        <PageHeader
          onDesk
          kicker={services.intro.eyebrow}
          title={services.intro.title}
          lead={services.intro.lead}
        />
        <FadeIn immediate delay={0.1} y={12}>
          <p className="mb-6 max-w-2xl text-base leading-relaxed text-frost/80 md:text-lg">
            {services.intro.body}
          </p>
        </FadeIn>
        <FadeIn immediate delay={0.15} y={12}>
          <div className="flex flex-wrap gap-2">
            {services.intro.chips.map((chip) => (
              <Tag key={chip} variant="chip">
                {chip}
              </Tag>
            ))}
          </div>
        </FadeIn>
      </header>

      {/* ── Qualification, before price ───────────────────────────────── */}
      <section aria-labelledby="fit-heading" className={styles.section}>
        <DeskHeading
          immediate
          id="fit-heading"
          kicker="Fit"
          title="Who this is for"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FadeIn immediate y={20}>
            <PaperCard tilt={-0.6} className="h-full">
              <p className={paper.label}>A good fit</p>
              <ul className={paper.bullets}>
                {services.audience.fit.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </PaperCard>
          </FadeIn>

          <FadeIn immediate delay={0.1} y={20}>
            <PaperCard tilt={0.5} className="h-full">
              <p className={paper.label}>Probably not</p>
              {/* The softer ink, as the old dimmer column: what he does not
                  take on reads as quieter than what he does. */}
              <ul className={`${paper.bullets} text-paper-soft`}>
                {services.audience.notFit.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </PaperCard>
          </FadeIn>
        </div>
      </section>

      {/* ── The offers ────────────────────────────────────────────────── */}
      <section aria-labelledby="offers-heading" className={styles.section}>
        <DeskHeading
          id="offers-heading"
          kicker="What I Build"
          title="Three ways in"
        />

        <div className="flex flex-col gap-10">
          {services.offers.map((offer, i) => (
            <FadeIn key={offer.id} delay={i * 0.1} y={24}>
              {/* A till receipt per offer. The shadow is on the wrapper: the
                  receipt's torn-edge mask would clip its own. */}
              <div className={paper.receiptShadow}>
                <article
                  id={offer.id}
                  className={`${paper.receipt} scroll-mt-6`}
                >
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-12">
                    <div>
                      <span
                        aria-hidden
                        className={`${paper.mono} mb-3 block text-sm font-semibold tracking-[0.2em] text-paper-soft`}
                      >
                        {offer.n}
                      </span>
                      <h3
                        className="mb-3 font-black uppercase tracking-tight"
                        style={{ fontSize: "clamp(1.15rem, 2.4vw, 1.6rem)" }}
                      >
                        {offer.name}
                      </h3>
                      <p className="mb-4 font-[family-name:var(--font-hand)] text-xl leading-snug">
                        {offer.tagline}
                      </p>
                      <p className="text-sm leading-relaxed text-paper-soft">
                        {offer.forWho}
                      </p>
                    </div>

                    <div>
                      <p className={paper.label}>What&apos;s included</p>
                      <ul className={paper.bullets}>
                        {offer.includes.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* One ladder, priced by scope alone. There used to be two of
                      these side by side, one per build method; see the note on
                      ServiceOffer in data.ts for why that was a mistake. */}
                  {offer.priceLadder && (
                    <div className={`${paper.dashed} mt-8 pt-6`}>
                      <p className={paper.label}>Priced by scope</p>
                      <div>
                        {offer.priceLadder.map((rung) => (
                          <div key={rung.scope} className={paper.row}>
                            {/* Both nowrap: at 320px "1–3 pages" was breaking
                                after the dash. */}
                            <div className={paper.rowLine}>
                              <span className="whitespace-nowrap text-[15px] font-semibold">
                                {rung.scope}
                              </span>
                              <span className={paper.figure}>
                                {rung.price}
                              </span>
                            </div>
                            <p className="mt-1 max-w-xl text-sm leading-relaxed text-paper-soft">
                              {rung.detail}
                            </p>
                            <p
                              className={`${paper.mono} mt-1 text-[11px] uppercase tracking-wider text-paper-soft`}
                            >
                              {rung.timeline}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Points at the running-cost section rather than forking
                          the price, which is the whole change. */}
                      {offer.buildMethodNote && (
                        <p className="mt-4 max-w-2xl text-sm leading-relaxed">
                          {offer.buildMethodNote}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Folded (Ice, 2026-10-05): the website receipt alone was
                      3.4 screens on a laptop and 5.4 on a phone. The price
                      ladder stays open; what is included and the add-ons open
                      with a tap. Still in the HTML, so search engines and the
                      chat's grounding see every word. */}
                  {(offer.includedInEvery || offer.addOns) && (
                    <details className={`${paper.dashed} mt-8 pt-2`}>
                      <summary className={styles.foldSummary}>
                        See what&apos;s included and the add-ons
                        <ChevronDown size={16} strokeWidth={1.75} aria-hidden className={styles.faqChevron} />
                      </summary>
                    {/* Answers "what am I paying for, if not pages?" before the
                        client has to ask it. */}
                    {offer.includedInEvery && (
                      <div className={`${paper.dashed} mt-8 pt-6`}>
                        <p className={paper.label}>
                          {offer.includedInEvery.label}
                        </p>
                        <p className="mb-4 max-w-3xl text-sm leading-relaxed text-paper-soft">
                          {offer.includedInEvery.body}
                        </p>
                        <ul
                          className={`${paper.bullets} grid grid-cols-1 gap-x-10 lg:grid-cols-2`}
                        >
                          {offer.includedInEvery.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* The add-ons, itemised. Sits AFTER includedInEvery on
                        purpose: the base value has to be established before the
                        options read as options rather than as the real price
                        arriving in instalments.

                        One price per row, no Webflow/coded fork — see the lock note
                        on ServiceOffer.addOns in data.ts. Where a row carries a
                        `note` about cost, it is always about what the thing costs to
                        KEEP, never to build. */}
                    {offer.addOns && (
                      <div className={`${paper.dashed} mt-8 pt-6`}>
                        <p className={paper.label}>{offer.addOns.label}</p>
                        <p className="mb-2 max-w-3xl text-sm leading-relaxed text-paper-soft">
                          {offer.addOns.body}
                        </p>

                        <div>
                          {offer.addOns.items.map((item) => (
                            <div key={item.name} className={paper.row}>
                              <div className={paper.rowLine}>
                                <span className="text-[15px] font-semibold">
                                  {item.name}
                                </span>
                                <span className={paper.figure}>
                                  {item.price}
                                </span>
                              </div>
                              <p className="mt-1 max-w-xl text-sm leading-relaxed text-paper-soft">
                                {item.body}
                              </p>
                              {item.note && (
                                /* Set apart, because it is about the running cost
                                   rather than the price above it — the two must not
                                   read as one figure. */
                                <p className="mt-2 max-w-xl border-l-2 border-paper-rule pl-3 text-xs leading-relaxed text-paper-soft">
                                  {item.note}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>

                        <div className="mt-5 max-w-2xl">
                          <p className={paper.label}>
                            {offer.addOns.includedLabel}
                          </p>
                          <p className="text-sm leading-relaxed">
                            {offer.addOns.included}
                          </p>
                        </div>

                        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-paper-soft">
                          {offer.addOns.ownWork}
                        </p>
                      </div>
                    )}
                    </details>
                  )}

                  {/* Price stays in ink. An accent-coloured figure reads as a
                      sale banner rather than a rate. The Enquire link sits
                      beside the <dl>, not inside it: a dl may only hold
                      terms and definitions (Lighthouse's definition-list). */}
                  <div
                    className={`${paper.dashed} mt-8 flex flex-col gap-6 pt-6 sm:flex-row sm:items-end sm:gap-12`}
                  >
                    <dl className="flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-12">
                      <div>
                        <dt className={paper.label}>Price</dt>
                        <dd
                          className={`${paper.mono} text-xl font-bold md:text-2xl`}
                        >
                          {offer.priceRange}
                        </dd>
                        {offer.priceNote && (
                          <dd className="mt-1.5 max-w-xs text-xs leading-relaxed text-paper-soft">
                            {offer.priceNote}
                          </dd>
                        )}
                      </div>
                      <div>
                        <dt className={paper.label}>Typical timeline</dt>
                        <dd className="text-base">{offer.timeline}</dd>
                      </div>
                    </dl>
                    <div className="sm:ml-auto">
                      <InkLink href="#enquiry">
                        Enquire
                        <ArrowRight size={15} strokeWidth={1.75} aria-hidden />
                      </InkLink>
                    </div>
                  </div>
                </article>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Running costs ─────────────────────────────────────────────── */}
      {/* Sits directly after the offers because "and then what do I pay every
          year?" is the very next question, and answering it before it is
          asked is worth more than any claim about being trustworthy. */}
      <section aria-labelledby="running-heading" className={styles.section}>
        <DeskHeading
          id="running-heading"
          kicker={services.runningCosts.eyebrow}
          title={services.runningCosts.title}
        />

        <FadeIn y={20}>
          <p className="mb-6 max-w-2xl text-base leading-relaxed text-frost/80 md:text-lg">
            {services.runningCosts.lead}
          </p>
        </FadeIn>

        <FadeIn delay={0.1} y={24}>
          <PaperSheet className="overflow-hidden p-0">
            {/* Who actually receives the yearly money. A band of its own
                rather than a footnote: "then, per year — 100 to 1.600 kr" with
                no recipient named reads as "he bills me every year forever",
                which is the exact fear that stops people hiring a developer. */}
            <div className={`${paper.dashed} px-5 py-5 sm:px-6`}>
              <p className="max-w-3xl text-[15px] leading-relaxed">
                {services.runningCosts.paidTo}
              </p>
            </div>

            {/* The number that actually matters, and the one no competing
                quote will show you: build price plus five years of running
                cost, same site both ways. */}
            <div className={`${paper.dashed} px-5 py-6 sm:px-6`}>
              <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                <span className={paper.label}>
                  {services.runningCosts.fiveYear.label}
                </span>
                <span className="text-xs text-paper-soft">
                  {services.runningCosts.fiveYear.note}
                </span>
              </div>
              {/* Two figures, not four. The build price no longer varies by
                  build method, so including it buried a ~6.000 kr difference
                  inside a ~12.000 kr spread. */}
              <dl className="grid grid-cols-1 gap-3 border-y border-paper-rule py-4 sm:grid-cols-2 sm:gap-6">
                <div className="flex items-baseline justify-between gap-3 sm:flex-col sm:items-start sm:gap-1.5">
                  <dt className={paper.label}>Webflow</dt>
                  <dd
                    className={`${paper.mono} text-base font-bold sm:text-lg`}
                  >
                    {services.runningCosts.fiveYear.webflow}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-3 sm:flex-col sm:items-start sm:gap-1.5">
                  <dt className={paper.label}>Coded</dt>
                  <dd
                    className={`${paper.mono} text-base font-bold sm:text-lg`}
                  >
                    {services.runningCosts.fiveYear.coded}
                  </dd>
                </div>
              </dl>

              <p className="mt-5 max-w-3xl text-[15px] leading-relaxed">
                {services.runningCosts.verdict}
              </p>
              <p className="mt-4 max-w-3xl text-xs leading-relaxed text-paper-soft">
                {services.runningCosts.note}
              </p>
            </div>

            {/* Folded (Ice, 2026-10-05): who gets paid, the five-year totals
                and the verdict carry the argument, so they stay open; the
                row-by-row comparison opens with a tap. */}
            <details className={paper.dashed}>
              <summary className={`${styles.foldSummary} px-5 sm:px-6`}>
                Compare it line by line
                <ChevronDown size={16} strokeWidth={1.75} aria-hidden className={styles.faqChevron} />
              </summary>
              {/* Below sm this becomes stacked cards rather than a scrolling
                  table. A side-scrolling comparison hides one of the two columns
                  off-screen with no affordance, which defeats the only thing
                  this section exists to do. Exactly one of the two renderings is
                  ever displayed, so `hidden` keeps the other out of the
                  accessibility tree and nothing is announced twice. */}
              <div className="sm:hidden">
                {services.runningCosts.rows.map((row) => (
                  <div
                    key={row.label}
                    className="border-b border-paper-rule px-5 py-5 last:border-0"
                  >
                    <div className="text-sm font-semibold">{row.label}</div>
                    <div className="mt-3 flex gap-3">
                      <div className="flex-1 rounded border border-paper-rule px-3 py-2.5">
                        <div className={paper.label}>Webflow</div>
                        {/* Some values are words ("You want no yearly bill"), so
                            they wrap here; the table from sm keeps them on one line. */}
                        <div className={`${paper.figure} whitespace-normal`}>
                          {row.webflow}
                        </div>
                      </div>
                      <div className="flex-1 rounded border border-paper-rule px-3 py-2.5">
                        <div className={paper.label}>Coded</div>
                        <div className={`${paper.figure} whitespace-normal`}>
                          {row.coded}
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-paper-soft">
                      {row.why}
                    </p>
                  </div>
                ))}
              </div>

              <div className="hidden overflow-x-auto sm:block">
                <table className={styles.table}>
                  <caption className="sr-only">
                    Yearly running costs compared: Webflow versus a coded site
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Per year</th>
                      <th scope="col">Webflow</th>
                      <th scope="col">Coded</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.runningCosts.rows.map((row) => (
                      <tr key={row.label}>
                        <th scope="row" className="font-normal">
                          <span className="block text-sm font-semibold">
                            {row.label}
                          </span>
                          <span className="mt-1 block max-w-xs text-xs leading-relaxed text-paper-soft">
                            {row.why}
                          </span>
                        </th>
                        <td className={paper.figure}>{row.webflow}</td>
                        <td className={paper.figure}>{row.coded}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </PaperSheet>
        </FadeIn>
      </section>

      {/* ── Aftercare ─────────────────────────────────────────────────── */}
      {/* Directly after the running-cost table, because that section ends by
          saying there is no yearly bill — and the obvious next question is
          "so what happens when I want something changed?". Leaving that
          unanswered is what made the old position feel incomplete.

          Item 33. It is a prepaid block and an hourly rate, NOT a
          subscription — see the reasoning on services.aftercare in data.ts
          for why a monthly plan would contradict the section above it. */}
      <section aria-labelledby="aftercare-heading" className={styles.section}>
        <DeskHeading
          id="aftercare-heading"
          kicker={services.aftercare.eyebrow}
          title={services.aftercare.title}
        />

        <p className="mb-6 max-w-3xl text-base leading-relaxed text-frost/80">
          {services.aftercare.lead}
        </p>

        {/* Free and hourly side by side, then the block below at full width.
            The block is the recommended answer, so it gets the emphasis of
            its own row (a sticky note) rather than being one of three equal
            columns — three equal options reads as a pricing table and invites
            comparison shopping between them, which is not the decision on offer. */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {(
            [services.aftercare.free, services.aftercare.hourly] as {
              label: string;
              body: string;
              price?: string;
            }[]
          ).map((tier, i) => (
            <FadeIn key={tier.label} y={20}>
              <PaperCard tilt={tilt(i + 1)} className="h-full">
                <div className="mb-3 flex items-baseline justify-between gap-3">
                  <span className={paper.label}>{tier.label}</span>
                  {tier.price && (
                    <span className={paper.figure}>{tier.price}</span>
                  )}
                </div>
                <p className="text-sm leading-relaxed">{tier.body}</p>
              </PaperCard>
            </FadeIn>
          ))}
        </div>

        <FadeIn y={20} delay={0.1}>
          <div className={`${paper.sticky} mt-6`}>
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <span className={`${paper.label} text-paper-ink`}>
                {services.aftercare.block.label}
              </span>
              <span className="flex items-baseline gap-3">
                <span className={`${paper.figure} text-lg`}>
                  {services.aftercare.block.price}
                </span>
                <span className="text-xs">{services.aftercare.block.unit}</span>
              </span>
            </div>
            <p className="max-w-3xl text-sm leading-relaxed">
              {services.aftercare.block.body}
            </p>
            <ul
              className={`${paper.bullets} mt-5 grid grid-cols-1 gap-x-10 border-t border-paper-ink/20 pt-5 sm:grid-cols-2 [&_li::marker]:text-paper-ink`}
            >
              {services.aftercare.block.terms.map((term) => (
                <li key={term}>{term}</li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </section>

      {/* ── Process ───────────────────────────────────────────────────── */}
      <section aria-labelledby="process-heading" className={styles.section}>
        <DeskHeading
          id="process-heading"
          kicker="How It Works"
          title="Four steps"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {servicesProcess.map((step, i) => (
            <FadeIn key={step.n} delay={i * 0.1} y={24}>
              <PaperCard tilt={tilt(i)} className="flex h-full flex-col">
                <div className="mb-3 flex items-baseline justify-between gap-3">
                  <span className="font-[family-name:var(--font-hand)] text-2xl font-bold">
                    {step.n}
                  </span>
                  <span
                    className={`${paper.mono} text-[11px] uppercase tracking-wider text-paper-soft`}
                  >
                    {step.duration}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-bold">{step.title}</h3>
                {/* mb-5 rather than a margin on the footer below: that one
                    uses mt-auto to sit flush with the card base, which would
                    collapse to zero gap on a card with long copy. */}
                <p className="mb-5 text-sm leading-relaxed">{step.body}</p>
                <p
                  className={`${paper.dashed} mt-auto pt-4 text-xs leading-relaxed text-paper-soft`}
                >
                  <span className="font-semibold text-paper-ink">You get:</span>{" "}
                  {step.youGet}
                </p>
              </PaperCard>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Client proof ──────────────────────────────────────────────── */}
      {proofCase && (
        <section aria-labelledby="proof-heading" className={styles.section}>
          <DeskHeading
            id="proof-heading"
            kicker="Selected Client Work"
            title={proofCase.title}
          />

          <FadeIn y={24}>
            <PaperSheet className="overflow-hidden p-0">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* A stack that fills the row, rather than one image that either
                    stretches or leaves a void.

                    This started as a single `md:aspect-auto md:min-h-full` box, so
                    object-cover blew one 1600x1005 screenshot up to fill a column
                    as tall as the text beside it and you saw a magnified crop of
                    the hero. Pinning it to the screenshot's own ratio fixed the
                    magnification but left a large empty area under it, because the
                    text column is roughly twice as tall.

                    Three images on flex-1 solve both without any fragile height
                    maths: they divide whatever height the row has, so the column is
                    always full, and each one is only lightly cropped instead of one
                    being cropped enormously. The count is capped at 3 so a case with
                    more screenshots does not turn this into a contact sheet.
                    Since the re-theme they are prints, laid in the sheet's margin. */}
                <div className="flex flex-col gap-4 bg-paper-dim p-4 md:p-5">
                  {proofCase.images.slice(0, 3).map((src, i) => (
                    <Print
                      key={src}
                      image={src}
                      alt={
                        i === 0
                          ? `${proofCase.title} website homepage`
                          : `${proofCase.title} website, page ${i + 1}`
                      }
                      ratio="16 / 10"
                      tilt={[-1, 0.8, -0.5][i]}
                      sizes="(max-width: 768px) 100vw, 440px"
                    />
                  ))}
                </div>

                <div className="p-6 md:p-10">
                  <p className="mb-5 font-[family-name:var(--font-hand)] text-2xl leading-snug">
                    {services.proof.headline}
                  </p>
                  <p className="mb-8 text-[15px] leading-relaxed">
                    {services.proof.body}
                  </p>

                  {/* Values come straight from the case study. Only the
                      labels are reworded, for a non-technical reader. */}
                  <dl
                    className={`${paper.dashed} mb-8 grid grid-cols-1 gap-4 border-b border-dashed border-paper-rule py-4 sm:grid-cols-3`}
                  >
                    {proofCase.metrics.map((metric) => (
                      <div key={metric.k} className="flex flex-col">
                        <dt className="order-2 text-xs leading-snug text-paper-soft">
                          {services.proof.plainLabels[metric.k] ?? metric.k}
                        </dt>
                        <dd className="order-1 font-[family-name:var(--font-hand)] text-xl font-bold">
                          {metric.v}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {/* Renders only once a real, approved quote exists. See the
                      note on services.testimonial in data.ts. */}
                  {services.testimonial && (
                    <figure className="mb-8 border-l-2 border-paper-accent pl-5">
                      <blockquote className="font-[family-name:var(--font-hand)] text-xl leading-relaxed">
                        &ldquo;{services.testimonial.text}&rdquo;
                      </blockquote>
                      <figcaption className="mt-3 text-xs uppercase tracking-wider text-paper-soft">
                        {services.testimonial.author} ·{" "}
                        {services.testimonial.role}
                      </figcaption>
                    </figure>
                  )}

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                    <InkLink href={proofCase.links.demo} primary external>
                      <ExternalLink size={15} strokeWidth={1.75} aria-hidden />
                      Visit the site
                    </InkLink>
                    <Link
                      href={`/cases/${proofCase.id}`}
                      className="text-sm text-paper-link underline underline-offset-4"
                    >
                      Read the full case study
                    </Link>
                  </div>
                </div>
              </div>
            </PaperSheet>
          </FadeIn>
        </section>
      )}

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section aria-labelledby="faq-heading" className={styles.section}>
        <DeskHeading
          id="faq-heading"
          kicker="Questions"
          title="Straight answers"
        />

        {/* Native <details> rather than an animated accordion: no client
            boundary, keyboard-accessible for free, and it still works if the
            bundle never arrives. Each one is an index card. */}
        <div className="flex flex-col gap-4">
          {servicesFaq.map((item, i) => (
            <FadeIn key={item.q} delay={Math.min(i, 5) * 0.06} y={16}>
              <details className={paper.indexCard}>
                <summary className={styles.faqSummary}>
                  {item.q}
                  <ChevronDown
                    size={18}
                    strokeWidth={1.5}
                    aria-hidden
                    className={styles.faqChevron}
                  />
                </summary>
                <div className="px-5 pb-5 pt-4">
                  <p className="max-w-2xl text-[15px] leading-relaxed">
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
        className="scroll-mt-6"
      >
        <FadeIn y={24}>
          <PaperSheet className="mx-auto max-w-2xl">
            <div className="mb-8 text-center">
              <p className="mb-2 font-[family-name:var(--font-hand)] text-lg text-paper-soft">
                {services.cta.eyebrow}
              </p>
              <h2
                id="enquiry-heading"
                className="mb-4 font-black tracking-tight"
                style={{
                  fontSize: "clamp(1.8rem, 5vw, 2.6rem)",
                  lineHeight: 1.1,
                }}
              >
                {services.cta.title}
              </h2>
              <p className="text-base leading-relaxed text-paper-soft">
                {services.cta.body}
              </p>
            </div>

            <ServicesEnquiryForm tone="paper" />

            {/* Plenty of small-business owners will never fill in a form. */}
            <p className="mt-6 text-center text-sm text-paper-soft">
              {services.cta.fallback}{" "}
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-paper-link underline underline-offset-4"
              >
                {personalInfo.email}
              </a>
            </p>
          </PaperSheet>
        </FadeIn>
      </section>

      {/* Loaded when idle, as on the clock: the chat is the heaviest script
          on the page and almost nobody opens it in the first seconds. */}
      <LazyChatWidget variant="services" />
    </PageShell>
  );
}
