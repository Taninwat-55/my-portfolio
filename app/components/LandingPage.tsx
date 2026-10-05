import type { LucideIcon } from "lucide-react";
import { Check, Mail, MessageCircle } from "lucide-react";
import { personalInfo, services, servicesProcess, cases, fillAftercareRates } from "../data";
import { PageShell } from "./PageShell";
import { FadeIn } from "./FadeIn";
import { ServicesEnquiryForm, type EnquiryCopy } from "./ServicesEnquiryForm";
import { PaperSheet } from "./paper/PaperSheet";
import { PaperCard } from "./paper/PaperCard";
import { PageHeader } from "./paper/PageHeader";
import { DeskHeading } from "./paper/DeskHeading";
import { Print } from "./paper/Print";
import paper from "./paper/paper.module.css";

/**
 * The shape the three language files share. Their content objects are passed
 * in as they are: the keys that differ between them (the hero note, the
 * translated quote, the contact extras) arrive as separate props, so the
 * language files never have to change. `npm run copy` prints their keys, and
 * it is the proof that no word moved (Phase 5).
 */
export interface LandingCopy {
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
  proof: {
    heading: string;
    body: string;
    quoteLabel: string;
    altHome: string;
    altTreatments: string;
    quoteTranslationLabel: string;
  };
  process: { heading: string; steps: readonly { title: string; youGet: string }[] };
  contact: { heading: string; body: string; emailLabel: string; orForm: string };
  backToEnglish: string;
}

interface LandingPageProps {
  /** "th" | "sv" | "da": the wrapper's lang, the section ids, the footer's mark. */
  lang: string;
  content: LandingCopy;
  /**
   * A sticky note in the hero. Only /da has one since 2026-10-05: Ice removed
   * the Thai and Swedish notes, and kept the Danish one because it is the
   * page's only plain statement that calls are in English.
   */
  note?: string;
  noteIcon?: LucideIcon;
  /** The testimonial in this language, shown labelled as a translation. */
  quoteTranslated: string;
  /** /th leads with LINE; the other two do not offer it. */
  line?: { label: string; id: string };
  /** A note beside the email: /sv's meeting note, /da's written-first note. */
  contactAside?: string;
  /** The form's copy and messages, already in this language. */
  form: EnquiryCopy;
  /** Translates unit words inside figures ("/ hour", "weeks"). */
  units: (s: string) => string;
  /** Reformats a price for this language. Identity unless the page needs it (/sv). */
  price?: (s: string) => string;
  /** Thai needs taller lines; its stacked vowels and tone marks collide at 1.6. */
  loose?: boolean;
  /** Rendered above the header (the /da DRAFT banner). */
  banner?: React.ReactNode;
}

const same = (s: string) => s;

/**
 * The landing page for /th, /sv and /da: one component, three languages.
 *
 * Not a translation of /services: a different page for a different reader,
 * per D6 in PLAN.md (standalone language pages, no i18n machinery). Each page
 * file keeps its own metadata, hreflang and reasoning; this holds the layout
 * they had copied three times.
 *
 * Since the re-theme (Phase 5) it is paper on the desk like /services: the
 * hero note a sticky note, the prices a till receipt, the proof a sheet with
 * prints. lang sits on the wrapper because App Router allows only one <html>,
 * which the root layout hard-codes to "en".
 */
