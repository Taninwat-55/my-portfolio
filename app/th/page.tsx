import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, MessageCircle, Mail } from "lucide-react";
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
import { thContent as th, thUnits } from "../data.th";

const BASE_URL = "https://taninwatkaewpankan.xyz";
const PAGE_URL = `${BASE_URL}/th`;

export const metadata: Metadata = {
  title: th.meta.title,
  description: th.meta.description,
  alternates: {
    canonical: PAGE_URL,
    // hreflang is only valid reciprocated, and it has to be complete: the
    // homepage and /sv both declare this page back.
    languages: {
      en: BASE_URL,
      th: PAGE_URL,
      sv: `${BASE_URL}/sv`,
      da: `${BASE_URL}/da`,
    },
  },
  openGraph: {
    title: th.meta.title,
    description: th.meta.description,
    url: PAGE_URL,
    type: "website",
    locale: "th_TH",
  },
};

/**
 * The Thai landing page.
 *
 * Not a translation of /services — a different page for a different reader, per
 * D6 in PLAN.md (standalone language pages, no i18n machinery). Roughly a quarter
 * of the English page's content, aimed at Thai-owned restaurants, massage shops,
 * nail salons and cleaning businesses in Denmark and Sweden.
 *
 * Two things make this niche worth a page of its own. A Danish or Swedish agency
 * structurally cannot sell into it — the language and trust barrier runs both ways
 * — and Racha, the one paying client, is a Thai-owned business, so the proof is
 * already inside the niche rather than adjacent to it.
 *
 * Built to be pasted into a Facebook group, because that is how this community
 * actually finds things: no on-site discovery path is assumed, and the page stands
 * alone without the homepage's context.
 *
 * lang="th" sits on the wrapper because App Router allows only one <html>, which
 * the root layout hard-codes to "en". A wrapper attribute is the correct fix
 * without adding routing machinery for one page.
 *
 * ⚠️ Every Thai string comes from app/data.th.ts and is a Claude draft awaiting
 * Ice's proofread. See the warning at the top of that file.
 */
