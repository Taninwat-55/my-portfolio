import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Mail, Train } from "lucide-react";
import { SkipLink } from "../components/SkipLink";
import { FadeIn } from "../components/FadeIn";
import { ServicesEnquiryForm } from "../components/ServicesEnquiryForm";
import {
  personalInfo,
  services,
  servicesProcess,
  cases,
  fillAftercareRates,
} from "../data";
import { svContent as sv, svUnits, svPrice } from "../data.sv";

const BASE_URL = "https://taninwatkaewpankan.xyz";
const PAGE_URL = `${BASE_URL}/sv`;

export const metadata: Metadata = {
  title: sv.meta.title,
  description: sv.meta.description,
  alternates: {
    canonical: PAGE_URL,
    // hreflang is only valid reciprocated, and it has to be complete: every
    // language variant lists every other one, so the homepage and /th both name
    // this page back.
    languages: {
      en: BASE_URL,
      th: `${BASE_URL}/th`,
      sv: PAGE_URL,
    },
  },
  openGraph: {
    title: sv.meta.title,
    description: sv.meta.description,
    url: PAGE_URL,
    type: "website",
    locale: "sv_SE",
  },
};

/**
 * The Swedish landing page.
 *
 * Not a translation of /services — a different page for a different reader, per
 * D6 in PLAN.md (standalone language pages, no i18n machinery). Aimed at small
 * businesses in Skåne: Malmö, Lund, Helsingborg.
 *
 * WHY THIS WAS THE CHEAP ONE. /da is blocked on finding a Danish proofreader,
 * because a page arguing "I do careful work" is destroyed by one clumsy sentence.
 * Swedish has no such gate: Ice writes it fluently, so he is the native reviewer
 * and the correction loop is a conversation rather than a dependency.
 *
 * THE ARGUMENT IS GEOGRAPHY PLUS LANGUAGE. Copenhagen to Malmö is about 35
 * minutes by train, so in-person meetings are real without Malmö agency
 * overheads — and he is a Swedish citizen educated in Sweden, so this is a native
 * page rather than a translated one. Both claims are load-bearing and both are
 * true, which is why they sit in the hero rather than in an FAQ.
 *
 * Written for search rather than for pasting into a group, which is the other way
 * it differs from /th: a Skåne owner googles "hemsida småföretag Malmö" instead of
 * asking a community, so the town names appear in the copy on purpose.
 *
 * lang="sv" sits on the wrapper because App Router allows only one <html>, which
 * the root layout hard-codes to "en".
 */
