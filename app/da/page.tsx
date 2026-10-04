import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Mail, Languages, PenLine } from "lucide-react";
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
import { daContent as da, daUnits } from "../data.da";

const BASE_URL = "https://taninwatkaewpankan.xyz";
const PAGE_URL = `${BASE_URL}/da`;

/**
 * THE PUBLISH SWITCH. One flag, three behaviours.
 *
 * While true: the page is excluded from search, carries a visible draft banner,
 * and declares no hreflang. Reachable only by typing the URL, which is exactly
 * what a proofreader needs and nothing more.
 *
 * TO PUBLISH — after item 28 passes, and not before:
 *   1. Set this to false.
 *   2. Add `{ path: '/da', ... }` to app/sitemap.ts.
 *   3. Add `{ code: "da", label: "Dansk", href: "/da", offer: "Se siden på dansk" }`
 *      to SITE_LANGUAGES in app/data.ts — that alone gives it the nav chip and the
 *      browser-language banner.
 *   4. Add `da` to the `languages` map here and in app/page.tsx, app/th/page.tsx
 *      and app/sv/page.tsx. hreflang is ignored unless every variant names every
 *      other one.
 *   5. Nothing — the share card is already done. It is listed anyway, because its
 *      absence from this list is exactly why it was missed: the card is the one
 *      published-state asset that lives in a different file, so a checklist that
 *      only covered this file could be followed completely and still ship /da with
 *      an English "Hi, i'm Ice" card. See app/da/opengraph-image.tsx (item 43).
 *      If you add another page-level asset, add it here in the same commit.
 *
 * ✅ PUBLISHED 2026-08-22, once item 28 passed. The nav-island warning that used to
 * sit here was real and was acted on: the fourth chip took the row from 556px to
 * 619px, which measured 86% of the viewport at the old 720px breakpoint, so the
 * breakpoint moved to 800. The measurements and what that cost are in PLAN.md's
 * log for 2026-08-22; SiteNav.tsx itself went with the old homepage.
 */
const DRAFT = false;

export const metadata: Metadata = {
  title: da.meta.title,
  description: da.meta.description,
  alternates: {
    canonical: PAGE_URL,
    // Published 2026-08-22, once item 28 passed. hreflang is only valid
    // reciprocated and it has to be complete: every variant lists every other
    // one, so the homepage, /th and /sv all name this page back.
    languages: {
      en: BASE_URL,
      th: `${BASE_URL}/th`,
      sv: `${BASE_URL}/sv`,
      da: PAGE_URL,
    },
  },
  robots: DRAFT ? { index: false, follow: false } : undefined,
  openGraph: {
    title: da.meta.title,
    description: da.meta.description,
    url: PAGE_URL,
    type: "website",
    locale: "da_DK",
  },
};

/**
 * The Danish landing page. UNLISTED AND UNPROOFREAD — see DRAFT above.
 *
 * Not a translation of /services — a different page for a different reader, per
 * D6 in PLAN.md (standalone language pages, no i18n machinery). Aimed at small
 * Danish businesses.
 *
 * BUILT BEFORE THE PROOFREAD, ON PURPOSE. The original plan had item 28 (find a
 * Danish native) blocking item 27 (build the page), which Ice spotted was
 * impossible: you cannot proofread copy that does not exist. Asking a Dane to
 * read forty sentences is also a far smaller favour than asking them to write a
 * page, so the draft comes first and stays invisible until it passes.
 *
 * THE HARD PART IS NOT THE COPY, IT IS THE LANGUAGE HONESTY. Ice speaks Danish at
 * beginner level, and this page's whole argument is that he does careful work.
 * So the meeting-language line is in the hero rather than in an FAQ (item 29), the
 * contact section offers written-first contact and never implies a Danish phone
 * call, and the one Danish-site claim in `why` is deliberately the narrowest true
 * version: one site, one client, still running.
 *
 * lang="da" sits on the wrapper because App Router allows only one <html>, which
 * the root layout hard-codes to "en".
 */
