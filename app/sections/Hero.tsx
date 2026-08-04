"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "../components/FadeIn";
import { personalInfo, siteContent } from "../data";

/**
 * Single-composition hero: the name scrolls across the frame, the cut-out
 * portrait sits on top of it, and every other detail is pushed to a corner.
 *
 * The layering is the whole point — because the portrait has a transparent
 * background, letters travel into the body and emerge on the other side rather
 * than passing in front. That only works with a strict z-order:
 *
 *   halo (z-auto) → name marquee (z-10) → portrait (z-20) → chrome (z-30)
 *
 * The middle of the frame is deliberately left empty. The "Say hi" CTA lives in
 * the fixed <PillNav />, which floats over this section and stays reachable.
 */
export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden">
      {/* The marquee below is decorative and prints the name twice, so it is
          hidden from assistive tech and the real heading lives here. */}
      <h1 className="sr-only">
        {personalInfo.name} — {siteContent.roleLabel}
      </h1>

      {/* Halo behind the subject — centred now that the portrait is centred, so
          it reads as a rim light rather than a stray glow in the corner. */}
      <div
        aria-hidden
        className="absolute left-1/2 bottom-[-10%] w-130 h-130 -translate-x-1/2 rounded-full pointer-events-none md:w-180 md:h-180"
        style={{
          background:
            "radial-gradient(circle, rgba(142, 201, 232, 0.16) 0%, rgba(142, 201, 232, 0.05) 45%, transparent 70%)",
        }}
      />

      {/* Name marquee (z-10). Vertical position is tuned per breakpoint so the
          band crosses the chest rather than the face — the portrait's head sits
          higher as the image grows, so the band moves up with it. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-[58vh] z-10 overflow-hidden sm:top-[52vh] md:top-[50vh]"
      >
        <FadeIn delay={0.5} y={0}>
          <div className="hero-marquee flex w-max whitespace-nowrap font-black uppercase leading-[0.78] tracking-tight text-frost/90 text-[14vh] sm:text-[18vh] md:text-[20vh]">
            <span className="pr-[6vw]">Taninwat — Kaewpankan&nbsp;</span>
            <span className="pr-[6vw]">Taninwat — Kaewpankan&nbsp;</span>
          </div>
        </FadeIn>
      </div>

      {/* Portrait (z-20) — centred and bottom-anchored, sized by height so the
          3:4 cutout always fits the viewport vertically instead of being cropped
          by a full-bleed object-cover. pointer-events-none keeps the decorative
          layer from swallowing clicks.

          This used to tilt toward the cursor on two axes. Removed: a pointermove
          listener driving two springs on a large drop-shadowed image repainted
          the filter on every mouse move, and on a straight-on formal headshot the
          effect read closer to a wobble than a gaze. */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 z-20 -translate-x-1/2">
        <FadeIn delay={0.3} y={30}>
          <Image
            src="/assets/Ice-Portrait.webp"
            alt="Portrait of Taninwat “Ice” Kaewpankan"
            width={1792}
            height={2384}
            priority
            sizes="(min-width: 1024px) 45vw, (min-width: 768px) 60vw, 80vw"
            className="h-[70vh] w-auto max-w-none select-none drop-shadow-[0_18px_40px_rgba(0,0,0,0.55)] sm:h-[80vh] md:h-[88vh]"
            draggable={false}
          />
        </FadeIn>
      </div>

      {/* Rule above the corner blocks, drawn from the left after everything else
          has landed. z-10 keeps it in the same plane as the marquee so it passes
          BEHIND the portrait rather than cutting across the blazer. */}
      <motion.div
        aria-hidden
        initial={{ scaleX: reduceMotion ? 1 : 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          delay: reduceMotion ? 0 : 1.2,
          duration: reduceMotion ? 0 : 1.1,
          ease: [0.76, 0, 0.24, 1],
        }}
        style={{ originX: 0 }}
        className="absolute inset-x-6 bottom-24 z-10 h-0.5 bg-frost/70 sm:inset-x-10 sm:bottom-28"
      />

      {/* Corner blocks (z-30) — who / what on the left, where / availability on
          the right. These carry the whole first screen now that the middle is
          left empty. */}
      <div className="absolute inset-x-0 bottom-0 z-30 flex items-end justify-between gap-6 px-6 pb-5 text-xs leading-relaxed sm:px-10 sm:pb-8 sm:text-sm">
        <FadeIn delay={1.4} y={20}>
          <div className="text-frost/80">
            {siteContent.heroCorners.left.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={1.55} y={20}>
          {/* Right padding steps around the fixed chat bubble (48px at 24px from
              each edge), which otherwise sits on top of these two lines. */}
          <div className="text-right text-frost/80 pr-14 sm:pr-10">
            <div className="flex items-center justify-end gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-clay-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-clay-500" />
              </span>
              {siteContent.heroCorners.right.status}
            </div>
            <div>{siteContent.heroCorners.right.place}</div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
