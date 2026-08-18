"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "../components/FadeIn";
import { SectionHeading } from "../components/SectionHeading";
import { siteContent, services } from "../data";

/**
 * The homepage's offer list.
 *
 * This used to render siteContent.whatIDo — five capabilities written for a
 * hiring manager, in their language: "where I would want to be judged", "the
 * backend is the newer half of my toolkit". Exactly right for a recruiter, and
 * exactly wrong for someone deciding whether to spend money, who wants to know
 * what they can buy and roughly what it costs.
 *
 * So it now renders siteContent.homeOffers instead. whatIDo has not gone
 * anywhere: it is still the chatbot's capability grounding, and it is the content
 * /cv will need.
 *
 * Prices are resolved out of services.offers rather than restated here, so this
 * section cannot end up quoting a figure that /services has since changed. If an
 * offerId ever stops matching, the price and link are dropped rather than
 * rendered wrong — an offer with no price beats an offer with a stale one.
 */
export function WhatIDo() {
  return (
    <section
      // Renamed from "work": the section is three purchasable offers, and an
      // anchor called #work on something whose eyebrow says "Services" misleads
      // anyone deep-linking or reading the markup. Nothing linked to #work except
      // the nav item that was removed with it.
      id="offers"
      className="relative bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <SectionHeading
        eyebrow="Services"
        title="What I Build"
        tone="dark"
        titleClassName="text-night-900"
        className="mb-16 sm:mb-20 md:mb-28"
      />

      <div className="max-w-5xl mx-auto">
        {siteContent.homeOffers.map((item, i) => {
          const offer = services.offers.find((o) => o.id === item.offerId);

          return (
            <FadeIn key={item.offerId} delay={i * 0.1} y={30}>
              <div
                className="group flex flex-col sm:flex-row gap-4 sm:gap-10 md:gap-14 py-8 sm:py-10 md:py-12"
                style={{
                  borderTop: i === 0 ? "none" : "1px solid rgba(12, 12, 12, 0.15)",
                }}
              >
                <span
                  className="font-black leading-none shrink-0 text-transparent transition-colors duration-300 group-hover:text-crystal-600 [-webkit-text-stroke:2px_#0C0C0C]"
                  style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-3 sm:pt-3">
                  <h3
                    className="text-night-900 font-medium uppercase"
                    style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-night-900 font-light leading-relaxed max-w-2xl opacity-60"
                    style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}
                  >
                    {item.body}
                  </p>

                  {offer && (
                    <div className="mt-2 flex flex-wrap items-baseline gap-x-6 gap-y-2">
                      {/* Price stays in the body colour rather than an accent —
                          a coloured figure reads as a sale banner, not a rate. */}
                      <span
                        className="text-night-900 font-medium tabular-nums"
                        style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.2rem)" }}
                      >
                        {offer.priceRange}
                      </span>
                      <Link
                        href={`/services#${offer.id}`}
                        className="group/link inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-night-900/55 transition-colors hover:text-night-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-crystal-600 focus-visible:ring-offset-2"
                      >
                        See what&apos;s included
                        <ArrowRight
                          size={14}
                          strokeWidth={1.5}
                          aria-hidden
                          className="transition-transform duration-200 group-hover/link:translate-x-0.5"
                        />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
