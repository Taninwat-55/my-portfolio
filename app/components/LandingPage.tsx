import { personalInfo, services, servicesProcess, cases, fillAftercareRates, localVisibilityRates, ditheredSrc, stackContent } from "../data";
import type { EnquiryCopy } from "./ServicesEnquiryForm";
import { BlankCard } from "./stack/BlankCard";
import { DevelopImage } from "./stack/DevelopImage";
import { DitherPicture } from "./stack/DitherPicture";
import { ReceiptRow } from "./stack/ReceiptRow";
import stack from "./stack/stack.module.css";
import lc from "./stack/longcard.module.css";

/** The copy a language file supplies. Every number comes from app/data.ts. */
export type LandingCopy = {
  hero: { eyebrow: string; title: string; lead: string; body: string };
  why: { heading: string; items: readonly string[] };
  pricing: { heading: string; lead: string; currencyNote?: string; terms: readonly string[] };
  aftercare: {
    heading: string;
    lead: string;
    free: { label: string; body: string };
    hourly: { label: string; body: string };
    block: { label: string; body: string; terms: readonly string[] };
  };
  localVisibility: {
    eyebrow: string;
    heading: string;
    lead: string;
    perMonth: string;
    includes: readonly string[];
    terms: readonly string[];
    notCare: string;
  };
  proof: {
    heading: string;
    body: string;
    quoteLabel: string;
    altHome: string;
    altTreatments: string;
    quoteTranslationLabel: string;
    /** Keyed by the English metric label in cases; the English is the fallback. */
    metrics?: Readonly<Record<string, { v: string; k: string }>>;
  };
  process: { heading: string; steps: readonly { title: string; youGet: string }[] };
  contact: { heading: string; body: string; emailLabel: string; orForm: string };
  backToEnglish: string;
  languagesLabel: string;
};

interface LandingPageProps {
  lang: "th" | "sv" | "da";
  content: LandingCopy;
  /** A line that decides whether the rest is worth reading (on /da, the meeting language). */
  note?: string;
  quoteTranslated: string;
  line?: { label: string; id: string };
  contactAside?: string;
  form: EnquiryCopy;
  /** Translates the unit words inside a figure ("2–3 days" → "2–3 dage"). */
  units: (s: string) => string;
  /** Reformats a price for this language (/sv's thousands space). */
  price?: (s: string) => string;
  /** The next/font variable class for this language's face (/th's Chakra Petch). */
  fontClass?: string;
  banner?: React.ReactNode;
}

const same = (s: string) => s;

/**
 * The landing card for /th, /sv and /da: one component, three languages.
 *
 * Not a translation of /services: a different card for a different reader,
 * per D6 in PLAN.md (standalone language pages, no i18n machinery). Each page
 * file keeps its own metadata and hreflang. Since phase 2 (2026-10-18) it is a
 * long stack card like /services, built from the same pieces (longcard.module
 * .css, ReceiptRow, DevelopImage, BlankCard). lang sits on the wrapper because
 * App Router allows only one <html>, which the root layout sets to "en".
 */
