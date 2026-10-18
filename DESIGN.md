---
name: Ice's Stack
description: The portfolio of Taninwat "Ice" Kaewpankan as a one-bit HyperCard stack, one card per shipped thing.
colors:
  ink: "#000000"
  card: "#ffffff"
typography:
  display:
    fontFamily: "Pixelify Sans, system-ui, sans-serif"
    fontSize: "64px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0"
  display-phone:
    fontFamily: "Pixelify Sans, system-ui, sans-serif"
    fontSize: "44px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0"
  headline:
    fontFamily: "Tiny5, Kanit, system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 400
    lineHeight: 1.15
  label:
    fontFamily: "Tiny5, Kanit, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1
  lead:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "clamp(18px, 1.5vw, 20px)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
  small:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
  code:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.55
rounded:
  field: "0px"
  window: "6px"
  card: "8px"
  button: "12px"
  radio: "50%"
spacing:
  tight: "6px"
  button-gap: "14px"
  field-gap: "18px"
  block: "28px"
  card-pad: "clamp(20px, 3.4vw, 44px)"
components:
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-pad}"
    width: "min(1100px, 100%)"
  button:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    typography: "{typography.headline}"
    rounded: "{rounded.button}"
    padding: "0 22px"
    height: "48px"
  button-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.card}"
  button-small:
    typography: "{typography.label}"
    padding: "0 16px"
    height: "40px"
  nav-button:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    width: "52px"
    height: "44px"
  nav-button-current:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.card}"
  input:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.field}"
    padding: "10px 12px"
  menu-bar:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    height: "40px"
  window:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.window}"
  mini-card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.window}"
    padding: "6px"
    width: "256px"
---

# Design System: Ice's Stack

## Overview

**Creative North Star: "The Stack One Person Made"**

The site is a HyperCard stack on a classic one-bit Mac screen: a menu bar across the top, a single card centred on a dithered desk with two more cards' edges showing beneath it, a nav bar under the card, and a Message Box line at the foot. Each card is one shipped thing. The world is drawn entirely in two values, black ink on white card, and every grey the eye reads is a 4x4 stipple of black dots. Depth comes from stacked edges, state comes from inversion, and the only colour anywhere is a client's real screenshot developing up through the stipple when the visitor asks for it.

Density is calm: one card per screen, generous card padding, heavy 3px rules for the card and its chrome, 2px rules for everything inside it. Pixel type does the talking at the scale where pixels are legible (titles, menus, buttons, labels); Atkinson Hyperlegible carries everything read at length, because a pixel face at paragraph length is a costume. Motion is stepped, never faded: a one-bit screen has no half-ink.

Scope: this system covers the stack routes only (`/`, `/cases/*`, `/work`, `/engineer`, `/build`), all rendered inside `app/(stack)/layout.tsx`. The older pages (`/services`, `/cv`, `/garden`, `/th`, `/sv`, `/da`, `/projects`) still use the previous paper-on-desk world and are not part of this system until a phase 2 reskin brings them into the stack. Do not read their styles as precedent here, and do not apply these rules to them piecemeal.

**Key Characteristics:**
- One bit: ink and card only; greys exist only as stipple tiles, never behind text.
- Colour appears only as a client's real work, through the develop-into-colour reveal.
- Pixel faces at their pixel grid only: Tiny5 at 16 or 24px, Pixelify Sans at 64 or 44px.
- Dithered images are drawn at exactly the width they were dithered at.
- Round corners mean pressable; active means inverted.
- Depth is stacked card edges filled with stipple, never blur.

## Colors

Two values and nothing between them; the stipple densities stand in for every grey.

### Neutral
- **Ink** (`ink`): every rule, every glyph, every icon pixel, the filled radio dot, the availability lamp, and the ground of anything active, hovered or selected. Also the text-selection ground.
- **Card** (`card`): the card surface, the menu bar, the nav bar, the message box, fields, and the ink of inverted text. The page body under the desk is also card, so overscroll shows paper, not night.

