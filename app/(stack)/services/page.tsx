import type { Metadata } from "next";
import Link from "next/link";
import { BlankCard } from "../../components/stack/BlankCard";
import { DevelopImage } from "../../components/stack/DevelopImage";
import { DitherPicture } from "../../components/stack/DitherPicture";
import { ReceiptRow } from "../../components/stack/ReceiptRow";
import stack from "../../components/stack/stack.module.css";
import styles from "../../components/stack/longcard.module.css";
import {
  personalInfo,
  siteContent,
  cases,
  services,
  servicesProcess,
  servicesFaq,
  localVisibilityRates,
  vat,
  ditheredSrc,
  stackContent,
} from "../../data";

const BASE_URL = "https://taninwatkaewpankan.xyz";
const PAGE_URL = `${BASE_URL}/services`;

// Leads with the price because the number is the differentiator: nearly every
// competing page says "contact us for a quote". A description that answers the
// question in the SERP earns the click, and gives answer engines something
// concrete enough to quote.
const DESCRIPTION = `Freelance web development in Copenhagen. Small-business websites ${services.offers[0].priceRange}, coded by hand and set up to be found on Google and by AI assistants. Optional Local visibility plan, ${services.localVisibility.price}, no binding. Also web app frontends and redesign work. Published prices, fixed scope, written quote before anything starts.`;

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
    "lokal SEO lille virksomhed",
    "Google Business profil hjælp",
    "synlig i ChatGPT",
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
          "Local SEO",
          "Answer engine optimisation",
          "React",
          "Next.js",
          "TypeScript",
          "Website performance",
          "Web accessibility",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Freelance web development services",
          itemListElement: [
            ...services.offers.map((offer) => ({
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
            // The monthly plan is one exact figure, unlike the offers' ranges,
            // so it can carry a real price. Read from localVisibilityRates so
            // the structured data cannot drift from the visible page.
            {
              "@type": "Offer",
              "@id": `${PAGE_URL}#local-visibility`,
              url: `${PAGE_URL}#local-visibility`,
              priceCurrency: "DKK",
              availability: "https://schema.org/LimitedAvailability",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: Number(localVisibilityRates.monthly.replace(/\./g, "")),
                priceCurrency: localVisibilityRates.currency,
                unitCode: "MON",
                unitText: "month",
                referenceQuantity: {
                  "@type": "QuantitativeValue",
                  value: 1,
                  unitCode: "MON",
                },
                // Only claim "moms on top" once it actually is.
                ...(vat.registered ? { valueAddedTaxIncluded: false } : {}),
              },
              itemOffered: {
                "@type": "Service",
                name: services.localVisibility.title,
                serviceType: "Local SEO and Google Business Profile management",
                description: services.localVisibility.lead,
                provider: { "@type": "Person", name: personalInfo.name, url: BASE_URL },
              },
            },
          ],
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
  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* The services card: the one long card in the stack, because a price
          list is read top to bottom. Section by section it keeps the old
          page's order and every word of its data; only the look changed. */}
      <header className={styles.intro}>
        <h1 className={stack.title}>{services.intro.title}</h1>
        <p className={stack.lead}>{services.intro.lead}</p>
        <p className={`${stack.body} ${styles.introBody}`}>{services.intro.body}</p>
        <ul className={stack.stackList} aria-label="At a glance">
          {services.intro.chips.map((chip) => (
            <li key={chip}>{chip}</li>
          ))}
        </ul>
      </header>

      {/* ── Qualification, before price ───────────────────────────────── */}
      <section aria-labelledby="fit-heading" className={styles.section}>
        <h2 id="fit-heading" className={styles.sectionTitle}>
          Who this is for
        </h2>
        <div className={styles.twoUp}>
          <div className={stack.window}>
            <div className={stack.titlebar}>
              <span>A good fit</span>
            </div>
            <ul className={styles.bullets}>
              {services.audience.fit.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className={stack.window}>
            <div className={stack.titlebar}>
              <span>Probably not</span>
            </div>
            <ul className={styles.bullets}>
              {services.audience.notFit.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── The offers ────────────────────────────────────────────────── */}
      <section aria-labelledby="offers-heading" className={styles.section}>
        <h2 id="offers-heading" className={styles.sectionTitle}>
          Three ways in
        </h2>

        <div className={styles.stackOf}>
          {services.offers.map((offer) => (
            <article key={offer.id} id={offer.id} className={`${stack.window} ${styles.offer}`}>
              <div className={stack.titlebar}>
                <i className={stack.closeBox} aria-hidden="true" />
                <span>{offer.name}</span>
              </div>
              <div className={styles.offerBody}>
                <div className={styles.offerGrid}>
                  <div>
                    <h3 className={stack.heading}>{offer.name}</h3>
                    <p className={styles.tagline}>{offer.tagline}</p>
                    <p className={stack.body}>{offer.forWho}</p>
                  </div>
                  <div>
                    <p className={styles.label}>What&apos;s included</p>
                    <ul className={styles.bullets}>
                      {offer.includes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* One ladder, priced by scope alone. See the note on
                    ServiceOffer in data.ts for why there is only one. */}
                {offer.priceLadder && (
                  <div className={styles.block}>
                    <p className={styles.label}>Priced by scope</p>
                    {offer.priceLadder.map((rung) => (
                      <ReceiptRow key={rung.scope} label={rung.scope} value={rung.price}>
                        <p className={styles.rowDetail}>{rung.detail}</p>
                        <p className={styles.rowMeta}>{rung.timeline}</p>
                      </ReceiptRow>
                    ))}
                    {offer.buildMethodNote && <p className={styles.note}>{offer.buildMethodNote}</p>}
                  </div>
                )}

                {/* Folded (Ice, 2026-10-05): the price ladder stays open; what
                    is included and the add-ons open with a tap. Still in the
                    HTML, so search engines and the chat see every word. */}
                {(offer.includedInEvery || offer.addOns) && (
                  <details className={styles.fold}>
                    <summary>See what&apos;s included and the add-ons</summary>
                    {offer.includedInEvery && (
                      <div className={styles.block}>
                        <p className={styles.label}>{offer.includedInEvery.label}</p>
                        <p className={styles.note}>{offer.includedInEvery.body}</p>
                        <ul className={`${styles.bullets} ${styles.bulletsTwo}`}>
                          {offer.includedInEvery.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* The add-ons sit after the base on purpose: the value is
                        established before the options read as options. One
                        price per row; a note is about running cost, never a
                        second build price. */}
                    {offer.addOns && (
                      <div className={styles.block}>
                        <p className={styles.label}>{offer.addOns.label}</p>
                        <p className={styles.note}>{offer.addOns.body}</p>
                        {offer.addOns.items.map((item) => (
                          <ReceiptRow key={item.name} label={item.name} value={item.price}>
                            <p className={styles.rowDetail}>{item.body}</p>
                            {item.note && <p className={styles.aside}>{item.note}</p>}
                          </ReceiptRow>
                        ))}
                        <p className={styles.label}>{offer.addOns.includedLabel}</p>
                        <p className={stack.body}>{offer.addOns.included}</p>
                        <p className={styles.note}>{offer.addOns.ownWork}</p>
                      </div>
                    )}
                  </details>
                )}

                {/* The Enquire link sits beside the <dl>, not inside it: a dl
                    may only hold terms and definitions. */}
                <div className={styles.offerFoot}>
                  <dl className={styles.terms}>
                    <div>
                      <dt className={styles.label}>Price</dt>
                      <dd className={styles.price}>{offer.priceRange}</dd>
                      {offer.priceNote && <dd className={styles.rowMeta}>{offer.priceNote}</dd>}
                    </div>
                    <div>
                      <dt className={styles.label}>Typical timeline</dt>
                      <dd className={stack.body}>{offer.timeline}</dd>
                    </div>
                  </dl>
                  <Link href="#enquiry" className={stack.btn}>
                    Enquire
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Running costs ─────────────────────────────────────────────── */}
      {/* Directly after the offers: "and then what do I pay every year?" is
          the very next question. */}
      <section aria-labelledby="running-heading" className={styles.section}>
        <h2 id="running-heading" className={styles.sectionTitle}>
          {services.runningCosts.title}
        </h2>
        <p className={stack.lead}>{services.runningCosts.lead}</p>

        <div className={`${stack.window} ${styles.spaced}`}>
          <div className={stack.titlebar}>
            <span>{services.runningCosts.fiveYear.label}</span>
          </div>
          <div className={styles.offerBody}>
            {/* Who actually receives the yearly money, so it never reads as
                "he bills me every year forever". */}
            <p className={stack.body}>{services.runningCosts.paidTo}</p>
            <p className={styles.bigFigure}>{services.runningCosts.fiveYear.value}</p>
            <p className={styles.rowMeta}>{services.runningCosts.fiveYear.note}</p>
            <p className={`${stack.body} ${styles.spacedText}`}>{services.runningCosts.verdict}</p>
            <p className={styles.note}>{services.runningCosts.note}</p>
            <details className={styles.fold}>
              <summary>See it line by line</summary>
              <div className={styles.block}>
                {services.runningCosts.rows.map((row) => (
                  <ReceiptRow key={row.label} label={row.label} value={row.value}>
                    <p className={styles.rowDetail}>{row.why}</p>
                  </ReceiptRow>
                ))}
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* ── Aftercare ─────────────────────────────────────────────────── */}
      {/* A prepaid block and an hourly rate, not a subscription: see
          services.aftercare in data.ts. The block is the recommended answer,
          so it gets its own full-width window rather than a third column. */}
      <section aria-labelledby="aftercare-heading" className={styles.section}>
        <h2 id="aftercare-heading" className={styles.sectionTitle}>
          {services.aftercare.title}
        </h2>
        <p className={stack.lead}>{services.aftercare.lead}</p>

        <div className={`${styles.twoUp} ${styles.spaced}`}>
          {(
            [services.aftercare.free, services.aftercare.hourly] as {
              label: string;
              body: string;
              price?: string;
            }[]
          ).map((tier) => (
            <div key={tier.label} className={styles.field}>
              <div className={styles.rowLine}>
                <span className={styles.label}>{tier.label}</span>
                {tier.price && (
                  <>
                    <span className={styles.leader} aria-hidden="true" />
                    <span className={styles.figure}>{tier.price}</span>
                  </>
                )}
              </div>
              <p className={stack.body}>{tier.body}</p>
            </div>
          ))}
        </div>

        <div className={`${stack.window} ${styles.spaced}`}>
          <div className={stack.titlebar}>
            <span>{services.aftercare.block.label}</span>
          </div>
          <div className={styles.offerBody}>
            <p className={styles.bigFigure}>
              {services.aftercare.block.price} <small>{services.aftercare.block.unit}</small>
            </p>
            <p className={stack.body}>{services.aftercare.block.body}</p>
            <ul className={`${styles.bullets} ${styles.bulletsTwo}`}>
              {services.aftercare.block.terms.map((term) => (
                <li key={term}>{term}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Local visibility ──────────────────────────────────────────── */}
      {/* After aftercare on purpose: `notCare` says why this monthly plan is
          not a maintenance plan. The id is the JSON-LD Offer's anchor. */}
      <section id="local-visibility" aria-labelledby="visibility-heading" className={styles.section}>
        <h2 id="visibility-heading" className={styles.sectionTitle}>
          {services.localVisibility.title}
        </h2>
        <p className={stack.lead}>{services.localVisibility.lead}</p>

        <div className={`${stack.window} ${styles.spaced}`}>
          <div className={stack.titlebar}>
            <span>Every month</span>
          </div>
          <div className={styles.offerBody}>
            <p className={styles.bigFigure}>{services.localVisibility.price}</p>
            <ul className={`${styles.bullets} ${styles.bulletsTwo}`}>
              {services.localVisibility.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className={styles.block}>
              <ul className={`${styles.bullets} ${styles.bulletsTwo}`}>
                {services.localVisibility.terms.map((term) => (
                  <li key={term}>{term}</li>
                ))}
              </ul>
              <p className={styles.aside}>{services.localVisibility.notCare}</p>
              <p className={styles.rowMeta}>{vat.note}</p>
              <Link href="#enquiry" className={`${stack.btn} ${styles.spaced}`}>
                Ask about it
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ───────────────────────────────────────────────────── */}
      <section aria-labelledby="process-heading" className={styles.section}>
        <h2 id="process-heading" className={styles.sectionTitle}>
          Four steps
        </h2>
        <ol className={styles.steps}>
          {servicesProcess.map((step) => (
            <li key={step.n} className={styles.field}>
              <div className={styles.rowLine}>
                <span className={styles.stepN}>{step.n}</span>
                <span className={styles.rowMeta}>{step.duration}</span>
              </div>
              <h3 className={stack.heading}>{step.title}</h3>
              <p className={stack.body}>{step.body}</p>
              <p className={styles.youGet}>
                <strong>You get:</strong> {step.youGet}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Client proof ──────────────────────────────────────────────── */}
      {/* The client's real site, dithered, with the same develop control as
          its project card. Metric values come straight from the case study;
          only the labels are reworded for a non-technical reader. */}
      {proofCase && (
        <section aria-labelledby="proof-heading" className={styles.section}>
          <h2 id="proof-heading" className={styles.sectionTitle}>
            {proofCase.title}
          </h2>
          <div className={styles.proof}>
            <DevelopImage
              colourSrc={proofCase.images[0]}
              colourAlt={`${proofCase.title} website homepage, in colour`}
              developLabel={stackContent.project.develop}
              developedLabel={stackContent.project.developed}
              hint={stackContent.project.developHint}
              windowTitle={new URL(proofCase.links.demo).host.replace(/^www\./, "")}
            >
              <DitherPicture src={ditheredSrc(proofCase.images[0])} alt={`${proofCase.title} website homepage`} />
            </DevelopImage>
            <div>
              <p className={stack.lead}>{services.proof.headline}</p>
              <p className={`${stack.body} ${styles.spacedText}`}>{services.proof.body}</p>
              <dl className={stack.facts}>
                {proofCase.metrics.map((metric) => (
                  <div key={metric.k} style={{ display: "contents" }}>
                    <dt>{metric.v}</dt>
                    <dd>{services.proof.plainLabels[metric.k] ?? metric.k}</dd>
                  </div>
                ))}
              </dl>

              {/* Renders only once a real, approved quote exists. See the
                  note on services.testimonial in data.ts. */}
              {services.testimonial && (
                <figure className={styles.quote}>
                  <blockquote>&ldquo;{services.testimonial.text}&rdquo;</blockquote>
                  <figcaption className={styles.rowMeta}>
                    {services.testimonial.author} · {services.testimonial.role}
                  </figcaption>
                </figure>
              )}

              <div className={stack.buttons}>
                <a
                  href={proofCase.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${stack.btn} ${stack.btnDefault}`}
                >
                  Visit the site
                </a>
                <Link href={`/cases/${proofCase.id}`} className={stack.btn}>
                  Read the case
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      {/* Native <details>: keyboard-accessible for free, and it still works
          if the bundle never arrives. */}
      <section aria-labelledby="faq-heading" className={styles.section}>
        <h2 id="faq-heading" className={styles.sectionTitle}>
          Straight answers
        </h2>
        <div className={styles.faq}>
          {servicesFaq.map((item) => (
            <details key={item.q} className={styles.fold}>
              <summary>{item.q}</summary>
              <p className={`${stack.body} ${styles.answer}`}>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── Enquiry ───────────────────────────────────────────────────── */}
      {/* The stack's blank card: same endpoint, fields and validation as the
          paper form it replaced (useEnquiryForm). */}
      <section id="enquiry" aria-labelledby="enquiry-heading" className={styles.section}>
        <h2 id="enquiry-heading" className={styles.sectionTitle}>
          {services.cta.title}
        </h2>
        <p className={stack.lead}>{services.cta.body}</p>
        <div className={`${stack.window} ${styles.spaced}`}>
          <div className={stack.titlebar}>
            <i className={stack.closeBox} aria-hidden="true" />
            <span>New card</span>
          </div>
          <div className={styles.offerBody}>
            <BlankCard />
          </div>
        </div>
        {/* Plenty of small-business owners will never fill in a form. */}
        <p className={`${stack.body} ${styles.spacedText}`}>
          {services.cta.fallback}{" "}
          <a href={`mailto:${personalInfo.email}`} className={stack.inlineLink}>
            {personalInfo.email}
          </a>
        </p>
      </section>
    </div>
  );
}