export function LandingPage({
  lang,
  content: c,
  note,
  quoteTranslated,
  line,
  contactAside,
  form,
  units,
  price = same,
  fontClass,
  banner,
}: LandingPageProps) {
  const racha = cases.find((x) => x.id === "racha");
  const bullets = (items: readonly string[], two = false) => (
    <ul className={`${lc.bullets} ${two ? lc.bulletsTwo : ""}`}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );

  return (
    <div lang={lang} className={`${lc.page} ${fontClass ?? ""} ${lang === "th" ? lc.thai : ""}`}>
      {banner}

      <header className={lc.intro}>
        <h1 className={stack.title}>{c.hero.title}</h1>
        <p className={stack.lead}>{c.hero.lead}</p>
        <p className={`${stack.body} ${lc.introBody}`}>{c.hero.body}</p>
        {note && <p className={lc.aside}>{note}</p>}
      </header>

      {/* ── Why me ────────────────────────────────────────────────────── */}
      <section aria-labelledby={`${lang}-why`} className={lc.section}>
        <h2 id={`${lang}-why`} className={lc.sectionTitle}>
          {c.why.heading}
        </h2>
        <div className={stack.window}>{bullets(c.why.items)}</div>
      </section>

      {/* ── Prices ────────────────────────────────────────────────────── */}
      {/* Read from services.offers, never retyped, so this cannot drift from
          /services. `price` is identity except on /sv, where svPrice()
          reformats the thousands separator. */}
      <section aria-labelledby={`${lang}-pricing`} className={lc.section}>
        <h2 id={`${lang}-pricing`} className={lc.sectionTitle}>
          {c.pricing.heading}
        </h2>
        <p className={stack.lead}>{c.pricing.lead}</p>
        <div className={`${stack.window} ${lc.spaced}`}>
          <div className={lc.offerBody}>
            {services.offers[0].priceLadder?.map((rung) => (
              <ReceiptRow key={rung.scope} label={units(rung.scope)} value={price(rung.price)} />
            ))}
            {c.pricing.currencyNote && <p className={lc.note}>{c.pricing.currencyNote}</p>}
            <div className={lc.block}>{bullets(c.pricing.terms)}</div>
          </div>
        </div>
      </section>

      {/* ── After launch ────────────────────────────────────────────────
          Every figure comes from services.aftercare and aftercareRates;
          units() translates the unit words and fillAftercareRates() fills
          the placeholders in the terms. No number is typed in a language file. */}
      <section aria-labelledby={`${lang}-aftercare`} className={lc.section}>
        <h2 id={`${lang}-aftercare`} className={lc.sectionTitle}>
          {c.aftercare.heading}
        </h2>
        <p className={stack.lead}>{c.aftercare.lead}</p>
        <div className={`${lc.twoUp} ${lc.spaced}`}>
          {[
            { ...c.aftercare.free, price: null },
            { ...c.aftercare.hourly, price: price(units(services.aftercare.hourly.price)) },
          ].map((tier) => (
            <div key={tier.label} className={lc.field}>
              <div className={lc.rowLine}>
                <span className={lc.label}>{tier.label}</span>
                {tier.price && (
                  <>
                    <span className={lc.leader} aria-hidden="true" />
                    <span className={lc.figure}>{tier.price}</span>
                  </>
                )}
              </div>
              <p className={stack.body}>{tier.body}</p>
            </div>
          ))}
        </div>
        <div className={`${stack.window} ${lc.spaced}`}>
          <div className={stack.titlebar}>
            <span>{c.aftercare.block.label}</span>
          </div>
          <div className={lc.offerBody}>
            <p className={lc.bigFigure}>
              {price(services.aftercare.block.price)} <small>{units(services.aftercare.block.unit)}</small>
            </p>
            <p className={stack.body}>{c.aftercare.block.body}</p>
            <ul className={`${lc.bullets} ${lc.bulletsTwo}`}>
              {c.aftercare.block.terms.map((term) => (
                <li key={term}>{fillAftercareRates(term, price)}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Local visibility ────────────────────────────────────────────
          Straight after aftercare, which has just said there is no
          maintenance plan: this is a different thing. */}
      <section aria-labelledby={`${lang}-local-visibility`} className={lc.section}>
        <h2 id={`${lang}-local-visibility`} className={lc.sectionTitle}>
          {c.localVisibility.heading}
        </h2>
        <p className={stack.lead}>{c.localVisibility.lead}</p>
        <div className={`${stack.window} ${lc.spaced}`}>
          <div className={stack.titlebar}>
            <span>{c.localVisibility.eyebrow}</span>
          </div>
          <div className={lc.offerBody}>
            <p className={lc.bigFigure}>
              {price(localVisibilityRates.monthly)} {localVisibilityRates.currency} {c.localVisibility.perMonth}
            </p>
            {bullets(c.localVisibility.includes, true)}
            <div className={lc.block}>
              {bullets(c.localVisibility.terms, true)}
              <p className={lc.aside}>{c.localVisibility.notCare}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Proof ───────────────────────────────────────────────────────
          Racha's real site, dithered, with the same develop control as its
          card. Metrics come from the case study, labels in this language
          where the page has them. The English quote is what Racha approved,
          so it is the quote; the translation is labelled as one. */}
      {racha && (
        <section aria-labelledby={`${lang}-proof`} className={lc.section}>
          <h2 id={`${lang}-proof`} className={lc.sectionTitle}>
            {c.proof.heading}
          </h2>
          <div className={lc.proof}>
            <DevelopImage
              colourSrc={racha.images[0]}
              colourAlt={`${racha.title}, ${c.proof.altHome}`}
              developLabel={stackContent.project.develop}
              developedLabel={stackContent.project.developed}
              hint={stackContent.project.developHint}
              windowTitle={new URL(racha.links.demo).host.replace(/^www\./, "")}
            >
              <DitherPicture src={ditheredSrc(racha.images[0])} alt={`${racha.title}, ${c.proof.altHome}`} />
            </DevelopImage>
            <div>
              <p className={stack.body}>{c.proof.body}</p>
              <dl className={stack.facts}>
                {racha.metrics.map((metric) => {
                  const local = c.proof.metrics?.[metric.k];
                  return (
                    <div key={metric.k} style={{ display: "contents" }}>
                      <dt>{local?.v ?? metric.v}</dt>
                      <dd>{local?.k ?? metric.k}</dd>
                    </div>
                  );
                })}
              </dl>
              {services.testimonial && (
                <figure className={lc.quote}>
                  <p className={lc.label}>{c.proof.quoteLabel}</p>
                  <blockquote lang="en">&ldquo;{services.testimonial.text}&rdquo;</blockquote>
                  <p className={lc.rowMeta}>{c.proof.quoteTranslationLabel}</p>
                  <p className={stack.body}>&ldquo;{quoteTranslated}&rdquo;</p>
                  <figcaption className={lc.rowMeta}>{services.testimonial.author}</figcaption>
                </figure>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── Process ─────────────────────────────────────────────────────── */}
      <section aria-labelledby={`${lang}-process`} className={lc.section}>
        <h2 id={`${lang}-process`} className={lc.sectionTitle}>
          {c.process.heading}
        </h2>
        <ol className={lc.steps}>
          {c.process.steps.map((step, i) => (
            <li key={step.title} className={lc.field}>
              <div className={lc.rowLine}>
                <span className={lc.stepN}>{servicesProcess[i]?.n}</span>
                {/* Duration read from servicesProcess: a number, not copy. */}
                <span className={lc.rowMeta}>{units(servicesProcess[i]?.duration ?? "")}</span>
              </div>
              <h3 className={stack.heading}>{step.title}</h3>
              <p className={stack.body}>{step.youGet}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Contact ─────────────────────────────────────────────────────
          /th leads with LINE because that is how that community talks; /sv
          and /da offer email. Then the blank card in this language: same
          endpoint, validation and option values, only the visible strings
          differ. */}
      <section aria-labelledby={`${lang}-contact`} id={`${lang}-enquiry`} className={lc.section}>
        <h2 id={`${lang}-contact`} className={lc.sectionTitle}>
          {c.contact.heading}
        </h2>
        <p className={stack.lead}>{c.contact.body}</p>
        <div className={`${lc.twoUp} ${lc.spaced}`}>
          {line && (
            <div className={lc.field}>
              <p className={lc.label}>{line.label}</p>
              <p lang="en" className={stack.body}>
                <strong>{line.id}</strong>
              </p>
            </div>
          )}
          <div className={lc.field}>
            <p className={lc.label}>{c.contact.emailLabel}</p>
            <p lang="en" className={stack.body}>
              <a href={`mailto:${personalInfo.email}`} className={stack.inlineLink}>
                {personalInfo.email}
              </a>
            </p>
          </div>
          {contactAside && <p className={lc.aside}>{contactAside}</p>}
        </div>
        <p className={`${stack.body} ${lc.spacedText}`}>{c.contact.orForm}</p>
        <div className={`${stack.window} ${lc.spaced}`}>
          <div className={stack.titlebar}>
            <i className={stack.closeBox} aria-hidden="true" />
            <span>{form.submit}</span>
          </div>
          <div className={lc.offerBody}>
            <BlankCard
              copy={form}
              card={{ save: form.submit, saving: form.submitting, savedTitle: form.sentTitle }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