### Stipple fills (the only greys)
Four one-bit 4x4 SVG tiles, drawn with `shape-rendering: crispEdges` at `background-size: 4px 4px`: **12%** (2 dots), **25%** (4 dots, the desk ground and the nearer stacked edge), **50%** (checkerboard, the deeper stacked edge, the menu drop strip, the script scrollbar track) and **75%** (12 dots). As a background, black in a tile is ink; as a mask, black is "visible", so the same tiles drive the develop reveal and the card dissolve.

### Named Rules
**The One Bit Rule.** Ink and card are the whole palette. A grey is a density of black dots, never a tint, an opacity on a fill, or a mid-tone hex. No stipple ever sits behind text: every text-bearing surface (card, menu bar, nav bar, message box, mini card) has a solid card ground.

**The Developed Colour Rule.** The only colour on the site is a client's real screenshot, revealed on request through the develop-into-colour interaction. No accent colour, no coloured state, no coloured error: errors use a double rule and words.

**The Inline Tile Rule.** Stipple data URIs are written out in full at every use, never stored in custom properties: a `data:` URL inside a custom property panics Turbopack's production build (Next 16.0.7). Repetition here is the cost of a build that ships.

## Typography

**Display Font:** Pixelify Sans 700 (with system-ui)
**UI Font:** Tiny5 400 (with Kanit for Thai, then system-ui)
**Body Font:** Atkinson Hyperlegible 400/700 (with system-ui)
**Code Font:** JetBrains Mono (with ui-monospace), in the script window only

**Character:** Two OFL pixel faces share the job of the Mac's Chicago: Pixelify at display size, where it is heaviest and closest, and Tiny5 at UI size, where its C, 5 and B stay distinct. Atkinson Hyperlegible makes long reading comfortable without leaving the period.

### Hierarchy
- **Display** (Pixelify Sans 700, 64px desktop, 44px phones, line-height 1, balanced wrap): the card title, one per card. Never fluid.
- **Headline** (Tiny5 400, 24px, 1.15): section headings inside a card, button labels, form labels, timeline years.
- **Label** (Tiny5 400, 16px, 1): menu bar, menus, nav position ("n of N"), window titles, mini-card titles, the stack list, the concept tag, small buttons, chat questions.
- **Lead** (Atkinson 400, 18 to 20px, 1.5, max 54ch): the one-sentence intro under a card title.
- **Body** (Atkinson 400, 17px desktop, 16px phones, 1.55, max 66ch): case write-ups, replies, timeline detail. Bold 700 for fact terms, availability and errors.
- **Small** (Atkinson 400, 14 to 15px): hints, captions, built-with lines, optional markers.
- **Code** (JetBrains Mono, 13px, 1.55, `white-space: pre`): the script window. Never wraps mid-expression.

### Named Rules
**The Pixel Grid Rule.** Tiny5 is set only at 16 or 24px, where its strokes land on whole pixels; Pixelify only at 64 or 44px, for card titles. Pixel faces never take a fluid or in-between size and never a synthesised weight (`font-synthesis: none`).

**The Closed C Rule.** Pixelify never sets a label, menu or button: below about 28px its C closes into an O. Labels belong to Tiny5.

## Layout

The desk is a full-height column: sticky menu bar (40px min), then the stage, which centres one frame of `min(1100px, 100%)`, then the nav bar at the same width, then the Message Box dock. The card has a min-height of `min(640px, 100dvh - 210px)` on desktop so cards keep their size while flipping. Inside, each card is a two-column grid with the text first and the art second (`1fr auto` on Home, `minmax(0,1fr) auto` on cases, roughly 0.8/1.2 on Build mine), gutters `clamp(24px, 3.4vw, 48–56px)`.

Rhythm is in small fixed steps: 6px between a label and its field, 14px between buttons, 18px between form rows, 22 to 28px between blocks. Button groups either wrap in a row or stack as an equal-width column as wide as the widest label.

Dithered artwork sits at fixed widths: 480px on cards, 360px for the Home portrait, 320px and 280px on phones, 240px thumbnails cropped to 118px tall on `/work`. The all-cards grid uses fixed 256px tracks (`repeat(auto-fill, 256px)`), spaced, never stretched.