export default function SwedishPage() {
  const racha = cases.find((c) => c.id === "racha");

  return (
    <div
      lang="sv"
      className="min-h-screen bg-night-900 text-frost"
      style={{ overflowX: "clip" }}
    >
      <SkipLink />

      {/* Not the shared <SiteNav />: its links are English and point at homepage
          sections this page does not have. The only cross-link that makes sense
          here is the way back to the English site. */}
      <nav className="fixed top-0 z-50 w-full border-b border-frost/10 bg-night-900/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link
            href="/"
            aria-label="Home"
            className="shrink-0 text-xl font-bold tracking-tighter text-frost"
          >
            Ice<span className="text-crystal-500">.</span>
          </Link>
          <Link
            href="/"
            lang="en"
            className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-frost/60 transition-colors hover:text-frost"
          >
            <ArrowLeft size={15} aria-hidden /> {sv.backToEnglish}
          </Link>
        </div>
      </nav>

      <main id="main-content" className="px-5 pt-28 pb-20 sm:px-6 sm:pt-32 md:px-10">
        <div className="mx-auto max-w-3xl">
          {/* ── Header ────────────────────────────────────────────────────── */}
          <header className="mb-14 md:mb-20">
            <FadeIn y={20}>
              <div className="mb-4 text-xs uppercase tracking-[0.25em] text-crystal-500">
                {sv.hero.eyebrow}
              </div>
            </FadeIn>

            <FadeIn delay={0.08} y={40}>
              <h1
                className="hero-heading mb-6 font-black leading-tight tracking-tight"
                style={{ fontSize: "clamp(2.2rem, 7vw, 4.5rem)" }}
              >
                {sv.hero.title}
              </h1>
            </FadeIn>

            <FadeIn delay={0.16} y={20}>
              <p className="mb-6 text-lg leading-relaxed text-frost/70 md:text-xl">
                {sv.hero.lead}
              </p>
            </FadeIn>

            <FadeIn delay={0.24} y={20}>
              <p className="mb-6 max-w-2xl text-base font-light leading-relaxed text-frost/65">
                {sv.hero.body}
              </p>
            </FadeIn>

            {/* The geography claim, highlighted for the same reason /th highlights
                its language note: it is the sentence that decides whether the rest
                of the page is worth reading. */}
            <FadeIn delay={0.32} y={20}>
              <p className="flex max-w-2xl items-start gap-3 rounded-2xl border border-crystal-500/25 bg-crystal-500/5 px-5 py-4 text-base font-light leading-relaxed text-frost/80">
                <Train
                  size={19}
                  strokeWidth={1.6}
                  aria-hidden
                  className="mt-1 shrink-0 text-crystal-500"
                />
                {sv.hero.locationNote}
              </p>
            </FadeIn>
          </header>

          {/* ── Why me ────────────────────────────────────────────────────── */}
          <section aria-labelledby="sv-why" className="mb-14 md:mb-20">
            <h2 id="sv-why" className="mb-6 text-2xl font-medium text-frost md:text-3xl">
              {sv.why.heading}
            </h2>
            <ul className="flex flex-col gap-3.5">
              {sv.why.items.map((item, i) => (
                <FadeIn key={item} delay={i * 0.08} y={20}>
                  <li className="flex items-start gap-3 text-base font-light leading-relaxed text-frost/70">
                    <Check
                      size={17}
                      strokeWidth={2}
                      aria-hidden
                      className="mt-1 shrink-0 text-crystal-500"
                    />
                    {item}
                  </li>
                </FadeIn>
              ))}
            </ul>
          </section>

          {/* ── Prices ────────────────────────────────────────────────────── */}
          <section aria-labelledby="sv-pricing" className="mb-14 md:mb-20">
            <h2
              id="sv-pricing"
              className="mb-4 text-2xl font-medium text-frost md:text-3xl"
            >
              {sv.pricing.heading}
            </h2>
            <p className="mb-6 text-base font-light leading-relaxed text-frost/65">
              {sv.pricing.lead}
            </p>

            {/* Read from services.offers, never retyped. svPrice() only reformats
                the thousands separator into the Swedish one — a Swedish reader can
                parse "6.500" as six and a half, which is the one number on this
                page that must not be ambiguous. */}
            <FadeIn y={24}>
              <div className="flex flex-col divide-y divide-frost/10 border-y border-frost/10">
                {services.offers[0].priceLadder?.map((rung) => (
                  <div
                    key={rung.scope}
                    className="flex items-baseline justify-between gap-4 py-4"
                  >
                    <span className="text-base font-medium text-frost">
                      {svUnits(rung.scope)}
                    </span>
                    <span className="shrink-0 whitespace-nowrap text-base font-medium tabular-nums text-frost/85">
                      {svPrice(rung.price)}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <p className="mt-5 text-sm font-light leading-relaxed text-frost/45">
              {sv.pricing.currencyNote}
            </p>

            <ul className="mt-7 flex flex-col gap-3 border-t border-frost/10 pt-6">
              {sv.pricing.terms.map((term) => (
                <li
                  key={term}
                  className="flex items-start gap-2.5 text-sm font-light leading-relaxed text-frost/70"
                >
                  <Check
                    size={15}
                    strokeWidth={2}
                    aria-hidden
                    className="mt-1 shrink-0 text-crystal-500"
                  />
                  {term}
                </li>
              ))}
            </ul>
          </section>

          {/* ── After launch ───────────────────────────────────────────────
              ITEM 44. Mirrors /da, and sits directly after the prices for the
              same reason: what changes cost is the next question a shop owner
              asks, not a detail.

              Every figure comes from services.aftercare and aftercareRates.
              svUnits() translates the unit words inside them, and
              fillAftercareRates() fills the placeholders in the terms, so no
              number is typed in this language anywhere. */}
          <section aria-labelledby="sv-aftercare" className="mb-14 md:mb-20">
            <h2
              id="sv-aftercare"
              className="mb-4 text-2xl font-medium text-frost md:text-3xl"
            >
              {sv.aftercare.heading}
            </h2>
            <p className="mb-7 text-base font-light leading-relaxed text-frost/65">
              {sv.aftercare.lead}
            </p>

            <div className="mb-5 grid gap-4 sm:grid-cols-2">
              {[
                { ...sv.aftercare.free, price: null },
                {
                  ...sv.aftercare.hourly,
                  price: svPrice(svUnits(services.aftercare.hourly.price)),
                },
              ].map((tier) => (
                <div
                  key={tier.label}
                  className="rounded-2xl border border-frost/10 bg-white/3 p-5"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-crystal-500">
                    {tier.label}
                  </p>
                  {tier.price && (
                    <p className="mt-2 text-lg font-medium text-frost">
                      {tier.price}
                    </p>
                  )}
                  <p className="mt-2.5 text-sm font-light leading-relaxed text-frost/65">
                    {tier.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-frost/10 bg-white/3 p-5 sm:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="text-xs uppercase tracking-[0.2em] text-crystal-500">
                  {sv.aftercare.block.label}
                </p>
                <p className="text-lg font-medium text-frost">
                  {svPrice(services.aftercare.block.price)}
                  <span className="ml-2 text-sm font-light text-frost/50">
                    {svUnits(services.aftercare.block.unit)}
                  </span>
                </p>
              </div>
              <p className="mt-3 text-sm font-light leading-relaxed text-frost/65">
                {sv.aftercare.block.body}
              </p>
              <ul className="mt-5 flex flex-col gap-2.5 border-t border-frost/10 pt-5">
                {sv.aftercare.block.terms.map((term) => (
                  <li
                    key={term}
                    className="flex items-start gap-2.5 text-sm font-light leading-relaxed text-frost/70"
                  >
                    <Check
                      size={15}
                      strokeWidth={2}
                      aria-hidden
                      className="mt-1 shrink-0 text-crystal-500"
                    />
                    {fillAftercareRates(term, svPrice)}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── Proof ─────────────────────────────────────────────────────── */}
          {racha && (
            <section aria-labelledby="sv-proof" className="mb-14 md:mb-20">
              <h2
                id="sv-proof"
                className="mb-6 text-2xl font-medium text-frost md:text-3xl"
              >
                {sv.proof.heading}
              </h2>

              <FadeIn y={24}>
                <div className="grid grid-cols-2 gap-3">
                  {/* `fill` inside a ratio box at Racha's own capture size, which
                      is the pattern /services, /th and Projects.tsx already use for
                      these exact files. Real alt text, not alt="" — these carry the
                      argument of the section, and an empty alt is also what makes a
                      failed load show an unexplained empty box. */}
                  {racha.images.slice(0, 2).map((src, i) => (
                    <div
                      key={src}
                      className="relative overflow-hidden rounded-2xl border border-frost/10"
                      style={{ aspectRatio: "1600 / 1005" }}
                    >
                      <Image
                        src={src}
                        alt={`${racha.title} — ${
                          i === 0 ? sv.proof.altHome : sv.proof.altTreatments
                        }`}
                        fill
                        sizes="(min-width: 768px) 360px, 45vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </FadeIn>

              <p className="mt-6 text-base font-light leading-relaxed text-frost/70">
                {sv.proof.body}
              </p>

              {/* Metrics read from the case study so they cannot drift. */}
              <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {racha.metrics.map((metric) => (
                  <div
                    key={metric.k}
                    className="rounded-2xl border border-frost/10 bg-white/3 p-4"
                  >
                    <dt className="text-lg font-medium text-frost">{metric.v}</dt>
                    <dd className="mt-1 text-[11px] uppercase tracking-wider text-frost/40">
                      {metric.k}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* The English original is what Racha actually approved, so it is
                  shown as the quote. The Swedish is labelled as a translation
                  rather than presented as her wording. */}
              {services.testimonial && (
                <figure className="mt-8 border-l-2 border-crystal-500/40 pl-5">
                  <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-crystal-500">
                    {sv.proof.quoteLabel}
                  </div>
                  <blockquote
                    lang="en"
                    className="font-display text-lg italic leading-relaxed text-frost/80"
                  >
                    &ldquo;{services.testimonial.text}&rdquo;
                  </blockquote>
                  <p className="mt-3 text-xs text-frost/35">
                    {sv.proof.quoteTranslationLabel}
                  </p>
                  <p className="mt-1.5 text-base font-light leading-relaxed text-frost/60">
                    &ldquo;{sv.proof.quoteSv}&rdquo;
                  </p>
                  <figcaption className="mt-3 text-xs uppercase tracking-wider text-frost/40">
                    {services.testimonial.author}
                  </figcaption>
                </figure>
              )}
            </section>
          )}

          {/* ── Process ───────────────────────────────────────────────────── */}
          <section aria-labelledby="sv-process" className="mb-14 md:mb-20">
            <h2
              id="sv-process"
              className="mb-6 text-2xl font-medium text-frost md:text-3xl"
            >
              {sv.process.heading}
            </h2>
            <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {sv.process.steps.map((step, i) => (
                <FadeIn key={step.title} delay={i * 0.08} y={24}>
                  <li className="flex h-full flex-col rounded-2xl border border-frost/10 bg-white/3 p-5">
                    <div className="mb-3 flex items-baseline justify-between gap-3">
                      <span className="text-xs uppercase tracking-[0.25em] text-crystal-500">
                        {servicesProcess[i]?.n}
                      </span>
                      {/* Duration read from servicesProcess — a number, not copy. */}
                      <span className="text-[11px] tracking-wider text-frost/30">
                        {svUnits(servicesProcess[i]?.duration ?? "")}
                      </span>
                    </div>
                    <h3 className="mb-2 text-lg font-medium text-frost">
                      {step.title}
                    </h3>
                    <p className="mt-auto text-sm font-light leading-relaxed text-frost/60">
                      {step.youGet}
                    </p>
                  </li>
                </FadeIn>
              ))}
            </ol>
          </section>

          {/* ── Contact ───────────────────────────────────────────────────── */}
          <section aria-labelledby="sv-contact" id="sv-enquiry">
            <h2
              id="sv-contact"
              className="mb-4 text-2xl font-medium text-frost md:text-3xl"
            >
              {sv.contact.heading}
            </h2>
            <p className="mb-6 text-base font-light leading-relaxed text-frost/65">
              {sv.contact.body}
            </p>

            {/* Email, not LINE. /th leads with LINE because that is how that
                community actually talks; a Skåne business owner expects an address
                and a form, and would find a chat app ID odd. */}
            <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-3 rounded-2xl border border-frost/15 bg-white/3 px-5 py-4 transition-colors hover:border-frost/35"
              >
                <Mail
                  size={18}
                  strokeWidth={1.6}
                  aria-hidden
                  className="shrink-0 text-crystal-500"
                />
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-frost/40">
                    {sv.contact.emailLabel}
                  </div>
                  <div lang="en" className="text-sm font-medium text-frost">
                    {personalInfo.email}
                  </div>
                </div>
              </a>

              <p className="flex items-center rounded-2xl border border-frost/10 px-5 py-4 text-sm font-light leading-relaxed text-frost/55">
                {sv.contact.meetingNote}
              </p>
            </div>

            <p className="mb-7 text-sm font-light leading-relaxed text-frost/45">
              {sv.contact.orForm}
            </p>

            {/* The real form, with Swedish chrome. Same endpoint, same validation,
                same option values — only the visible strings differ. */}
            <div className="rounded-3xl border border-frost/10 bg-white/3 p-5 sm:p-8">
              <ServicesEnquiryForm copy={{ ...sv.form, messages: sv.errors }} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
