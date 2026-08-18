import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { FadeIn } from "../components/FadeIn";
import { SectionHeading } from "../components/SectionHeading";
import { siteContent, services, servicesProcess } from "../data";

/**
 * What happens after you pay, and the button to start.
 *
 * Two gaps this closes. A visitor who read the whole page had nowhere to act —
 * the hero button and the nav pill are both at the top, so reaching the bottom
 * meant scrolling back up. And nothing on the homepage answered "what happens
 * after I hand over money", which is the single biggest thing that stops a small
 * business hiring a freelancer. The answer already existed in servicesProcess; it
 * was just locked on /services.
 *
 * Compressed against the /services version by dropping step.body. The `youGet`
 * lines carry the whole story on their own — a straight yes or no on the call, a
 * written scope, a preview link, everything in your name — and the prose around
 * them is what /services is for.
 *
 * The terms strip is deliberately NOT a price restatement. The three prices are
 * already in WhatIDo a screen above; what was missing is what surrounds them.
 *
 * Follows the homepage's rounded-slab recipe (dark, rounded top, pulled up over
 * the section above, z-10). Every section after WhatIDo's white panel does this,
 * and one that skips it breaks the stack.
 */
export function HowItWorks() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative z-10 bg-night-900 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-20"
    >
      <SectionHeading
        id="process-heading"
        eyebrow="How It Works"
        title="Four Steps"
        className="mb-14 sm:mb-16 md:mb-20"
      />

      <div className="mx-auto max-w-5xl">
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {servicesProcess.map((step, i) => (
            <FadeIn key={step.n} delay={i * 0.1} y={30}>
              <li className="flex h-full flex-col rounded-2xl border border-frost/10 bg-white/3 p-6">
                <div className="mb-4 flex items-baseline justify-between gap-3">
                  <span className="text-crystal-500 text-xs uppercase tracking-[0.25em]">
                    {step.n}
                  </span>
                  <span className="text-frost/30 text-[11px] uppercase tracking-wider">
                    {step.duration}
                  </span>
                </div>

                <h3 className="mb-3 text-frost font-medium text-lg">{step.title}</h3>

                {/* step.body is deliberately not rendered here — see the docblock.
                    This is the line that does the reassuring work. */}
                <p className="mt-auto text-frost/60 font-light text-sm leading-relaxed">
                  <span className="text-frost/40">You get: </span>
                  {step.youGet}
                </p>
              </li>
            </FadeIn>
          ))}
        </ol>

        {/* The terms. Not the prices — those are a screen above in WhatIDo. */}
        <FadeIn delay={0.4} y={24}>
          <ul className="mt-10 flex flex-col gap-3 border-t border-frost/10 pt-8 sm:mt-12 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
            {services.termsShort.map((term) => (
              <li
                key={term}
                className="flex items-start gap-2.5 text-frost/70 font-light text-sm leading-relaxed sm:text-[15px]"
              >
                <Check
                  size={15}
                  strokeWidth={2}
                  aria-hidden
                  className="mt-0.5 shrink-0 text-crystal-500"
                />
                {term}
              </li>
            ))}
          </ul>
        </FadeIn>

        {/* The page's closing action. Repeats the hero's label on purpose: same
            action, same words, and far enough apart that consistency reads as
            confidence rather than as a duplicate. */}
        <FadeIn delay={0.5} y={24}>
          <div className="mt-10 flex flex-col items-start gap-4 sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-lg text-frost/55 font-light leading-relaxed text-sm sm:text-[15px]">
              {services.cta.body}
            </p>
            <Link
              href={siteContent.primaryCta.href}
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-frost px-6 py-3 text-sm font-medium whitespace-nowrap text-night-900 transition-colors hover:bg-crystal-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-crystal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-night-900"
            >
              {siteContent.primaryCta.label}
              <ArrowUpRight
                size={15}
                strokeWidth={2}
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-px group-hover:-translate-y-px"
              />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