One breakpoint, 760px. Below it the grids collapse to one column, art moves above text and centres, the stacked edges shrink to 6px and 3px, the title drops to 44px, the nav bar sticks 8px above the bottom at the thumb, the menu bar drops its stack name and uses short language codes, and the message box hides its label.

**The Fixed Art Rule.** A dithered image reaches the screen at exactly the width `scripts/dither-images.mjs` made it (480, 320, 240). Never scale, stretch or `next/image` it; crop with `object-fit: cover` only when the crop box is smaller than the image, so the dots stay 1:1.

## Elevation & Depth

Depth is the card stack itself. Two cards sit under the current one, each a 3px-ruled, 8px-rounded copy offset down and right (5px and 10px desktop, 3px and 6px phones), filled with stipple that gets denser the deeper it sits (25% near, 50% far). Menus drop a 50% stipple strip offset 4px right and 6px down. There is no blur anywhere and no solid-ink offset block.

### Shadow Vocabulary
- **Stacked edges** (two pseudo-cards, `translate(5px,5px)` with 25% stipple and `translate(10px,10px)` with 50% stipple): under the main card only.
- **Menu drop strip** (pseudo-element `inset: 4px -6px -6px 4px`, 50% stipple): under open menus.
- **Default ring** (`box-shadow: 0 0 0 3px #fff, 0 0 0 6px #000`): the heavy concentric ring around the one button you should press. A ring, not an offset.
- **Radio fill** (`box-shadow: inset 0 0 0 3px #fff`): the white gap around a chosen radio's black dot.

### Named Rules
**The Stipple Depth Rule.** Anything lifted is shown by an offset shape filled with stipple and ruled in ink, the way the stack drew it. Never `blur`, never a soft shadow, never a solid black offset block.

## Shapes

Corners carry meaning. Things you press are rounded: buttons (12px), nav buttons (8px), mini cards (6px), and the card and nav bar themselves (8px) as physical objects. Fields of content are square: inputs, the stack list, the scrolling write-up field, captions and the concept tag all have 0 radius so nothing in them reads as a button. Windows (6px) carry a classic striped title bar: 1px ink lines every 4px with a square close box and the title on a white plate. Radios are one-bit circles.

Rules come in two weights: 3px for the card, menu bar, nav bar, message box and windows; 2px for everything inside. State changes the rule rather than the fill where possible: hover thickens 2px to 3px (padding drops 1px so nothing shifts), disabled goes dashed, invalid and focus-within go to a double rule (4px or 5px), focus-visible is a 3px dotted outline offset 3px.

**The Pressable Corner Rule.** Round corners mean "press me". A non-interactive container is square.

## Components

### Buttons
Painted, rounded, inverted when pressed.
- **Shape:** gently rounded (12px), 2px ink rule, 48px tall, 22px side padding, Tiny5 24px; 20px pixel icons inline.
- **Default:** the one primary action per card gets a 3px rule plus the concentric default ring (white 3px, then ink 3px).
- **Hover / Focus:** hover thickens the rule to 3px; focus is the 3px dotted outline.
- **Active / Pressed:** inverted, ink ground and card text, for `:active` and `aria-pressed="true"` (the Develop button stays inverted while developed).
- **Disabled:** dashed rule, not-allowed cursor.
- **Small:** in the message box and chat foot, 34 to 40px tall at Tiny5 16px.

### Cards / Containers
- **Corner Style:** 8px.
- **Background:** card white, solid.
- **Shadow Strategy:** the stacked edges (see Elevation & Depth).
- **Border:** 3px ink.
- **Internal Padding:** `clamp(20px, 3.4vw, 44px)`.
- **Transition:** the card body is one named view transition; the new card arrives through the stipple densities 12, 25, 50, 75 then solid in hard steps over 400ms. The old card stays underneath. Off under reduced motion.

### Inputs / Fields
- **Style:** square, 2px ink rule, card ground, Atkinson body text, 10px 12px padding. Labels in Tiny5 24px above; optional markers in Atkinson 14px.
- **Focus:** the 3px dotted outline.
- **Error:** a 4px double rule plus a bold 14px message under the field; the form summary is a double-ruled box with links to each field. No colour.
- **Radios:** 18px one-bit circles, filled with an ink dot inside a white gap when chosen.

