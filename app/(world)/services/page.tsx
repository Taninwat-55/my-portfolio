import type { Metadata } from "next";
import Link from "next/link";
import {
  personalInfo,
  siteContent,
  cases,
  services,
  servicesProcess,
  servicesFaq,
  localVisibilityRates,
  vat,
  founding,
  foundingOpen,
  foundingSpotsLine,
  foundingTerms,
} from "@/app/data";
import { GridLines } from "@/app/world/GridLines";
import { WorldFooter } from "@/app/world/WorldFooter";
import { WorldNav } from "@/app/world/WorldNav";
import { WorldShell } from "@/app/world/WorldShell";
import { worldImage } from "@/app/world/worldImage";
import page from "@/app/world/page.module.css";
import styles from "./services.module.css";

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
 * In the Crystallize world since 2026-10-25: the same sections, order and
 * data as the Stack's long card, read like the case pages (label left,
 * content beside it). Prices are receipt rows; what is included, the add-ons,
 * the running costs line by line and the FAQ fold open with <details>, still
 * in the HTML for search and the chat. The one enquiry form lives on
 * /contact, so every Enquire goes there.
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
        name: `${personalInfo.name} · Freelance Web Development`,
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

  /** A receipt line: label, dotted leader, figure; detail under it. */
  const row = (label: string, value: string, detail?: React.ReactNode) => (
    <div key={label} className={styles.row}>
      <div className={styles.rowLine}>
        <span>{label}</span>
        <span className={styles.leader} aria-hidden="true" />
        <span className={styles.figure}>{value}</span>
      </div>
      {detail}
    </div>
  );

  const enquire = "/contact#enquire";

  return (
    <WorldShell>
      <main id="main-content">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        <header className={page.head}>
          <GridLines />
          <WorldNav className={page.nav} />
          <p className={page.kicker}>Services</p>
          <h1 className={page.title}>{services.intro.title}</h1>
          <p className={page.lead}>{services.intro.lead}</p>
          <div className={`${page.prose} ${styles.introBody}`}>
            <p>{services.intro.body}</p>
          </div>
          <ul className={styles.chips} aria-label="At a glance">
            {services.intro.chips.map((chip) => (
              <li key={chip}>{chip}</li>
            ))}
          </ul>
        </header>

        {/* Qualification, before price. */}
        <section className={page.section} aria-labelledby="fit-heading">
          <h2 id="fit-heading" className={page.label}>
            Who this is for
          </h2>
          <div className={`${page.content} ${styles.twoUp}`}>
            <div>
              <h3 className={styles.subhead}>A good fit</h3>
              <ul className={styles.bullets}>
                {services.audience.fit.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={styles.subhead}>Probably not</h3>
              <ul className={styles.bullets}>
                {services.audience.notFit.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className={page.section} aria-labelledby="offers-heading">
          <h2 id="offers-heading" className={page.label}>
            Three ways in
          </h2>
          <div className={page.content}>
            {services.offers.map((offer) => (
              <article key={offer.id} id={offer.id} className={styles.offer}>
                <div className={styles.twoUp}>
                  <div>
                    <h3 className={styles.offerName}>{offer.name}</h3>
                    <p className={styles.tagline}>{offer.tagline}</p>
                    <p className={styles.text}>{offer.forWho}</p>
                  </div>
                  <div>
                    <p className={page.label}>What&apos;s included</p>
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
                    <p className={page.label}>Priced by scope</p>
                    {offer.priceLadder.map((rung) =>
                      row(
                        rung.scope,
                        rung.price,
                        <>
                          <p className={styles.detail}>{rung.detail}</p>
                          <p className={styles.meta}>{rung.timeline}</p>
                        </>,
                      ),
                    )}
                    {offer.buildMethodNote && <p className={styles.note}>{offer.buildMethodNote}</p>}
                    {offer.id === "website" && foundingOpen && (
                      <p className={styles.note}>
                        <strong>{founding.label}.</strong> {foundingTerms} {foundingSpotsLine}
                      </p>
                    )}
                    {offer.id === "website" && (
                      <p className={styles.note}>
                        <Link href="/showroom">See sample sites and what each would cost</Link>
                      </p>
                    )}
                  </div>
                )}

                {/* Folded (Ice, 2026-10-05): the price ladder stays open; what
                    is included and the add-ons open with a tap. */}
                {(offer.includedInEvery || offer.addOns) && (
                  <details className={styles.fold}>
                    <summary>See what&apos;s included and the add-ons</summary>
                    {offer.includedInEvery && (
                      <div className={styles.block}>
                        <p className={page.label}>{offer.includedInEvery.label}</p>
                        <p className={styles.note}>{offer.includedInEvery.body}</p>
                        <ul className={`${styles.bullets} ${styles.bulletsTwo}`}>
                          {offer.includedInEvery.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {/* After the base on purpose: the value is established
                        before the options read as options. */}
                    {offer.addOns && (
                      <div className={styles.block}>
                        <p className={page.label}>{offer.addOns.label}</p>
                        <p className={styles.note}>{offer.addOns.body}</p>
                        {offer.addOns.items.map((item) =>
                          row(
                            item.name,
                            item.price,
                            <>
                              <p className={styles.detail}>{item.body}</p>
                              {item.note && <p className={styles.meta}>{item.note}</p>}
                            </>,
                          ),
                        )}
                        <p className={`${page.label} ${styles.spaced}`}>{offer.addOns.includedLabel}</p>
                        <p className={styles.text}>{offer.addOns.included}</p>
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
                      <dt className={page.label}>Price</dt>
                      <dd className={styles.price}>{offer.priceRange}</dd>
                      {offer.priceNote && <dd className={styles.meta}>{offer.priceNote}</dd>}
                    </div>
                    <div>
                      <dt className={page.label}>Typical timeline</dt>
                      <dd className={styles.text}>{offer.timeline}</dd>
                    </div>
                  </dl>
                  <ul className={page.actions}>
                    <li>
                      <Link className={page.button} href={enquire}>
                        Enquire <span aria-hidden="true">→</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Directly after the offers: "and then what do I pay every year?" is
            the very next question. */}
        <section className={page.section} aria-labelledby="running-heading">
          <h2 id="running-heading" className={page.label}>
            {services.runningCosts.title}
          </h2>
          <div className={`${page.content} ${page.narrow}`}>
            <p className={styles.lead}>{services.runningCosts.lead}</p>
            <div className={styles.panel}>
              <p className={page.label}>{services.runningCosts.fiveYear.label}</p>
              {/* Who actually receives the yearly money, so it never reads as
                  "he bills me every year forever". */}
              <p className={styles.text}>{services.runningCosts.paidTo}</p>
              <p className={styles.bigFigure}>{services.runningCosts.fiveYear.value}</p>
              <p className={styles.meta}>{services.runningCosts.fiveYear.note}</p>
              <p className={`${styles.text} ${styles.spaced}`}>{services.runningCosts.verdict}</p>
              <p className={styles.note}>{services.runningCosts.note}</p>
              <details className={styles.fold}>
                <summary>See it line by line</summary>
                <div className={styles.block}>
                  {services.runningCosts.rows.map((r) => row(r.label, r.value, <p className={styles.detail}>{r.why}</p>))}
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* A prepaid block and an hourly rate, not a subscription: see
            services.aftercare in data.ts. */}
        <section className={page.section} aria-labelledby="aftercare-heading">
          <h2 id="aftercare-heading" className={page.label}>
            {services.aftercare.title}
          </h2>
          <div className={`${page.content} ${page.narrow}`}>
            <p className={styles.lead}>{services.aftercare.lead}</p>
            <div className={`${styles.twoUp} ${styles.spaced}`}>
              {(
                [services.aftercare.free, services.aftercare.hourly] as {
                  label: string;
                  body: string;
                  price?: string;
                }[]
              ).map((tier) => (
                <div key={tier.label}>
                  {tier.price ? (
                    row(tier.label, tier.price, <p className={styles.detail}>{tier.body}</p>)
                  ) : (
                    <div className={styles.row}>
                      <div className={styles.rowLine}>{tier.label}</div>
                      <p className={styles.detail}>{tier.body}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className={styles.panel}>
              <p className={page.label}>{services.aftercare.block.label}</p>
              <p className={styles.bigFigure}>
                {services.aftercare.block.price} <small>{services.aftercare.block.unit}</small>
              </p>
              <p className={styles.text}>{services.aftercare.block.body}</p>
              <ul className={`${styles.bullets} ${styles.bulletsTwo}`}>
                {services.aftercare.block.terms.map((term) => (
                  <li key={term}>{term}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* After aftercare on purpose: `notCare` says why this monthly plan is
            not a maintenance plan. The id is the JSON-LD Offer's anchor. */}
        <section id="local-visibility" className={page.section} aria-labelledby="visibility-heading">
          <h2 id="visibility-heading" className={page.label}>
            {services.localVisibility.title}
          </h2>
          <div className={`${page.content} ${page.narrow}`}>
            <p className={styles.lead}>{services.localVisibility.lead}</p>
            <div className={styles.panel}>
              <p className={page.label}>Every month</p>
              <p className={styles.bigFigure}>{services.localVisibility.price}</p>
              <ul className={`${styles.bullets} ${styles.bulletsTwo}`}>
                {services.localVisibility.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <ul className={`${styles.bullets} ${styles.bulletsTwo} ${styles.spaced}`}>
                {services.localVisibility.terms.map((term) => (
                  <li key={term}>{term}</li>
                ))}
              </ul>
              <p className={styles.meta}>{services.localVisibility.notCare}</p>
              <p className={styles.meta}>{vat.note}</p>
              <ul className={page.actions}>
                <li>
                  <Link className={page.buttonQuiet} href={enquire}>
                    Ask about it <span aria-hidden="true">→</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className={page.section} aria-labelledby="process-heading">
          <h2 id="process-heading" className={page.label}>
            Four steps
          </h2>
          <div className={page.content}>
            <ol className={styles.steps}>
              {servicesProcess.map((step) => (
                <li key={step.n}>
                  <div className={styles.rowLine}>
                    <span className={styles.stepN}>{step.n}</span>
                    <span className={styles.meta}>{step.duration}</span>
                  </div>
                  <h3 className={styles.offerName}>{step.title}</h3>
                  <p className={styles.text}>{step.body}</p>
                  <p className={styles.note}>
                    <strong>You get:</strong> {step.youGet}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* The client's real site. Metric values come straight from the case
            study; only the labels are reworded for a non-technical reader. */}
        {proofCase && (
          <section className={page.section} aria-labelledby="proof-heading">
            <h2 id="proof-heading" className={page.label}>
              {proofCase.title}
            </h2>
            <div className={`${page.content} ${styles.twoUp}`}>
              {/* eslint-disable-next-line @next/next/no-img-element -- the world's own 720/1280 copies (npm run textures) */}
              <img
                className={styles.proofImage}
                {...worldImage(proofCase.images[0])}
                sizes="(min-width: 900px) 40vw, 100vw"
                alt={`${proofCase.title} website homepage`}
                loading="lazy"
              />
              <div>
                <p className={styles.lead}>{services.proof.headline}</p>
                <p className={`${styles.text} ${styles.spaced}`}>{services.proof.body}</p>
                <dl className={styles.metrics}>
                  {proofCase.metrics.map((metric) => (
                    <div key={metric.k}>
                      <dt>{services.proof.plainLabels[metric.k] ?? metric.k}</dt>
                      <dd>{metric.v}</dd>
                    </div>
                  ))}
                </dl>
                {/* Renders only once a real, approved quote exists. See the
                    note on services.testimonial in data.ts. */}
                {services.testimonial && (
                  <figure className={styles.quote}>
                    <blockquote>&ldquo;{services.testimonial.text}&rdquo;</blockquote>
                    <figcaption className={styles.meta}>
                      {services.testimonial.author} · {services.testimonial.role}
                    </figcaption>
                  </figure>
                )}
                <ul className={page.actions}>
                  <li>
                    <a className={page.button} href={proofCase.links.demo} target="_blank" rel="noopener noreferrer">
                      Visit the site <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                  <li>
                    <Link className={page.buttonQuiet} href={`/cases/${proofCase.id}`}>
                      Read the case <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Native <details>: keyboard-accessible for free, and it still works
            if the bundle never arrives. */}
        <section className={page.section} aria-labelledby="faq-heading">
          <h2 id="faq-heading" className={page.label}>
            Straight answers
          </h2>
          <div className={`${page.content} ${page.narrow}`}>
            {servicesFaq.map((item) => (
              <details key={item.q} className={styles.fold}>
                <summary>{item.q}</summary>
                <p className={styles.text}>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <nav className={page.next} aria-label="Enquire">
          <p className={page.label}>{services.cta.eyebrow}</p>
          <Link className={page.nextLink} href={enquire}>
            {services.cta.title} <span aria-hidden="true">→</span>
          </Link>
          <p className={page.nextSub}>
            {services.cta.body} {services.cta.fallback} <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
          </p>
        </nav>
      </main>
      <WorldFooter />
    </WorldShell>
  );
}
