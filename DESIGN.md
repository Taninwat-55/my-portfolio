---
name: Crystallize
description: The portfolio of Taninwat "Ice" Kaewpankan, where everything starts as signal and comes into focus. Restrained, type-led, one material.
colors:
  paper: "#f3f4f2"
  ink: "#0f1012"
  signal-on-paper: "#0b6e99"
  signal-on-ink: "#7dd3f5"
  muted-on-paper: "#5c6166"
  muted-on-ink: "#8a8f94"
  line-on-paper: "#c9ccc8"
  line-on-ink: "#2a2d31"
typography:
  display:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(56px, 11vw, 168px)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.025em"
  lead:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(22px, 2.4vw, 32px)"
    fontWeight: 400
    lineHeight: 1.2
  headline:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(24px, 2.4vw, 36px)"
    fontWeight: 400
    lineHeight: 1.1
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.08em"
spacing:
  unit: "8px"
  margin-phone: "16px"
  margin-desktop: "48px"
  gutter-phone: "16px"
  gutter-desktop: "24px"
rounded:
  none: "0"
---

# Design System: Crystallize

## Overview

**The one feeling: it comes into focus.** Everything starts as signal (glyphs, code, mono type) and crystallizes into the finished thing. Calm wonder, not spectacle. Every motion decision is tested against that sentence; an effect that doesn't resolve into something gets cut.

The world is one material used three ways: the drawn grid hairlines lie flat behind the hero, bend into a tunnel at the door, and frame the work in the hall. Text is HTML and never waits for an effect. WebGL, GSAP and Lenis are decoration on a page that is already complete.

Sources of truth: `app/world/tokens/crystallize.css` (tokens), `app/world/fonts.ts` (faces), `app/world/*.module.css` (shell, inner pages, form, cards), `app/world/effects/crystallize/` (the signature moments).

## Colors

One pair, one accent, one hairline. Components read only `--bg`, `--fg`, `--signal`, `--muted` and `--line`; setting `data-tone="paper"` or `data-tone="ink"` on any element flips them.

- **Paper / ink.** Light outside, dark inside the door: the homepage turns ink at the hall. The dark-mode toggle sets the whole page to ink. 17.3:1.
- **Signal.** The only accent: links on hover, focus rings, the status dot, the glyphs themselves. AA on both tones (5.1:1 on paper, 11.3:1 on ink).
- **Muted.** Labels and secondary text, 5.7:1 / 5.8:1.
- **Line.** Decoration only (the grid, rules, borders), never the only carrier of meaning.

## Typography

Two voices and one small.

- **Instrument Serif** (display): names, titles, leads, big figures. The roles in the hero are sized in container units to fill exactly six columns.
- **Geist** (text): everything read at length.
- **Geist Mono** (signal): labels, kickers, the nav, prices in receipt rows, the loader log, and the glyph field. The crystallize motion is literally mono turning into display.

Labels are 11 to 12px mono, uppercase, tracked 0.08em, in muted. Reading text is 16 to 18px Geist at 1.6, in one column of at most 64ch.

## Layout

12 columns on desktop, 4 on phones, 8px unit. Margins 48px / 16px, gutters 24px / 16px. The column lines are drawn (`GridLines`) behind page heads.

Inner pages share one shape (`page.module.css`): nav, kicker, display title, lead, facts on the right; then sections with the mono label in columns 1 to 3 and the content from column 4, the way the case pages read. Each page ends with a large serif door to the next place.

The nav is plain links in the page, never sticky: Home · Work · About · Contact, then LinkedIn, GitHub and the dark-mode toggle.

## Motion

1. Motion means something: signal becomes form.
2. Two easings: expo-out for reveals, linear for scroll-scrubbed.
3. Three durations: 200ms (UI), 600ms (reveals), 1200ms (signature).
4. Scroll drives the big moments.
5. Text being read never moves. The hero scramble only plays if the page is ready within 0.8s; later, the heading is already being read.
6. Reduced motion, data saver, low memory or no WebGL2 give the quiet world: the same page, no scramble, no loader, no WebGL, crossfades only.
7. Effects pause offscreen and when the tab is hidden.

## Components

- **Buttons.** Square, 1px ink border, at least 44 to 48px tall. Primary is filled ink; quiet is outlined. Both turn signal on hover.
- **Facts.** A definition list, each item a mono label over a value, separated by hairlines.
- **Receipt rows.** Label, dotted leader, mono figure; detail underneath. Every price on the site.
- **Folds.** Native `<details>` with a mono plus and minus, for FAQs and anything long.
- **Enquiry form.** Square inputs with a hairline border; choices are radio chips that fill ink when picked; errors carry a mark, not only a colour; a summary at the top lists every problem.
- **Work cards.** The project's first screen (720 / 1280px copies), kicker, serif title, one line; the whole card is the link.
- **Reveal.** A screenshot crystallizing out of glyphs. The poster image shows from the first paint; the canvas fades in over it.
- **Share cards and icons.** Generated with `next/og` in the same paper, ink, serif and mono.

## Do's and Don'ts

### Do:
- Read every colour, face and duration from the tokens.
- Keep the page complete as server HTML; effects only enhance it.
- Put real numbers and real work on the page, from `app/data.ts`.
- Give every interactive target 44px.

### Don't:
- Add a second accent, a shadow, a gradient or a rounded corner.
- Animate text someone is reading.
- Hide content until WebGL arrives.
- Advertise how the code gets written, or invent claims, numbers or testimonials.