export function LandingPage({
  lang,
  content: c,
  note,
  noteIcon: NoteIcon,
  quoteTranslated,
  line,
  contactAside,
  form,
  units,
  price = same,
  loose = false,
  banner,
}: LandingPageProps) {
  const racha = cases.find((x) => x.id === "racha");
  const leading = loose ? "leading-loose" : "leading-relaxed";
  const tilt = (i: number) => [-0.8, 0.6, -0.4, 0.9][i % 4];

  return (
    <div
      lang={lang}
      // Kalam, the desk's handwriting, has no Thai glyphs, so Thai writes its
      // handwritten lines in Kanit, the face Thai is set in everywhere else.
      style={loose ? ({ "--font-hand": "var(--font-kanit), sans-serif" } as React.CSSProperties) : undefined}
    >
      <PageShell back={{ href: "/", label: c.backToEnglish, lang: "en" }} lang={lang} postcard={false}>
        {banner}

        {/* ── Header ────────────────────────────────────────────────────── */}
        <header className="mb-14 md:mb-20">
          <PageHeader onDesk kicker={c.hero.eyebrow} title={c.hero.title} lead={c.hero.lead} />
          <FadeIn immediate delay={0.1} y={12}>
            <p className={`mb-6 max-w-2xl text-base text-frost/80 md:text-lg ${leading}`}>{c.hero.body}</p>
          </FadeIn>

          {/* The note that decides whether the rest of the page is worth reading
              (on /da, the meeting language), so it sits in the hero as a sticky
              note, styled to be read rather than skimmed. */}
          {note && (
            <FadeIn immediate delay={0.15} y={12}>
              <p className={`${paper.sticky} flex max-w-2xl items-start gap-3 text-base ${leading}`}>
                {NoteIcon && <NoteIcon size={19} strokeWidth={1.75} aria-hidden className="mt-1 shrink-0" />}
                {note}
              </p>
            </FadeIn>
          )}
        </header>

        {/* ── Why me ────────────────────────────────────────────────────── */}
        <section aria-labelledby={`${lang}-why`} className="mb-14 md:mb-20">
          <DeskHeading immediate id={`${lang}-why`} title={c.why.heading} />
          <FadeIn immediate y={16}>
            <PaperCard tilt={-0.5}>
              <ul className="flex flex-col gap-3.5">
                {c.why.items.map((item) => (
                  <li key={item} className={`flex items-start gap-3 text-base ${leading}`}>
                    <Check size={17} strokeWidth={2} aria-hidden className={`${loose ? "mt-1.5" : "mt-1"} shrink-0`} />
                    {item}
                  </li>
                ))}
              </ul>
            </PaperCard>
          </FadeIn>
        </section>

        {/* ── Prices ────────────────────────────────────────────────────── */}
        <section aria-labelledby={`${lang}-pricing`} className="mb-14 md:mb-20">
          <DeskHeading id={`${lang}-pricing`} title={c.pricing.heading} />
          <p className={`mb-6 max-w-2xl text-base text-frost/80 ${leading}`}>{c.pricing.lead}</p>

          {/* Read from services.offers, never retyped, so this cannot drift from
              /services. `price` is identity except on /sv, where svPrice()
              reformats the thousands separator: a Swedish reader can parse
              "6.500" as six and a half, the one number that must not be
              ambiguous. /da needs no transform; data.ts writes these the Danish
              way already. */}
          <FadeIn y={20}>
            <div className={paper.receiptShadow}>
              <div className={paper.receipt}>
                <div>
                  {services.offers[0].priceLadder?.map((rung) => (
                    <div key={rung.scope} className={paper.row}>
                      <div className={paper.rowLine}>
                        <span className="text-base font-semibold">{units(rung.scope)}</span>
                        <span className={paper.figure}>{price(rung.price)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {c.pricing.currencyNote && (
                  <p className={`${paper.dashed} mt-4 pt-4 text-sm text-paper-soft ${leading}`}>
                    {c.pricing.currencyNote}
                  </p>
                )}

                <ul className={`${paper.dashed} mt-5 flex flex-col gap-3 pt-5`}>
                  {c.pricing.terms.map((term) => (
                    <li key={term} className={`flex items-start gap-2.5 text-sm ${leading}`}>
                      <Check size={15} strokeWidth={2} aria-hidden className={`${loose ? "mt-1.5" : "mt-1"} shrink-0`} />
                      {term}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* ── After launch ───────────────────────────────────────────────
            ITEM 44. Directly after the prices, because that is where the
            question arrives: what changes cost is the next thing a shop owner
            asks, not a detail. On /da, hero.lead promises "ingen månedlige
            gebyrer, du ikke har bedt om", which raises the retainer question in
            the third sentence and, until this section existed, never answered it.

            Every figure comes from services.aftercare and aftercareRates.
            units() translates the unit words inside them ("650 DKK / hour"
            becomes "650 DKK / time" in Danish) and fillAftercareRates() fills the
            {effective} / {hourly} placeholders in the terms. No number is typed
            in any language file. */}
        <section aria-labelledby={`${lang}-aftercare`} className="mb-14 md:mb-20">
          <DeskHeading id={`${lang}-aftercare`} title={c.aftercare.heading} />
          <p className={`mb-6 max-w-2xl text-base text-frost/80 ${leading}`}>{c.aftercare.lead}</p>

          <div className="mb-6 grid gap-6 sm:grid-cols-2">
            {[
              { ...c.aftercare.free, price: null },
              { ...c.aftercare.hourly, price: price(units(services.aftercare.hourly.price)) },
            ].map((tier, i) => (
              <FadeIn key={tier.label} y={16}>
                <PaperCard tilt={tilt(i)} className="h-full">
                  <p className={paper.label}>{tier.label}</p>
                  {tier.price && <p className={`${paper.figure} mb-2 text-lg`}>{tier.price}</p>}
                  <p className={`text-sm ${leading}`}>{tier.body}</p>
                </PaperCard>
              </FadeIn>
            ))}
          </div>

          <FadeIn y={16}>
            <PaperCard tilt={0.4}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className={paper.label}>{c.aftercare.block.label}</p>
                <p className={`${paper.figure} text-lg`}>
                  {price(services.aftercare.block.price)}
                  <span className="ml-2 font-sans text-sm font-normal text-paper-soft">
                    {units(services.aftercare.block.unit)}
                  </span>
                </p>
              </div>
              <p className={`mt-2 text-sm ${leading}`}>{c.aftercare.block.body}</p>
              <ul className={`${paper.dashed} mt-5 flex flex-col gap-2.5 pt-5`}>
                {c.aftercare.block.terms.map((term) => (
                  <li key={term} className={`flex items-start gap-2.5 text-sm ${leading}`}>
                    <Check size={15} strokeWidth={2} aria-hidden className={`${loose ? "mt-1.5" : "mt-1"} shrink-0`} />
                    {fillAftercareRates(term, price)}
                  </li>
                ))}
              </ul>
            </PaperCard>
          </FadeIn>
        </section>

        {/* ── Proof ─────────────────────────────────────────────────────── */}
        {racha && (
          <section aria-labelledby={`${lang}-proof`} className="mb-14 md:mb-20">
            <DeskHeading id={`${lang}-proof`} title={c.proof.heading} />

            <FadeIn y={20}>
              <PaperSheet>
                {/* Prints at Racha's own capture ratio (1600x1005): the first
                    version on /th declared width={800} height={600}, a 4:3
                    placeholder against a 1.59:1 image, so the boxes never matched
                    and every load shifted layout. Real alt text, not alt="":
                    these carry the argument of the section, and an empty alt is
                    also why a failed load used to show an unexplained box. */}
                <div className="grid grid-cols-2 gap-4">
                  {racha.images.slice(0, 2).map((src, i) => (
                    <Print
                      key={src}
                      image={src}
                      alt={`${racha.title} — ${i === 0 ? c.proof.altHome : c.proof.altTreatments}`}
                      ratio="1600 / 1005"
                      tilt={i === 0 ? -1 : 0.8}
                      sizes="(min-width: 768px) 400px, 45vw"
                    />
                  ))}
                </div>

                <p className={`mt-6 text-base ${leading}`}>{c.proof.body}</p>

                {/* Metrics read from the case study so they cannot drift. */}
                <dl className={`${paper.dashed} mt-6 grid grid-cols-1 gap-4 border-b border-dashed border-paper-rule py-4 sm:grid-cols-3`}>
                  {racha.metrics.map((metric) => (
                    <div key={metric.k} className="flex flex-col">
                      <dt className="order-2 text-[11px] uppercase tracking-wider text-paper-soft">{metric.k}</dt>
                      <dd className="order-1 font-[family-name:var(--font-hand)] text-xl font-bold">{metric.v}</dd>
                    </div>
                  ))}
                </dl>

                {/* The English original is what Racha actually approved, so it is
                    shown as the quote. The translation is labelled as one rather
                    than presented as her wording; on /da, her own Danish sentence
                    would be worth more and should replace it if it ever arrives. */}
                {services.testimonial && (
                  <figure className="mt-8 border-l-2 border-paper-accent pl-5">
                    <p className={paper.label}>{c.proof.quoteLabel}</p>
                    <blockquote lang="en" className="font-[family-name:var(--font-hand)] text-xl leading-relaxed">
                      &ldquo;{services.testimonial.text}&rdquo;
                    </blockquote>
                    <p className="mt-3 text-xs text-paper-soft">{c.proof.quoteTranslationLabel}</p>
                    <p className={`mt-1.5 text-base text-paper-soft ${leading}`}>&ldquo;{quoteTranslated}&rdquo;</p>
                    <figcaption className="mt-3 text-xs uppercase tracking-wider text-paper-soft">
                      {services.testimonial.author}
                    </figcaption>
                  </figure>
                )}
              </PaperSheet>
            </FadeIn>
          </section>
        )}

        {/* ── Process ───────────────────────────────────────────────────── */}
        <section aria-labelledby={`${lang}-process`} className="mb-14 md:mb-20">
          <DeskHeading id={`${lang}-process`} title={c.process.heading} />
          <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {c.process.steps.map((step, i) => (
              <li key={step.title}>
                <FadeIn delay={i * 0.08} y={20} className="h-full">
                  <PaperCard tilt={tilt(i + 1)} className="flex h-full flex-col">
                    <div className="mb-3 flex items-baseline justify-between gap-3">
                      <span className="font-[family-name:var(--font-hand)] text-2xl font-bold">
                        {servicesProcess[i]?.n}
                      </span>
                      {/* Duration read from servicesProcess: a number, not copy. */}
                      <span className={`${paper.mono} text-[11px] tracking-wider text-paper-soft`}>
                        {units(servicesProcess[i]?.duration ?? "")}
                      </span>
                    </div>
                    <h3 className="mb-2 text-lg font-bold">{step.title}</h3>
                    <p className={`mt-auto text-sm ${leading}`}>{step.youGet}</p>
                  </PaperCard>
                </FadeIn>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Contact ───────────────────────────────────────────────────── */}
        <section aria-labelledby={`${lang}-contact`} id={`${lang}-enquiry`}>
          <FadeIn y={20}>
            <PaperSheet>
              <h2 id={`${lang}-contact`} className="mb-3 text-2xl font-black tracking-tight md:text-3xl">
                {c.contact.heading}
              </h2>
              <p className={`mb-6 text-base text-paper-soft ${leading}`}>{c.contact.body}</p>

              {/* /th leads with LINE because that is how that community actually
                  talks: a message is a far smaller ask than a form with a budget
                  dropdown. /sv and /da offer email: a Skåne owner expects an
                  address and a form, and on /da a flow implying a Danish phone call
                  would set up exactly the discovery the hero note exists to prevent. */}
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-stretch">
                {line && (
                  <div className="flex items-center gap-3 rounded-md border border-paper-rule px-5 py-4">
                    <MessageCircle size={18} strokeWidth={1.75} aria-hidden className="shrink-0" />
                    <div>
                      <div className={paper.label}>{line.label}</div>
                      <div lang="en" className="text-base font-semibold">
                        {line.id}
                      </div>
                    </div>
                  </div>
                )}
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3 rounded-md border border-paper-rule px-5 py-4 hover:border-paper-soft"
                >
                  <Mail size={18} strokeWidth={1.75} aria-hidden className="shrink-0" />
                  <div>
                    <div className={paper.label}>{c.contact.emailLabel}</div>
                    <div lang="en" className="text-sm font-semibold text-paper-link underline underline-offset-4">
                      {personalInfo.email}
                    </div>
                  </div>
                </a>
                {contactAside && (
                  <p className={`flex items-center rounded-md bg-paper-dim px-5 py-4 text-sm ${leading}`}>
                    {contactAside}
                  </p>
                )}
              </div>

              <p className={`mb-6 text-sm text-paper-soft ${leading}`}>{c.contact.orForm}</p>

              {/* The real form, in this language. Same endpoint, same validation,
                  same option values: only the visible strings differ. */}
              <ServicesEnquiryForm copy={form} />
            </PaperSheet>
          </FadeIn>
        </section>
      </PageShell>
    </div>
  );
}