### Navigation
- **Menu bar:** sticky, 40px, card ground with a 3px bottom rule, Tiny5 16px. The 32px pixel stack icon and name on the left, pull-down menus (native `details`), language links on the right. Hovered or open items invert; the current language is underlined 2px. Thai falls back to Kanit at the bar's size and weight.
- **Menus:** 2px-ruled list, min 200px, with the stipple drop strip; items invert on hover and focus.
- **Nav bar:** a 3px-ruled, 8px-rounded bar under the card: back, home, n of N, all cards, forward. Each button is 52x44 (46 wide on phones), 2px rule, 8px radius, a 32px pixel icon. Hover and `aria-current="page"` invert; unavailable is dashed and inert. Sticky at the thumb on phones.

### Pixel Icons
Drawn on a 16x16 one-bit grid as rows of `#` and `.`, rendered at 2x with crisp edges. Never taken from an icon library; a smooth vector arrow in this world is a costume.

### Window and Script Window
A 3px-ruled, 6px-rounded window with the striped title bar and close box. It frames the case screenshot (titled with the live domain or project name) and the code excerpt on the Engineer card, whose horizontal scrollbar is 18px with a 50% stipple track and a ruled white thumb.

### Develop Into Colour (signature)
The case screenshot shows dithered inside its window; a Develop button lays the colour original over it and reveals it through the stipple masks 12, 25, 50, 75 then solid over 700ms in hard steps, like a print in the tray. The colour file is only requested on intent (hover, focus or press). Off under reduced motion.

### Message Box (signature)
A 3px-ruled, 8px-rounded line under the stack: a Tiny5 "Message" label, an unruled input separated by a 2px rule, and a small button. Focus-within turns the box's rule to a 5px double. Answers open above it in a window; turns are divided by a 2px dotted rule, questions in Tiny5 16px, replies in Atkinson.

### Mini Cards
The all-cards grid: 256px tiles, 2px rule, 6px radius, 6px padding, a 240x118 dithered thumbnail (top-cropped, 2px ruled) or a drawn one-bit miniature, and a Tiny5 16px title row. Hover thickens the rule to 3px.

## Do's and Don'ts

### Do:
- **Do** draw every surface in ink (`#000`) and card (`#fff`) only, and every grey as one of the four 4x4 stipple tiles.
- **Do** give every text-bearing surface a solid card ground.
- **Do** keep colour for a client's real screenshot, shown through the develop reveal.
- **Do** set Tiny5 at exactly 16 or 24px and Pixelify Sans only for card titles at 64px (44px on phones).
- **Do** ship dithered art at the width it was dithered at (480, 320, 240) via `npm run dither`, and add new art to the manifest the same way.
- **Do** write stipple data URIs inline at each use.
- **Do** round what is pressable and square what is not; invert what is active, hovered or current.
- **Do** show state with rule changes: 3px on hover, dashed when disabled, double when invalid or focused-within, dotted outline on focus.
- **Do** step every motion through the stipple densities with `steps(1, end)`, and turn it off under reduced motion.

### Don't:
- **Don't** put any stipple, pattern or image behind text.
- **Don't** add an accent colour, a coloured state or a coloured error.
- **Don't** use a mid-tone hex, an opacity tint on a fill, or a gradient as a grey.
- **Don't** use blur, soft shadows or solid-ink offset blocks for depth; use stacked edges and stipple strips.
- **Don't** set a pixel face at a fluid or in-between size, or let the browser synthesise its weight.
- **Don't** set Pixelify Sans below display size, or use it for labels, menus or buttons.
- **Don't** resize, recompress or `next/image` a dithered image.
- **Don't** put a `data:` URL in a CSS custom property.
- **Don't** round a non-interactive container.
- **Don't** use library icons or text glyphs as icons; draw them on the 16x16 grid.
- **Don't** fade between cards or into colour; one bit has no half-ink.