export default function ThaiPage() {
  const racha = cases.find((c) => c.id === "racha");

  return (
    <div
      lang="th"
      className="min-h-screen bg-night-900 text-frost"
      style={{ overflowX: "clip" }}
    >
      <SkipLink />

      {/* Not the shared <Navbar />: its back-link copy is English and this page's
          only cross-link is the switch to the English site. */}
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
            <ArrowLeft size={15} aria-hidden /> {th.backToEnglish}
          </Link>
        </div>
      </nav>

      <main id="main-content" className="px-5 pt-28 pb-20 sm:px-6 sm:pt-32 md:px-10">
        <div className="mx-auto max-w-3xl">
          {/* ── Header ────────────────────────────────────────────────────── */}
          <header className="mb-14 md:mb-20">
            <FadeIn immediate y={20}>
              <div className="mb-4 text-xs uppercase tracking-[0.25em] text-crystal-500">
                {th.hero.eyebrow}
              </div>
            </FadeIn>

            <FadeIn immediate delay={0.08} y={40}>
              <h1
                className="hero-heading mb-6 font-black leading-tight tracking-tight"
                style={{ fontSize: "clamp(2.2rem, 7vw, 4.5rem)" }}
              >
                {th.hero.title}
              </h1>
            </FadeIn>

            <FadeIn immediate delay={0.16} y={20}>
              <p className="mb-6 text-lg leading-relaxed text-frost/70 md:text-xl">
                {th.hero.lead}
              </p>
            </FadeIn>

            <FadeIn immediate delay={0.24} y={20}>
              <p className="mb-6 max-w-2xl text-base font-light leading-loose text-frost/65">
                {th.hero.body}
              </p>
            </FadeIn>

            {/* The proposition, and the thing that keeps the scope honest: this
                page is a sales layer, not the language the sites get built in. */}
            <FadeIn immediate delay={0.32} y={20}>
              <p className="max-w-2xl rounded-2xl border border-crystal-500/25 bg-crystal-500/5 px-5 py-4 text-base font-light leading-loose text-frost/80">
                {th.hero.languageNote}
              </p>
            </FadeIn>
          </header>

          {/* ── Why me ────────────────────────────────────────────────────── */}
          <section aria-labelledby="th-why" className="mb-14 md:mb-20">
            <h2 id="th-why" className="mb-6 text-2xl font-medium text-frost md:text-3xl">
              {th.why.heading}
            </h2>
            <ul className="flex flex-col gap-3.5">
              {th.why.items.map((item, i) => (
                <FadeIn immediate key={item} delay={i * 0.08} y={20}>
                  <li className="flex items-start gap-3 text-base font-light leading-loose text-frost/70">
                    <Check
                      size={17}
                      strokeWidth={2}
                      aria-hidden
                      className="mt-1.5 shrink-0 text-crystal-500"
                    />
                    {item}
                  </li>
                </FadeIn>
              ))}
            </ul>
          </section>

          {/* ── Prices ────────────────────────────────────────────────────── */}
          <section aria-labelledby="th-pricing" className="mb-14 md:mb-20">
            <h2
              id="th-pricing"
              className="mb-4 text-2xl font-medium text-frost md:text-3xl"
            >
              {th.pricing.heading}
            </h2>
            <p className="mb-6 text-base font-light leading-loose text-frost/65">
              {th.pricing.lead}
            </p>

            {/* Read from services.offers, never retyped — numerals are language
                independent, so this cannot drift from /services. */}
            <FadeIn y={24}>
              <div className="flex flex-col divide-y divide-frost/10 border-y border-frost/10">
                {services.offers[0].priceLadder?.map((rung) => (
                  <div key={rung.scope} className="flex items-baseline justify-between gap-4 py-4">
                    <span className="text-base font-medium text-frost">
                      {thUnits(rung.scope)}
                    </span>
                    <span className="shrink-0 whitespace-nowrap text-base font-medium tabular-nums text-frost/85">
                      {rung.price}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <p className="mt-5 text-sm font-light leading-loose text-frost/45">
              {th.pricing.currencyNote}
            </p>

            <ul className="mt-7 flex flex-col gap-3 border-t border-frost/10 pt-6">
              {th.pricing.terms.map((term) => (
                <li
                  key={term}
                  className="flex items-start gap-2.5 text-sm font-light leading-loose text-frost/70"
                >
                  <Check
                    size={15}
                    strokeWidth={2}
                    aria-hidden
                    className="mt-1.5 shrink-0 text-crystal-500"
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
              thUnits() translates the unit words inside them, and
              fillAftercareRates() fills the placeholders in the terms, so no
              number is typed in this language anywhere. */}
          <section aria-labelledby="th-aftercare" className="mb-14 md:mb-20">
            <h2
              id="th-aftercare"
              className="mb-4 text-2xl font-medium text-frost md:text-3xl"
            >
              {th.aftercare.heading}
            </h2>
            <p className="mb-7 text-base font-light leading-relaxed text-frost/65">
              {th.aftercare.lead}
            </p>

            <div className="mb-5 grid gap-4 sm:grid-cols-2">
              {[
                { ...th.aftercare.free, price: null },
                {
                  ...th.aftercare.hourly,
                  price: thUnits(services.aftercare.hourly.price),
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
                  {th.aftercare.block.label}
                </p>
                <p className="text-lg font-medium text-frost">
                  {services.aftercare.block.price}
                  <span className="ml-2 text-sm font-light text-frost/50">
                    {thUnits(services.aftercare.block.unit)}
                  </span>
                </p>
              </div>
              <p className="mt-3 text-sm font-light leading-relaxed text-frost/65">
                {th.aftercare.block.body}
              </p>
              <ul className="mt-5 flex flex-col gap-2.5 border-t border-frost/10 pt-5">
                {th.aftercare.block.terms.map((term) => (
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
                    {fillAftercareRates(term)}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── Proof ─────────────────────────────────────────────────────── */}
          {racha && (
            <section aria-labelledby="th-proof" className="mb-14 md:mb-20">
              <h2
                id="th-proof"
                className="mb-6 text-2xl font-medium text-frost md:text-3xl"
              >
                {th.proof.heading}
              </h2>

              <FadeIn y={24}>
                <div className="grid grid-cols-2 gap-3">
                  {/* `fill` inside a ratio box, which is the pattern /services and
                      Projects.tsx already use for these exact files. The first
                      version declared width={800} height={600} — a 4:3 placeholder
                      against a 1600x1005 (1.59:1) image — so the two boxes could
                      never match heights and every load shifted layout. When one
                      image did not paint, the empty box that remained was that
                      wrong-shaped placeholder.

                      Real alt text, not alt="". These carry the argument of the
                      section, and an empty alt is also why the failure was silent:
                      nothing described what was missing. */}
                  {racha.images.slice(0, 2).map((src, i) => (
                    <div
                      key={src}
                      className="relative overflow-hidden rounded-2xl border border-frost/10"
                      // Racha's own capture size, because this box shows her site
                      // specifically. /projects uses a uniform card ratio instead.
                      style={{ aspectRatio: "1600 / 1005" }}
                    >
                      <Image
                        src={src}
                        alt={`${racha.title} — ${
                          i === 0 ? th.proof.altHome : th.proof.altTreatments
                        }`}
                        fill
                        sizes="(min-width: 768px) 360px, 45vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </FadeIn>

              <p className="mt-6 text-base font-light leading-loose text-frost/70">
                {th.proof.body}
              </p>

              {/* Metrics read from the case study so they cannot drift. */}
              <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {racha.metrics.map((metric) => (
                  <div key={metric.k} className="rounded-2xl border border-frost/10 bg-white/3 p-4">
                    <dt className="text-lg font-medium text-frost">{metric.v}</dt>
                    <dd className="mt-1 text-[11px] uppercase tracking-wider text-frost/40">
                      {metric.k}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* The English original is what Racha actually approved, so it is
                  shown as the quote. The Thai is labelled as a translation rather
                  than presented as her wording — see the note in data.th.ts. */}
              {services.testimonial && (
                <figure className="mt-8 border-l-2 border-crystal-500/40 pl-5">
                  <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-crystal-500">
                    {th.proof.quoteLabel}
                  </div>
                  <blockquote
                    lang="en"
                    className="font-display text-lg italic leading-relaxed text-frost/80"
                  >
                    &ldquo;{services.testimonial.text}&rdquo;
                  </blockquote>
                  <p className="mt-3 text-xs text-frost/35">
                    {th.proof.quoteTranslationLabel}
                  </p>
                  <p className="mt-1.5 text-base font-light leading-loose text-frost/60">
                    &ldquo;{th.proof.quoteTh}&rdquo;
                  </p>
                  <figcaption className="mt-3 text-xs uppercase tracking-wider text-frost/40">
                    {services.testimonial.author}
                  </figcaption>
                </figure>
              )}
            </section>
          )}

          {/* ── Process ───────────────────────────────────────────────────── */}
          <section aria-labelledby="th-process" className="mb-14 md:mb-20">
            <h2
              id="th-process"
              className="mb-6 text-2xl font-medium text-frost md:text-3xl"
            >
              {th.process.heading}
            </h2>
            <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {th.process.steps.map((step, i) => (
                <FadeIn key={step.title} delay={i * 0.08} y={24}>
                  <li className="flex h-full flex-col rounded-2xl border border-frost/10 bg-white/3 p-5">
                    <div className="mb-3 flex items-baseline justify-between gap-3">
                      <span className="text-xs uppercase tracking-[0.25em] text-crystal-500">
                        {servicesProcess[i]?.n}
                      </span>
                      {/* Duration read from servicesProcess — a number, not copy. */}
                      <span className="text-[11px] tracking-wider text-frost/30">
                        {thUnits(servicesProcess[i]?.duration ?? "")}
                      </span>
                    </div>
                    <h3 className="mb-2 text-lg font-medium text-frost">{step.title}</h3>
                    <p className="mt-auto text-sm font-light leading-loose text-frost/60">
                      {step.youGet}
                    </p>
                  </li>
                </FadeIn>
              ))}
            </ol>
          </section>

          {/* ── Contact ───────────────────────────────────────────────────── */}
          <section aria-labelledby="th-contact" id="th-enquiry">
            <h2
              id="th-contact"
              className="mb-4 text-2xl font-medium text-frost md:text-3xl"
            >
              {th.contact.heading}
            </h2>
            <p className="mb-6 text-base font-light leading-loose text-frost/65">
              {th.contact.body}
            </p>

            {/* LINE first: it is how this community actually talks, and a chat
                message is a far smaller ask than a form with a budget dropdown. */}
            <div className="mb-7 flex flex-col gap-3 sm:flex-row">
              <div className="flex items-center gap-3 rounded-2xl border border-frost/15 bg-white/3 px-5 py-4">
                <MessageCircle size={18} strokeWidth={1.6} aria-hidden className="text-crystal-500" />
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-frost/40">
                    {th.contact.lineLabel}
                  </div>
                  <div lang="en" className="text-base font-medium text-frost">
                    {th.contact.lineId}
                  </div>
                </div>
              </div>

              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-3 rounded-2xl border border-frost/15 bg-white/3 px-5 py-4 transition-colors hover:border-frost/35"
              >
                <Mail size={18} strokeWidth={1.6} aria-hidden className="text-crystal-500" />
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-frost/40">
                    {th.contact.emailLabel}
                  </div>
                  <div lang="en" className="text-sm font-medium text-frost">
                    {personalInfo.email}
                  </div>
                </div>
              </a>
            </div>

            <p className="mb-7 text-sm font-light leading-loose text-frost/45">
              {th.contact.orForm}
            </p>

            {/* The real form, with Thai chrome. Same endpoint, same validation,
                same option values — only the visible strings differ. */}
            <div className="rounded-3xl border border-frost/10 bg-white/3 p-5 sm:p-8">
              <ServicesEnquiryForm copy={{ ...th.form, messages: th.errors }} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
