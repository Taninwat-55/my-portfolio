import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "../components/FadeIn";
import { siteContent } from "../data";

/**
 * The one place the recruiter page acknowledges freelance.
 *
 * Deliberately quiet — no SectionHeading, no oversized title. Stated as
 * evidence of range rather than as a second job hunt running in parallel; the
 * actual selling happens on /services, in front of a different reader.
 *
 * Sits between CV and Garden: it arrives the moment the work-and-track-record
 * arc finishes, and before the shift into writing. Follows the homepage's
 * rounded-slab recipe, because every section here is pulled up over the one
 * above it and a band that skips it breaks the stack.
 */
export function ClientWork() {
  return (
    <section
      aria-label="Freelance and client work"
      className="relative z-10 bg-night-900 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 px-5 sm:px-8 md:px-10 pt-16 sm:pt-20 pb-16"
    >
      <FadeIn y={20}>
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-5 rounded-3xl border border-frost/10 bg-white/3 px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-9 sm:py-8">
          <div>
            <div className="mb-2 text-[10px] uppercase tracking-[0.3em] text-crystal-500">
              {siteContent.freelanceBand.eyebrow}
            </div>
            <p className="max-w-xl text-[15px] font-light leading-relaxed text-frost/70 sm:text-base">
              {siteContent.freelanceBand.line}
            </p>
          </div>

          <Link
            href="/services"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-frost/30 px-6 py-2.5 text-sm font-medium uppercase tracking-widest text-frost/70 transition-colors hover:border-frost/60 hover:text-frost focus:outline-none focus-visible:ring-2 focus-visible:ring-crystal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-night-900"
          >
            {siteContent.freelanceBand.cta}
            <ArrowRight
              size={15}
              strokeWidth={1.5}
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}