export default function DanishPage() {
  const racha = cases.find((c) => c.id === "racha");

  return (
    <div
      lang="da"
      className="min-h-screen bg-night-900 text-frost"
      style={{ overflowX: "clip" }}
    >
      <SkipLink />

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
            <ArrowLeft size={15} aria-hidden /> {da.backToEnglish}
          </Link>
        </div>
      </nav>

      <main id="main-content" className="px-5 pt-28 pb-20 sm:px-6 sm:pt-32 md:px-10">
        <div className="mx-auto max-w-3xl">
          {/* The draft banner. Deliberately unmissable and deliberately in
              English: its audience is Ice and whoever he sends the link to, not
              a Danish customer. It also means the page can never be shared as
              finished by accident — the only way to lose it is to flip DRAFT,
              which is the same act as publishing. */}
          {DRAFT && (
            <div
              lang="en"
              className="mb-10 rounded-2xl border border-amber-400/30 bg-amber-400/5 px-5 py-4"
            >
              <div className="mb-1.5 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-amber-300/80">
                <PenLine size={13} strokeWidth={2} aria-hidden />
                Draft — not published
              </div>
              <p className="text-sm font-light leading-relaxed text-frost/60">
                The Danish on this page was drafted by an AI and has not been read
                by a native speaker. It is excluded from Google and linked from
                nowhere on the site. If you are reading it as a favour: corrections
                of any size are welcome, including ones that feel pedantic.
              </p>
            </div>
          )}

          {/* ── Header ────────────────────────────────────────────────────── */}
          <header className="mb-14 md:mb-20">
            <FadeIn immediate y={20}>
              <div className="mb-4 text-xs uppercase tracking-[0.25em] text-crystal-500">
                {da.hero.eyebrow}
              </div>
            </FadeIn>

            <FadeIn immediate delay={0.08} y={40}>
              <h1
                className="hero-heading mb-6 font-black leading-tight tracking-tight"
                style={{ fontSize: "clamp(2.2rem, 7vw, 4.5rem)" }}
              >
                {da.hero.title}
              </h1>
            </FadeIn>

            <FadeIn immediate delay={0.16} y={20}>
              <p className="mb-6 text-lg leading-relaxed text-frost/70 md:text-xl">
                {da.hero.lead}
              </p>
            </FadeIn>

            <FadeIn immediate delay={0.24} y={20}>
              <p className="mb-6 max-w-2xl text-base font-light leading-relaxed text-frost/65">
                {da.hero.body}
              </p>
            </FadeIn>

            {/* Item 29. The line was buried in servicesFaq; on a Danish page it is
                the sentence that decides whether the rest is worth reading, so it
                sits in the hero and is styled to be read rather than skimmed. */}
            <FadeIn immediate delay={0.32} y={20}>
              <p className="flex max-w-2xl items-start gap-3 rounded-2xl border border-crystal-500/25 bg-crystal-500/5 px-5 py-4 text-base font-light leading-relaxed text-frost/80">
                <Languages
                  size={19}
                  strokeWidth={1.6}
                  aria-hidden
                  className="mt-1 shrink-0 text-crystal-500"
                />
                {da.hero.languageNote}
              </p>
            </FadeIn>
          </header>

          {/* ── Why me ────────────────────────────────────────────────────── */}
          <section aria-labelledby="da-why" className="mb-14 md:mb-20">
            <h2 id="da-why" className="mb-6 text-2xl font-medium text-frost md:text-3xl">
              {da.why.heading}
            </h2>
            <ul className="flex flex-col gap-3.5">
              {da.why.items.map((item, i) => (
                <FadeIn immediate key={item} delay={i * 0.08} y={20}>
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
          <section aria-labelledby="da-pricing" className="mb-14 md:mb-20">
            <h2
              id="da-pricing"
              className="mb-4 text-2xl font-medium text-frost md:text-3xl"
            >
              {da.pricing.heading}
            </h2>
            <p className="mb-6 text-base font-light leading-relaxed text-frost/65">
              {da.pricing.lead}
            </p>

            {/* Read from services.offers, never retyped. No price transform here,
                unlike /sv: data.ts already writes these the Danish way. */}
            <FadeIn y={24}>
              <div className="flex flex-col divide-y divide-frost/10 border-y border-frost/10">
                {services.offers[0].priceLadder?.map((rung) => (
                  <div
                    key={rung.scope}
                    className="flex items-baseline justify-between gap-4 py-4"
                  >
                    <span className="text-base font-medium text-frost">
                      {daUnits(rung.scope)}
                    </span>
                    <span className="shrink-0 whitespace-nowrap text-base font-medium tabular-nums text-frost/85">
                      {rung.price}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <ul className="mt-7 flex flex-col gap-3 border-t border-frost/10 pt-6">
              {da.pricing.terms.map((term) => (
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
              ITEM 44. Directly after Priser, because that is where the question
              arrives: hero.lead promises "ingen månedlige gebyrer, du ikke har
              bedt om", which raises the retainer question in the third sentence
              and, until this section existed, never answered it.

              Every figure comes from `services.aftercare` and `aftercareRates`.
              daUnits() translates the unit words inside them — "650 DKK / hour"
              becomes "650 DKK / time" — and fillAftercareRates() fills the
              {'{effective}'} / {'{hourly}'} placeholders in the terms. No number
              is typed in Danish anywhere. */}
          <section aria-labelledby="da-aftercare" className="mb-14 md:mb-20">
            <h2
              id="da-aftercare"
              className="mb-4 text-2xl font-medium text-frost md:text-3xl"
            >
              {da.aftercare.heading}
            </h2>
            <p className="mb-7 text-base font-light leading-relaxed text-frost/65">
              {da.aftercare.lead}
            </p>

            <div className="mb-5 grid gap-4 sm:grid-cols-2">
              {[
                { ...da.aftercare.free, price: null },
                {
                  ...da.aftercare.hourly,
                  price: daUnits(services.aftercare.hourly.price),
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
                  {da.aftercare.block.label}
                </p>
                <p className="text-lg font-medium text-frost">
                  {services.aftercare.block.price}
                  <span className="ml-2 text-sm font-light text-frost/50">
                    {daUnits(services.aftercare.block.unit)}
                  </span>
                </p>
              </div>
              <p className="mt-3 text-sm font-light leading-relaxed text-frost/65">
                {da.aftercare.block.body}
              </p>
              <ul className="mt-5 flex flex-col gap-2.5 border-t border-frost/10 pt-5">
                {da.aftercare.block.terms.map((term) => (
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
            <section aria-labelledby="da-proof" className="mb-14 md:mb-20">
              <h2
                id="da-proof"
                className="mb-6 text-2xl font-medium text-frost md:text-3xl"
              >
                {da.proof.heading}
              </h2>

              <FadeIn y={24}>
                <div className="grid grid-cols-2 gap-3">
                  {racha.images.slice(0, 2).map((src, i) => (
                    <div
                      key={src}
                      className="relative overflow-hidden rounded-2xl border border-frost/10"
                      style={{ aspectRatio: "1600 / 1005" }}
                    >
                      <Image
                        src={src}
                        alt={`${racha.title} — ${
                          i === 0 ? da.proof.altHome : da.proof.altTreatments
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
                {da.proof.body}
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

              {/* The English original is what Racha actually approved. The Danish
                  is labelled as a translation rather than presented as her
                  wording — she is a Danish business, so her own Danish sentence
                  would be worth more than this and should replace it if it ever
                  arrives. */}
              {services.testimonial && (
                <figure className="mt-8 border-l-2 border-crystal-500/40 pl-5">
                  <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-crystal-500">
                    {da.proof.quoteLabel}
                  </div>
                  <blockquote
                    lang="en"
                    className="font-display text-lg italic leading-relaxed text-frost/80"
                  >
                    &ldquo;{services.testimonial.text}&rdquo;
                  </blockquote>
                  <p className="mt-3 text-xs text-frost/35">
                    {da.proof.quoteTranslationLabel}
                  </p>
                  <p className="mt-1.5 text-base font-light leading-relaxed text-frost/60">
                    &ldquo;{da.proof.quoteDa}&rdquo;
                  </p>
                  <figcaption className="mt-3 text-xs uppercase tracking-wider text-frost/40">
                    {services.testimonial.author}
                  </figcaption>
                </figure>
              )}
            </section>
          )}

          {/* ── Process ───────────────────────────────────────────────────── */}
          <section aria-labelledby="da-process" className="mb-14 md:mb-20">
            <h2
              id="da-process"
              className="mb-6 text-2xl font-medium text-frost md:text-3xl"
            >
              {da.process.heading}
            </h2>
            <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {da.process.steps.map((step, i) => (
                <FadeIn key={step.title} delay={i * 0.08} y={24}>
                  <li className="flex h-full flex-col rounded-2xl border border-frost/10 bg-white/3 p-5">
                    <div className="mb-3 flex items-baseline justify-between gap-3">
                      <span className="text-xs uppercase tracking-[0.25em] text-crystal-500">
                        {servicesProcess[i]?.n}
                      </span>
                      {/* Duration read from servicesProcess — a number, not copy. */}
                      <span className="text-[11px] tracking-wider text-frost/30">
                        {daUnits(servicesProcess[i]?.duration ?? "")}
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
          <section aria-labelledby="da-contact" id="da-enquiry">
            <h2
              id="da-contact"
              className="mb-4 text-2xl font-medium text-frost md:text-3xl"
            >
              {da.contact.heading}
            </h2>
            <p className="mb-6 text-base font-light leading-relaxed text-frost/65">
              {da.contact.body}
            </p>

            {/* Written-first, and no phone number — item 29's second half. A
                contact flow that implies a Danish phone call sets up exactly the
                discovery the hero note exists to prevent. */}
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
                    {da.contact.emailLabel}
                  </div>
                  <div lang="en" className="text-sm font-medium text-frost">
                    {personalInfo.email}
                  </div>
                </div>
              </a>

              <p className="flex items-center rounded-2xl border border-frost/10 px-5 py-4 text-sm font-light leading-relaxed text-frost/55">
                {da.contact.writtenFirst}
              </p>
            </div>

            <p className="mb-7 text-sm font-light leading-relaxed text-frost/45">
              {da.contact.orForm}
            </p>

            {/* The real form, with Danish chrome. Same endpoint, same validation,
                same option values — only the visible strings differ. */}
            <div className="rounded-3xl border border-frost/10 bg-white/3 p-5 sm:p-8">
              <ServicesEnquiryForm copy={{ ...da.form, messages: da.errors }} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
