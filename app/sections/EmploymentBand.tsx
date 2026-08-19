import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "../components/FadeIn";
import { siteContent } from "../data";

/**
 * The one place the client-facing homepage acknowledges employment.
 *
 * The exact mirror of what used to be here. While the homepage was written for
 * recruiters, this band pointed the other way — "I also take on client projects"
 * → /services. Now that / is written for clients, it points at /cv instead.
 *
 * Deliberately quiet, and for the same reason as before: no SectionHeading, no
 * oversized title. A client should not come away wondering whether the person
 * they are about to hire is halfway out the door, so this is stated as a fact
 * about availability rather than as a second search running in parallel.
 *
 * Sits between Projects and Garden, after the work-and-proof arc and before the
 * shift into writing. Follows the homepage's rounded-slab recipe, because every
 * section here is pulled up over the one above it and a band that skips it
 * breaks the stack.
 */
export function EmploymentBand() {
  return (
    <section
      aria-label="Employment and full-time roles"
      className="relative z-10 bg-night-900 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 px-5 sm:px-8 md:px-10 pt-16 sm:pt-20 pb-16"
    >
      <FadeIn y={20}>
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-5 rounded-3xl border border-frost/10 bg-white/3 px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-9 sm:py-8">
          <div>
            <div className="mb-2 text-[10px] uppercase tracking-[0.3em] text-crystal-500">
              {siteContent.employmentBand.eyebrow}
            </div>
            <p className="max-w-xl text-[15px] font-light leading-relaxed text-frost/70 sm:text-base">
              {siteContent.employmentBand.line}
            </p>
          </div>

          <Link
            href="/cv"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-frost/30 px-6 py-2.5 text-sm font-medium uppercase tracking-widest text-frost/70 transition-colors hover:border-frost/60 hover:text-frost focus:outline-none focus-visible:ring-2 focus-visible:ring-crystal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-night-900"
          >
            {siteContent.employmentBand.cta}
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
