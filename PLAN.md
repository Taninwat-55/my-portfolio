# Portfolio Overhaul — Working Plan

**Created:** 2026-08-17
**Owner:** Ice (Taninwat Kaewpankan)
**Status:** Three items open — **28, 40, 43.** Items 42 and 44 shipped 2026-08-22. `/da` is built and deliberately unlisted, waiting on item 28.
**✅ THE DEPLOY IS FIXED, and the site is published again.** The cause was the
`publish` key dropped in `5e2608c`: with no key Netlify's default resolves publish
to the repo root and `@netlify/plugin-nextjs` rejects it in `onBuild`. Restored in
`7cb01d5` (PR #4). Three deploys had died on it — both PR #3 previews and the
production deploy of the PR #3 merge — which is why `main` sat merged in git while
the live site served `48802b6` without `/sv`, `/da`, the CV PDF, the nav island,
the add-ons table or the aftercare section. All of that is live as of PR #4.
🔒 **The lesson worth keeping: the build succeeds and the deploy still fails.**
`next build` compiled and prerendered all 37 pages before the plugin threw, so a
green build proves nothing about a deploy. Read the deploy log, not the build log.
**In progress:** the Thai proofread — chunk 1 of 4 presented, awaiting Ice. See item 40.
**Next up:** item 43, the last `/da` gap. It should land **before** item 28 goes out,
so the proofreader opens a link that renders a Danish share card rather than an
English one.
**⚠️ Needs your eyes:** `app/data.th.ts` (item 40).
**⚠️ Your homework:** item 28 — send the 81 lines from `npm run copy da` to a native
Danish speaker. It is the longest-lead item on the list because it waits on a person,
so start it as soon as 43 and 44 land.

⚠️ **Known defect in this log, not yet fixed:** three entries below are dated
`2026-08-22` but describe items 37, 38 and 8, whose commits are all authored
`2026-08-18` (`8f432fe`, `6a2ce7b`). The log is newest-at-top otherwise, so those
three blocks are also out of position. Left alone rather than silently reordered —
correcting it means moving three blocks, and this file is the source of truth.

> This file is the source of truth for the overhaul. The item numbers here
> supersede any numbering used in chat.
>
> **Logging convention.** Every item gets an entry in the progress log below once
> it is **done *and* committed** — date, item number, commit SHA, what shipped,
> and anything left open. Tick its checkbox in §4 at the same time. This log is
> how we pick up where we left off, so an item that ships without a log entry
> counts as lost work.

---

## Progress log

### 2026-08-22 (later still)

**Item 44 — what changes cost, now said in Danish, Swedish and Thai** ✅
*`dd09ccb`, `2f13556`*

Ice asked whether the care plan was implemented. It was — item 33, on `/services`,
and **only** there. All three language pages went silent on the question that
follows the price, and on `/da` that was a hole in the page's own argument rather
than a missing detail: `hero.lead` promises "ingen månedlige gebyrer, du ikke har
bedt om", raising the retainer question in the third sentence and never answering it.

**THE OBSTACLE WAS THE "NOTHING NUMERIC" RULE, and it was worth respecting.** Those
files forbid numerals on purpose — a price typed into a translation drifts silently
— but the figures existed only inside English prose: *"Works out at 480 kroner an
hour instead of 650"*. There was nothing to interpolate.

So `aftercareRates` now holds them once and **the English strings interpolate them
too.** That is what makes this a fix rather than three more copies: the duplicate in
the chatbot grounding (`data.ts`, the llms context block) also reads from the new
source, so it can no longer disagree with the page it summarises.

- The language files use `{effective}` / `{hourly}`, the idiom their own form errors
  already use for `{max}` and `{email}`. **Placeholders carry bare numbers** and each
  language writes its own currency and unit words round them — "480 kr. i timen",
  "480 DKK i timmen", "480 DKK ต่อชั่วโมง" — because putting the currency inside the
  placeholder would impose one word order on three languages.
- Unit words go through the existing `daUnits`/`svUnits`/`thUnits`, so "650 DKK /
  hour" renders "/ time", "/ timme", "/ ชั่วโมง". Swedish also passes `svPrice`: a
  no-op at today's rates, wired up because the point of the indirection is that
  rates change.
- **Verified by changing a rate, not by reading the code.** Setting hourly to 777 and
  effective to 555 propagated to all four languages with **no stale 650 on any of
  the four pages**; then reverted, and the seven original `/services` strings
  confirmed identical to a baseline captured before the refactor.
- `npm run copy` needed no structural change — it walks the language file, so the
  section appeared by itself. It did need the placeholders filled, since printing
  "Det svarer til {effective} kr. i timen" asks a Dane to proofread a sentence with
  holes in it. **Danish is now 93 lines, Swedish 94, Thai 95.**
- ⚠️ One Danish word had leaked into the Swedish ("hellere" for "hellre"), caught and
  fixed. Recorded because it is the specific failure mode of writing three Nordic
  languages in one sitting.

**The Thai section is new prose and therefore part of item 40; the Danish is part of
item 28.** Written now on purpose — both reviews are still open, so this costs one
proofreading pass each instead of two.

### 2026-08-22 (later)

**Item 42 — the secondary card row, shipped** ✅ *`7ba7a1b`, `87924b8`, merged as
`37ad499` (PR #5)*

Three compact cards under the featured deck — Lumina Spa, MockMate, Saep Fire
Kitchen — derived from `cases` **by id**, never by retyped copy. Retyping is what
orphaned `/cases/satoshi` and `/cases/cinema`, so `secondaryProjectCards` throws
during `next build` if an id moves rather than silently rendering a shorter row.

**THE 🔒 RATIO WAS MEASURED, AND THE FIRST TWO ATTEMPTS FAILED IT.** Card height ÷
featured-card height, over CDP at an 844px-tall viewport:

| attempt | result |
| --- | --- |
| `max-w-6xl` + 16:9 image | **0.48** at 1440 — half a featured card, not a third |
| layout switch at `sm` | **0.68** at 390, **0.51** at 768 |
| `max-w-4xl` + 2:1 + switch at `xl` | **0.17 – 0.39** across 390/744/1024/1280/1440/1920 ✅ |

Attempt 2 is the one worth remembering: **a featured card is itself compressed on a
phone**, so a full-width vertical card there is 68% of one however small it looks in
isolation. Below `xl` the cards are horizontal rows — thumbnail beside text — and the
3-up grid appears only from 1280px, where the deck has grown tall enough to dominate
it. The table lives in the component comment so nobody re-derives it.

⚠️ **A collision that no measurement could catch, only a screenshot.** The deck is
three `h-[85vh]` sticky containers, so its last card stays pinned while what follows
scrolls up over it. `z-20` settles who paints on top, not that the two should not
share space — on screen Bevisly's bento showed between the new cards and their
thumbnails landed on its screenshots. The row and the "see all" link now sit in one
opaque `bg-night-900` panel bled to full section width, which is the same move the
next section already makes with its `-mt-10`. **The general lesson: for anything
inside this sticky section, a z-index is not a layout.**

- **Saep's concept label survives the two-line clamp** — verified by walking the text
  node with a Range, because `innerText` still returns text that `line-clamp` only
  hides visually. The label sits first in the blurb for exactly this reason.
- **MockMate's thumbnail rendered blank in every local headless capture** and renders
  correctly on the PR #5 production preview. It was a dev-server artifact, not a
  defect. Recorded because it cost real time chasing it.
- The predicted `app/data.ts` conflict with `add-saep-case-study` never existed by the
  time it was acted on — see the earlier entry.

**Two new items opened from today's findings: 43 and 44.** Both are `/da` gaps, both
were caused by the same thing — a decision landing on `/services` after the language
pages were written — and both must ship **before** item 28 goes out, or Ice has to
ask his Danish proofreader for a second pass.

### 2026-08-22

**Item 42 unblocked — Saep merged, given a live demo, and labelled** ✅
*`291d2bf`, `b617c4b`, `631566f`* — **item 42 itself is still open: the cards are
not built.** This entry clears its two blockers and nothing more.

**Blocker 1 was stale, not real.** This item recorded that merging
`add-saep-case-study` "will conflict in `app/data.ts`", verified with `git
merge-tree`. That was true when written and false by the time it was acted on:
every later `data.ts` change on `nav-responsive` landed in the services/pricing
region (hunks around 36, 783, 832, 918, 1187, 1462) while Saep appends after Lumina
at ~758. Zero overlap. `git merge-tree` now reports a clean tree and the merge took
no resolution at all. **The lesson is about the note, not the merge:** a predicted
conflict is only true against the commit it was predicted on, so it needs
re-checking before it is treated as work.

- **Merged, not rebased** (`291d2bf`). Rebasing `add-saep-case-study` onto this
  branch would have rewritten a pushed branch and needed a force-push; merging costs
  one commit and no history rewrite. `cases` is now **9 entries**. The branch is
  fully merged and can be deleted after PR #3 lands.
- **Blocker 2 cleared** (`b617c4b`): `links.demo` was `""` and now points at
  `saep-fire-kitchen.netlify.app`, verified HTTP 200 and rendering as the "Live
  Project" button on `/cases/saep`.
- **A stale comment the merge broke, caught in the same pass.** The note above
  Lumina read "the only entry here with no client behind it" — false the moment
  Saep landed, and not cosmetic: that comment is where the reasoning for *measured*
  rather than invented metrics lives. It now covers both entries.
- ⚠️ **The concept label was missing where it mattered most** (`631566f`).
  `/projects` renders `tag` + `title` + `sub` and nothing else, so the "invented
  restaurant" sentence — which lived only in `overview` — never reached that page.
  Verified: `/projects` contained "Saep" and did not contain "invented". Saep's
  `sub` now opens *"A concept piece for an invented Thai restaurant"*. Lumina needed
  no equivalent fix; its sub already says "self-initiated". The homepage still
  carries no label because Saep is not in `projectCards` yet — that arrives with
  item 42's cards, against a `sub` that is already correct.

**⚠️ Found on the way, not a numbered item yet: `/da` has no share card.**
`app/da/` contains only `page.tsx`, while `/sv` and `/th` each have an
`opengraph-image.tsx`. `/da`'s `openGraph` block sets title, description, url and
locale but no image, so it inherits the root card — English, "Hi, i'm Ice" over a
list of frameworks. `app/sv/opengraph-image.tsx` names that exact outcome as the
wrong first impression for a Nordic shop owner, which is why that file exists.

The reason it is an oversight rather than a decision: **the PUBLISH checklist inside
`app/da/page.tsx` lists four steps — sitemap, `SITE_LANGUAGES`, hreflang — and never
mentions the card.** Flip `DRAFT` to `false` and `/da` ships with an English card,
silently. `noindex` is no protection either: the only way anyone reaches `/da` today
is a pasted link, which is exactly when a card renders — so the Danish proofreader
in item 28 is the first person who will see it. **Do it before sending item 28 out.**
Cost is low: clone the Swedish card, swap `data.sv` → `data.da`, locale, alt. No font
file — æ ø å are Latin-1 and next/og's default covers them, same as Swedish and
unlike `/th`'s bundled Kanit. Add the missing fifth checklist step in the same commit
so it cannot be forgotten twice.

**Verification for all three commits.** `npm run build` and `npm run lint` both
clean, run with `GROQ_API_KEY` and both Upstash vars unset to reproduce the Netlify
preview context — 38 prerendered pages. `/cases/saep` prerenders, `sitemap.xml`
includes it, `/projects` lists it, and `main ← nav-responsive` still merges with no
conflicts. One false alarm worth recording: `check-html.mjs find cases/saep
saep-fire-kitchen.netlify.app` reported MISS because the URL is an `href`, not text —
`attr cases/saep href` found it. Fourth time that trap has been hit; the mode matters.

### 2026-08-21 (evening, later)

**Item 33 — care plan decided: prepaid hours, no subscription** ✅

The research decided this rather than taste. Danish care plans run 250 – 3.000 kr a
month and every one of them is a WordPress product — security patches, plugin
updates, daily backups. Webflow maintains Webflow sites and a static site has no
plugins to patch, so selling that monthly would be charging for a problem this
stack does not have, on the page directly below the table arguing there is no
yearly bill. That is not a small inconsistency to trade for recurring revenue; it
is the argument itself.

- **So the product is changes, not maintenance** — which is what clients want
  anyway, and it closes the ten-minute-text-change question the old position left
  open. Small changes free, 650 kr/h beyond that, or 2.400 kr for a 5-hour block
  at an effective 480 kr/h.
- 🔒 **Nothing renews.** If that ever changes, `runningCosts.paidTo` and the "no
  monthly retainer" FAQ line both become false and must move in the same commit.
  Checked as consistent across `data.ts`, the FAQ, the chatbot grounding and
  `llms.txt`.
- **The FAQ got precise.** It used to say "we agree an hourly rate or a small block
  of hours per month" — vague, and "per month" quietly contradicted the
  no-retainer claim two sentences earlier. It now names the figures.
- ⚠️ Two of my own bugs caught on the way: an interpolation that would have
  rendered "5 hours hours", and a union type where `free` has no price and
  `hourly` does, which cannot narrow inside `.map`. TypeScript caught the second.

### 2026-08-21 (evening)

**Items 27 and 29 — `/da`, built and deliberately invisible** ✅

The page exists and is unreachable: `noindex`, absent from the sitemap, no nav
chip, no hreflang, no link from any other page. Verified as absent from all six
other prerendered pages rather than assumed. 17/17 content checks on the page
itself.

- 🔒 **`DRAFT` in `app/da/page.tsx` is the publish switch** — it drives the noindex
  and a visible draft banner together, so the page cannot be shared as finished by
  accident. The remaining four steps to publish are in the comment above it, and
  one of them widens the nav island with a fourth chip.
- **Item 29 was folded in rather than done after**, because the meeting-language
  line has to be in the draft the proofreader reads. Doing it later would mean a
  second proofreading round for one paragraph.
- **The real difficulty was not the Danish, it was the honesty.** Ice speaks Danish
  at beginner level, on a page whose whole argument is that he does careful work.
  So: the language note is in the hero rather than an FAQ, contact is written-first
  with no phone number at all, and the one Danish-site claim in `why` is the
  narrowest true version — one site, one client, still running.
- ⚠️ **This is the one language file Ice cannot review himself**, unlike `/sv`. It
  stays invisible until item 28 passes. `npm run copy da` is the thing to send.

**`npm run copy <lang>`** prints any language file as numbered plain text. Item 28
needed a deliverable and the two obvious candidates were both bad: a URL means
describing where the problem is, and the source file means reading TypeScript.
Nobody proofreads TypeScript. Works for `th` and `sv` too, so item 40 gets it free.

**Item 31 dropped** on Ice's call. Worth being honest about the consequence: `/th`
was written to be pasted into a group, and without one it rests on search alone —
the weaker half for that audience. Nothing to fix; it just means `/th` will be
slower than `/sv`, which was built for search from the start.

### 2026-08-21 (later still)

**Item 36 — the add-ons, itemised** ✅

Seven add-ons with one price each on `/services`, replacing a `+ 3.000 – 8.000 DKK`
band that explained nothing. Prices set against Danish agency figures rather than
invented — see the table on the item for what each one is based on.

- 🔒 **The band under the ladder is now computed from the items**, not typed. That
  is the drift this item could most easily have created: itemise the add-ons, then
  leave a hand-written band advertising a floor nothing charges. Same fix as the
  CV PDF earlier today — derive it, do not promise to keep it in step.
- 🔒 **One add-on is a span, and only one.** A second language is the only one whose
  work tracks page count, because every page has to exist twice; a flat price was
  nearly the cost of the whole site on a one-pager. It still does not fork by build
  method, which is what the lock actually protects.
- **Route 2 taken too**: payment and logins have no client build behind them, and
  the page says so in a sentence and points at Bevisly and MockMate rather than
  implying a client history. Cost one paragraph.
- **Four other surfaces had to move with it** or they would have contradicted the
  table: the pricing FAQ, the chatbot grounding, `llms.txt`, and the ladder rung.
- ⚠️ **A patch script lifted the WRONG array.** The regex for `items: [` matched
  `includedInEvery.items` — the first one at that indent — so it hoisted the seven
  "in every build" strings into `WEBSITE_ADD_ONS` and pointed `includedInEvery` at
  the add-ons constant. **TypeScript caught it immediately** (`Type 'string' is not
  assignable to…`), which is the second time today a guard caught a scripted edit
  going wrong. Unwound by line-anchored assertions rather than by reverting, since
  `data.ts` held uncommitted work. Lesson: anchor on something unique to the target
  (a neighbouring key, a known string), never on a structural token that repeats.
- ⚠️ **Could not verify this visually.** `FadeIn` uses `whileInView`, so a headless
  screenshot renders the page blank below the fold — `--force-prefers-reduced-motion`
  only recovered the intro. Verified as 15/15 content checks in the prerendered HTML
  instead. **The layout needs Ice's eyes on the preview.**

### 2026-08-21 (later)

**Item 32 — `/sv`, plus a bug on every share card the site has** ✅

`/sv` is live: `app/data.sv.ts`, `app/sv/page.tsx`, `app/sv/opengraph-image.tsx`,
in the sitemap, in `llms.txt`, and hreflang reciprocated three ways across `/`,
`/th` and `/sv` (verified as a set comparison, not by eye). Static, lint clean.

- **Aimed at Skåne — Malmö, Lund, Helsingborg, named in the copy on purpose**,
  because unlike `/th` this is a search play: a Skåne owner googles "hemsida
  småföretag Malmö" rather than asking a community. The argument is geography plus
  language and both claims are real — 35 minutes from Malmö by train, and a Swedish
  citizen educated in Sweden, so it is a native page rather than a translated one.
- 🔒 **`svPrice()` is the one thing not to remove.** Swedish uses a space for
  thousands and a comma for decimals, so a Swedish reader can parse the Danish
  "6.500" as six and a half — three orders of magnitude wrong, on the one number
  the page has to get right. It is a transform over the value from `services`, not
  a retyped copy, so the "nothing numeric in a language file" rule still holds.
- **`<LanguageOffer />` had a latent bug that a second language turned real:** the
  banner text was hard-coded Thai, so a Swedish visitor would have been offered
  `/sv` in Thai. The string now lives per-language in the registry.
- `SITE_LANGUAGES` moved out of `siteContent` so it could carry a type. Written
  inline, "en" (no `offer`) and the others formed a union where the property
  existed on only some members and every read of it failed to compile.

**All four OG share cards had a hard rectangular seam across them.** Found while
checking `/sv`'s card, and it was on `/`, `/services` and `/th` too. Cause:
satori clips `filter: blur()` to the element's bounding box, so the glow was cut
off at a straight edge. Two radial gradients on the container give the intended
look with no filtered element to clip — now in `app/lib/og-backdrop.ts`, which
also removes four copies of the same two divs.

**And the root card was still the entire pre-overhaul positioning.** Every string
on it was hard-coded, so it read *"Frontend Engineer & Project Coordinator"*,
*"Open to opportunities · Copenhagen"* and *"I keep projects on track and build
the product myself"* — the retired title, the wording `data.ts` itself explains
was dropped for inviting clients to negotiate the price down, and a recruiter-first
tagline. On the card LinkedIn scrapes. Now read from `siteContent`. Same failure
mode as item 17's PDF: a comment cannot keep two copies in sync.

- ⚠️ **A patch script ate a container's opening tag** by anchoring a delete on
  `<div` and scanning for `/>`; the multi-line container has no `/>` of its own,
  so the scan ran into the first decoration div and took both as one block. Caught
  by lint, restored from git — except `/sv`'s card, which was untracked and had to
  be rewritten. The fix is anchoring on `position: "absolute"` plus a tag-balance
  assertion. **`npm run build` said "Compiled successfully" with broken JSX in the
  tree; `npm run lint` is what caught it.** Do not trust the build alone.

**The nav island got narrower and moved to a 720px breakpoint.** `NavLink.short`
shows "Process" in the bar while the panel keeps "How it works", which took the row
from ~630px to ~490px. Then Swedish added a second chip and took it to ~556px, so
640 was out — at that width the island spanned nearly the whole viewport, which is
the full-width-header look it exists to avoid. 720 is where 556 still leaves a real
margin, and it keeps iPad Mini portrait (744px) on the visible nav rather than the
panel. The chip stays **"Svenska"**, not "SV" — the endonym is what a Swedish
visitor recognises, so the breakpoint moved instead of the label.

**`netlify.toml` no longer hardcodes `publish = ".next"`.** `@netlify/plugin-nextjs`
sets the publish directory itself, so that key was at best ignored and at worst
fighting the plugin on a version bump.

**Items 27–29 resequenced.** Ice: *"I can't even access the da page. So, how can I
proofread it?"* He is right and the old order was impossible — it wanted a
proofreader before a single Danish sentence existed. `/da` now gets built first and
kept unlisted until the copy passes.

### 2026-08-21

**Item 17 — the CV PDF, plus the nav island** ✅ `78de161`

**The PDF is no longer made by hand.** `scripts/build-cv-pdf.mjs` renders `cvData`
to HTML and prints it with headless Chrome — `npm run cv`. No new dependency:
Chrome is already on the machine and Node 24 imports `data.ts` directly. That
turns the "mirrors the PDF one-to-one" comment from a promise into a mechanism.
Both known drifts closed automatically as a result: the heading is
**Frontend Developer** and **Framer** is in the tools list, because both were
already true in `cvData`.

- **Single column, real text, standard headings**, because an ATS reads the
  extracted text stream. Verified with `pdftotext`, which caught a defect the eye
  cannot see: at the **0.14em** tracking the section headings started with, Chrome
  emits them as separate glyph runs and every extractor reads **"S U M M A RY"** —
  so an ATS scanning for section headings finds none of the six. Measured the
  boundary rather than guessing (0.14 broke all six, 0.10 keeps all six) and
  settled at **0.1em**, which looks the same. 🔒 **Do not widen it back for looks.**
- Two more caught by the same pass: the GitHub URL broke mid-word across a line,
  and **"EXPERIENCE" was orphaned** at the foot of page 1 with its content overleaf.
- **Now includes the two things the hand-made file cut** — the Operations & Product
  skills group and the Languages row. That was a one-page constraint; this is two
  pages, and the operations history is the part of the range no other frontend
  candidate has.
- Final state: **2 pages, A4, 15/15 content checks**, no phone and no address.
- ⚠️ Item 17's own first sub-item is left struck through on purpose — it recorded a
  phone number that was never there. Worth keeping visible.

**The nav is an island.** It hugs its content instead of stretching to `max-w-6xl`.
Full width put the wordmark and the CTA in opposite corners with a hundred empty
pixels between them, which reads as a page header; an island reads as something
floating over the composition. Dividers return either side of the inline links.

### 2026-08-22 (later still)

**Item 38 — hero corners** ✅ (see git log)

At 360px the two corner blocks fought over one row: left text wrapped mid-phrase,
right column broke into four ragged right-aligned lines running into it. They now
stack below `sm` via `flex-col-reverse` — availability on top, CTA last above the
thumb — while the DOM order stays left-then-right for `sm:flex-row`.

- **The rule needed no change**, despite the stack being taller: below `sm` the
  portrait is wider than the viewport and sits at `z-20` against the rule's `z-10`,
  so it is not visible at those widths at all.
- ✅ **The 744px nav-over-the-eyes problem was resolved by item 37** — confirmed in
  Ice's screenshot.
- ✅ **Item 37 confirmed working by Ice:** panel, X animation, and the bar clears the
  portrait.

### 2026-08-22 (later)

**Item 37 — the nav, plus two side fixes** ✅ `8f432fe`

`PillNav` → **`SiteNav`**: a slim bar plus a full-screen panel behind a two-rule
trigger. Panel links use the hero marquee's oversized uppercase type, so the menu
reads as the site's own language rather than a borrowed component. **`compactHidden`
is gone entirely** — nothing is hidden at any width now, which was the structural
problem, not a styling one.

- **The CTA and the language link stay in the bar**, not the panel. The CTA because
  this page exists to produce that one action. The language link because **item 30b
  exists so a Thai visitor sees a route to `/th` without interacting**, and one
  buried behind an English "Menu" is barely better than none for a reader who may
  not know that is where their language lives.
- 🔒 **The new check helper caught me moving it into the panel.** First real use, and
  it paid for itself immediately.
- **Carried over and easy to lose:** scroll-spy, focus trap, `Escape`, scroll lock,
  focus returned to the trigger on close, reduced-motion path.

**➕ `scripts/check-html.mjs`** — the fix for a mistake made three times: reporting
something missing that was present. `hreflang` and `srcset` because **React emits
the JSX prop casing into the HTML**, and an interpolated count because **React
separates values with comment nodes**. A plain grep is wrong for all three. The
script strips comments *before* tags and matches attribute names case-insensitively.

    node scripts/check-html.mjs find index "Or see all 7 projects"
    node scripts/check-html.mjs attr th srcset
    node scripts/check-html.mjs pages

**➕ Satoshi Standard's `.xyz` lapsed.** Now points at Vercel's **production alias**,
not the deployment URL Ice supplied — **that one is deployment-protected and answers
`200` with a Vercel login page**, so every visitor would have hit a sign-in screen.
It also pins one build and can be garbage collected. *Checking the status code alone
would have shipped a broken link; checking the `<title>` caught it.*

- ⚠️ **Needs a look, and it is interactive so HTML checks cannot cover it:** open and
  close the panel, `Escape`, tab through it, check the trigger animates to an X, and
  confirm the bar sits clear of the portrait at **744px** — the width where the old
  pill crossed the eyes.

### 2026-08-22

**Item 8 — day rate raised, and `/projects` made findable** ✅ `6a2ce7b`

- **4.800 → 5.500 DKK/day** (≈640 → ≈730 kr/h at 7.5h). Researched: the Danish
  freelance **junior** band is 550–750 kr/h, mid is 1.000–1.400, agency web work
  1.100–1.300. The old figure sat mid-junior, but offer 02 is sold to startups who
  benchmark against consultant rates — where 640 reads as a risk signal, not value.
  **Deliberately not 6.500**: 5.500 is top-of-junior/bottom-of-mid, which one year of
  professional frontend work plus one paying client can answer for.
- **`/projects` was unreachable in practice.** Ice could not find it, correctly: the
  only link sat *after* three sticky cards (~255vh of scroll) and the next section
  pulls up 40px over it, so it lived in a sliver nobody reaches. Added one under the
  section heading — also simply the better place, since arriving is when you decide
  whether to scroll the deck or jump to the list. Bottom link kept, with clearance.

**✅ Viewport debt largely closed by Ice's pass.** Of the five:
1. `/th` image — **fixed, confirmed by Ice**
2. `/projects` — reachable now, but **the page itself is still unseen**
3. `HowItWorks` slab — **confirmed good**
4. Nav chip at 320px — **confirmed working**, but Ice wants the whole nav rethought → item 37
5. Hero — **two defects found** → item 38

- 💡 **Third variant of the same false alarm:** I reported the new link missing because
  React splits interpolated text with `<!-- -->` separators. Together with `srcSet`
  and `hrefLang`, the rule is: **when checking built HTML, strip tags and comments
  first, and match case-insensitively.**
- ➕ **New items 37, 38, 39**, and **20b substantially rewritten** — the VAT problem is
  the *framing*, not the constant. See the item.

### 2026-08-21 (later)

**Image fixes from Ice's screenshots** ✅ `a292693`, `4b40431`

- **`/services` proof image was magnified.** The container was
  `md:aspect-auto md:min-h-full`, so it grew to the *text column's* height and
  `object-cover` scaled a 1600×1005 screenshot up to fill a tall narrow box.
- **Pinning it to its own ratio then left a large void**, since the text column is
  roughly twice as tall. **Final shape: three screenshots on `flex-1`**, dividing
  whatever height the row has. No fragile height maths, column always full, each
  image only lightly cropped. Capped at 3 so a case with more does not become a
  contact sheet.
- ➕ **Found the same mistake in my own `/projects` page.** I had used `1600/1005`
  for all seven cards, but that is Racha's ratio and the *narrowest* of the set
  (sources span 1.59 to 1.96), so six of seven cropped hard. Now uniform
  **`aspect-[16/9]`**, which is also what `/cases/[slug]` already used. Commented as
  a **card** ratio so nobody "corrects" it to a file's dimensions.
- **Racha's homepage card**: landing page moved to the tall `col2` slot. That slot is
  the card's real showcase, and "Velkommen til Racha" reads as a finished website at
  a glance.

**🔍 The blank first image on `/th` — could not reproduce, and it is not server-side.**
Verified exhaustively: source file valid VP8 1600×1005 *(opened it)*; optimizer
returns **200 with valid bytes at every width in both dev and prod**; I **decoded the
optimizer's own output and viewed it** — a perfect render; the two `<img>` tags are
structurally identical apart from `src`; `srcSet` present with 6+ candidates.

- **Two false alarms of my own worth remembering:** I reported "no srcset" and
  earlier "no hreflang", both from **case-sensitive greps**. Next emits React's
  camelCase (`srcSet`, `hrefLang`) into the HTML. **Grep case-insensitively for
  attributes in built output.**
- **Left with Ice:** hard reload (the optimizer URL did not change, so a soft reload
  reuses a cached failure), then a private window with extensions off, then the
  Network tab status for that URL — the one piece of evidence not available here.

**➕ New Block 9, item 36** — Ice's tiered-pricing idea, recorded with the honest
constraint: it cannot be shown as project examples, because there is one client
project and inventing more would be fabricating case studies. Routed to an itemised
add-on table plus capability proof from his own products, with the edit-fee question
sent to item 33 and the CMS question to item 7 rather than becoming a third position.

### 2026-08-21

**Item 35 — `/projects`, plus a `/th` bug fix** ✅ `92b9b85`

New `app/projects/page.tsx`; `projectCards` trimmed to three; `/th` image block
repaired. 7 files.

**The orphan fix is the point.** `cases` held 7 entries and the homepage featured
5, so **`/cases/satoshi` and `/cases/cinema` were linked from nowhere** — building,
prerendering and sitting in `sitemap.xml` while unreachable by following any link.
`/projects` **maps over `cases`**, so the fix is not "add the two missing ones", it
is making missing ones impossible. **Verified as a set comparison:** all 7 ids
resolve from `projects.html`.

- **`projectCards` stays curated and separate**, not derived from `cases`. It looks
  like the duplication that caused this, but the link targets differ *on purpose* —
  Bevisly points at its live site rather than its case study, which is an editorial
  call about what a visitor sees first.
- **Featured: Racha · Trailr · Bevisly**, renumbered `01`–`03`. Takes the sticky
  deck from ~425vh to ~255vh, which the homepage needed after gaining the offers
  list and `HowItWorks`. The scale maths already read `projectCards.length` and
  adapted with no change.
- **Nav keeps `#projects`** and its scroll-spy, per Ice. "See all projects" sits
  *after* the deck — someone who scrolled all three is the one who wants more.
- ➕ **No number badge on `/projects`.** `cases[].n` numbers the array, and the page
  sorts client work first, so it read `07 · 01 · 02` and looked broken. Renumbering
  by display position would then disagree with the number the case page shows, so
  the decoration went rather than the ordering.

**🐛 The `/th` blank image was mine, introduced in `d5faf81`.** Recorded properly
because the diagnosis is reusable:

- The file was never the problem — all four Racha screenshots are valid VP8 at
  1600×1005, and the same file renders on `/services`.
- **Mine was the only block using `width`/`height` instead of `fill` inside a sized
  container**, and the geometry proved it: the empty box measured **1.34** against
  the loaded one's **1.58**, so it was the pre-load placeholder *at a ratio I had
  declared wrong*. The two boxes could never have matched heights either, and every
  load shifted layout.
- **`alt=""` was the worse half.** Those screenshots carry the section's argument, so
  a screen-reader user got nothing — and a failed load left an unexplained empty box
  instead of a description, **which is why it failed silently.** Both now carry real
  Thai alt text; zero empty alts remain on the page.
- **Lesson worth keeping:** in this codebase, images go `fill` inside a container
  with an explicit `aspect-ratio`. `/services` and `Projects.tsx` both already did.

**Verified:** build + lint clean; `/projects` `○ (Static)`; all 7 cases reachable;
exactly 3 homepage cards with Racha at `01`; one `h1` on all six pages; `#projects`
hash and scroll-spy intact; both `/th` proof boxes share one ratio; `/projects` in
`sitemap.xml` and `llms.txt`.

- ⚠️ **Five things still never seen at a real viewport.** The browser extension has
  been unavailable for five sessions. In rough order of risk:
  1. **`/th`** — the whole page, including whether the image fix actually took
  2. **`/projects`** — new page, two-column grid
  3. The **`HowItWorks` slab** over Projects (`c5a8e8a`)
  4. The **nav language chip** at 320px (`e346d00`)
  5. The **hero rule** vs the CTA at ≥768px (`b11ad9e`) — lowest risk; the rule is
     hidden behind the portrait below that width anyway

### 2026-08-20 (later)

**Items 30b + 25b — making `/th` reachable** ✅ `e346d00`

Ice's question — *"how do people access my Thai version?"* — was the right one, and
deferring 30b had been a mistake. 11 files, +502/−11.

- **The nav chip** (`ไทย`) is permanent and **never hidden on mobile**, since the
  audience is overwhelmingly on phones and a link they cannot see is no link.
  Below `sm` the room comes from dropping `Work`, which the page scrolls into a
  moment later. `siteContent.languages` is now one array — **`/da` will need no
  component changes.**
- **The offer banner** shows only to browsers set to Thai, and is written in Thai
  because an English sentence is the one thing that reader may not parse.
  **It offers, it never redirects** — a redirect breaks the back button, hides the
  English page from someone who wanted it, and reads as serving different content
  to different clients.
- 🔒 **The banner is a store, not an effect.** `navigator` and `localStorage` are
  genuinely external state. The first version used `useEffect` + `setState`, which
  lint correctly flagged, and which also **got dismissal wrong** — state reset on
  client-side navigation so the banner returned after being dismissed.

**⭐ The biggest find was not on the list.** `Kanit` is the site's body font *and a
Thai typeface* — but it was loaded `subsets: ["latin"]`. **Every Thai character on
`/th` was falling through to a generic system font**, so the page was not rendering
in the site's own type at all. One word fixes it, and `next/font` emits per-subset
files with a `unicode-range`, so Latin-only visitors download nothing extra.
Verified all five weights now ship a `U+E01-E5B` file.

**Item 25b — the Thai share card** (`/th/opengraph-image`). Matters more than the
other two cards: `/th`'s channel is a pasted link, so for most of its audience the
card *is* the page. It inherited the English root card until now.

- Needs a **bundled font**: satori reads ttf/otf/woff but **not woff2**,
  `next/font` exposes none of its files, and all it caches is woff2. Kanit rather
  than Noto so the card matches the page. Taken from the canonical `google/fonts`
  repo, because the CSS endpoint serves woff2 to modern clients and **EOT** to old
  ones — never a usable ttf. **OFL 1.1, licence bundled** as it requires;
  provenance in `assets/fonts/README.md`.
- **Rendered and visually checked** — Thai glyphs correct, tone marks positioned,
  no tofu.

**➕ Building the card exposed a bug on the page itself:** price scopes read
`"1–3 pages"` in English on `/th`. Fixed by translating the unit *word* and leaving
numerals sourced from `services` — a hand-written `"1–3 หน้า"` would have gone stale
the first time the ladder moved, which is the exact failure the
no-numerals-in-`data.th` rule exists to prevent. Same for step durations.
**Visible body text on `/th` is now entirely Thai** (verified against `<main>` only;
the earlier grep hit false positives in the RSC payload and CSS class names).

- ⚠️ **Still unseen at any viewport:** `/th`, the `HowItWorks` slab, and the new nav
  chip. The chip is the one worth checking — it spends the compact budget that was
  measured at ~13px of headroom.
- ⚠️ **Thai proofread still outstanding** and still the gate on sharing the link.
- ✅ **Closed:** 30b, 25b. Item 30 is now fully done rather than partial.

### 2026-08-20

**Items 24 + 25 + 26, and 30 in part — the Thai page** ✅ `d5faf81`

New `app/th/page.tsx` and `app/data.th.ts`; `ServicesEnquiryForm` parameterised.
8 files, +730/−52.

- **Item 24** — `audience.fit` now names the Thai-owned case and points at `/th`;
  `services.proof` says Racha is Thai-owned, which is what turns one case study
  into niche proof.
- **Item 25** — `/th` is `○ (Static)`, ~a quarter the length of `/services`,
  written to stand alone because its channel is a link pasted into a Facebook
  group, not on-site navigation.
- **Item 26** — the page's central line: the site gets built in Danish or Swedish
  because the client's customers are local; the project is discussed in Thai
  throughout. Keeps `/th` a sales layer rather than a product language.
- **Item 30, partial** — `lang="th"` on the wrapper (App Router allows one
  `<html>`, hard-coded `en`), hreflang reciprocated on `/` and `/th`, `/th` in
  `sitemap.ts` and `llms.txt`. **No language switcher on `/`** — deliberate, since
  the channel is Facebook and the pill nav's 320px budget is spent.

**🔒 The enquiry form was parameterised, not duplicated.** Every visible string is
injectable with English defaults, so `/services` is untouched and `/th` runs
through the same component, validator and endpoint. Duplicating it would have
duplicated the validation, honeypot, error summary and POST. Two constraints that
must survive future edits:

- **Option `value`s are never translated.** The server builds its allowlist from
  them, so a translated value rejects every Thai enquiry. Labels only.
- **Copy objects are plain strings with `{tokens}`, not functions.** The first
  attempt used functions and would have failed — functions cannot be serialized
  from a Server Component into a Client Component. Keep them plain and any page
  can pass copy from the server.

**Nothing numeric lives in `data.th.ts`.** Prices come from `services.offers`,
durations from `servicesProcess`, metrics and screenshots from `cases[racha]`. A
second-language page is exactly where a stale price would survive longest unseen.
Sweden being the *larger* half of the market (~64k vs ~14k) also made DKK-only
useless to most readers, so the page quotes DKK and offers SEK on request — with no
published rate, which would be wrong within a month.

**Racha's quote** shows the English she approved, with the Thai clearly labelled a
translation. Ice confirmed she was asked and did not mind, so the permission is
real — but she has never approved a specific Thai sentence. **If she sends her own
Thai, replace it and drop the label.**

**Verified:** build + lint clean; `/th` static; option values byte-identical across
`/services` and `/th` and all present in `data.ts`; `/services` form still renders
English (defaults hold); route handler still passes no messages; one `h1`;
`lang="th"`; price ladder matches `/services`; hreflang reciprocated both ways
*(rendered as `hrefLang` — React's attribute casing, and HTML attribute names are
case-insensitive, so Googlebot reads it correctly)*; `/th` in `sitemap.xml`.

- ⚠️ **PROOFREAD NEEDED — Ice only.** Every Thai string in `app/data.th.ts` is a
  Claude draft. The politeness register especially is a judgement call. No
  automated check covers this and the page should not be shared until it is done.
- ⚠️ **Never seen at any viewport:** `/th` itself, plus the three from before (pill
  nav at 320px is now ✅ confirmed by screenshots, hero rule and `HowItWorks` slab
  are not).
- ➕ **New item 25b:** Thai OG share card. Neither `opengraph-image.tsx` loads a
  font, so `next/og` renders Thai as tofu boxes. Needs a bundled Thai font (Noto
  Sans Thai). **Matters more than usual** — the page's whole channel is being
  shared, and the share card is currently the English one.
- ➕ **New item 30b:** language switcher on `/`.
- ➕ **Extend item 20b:** the VAT claim now has three more homes in
  `data.th.ts` (`pricing.terms`). Nine copies total.

### 2026-08-19 (later still)

**Items 18 + 19 + 20 — Block 4, conversion** ✅ `c5a8e8a`

New `app/sections/HowItWorks.tsx`, inserted between `Projects` and
`EmploymentBand`. **Planned as three thin bands, shipped as one section**, because
two of the three items had gone stale since they were written:

- **Item 18 was redundant.** It called for a "From 6.500 DKK" band, but item 11 had
  already put all three prices on the homepage — it would have cost a slab to
  repeat itself. Reframed as a **terms strip**: fixed price in writing, no VAT,
  everything in your name. That content existed only on `/services` and is the
  sharpest anti-agency material available.
- **Item 19** — the four `servicesProcess` steps, compressed by dropping
  `step.body` and keeping `youGet`. Those four lines carry the story alone.
  `/services` still renders the long version; verified both ways.
- **Item 20 pointed at a CTA that did not exist.** Giving the new section a CTA
  footer resolved it — `id="process"` now precedes `id="garden"` in the DOM, which
  is what the item was actually asking for. No separate edit was needed.

- 🔒 **`heroCorners.cta` → `siteContent.primaryCta`.** Two sections now ask for the
  same action; two literals would have been two things able to drift. The nav keeps
  "Enquire" because it is adjacent to the hero button — repeating the label at the
  *bottom* of the page is correct.

**Verified:** build + lint clean; `/` still `○ (Static)`; slab wrapper classes
byte-identical to `Garden` and `EmploymentBand`; all four steps, durations and
`youGet` lines plus the three terms present in the prerendered HTML; `step.body`
prose absent from `/` and present on `/services`; `HowItWorks` hardcodes no price
and no step text.

- ⚠️ **THREE unverified layout changes now queued.** The Chrome extension has been
  unavailable for four sessions, so none of these has been seen:
  1. The **pill nav** at 320/360px — five links plus the new CTA (`a5ff868`)
  2. The **hero button** clearing the horizontal rule (`b11ad9e`)
  3. The **new slab's rounded top** sitting correctly over Projects (`c5a8e8a`)

  One `npm run dev` pass at 320 / 360 / 768 / desktop closes all three. This is
  the largest accumulated risk on the project right now.
- ➕ **New item 20b:** consolidate the VAT statement. "No VAT added" is now stated
  in **six** places, and it is conditional on Ice being under the Danish 50.000 kr
  registration threshold — crossing it falsifies all six simultaneously. They
  should sit behind one constant. Every location is listed in the comment above
  `services.termsShort`. **Do this before changing any of them individually.**

### 2026-08-19 (later)

**Items 13, 14, 15, 16, 17b + 12b — Block 3, page surgery** ✅ `a5ff868`

New `app/cv/page.tsx`; `app/sections/CV.tsx` deleted; `ClientWork.tsx` renamed to
`EmploymentBand.tsx`. 10 files, +348/−258.

**The CV veil was removed, and the reasoning matters more than the change.** It
was a masked sheet showing ~half the text behind an "Unlock the full CV" prompt,
built on the belief that hiding it visually preserved SEO value. That belief is
**inverted**: search engines *discount* visually hidden text rather than rewarding
it, so the upside never existed — and the mask hid nothing anyway, since every
word was already crawlable in the HTML and read aloud in full by screen readers.
It withheld the CV from sighted visitors only. **Visible text indexes better, so
showing all of it serves the SEO goal *and* the recruiter.** Moving it off `/`
also makes `/cv` the single canonical home for that text rather than leaving two
near-duplicate pages. *If anyone is ever tempted to reinstate the veil, this is
the paragraph to re-read.*

- **Item 13** — `/cv` builds `○ (Static)`: dropping the mask took the 170–200vh
  runway and four framer-motion hooks with it. Its `h1` is written directly, not
  via `SectionHeading` (which renders an `h2`) — every page here has exactly one.
- **Item 14** — the band now points `/` → `/cv` instead of `/` → `/services`.
  Renamed, because `ClientWork` had become actively wrong. Still deliberately
  quiet: a client should not wonder if the person they are hiring is leaving.
- **Item 15** — CTA is `"Enquire"` → `/services#enquiry`. Same width as the
  `"Say hi"` it replaced, so the documented ~13px of 320px headroom does not
  regress, and it avoids two identically-labelled CTAs beside the hero button.
  **`Projects` kept in the nav against the plan's list** — it is the portfolio and
  the strongest proof for both audiences; `compactHidden` pays for it.
  `HireModal` left the nav and now lives on `/cv` behind `ContactButton`.
- **Item 16** — About now leads on accountability, scope and ownership. The
  AI-workflow paragraph was **preserved, not deleted**, as `siteContent.howIWork`,
  rendering on `/cv` where "how does he work" is the actual question.
- **Item 17b** — the overclaim guard now names Webflow **and** Framer.
- **Item 12b** — `roleLabel` **split, not rewritten**. It stays the structured job
  title on `Person.jobTitle` ×2, in the chatbot prompt and as the `/cv` heading;
  new `siteTagline` carries the human-facing version into the tab, the SERP and
  the homepage `sr-only` h1 — closing the h1-vs-corner mismatch. `layout.tsx` also
  had **two** near-identical recruiter descriptions across **three** consumers;
  now one client-first string at 160 chars.

**Verified:** build + lint clean; `/cv` static; one `h1` on every page; zero
`cvData`-only strings left on `/` (so the move is clean and there is no duplicate
content); `roleLabel` still live in all four intended places; `/cv` in
`sitemap.xml` and `llms.txt`.

- ⚠️ **NOT VERIFIED, and now two things:** the **pill nav at 320/360px** with five
  links and the new CTA, and the **hero button clearing the rule** from `b11ad9e`.
  The Chrome extension has been unavailable for three sessions. `npm run dev` and
  a look at 320 / 360 / 768 / desktop closes both at once.
- 💡 **Worth knowing:** `AnimatedText` splits its string into per-character spans,
  so grepping built HTML for an About phrase returns zero even when it renders
  fine. Strip tags before searching, or you will chase a ghost.
- ⏸ **Open:** items 6 and 8 (Block 1), item 17 (CV PDF — **Framer in, phone
  number out**), item 33 (care plan). Item 12b is now closed.

### 2026-08-19

**Items 21 + 22 — Racha's testimonial published** ✅ `b11ad9e`

She picked draft 3 and edited it herself ("reliable" is her word), then agreed to
a grammar pass: one typo, one `and` to close the list, one comma moved. No claim
added, removed or strengthened. `approvedOn: "2026-08-18"`.

- **Credited to the business**, `Racha Beauty & Wellness · Wellness studio,
  Næstved`. Approving words and approving publication of your own name are two
  different consents and only the first was given. A named business with a live
  site is checkable anyway, which is where the weight comes from.
- **Blanket permission to embellish was declined.** She offered it; taking it
  would have made the quote *worse*. "Professional", "highly recommend" etc. are
  what every invented testimonial says. Her four claims are specific and all four
  are verifiable against the live site. If more warmth is wanted, ask her for
  another sentence in her own words — do not write one for her.
- The reasoning is recorded in the comment above the field. **That comment is the
  audit trail** — keep it current if the quote ever changes.
- No render work needed: `services/page.tsx` already had the conditional
  `<figure>`. The original comment was accurate.

**Items 9 + 10 + 11 + 12 — the homepage flip** ✅ `b11ad9e`

- **Item 9** — hero corners: job titles → `"Websites & web app frontends"` /
  `"Built solo, in Copenhagen"`, and `"Open to work"` → `"Available for
  projects"`. To a business, "open to work" says *between jobs*, which invites
  negotiating the price down.
- **Item 10** — a filled `"Start a project"` → `/services#enquiry` in the
  bottom-left block. **Not** centred: the portrait is bottom-anchored at up to
  88vh, so centred content lands on the face. **Not** `ContactButton`, which opens
  the CV-download modal — wrong artefact for a paying client.
- **Item 11** — capability list → three buyable offers with published starting
  prices, linking to the `/services` anchors.
- **Item 12** — Racha Beauty now leads the project cards (`01`), ahead of the
  product work. `cases[].n` left alone; it orders a different, longer list.

- ⚠️ **NOT VERIFIED — the hero at real viewport widths.** The browser extension
  was unavailable again. The rule moved from `bottom-24 sm:bottom-28` to
  `bottom-32 sm:bottom-40` because the taller left block would otherwise have had
  the rule cut through the button — **but those offsets were derived from class
  values (~109px of content at base, ~131px at `sm`), not measured.** What *is*
  confirmed: the DOM nests the CTA inside the left block, and the rule kept `z-10`
  against the portrait's `z-20` so it still passes behind the blazer.
  **Please check at 360 / 768 / desktop: does the button clear the rule?**
- 🔒 **Near-miss worth remembering:** item 11 nearly repurposed `whatIDo`, which
  is also the chatbot's capability grounding (`app/api/chat/route.ts`). That would
  have silently stripped the bot's knowledge of what Ice can do. `whatIDo` stays;
  the new `homeOffers` sits alongside it and stores only an offer id, looking the
  price up from `services.offers` at render so the homepage cannot quote a stale
  figure.
- ➕ **Spawned — new item 12b:** decide whether `roleLabel` gets a client-first
  rewrite. It looked like part of item 9, but it feeds six places including
  `layout.tsx`'s `SITE_TITLE` (the whole site's tab and SEO title), JSON-LD
  `jobTitle` in two files, and the chatbot system prompt. Until then the hero's
  `sr-only` h1 still says "Frontend Engineer & Project Coordinator" while the
  visible corner says "Websites & web app frontends" — both true, mildly
  inconsistent, parked deliberately. **Belongs with item 13.**
- ➕ **Note for item 15:** the homepage now shows two filled CTAs with different
  destinations — `PillNav`'s "Say hi" → `HireModal` (CV download) and the hero's
  "Start a project" → enquiry. Not broken, but item 15 should converge them.

### 2026-08-18 (later)

**Items 1 + 2 + 3 — Collapse the price tracks into one ladder** ✅ `28ec667`

`app/data.ts`, `app/services/page.tsx`, `public/llms.txt`. Net −15 lines despite
added copy, because the two-card block collapsed into the existing table.

- **Item 1** — `tracks` (two price ladders) replaced by `priceLadder` (one,
  priced by scope) + `buildMethodNote`. Adopted the coded prices and the coded
  timelines. `priceRange` → "From 6.500 DKK".
- **Item 2** — every dependent surface moved with it: `priceNote`, four FAQ
  entries (one retitled to "Webflow or coded from scratch — which should I
  choose?", since cost is no longer the difference), `servicesContext`,
  `DESCRIPTION`, and the `llms.txt` services block. `opengraph-image.tsx` needed
  nothing — it reads `priceRange`.
- **Item 3** — new `runningCosts.paidTo`, rendered as its own band under the
  table rather than the footnote it was. Every recurring figure now names its
  recipient.
- **Structural, decided in session:** the two build cards merged into the
  running-costs table (they duplicated it once prices were gone), and `fiveYear`
  dropped the build price to show running cost only.

**The verdict flipped, and that is the real consequence.** "Over five years the
two land close together" was only true while Webflow's build price was lower.
With identical build prices Webflow is simply the more expensive site to own, so
the page now says that and frames the difference as what editing it yourself
costs. The ~6.000 kr figure is deliberately qualified as *the likely setup* —
comparing the extremes gives ~2.250–5.750, and an unqualified number is one that
fails checking.

**Verified:** build + lint clean; `tracks` gone from `app/`; both JSON-LD blocks
parse and `FAQPage` picked up the retitled question automatically; ladder,
Best-if row, paid-to band, five-year pair and verdict all confirmed in the
prerendered `/services` HTML.

- ⚠️ **Not verified: the 360px visual pass.** The Chrome extension was not
  connected, so no screenshot was taken. Substituted a width proxy — every
  narrow-cell value is now ≤20 chars against the 19-char max that already
  shipped in that layout. **Worth an eyeball on a real phone.**
- ✅ **Discharged:** item 4's "provisional five-year figures" caveat. They were
  recomputed from scratch here and are no longer derived from stale build prices.
- ⏸ **Still open:** item 6 (Webflow copy) waits on the item 5 test. Item 8 (day
  rate) remains a one-line change, deliberately left out of this session.
- 🔒 **Hardened:** the chatbot's platform-fee lookup now matches on
  `label === "Platform fee"` instead of `rows[1]`, so reordering the table cannot
  silently change a published figure.

### 2026-08-18

**Item 4 — Correct the platform-fee figure** ✅ `ef2a806`

Webflow yearly figures corrected in `app/data.ts` (×9) and `public/llms.txt`
(×2). **Framer** added to `cvData.skills` → "Tools & AI" in the same commit.
Build + lint clean; all four new figures verified in the prerendered
`/services` HTML, in both the mobile stacked-card and desktop `<table>`
renderings. Session plan: `~/.claude-work/plans/nested-roaming-widget.md`

- ⏸ **Still open on this item:** which Webflow plan we quote as the floor —
  Basic at 1.150 kr (no CMS) vs Premium at 1.950 kr. Waits on the item 5 test;
  Ice runs it when there's time. Not blocking anything else.
- ⚠️ **Provisional:** the five-year Webflow totals were recomputed to keep the
  live page's arithmetic consistent, but item 1 changes the build prices they
  derive from. Recompute there.
- ➕ **Spawned:** item 17 expanded (CV PDF now needs Framer *and* the phone
  number removed); new item 17b (extend the overclaim guard to Framer).

---

## 0. The decision, in one paragraph

The site currently tries to serve recruiters and freelance clients on the same
page and does neither cleanly. We are flipping it: **`/` becomes a freelancer's
site that happens to be excellent evidence for a recruiter**, and `/cv` becomes
the recruiter's page. On top of that, we are (a) collapsing the two-track
Webflow/coded pricing into one price ladder, (b) naming a real niche — Thai-owned
small businesses in Denmark and Sweden — and (c) adding Thai and Danish landing
pages to reach it. Nothing about the visual design gets rebuilt.

---

## 1. Locked decisions

| # | Decision | Rationale |
|---|---|---|
| D1 | **Option A — full client-first flip.** CV moves off the homepage to `/cv`. | Half-and-half is the confusing state we're in now. A freelance-looking site reads *better* to a recruiter than a "please hire me" site. |
| D2 | **Keep the About section**, trimmed to ~4 sentences + facts strip + collapsible story. | On a solo-freelancer site the person *is* the product. The thing that reads as job-seeking is the CV section and "Open to work", not About. |
| D3 | **One price ladder, method-agnostic.** Adopt today's *coded* prices as *the* prices. Build method becomes a recommendation made on the call. | We were discounting the weaker skill (zero shipped Webflow work), pricing our cost instead of their outcome, and letting the cheap number anchor before the subscription ambush. |
| D4 | **Niche by audience, not by tool.** "Websites for Thai-owned businesses in Denmark and Sweden — restaurants, massage & wellness, nails, cleaning." | A Danish agency cannot copy that positioning line. They could copy "Shopify expert" by Tuesday. Also: it's the only niche reachable with a zero-kroner marketing budget. |
| D5 | **Niching does not change intake.** It decides what the landing pages say and who we go find — never who we're allowed to accept. | General work still arrives via `/` and `/services`. |
| D6 | **No i18n machinery.** Two standalone landing pages (`/th`, `/da`) instead of translating the whole site. | Full i18n across homepage + a 900-line `/services` + cases + garden is weeks, and most of it has no Thai or Danish audience. |
| D7 | **`/th` ships before `/da`.** | Ship the pages you can write and support yourself first. Thai = native, zero proofreading cost, covers two countries. Danish = needs a native proofread and generates calls Ice can't confidently run. |
| D8 | **Borrow structure, not skin.** Take the offer → price → proof → CTA rhythm from the AI-designer reference. Keep the dark editorial look. | A re-skin is a week of work for zero conversion gain. |
| D9 | **No "Thai price".** Same ladder for everyone. | A discount by ethnicity is the same mistake as the discount by tool — and in this community, word travels. |

---

## 2. Open questions — answer before the dependent items

| # | Question | Blocks | Owner |
|---|---|---|---|
| Q1 | **Webflow test** (see items 5a–5c): does client editing work on Basic, does it burn a paid seat, and is the editor usable by a 55-year-old restaurant owner unaided? | Items 5, 6 | Ice — 2026-08-17 AM |
| Q2 | **Care plan** — do we introduce an optional recurring maintenance offer? Currently zero recurring revenue by design. | Item 33 | Ice — 2026-08-17 |
| Q3 | **Free CMS on coded sites** (Decap / Sanity) — do we build the self-editing integration once and reuse it? Depends partly on Q1. | Item 7 | Ice — after Q1 |

---

## 3. Strategy — page map

| Page | Audience | Language | Status |
|---|---|---|---|
| `/` | Clients first, recruiters second | English | Exists — needs reordering + copy rewrite |
| `/services` | General freelance buyer | English | Exists — pricing rewrite |
| `/cv` | Recruiters | English | **New** — receives the CV section from `/` |
| `/th` | Thai-owned businesses in DK + SE | Thai | **New** |
| `/da` | Danish local small businesses | Danish | **New** |
| `/sv` | Swedish small businesses (Skåne) | Swedish | **Parked** — cheapest page to produce, revisit after `/th` |
| `/cases/[slug]`, `/garden` | Everyone | English | Unchanged |

**Four principles behind every item below:**

1. One audience per page. The chat widget already carries both contexts, so it covers crossover.
2. Price the outcome, not the tool.
3. The person is the product — About stays, reframed from biography to trust.
4. Borrow structure, not skin.

---

## 4. The checklist

Tags: **[P]** pricing · **[S]** structure · **[C]** copy · **[N]** new build · **[H]** homework (not code)

### Block 1 — Pricing truth
*Do first. Everything downstream quotes these numbers, and both landing pages
quote the positioning. Building them before this settles means writing twice.*

- [x] **1. [P] Collapse the two price tracks into one ladder.** ✅ *`28ec667`*
  `app/data.ts` → `services.offers[0].tracks`. New ladder:
  - 1–3 pages: **6.500 – 9.500 DKK**
  - 4–8 pages: **12.000 – 20.000 DKK**
  - Add-ons: **+ 3.000 – 8.000 DKK**

  The Webflow-vs-coded comparison **stays on the page** but becomes a "how do you
  want to live with this site" section, not a price fork. Delete the
  `tracks[].rungs[].price` fork; keep `bestFor`, `runningCost`, `editing`.

- [x] **2. [P] Update everything that interpolates from `tracks`.** ✅ *`28ec667`*
  `priceRange`, `priceNote`, `runningCosts.fiveYear` table, and the three pricing
  FAQs in `servicesFaq` (the "what does a website cost", "why not 3.000 kr", and
  "Webflow vs coded cost difference" entries) all read from `tracks` — they move
  together or they contradict each other.

- [x] **3. [P] [C] Name the recipient on every recurring number.** ✅ *`28ec667`*
  The current card says "THEN, PER YEAR — ≈ 100 – 1.600 kr / year" with **no
  recipient named anywhere**. Combined with "pay more to build, almost nothing to
  *keep*", it reads as "he charges me every year forever" — the exact fear that
  makes people avoid developers.

  Fix in three places:
  - The card: `THEN, PER YEAR — paid to others, never to me` + breakdown
    (`your registrar ~100 kr + your host 0–1.500 kr`)
  - The comparison table: a persistent "Paid to → Webflow / your host / your
    registrar. Never to me." line or column
  - Promote `runningCosts.note` ("billed to you directly rather than through me —
    I do not mark up other people's invoices") out of the small print. It's one
    of the strongest trust lines on the page.

  Bake this into the *new* single-ladder design rather than patching the old
  two-card layout, which is being rebuilt anyway.

- [x] **4. [P] Correct the platform-fee figure.** ✅ *2026-08-18*
  Two distinct figures, kept distinct: **platform fee** (site plan only) is now
  **≈ 1.150 – 1.950 kr**, and the **card total** (site plan + ~100 kr domain) is
  now **≈ 1.250 – 2.050 kr**. The annual-vs-monthly split is now stated in the
  `why` text, which previously omitted it entirely. Updated in 5 places in
  `data.ts` + 2 in `llms.txt`; `servicesContext` propagated automatically via
  interpolation.

  ⚠️ **The five-year Webflow totals were also recomputed** (`11.500 – 18.500` /
  `15.000 – 25.500`, rounded outward to the nearest 500) so the live page did not
  carry a 750 kr arithmetic gap overnight. **These are provisional** — item 1
  changes the build prices they are derived from, so recompute them there.

  Still open from this item: which Webflow plan we quote as the floor depends on
  the item 5 test — Basic has no CMS, so if clients realistically need Premium
  the floor should be 1.950, not 1.150.

- [x] **5. [H] Webflow client editing — answered, 2026-08-20.** ⚠️ **The legacy
  Editor was retired on 4 August 2026**, so anything written before this month
  describes a product that no longer exists. Client Seats replaced it.
  - [x] **5a. Yes, on any plan.** A free client seat edits page text and images.
        **CMS collections are the thing gated behind Premium**, not editing itself —
        so the real split is not Webflow-vs-coded, it is *"change my prices"* versus
        *"manage a structured list"*. Most clients only ever want the first.
  - [x] **5b. No — client seats are free** on all Workspace plans and included at
        site level. Three roles: Marketer, Content editor, Reviewer.
  - [x] **5c. Evidence leans positive**, which reverses the earlier assumption.
        Practitioners handing sites to non-technical teams report the new Edit Mode
        beats the old overlay: edits happen on the real page, there is a proper asset
        panel, and they no longer fight animations or custom code. **Caveat: a
        first-login hump.** ⏸ *Still worth Ice's own eyeball with a Thai shop owner
        in mind — this is a judgement about his audience, not a fact search can
        settle.*
  - 💡 **Transfer beats inviting.** Handing the project to the client's own Workspace
        means they pay the site plan directly, which is already the published
        position ("billed to you directly, never through me").

- [x] **6. [C] Rewrite the Webflow section around what item 5 found.** ✅ *shipped — 7 places; the verdict claim was outright false after 4 Aug 2026.*
  Two things to land: **client editing is free and does not need a paid seat**, and
  the honest split is *"edit my text"* (any plan, free seat) versus *"manage a
  structured list"* (needs CMS → Premium). The current copy implies editing itself is
  the Webflow advantage; it is not — the CMS is.

- [x] **7. [P] Free CMS on coded sites — YES, and it is a priced add-on.** ✅
  *Decided 2026-08-20.* Decap (MIT, free forever, git-based) or Sanity's free tier.
  Self-editing on a coded site at **0 kr/year platform fee**, which removes the
  strongest remaining reason to pick Webflow at this scale.

  **Not free labour, though.** It is repo config, auth, schemas, preview and
  training — real hours, and agencies bill CMS setup as a line item with **training
  billed separately on top**. Ice's framing was right: *a CMS is a feature, not a
  courtesy.* Priced in item 36.

  Keep the honesty caveat already used for Netlify: a free tier is a company's
  policy, not a promise.

- [x] **8. [P] Raise the day rate.** ✅ *`6a2ce7b`* — 4.800 → 5.500 DKK/day.
  4.800 kr/day ≈ 600–685 kr/hour — the absolute floor of the Danish freelance
  band (600–1.000 kr/h) for the scarcer skill. Move to **5.500 – 6.500 kr/day**
  and restate the weekly figure in `priceNote`.

### Block 2 — Homepage identity

- [x] **9. [C] Hero corners: job titles → positioning.** ✅ *`b11ad9e`*
  `app/data.ts` → `siteContent.heroCorners`.
  - Left: `"Websites & web app frontends"` / `"Built solo, in Copenhagen"`
  - Right: `"Open to work"` → **`"Available for projects"`** (keep the pulsing dot)

  *Why:* "Open to work" tells a paying client you're between jobs and invites
  them to negotiate down.

- [x] **10. [N] Hero CTA — placed in the bottom-left block, not centred.** ✅ *`b11ad9e`*
  `app/sections/Hero.tsx`. The middle is deliberately empty today. A client site
  needs an offer and a button there — `Start a project` / `View work`. This is
  the one structural thing to lift from the AI-designer reference.

- [x] **11. [C] Three offers on the homepage (via new `homeOffers`; `whatIDo` kept).** ✅ *`b11ad9e`*
  Current copy is recruiter honesty — *"the backend is the newer half of my
  toolkit"*, *"where I would want to be judged"* — and exactly wrong for a buyer.
  Replace with the three `/services` offers, each with a from-price and a link.

- [x] **12. [S] Reorder `projectCards` — Racha Beauty leads.** ✅ *`b11ad9e`*
  Currently #5. For a client, paying-client work goes first, product work second.

### Block 3 — Page surgery

- [x] **13. [S] Move `app/sections/CV.tsx` to a new `/cv` route.** ✅ *`a5ff868`* — veil dropped, see log.
  Keep the section component; give it a page shell with `Navbar`. Add metadata +
  sitemap entry.

- [x] **14. [S] Invert the band → `EmploymentBand.tsx`.** ✅ *`a5ff868`*
  From *"I also freelance →"* to *"Also open to full-time frontend roles →
  /cv"*. Same quiet band, opposite direction. Update
  `siteContent.freelanceBand` copy accordingly (or rename it).

- [x] **15. [S] Nav rewrite.** ✅ *`a5ff868`* — `Projects` kept, CTA is "Enquire". `app/components/PillNav.tsx` → `NAV_LINKS`.
  `About · Work · Projects · Services` becomes **`Work · Services · About · CV`**.
  CTA button `Say hi` → **`Start a project`**. Re-check the 320px width maths —
  the current comment documents that the pill wraps by 3px at `px-4`.

- [x] **16. [C] Trim the About section.** ✅ *`a5ff868`* — old copy preserved as `howIWork`.
  `siteContent.aboutStory` is 7 paragraphs of immigration story. Reduce the
  visible block to ~4 sentences ("One person, not an agency. Copenhagen. I work
  in Danish, English and Swedish."). Keep `aboutFacts` and keep the full story
  behind the existing "Read my story" collapsible.

- [x] **17. [H] Regenerate the CV PDF — reconcile it with `cvData`.** ✅ *`78de161`* — **now generated, not hand-made.**
  `public/assets/Taninwat_Kaewpankan_CV.pdf`. **Verified against both pages on
  2026-08-22**, which corrected one item and found another:

  1. ~~Remove the phone number.~~ ❌ **Wrong — there is no phone number in the
     PDF.** Contact is email, LinkedIn, GitHub, Website. This claim came from a
     stale note and was repeated for several sessions without anyone opening the
     file. Corrected in memory.
  2. **Add Framer** to the tools list. `cvData.skills` "Tools & AI" lists it; the
     PDF stops at Webflow.
  3. ➕ **Change the heading to `Frontend Developer`.** ✅ *Decided and shipped on the
     site side; the PDF is the only half left.* It said *"Software Engineer |
     Frontend Focus"*, which overclaims — Ice has said himself he is not a pure SWE.
     The site now says **Frontend Developer** in `roleLabel`, `cvData.title` and the
     summary. Chosen over "Web Developer" on money: Denmark files both under DISCO-08
     2513, but frontend-udvikler medians ~51.900 kr/month against a webudvikler
     starting ~31.500 and reaching ~42.250 after ten years.

  Intentional and fine: the PDF omits the "Operations & Product" skill group and
  the Languages row, because a one-page CV has to cut. Already documented.

  ⚠️ `cvData`'s header comment claims it mirrors the PDF one-to-one. **Nothing
  enforces that** — the PDF is made by hand outside the repo — so the comment is a
  promise, not a mechanism. Check both whenever either changes.

- [x] **17b. [C] Extend the overclaim guard to Framer.** ✅ *`a5ff868`*
  `data.ts` already carries *"his shipped client work to date is coded rather than
  Webflow — do not claim Webflow case studies until there are some."* The skills
  list now names two builders with no shipped client work behind either. No live
  risk today (`servicesContext` does not mention Framer at all, so the chatbot
  cannot claim it), but the guard should name Framer before Framer reaches any
  client-facing copy.

### Block 4 — Conversion

- [x] **18. [N] Homepage terms strip** (not a price band — see log). ✅ *`c5a8e8a`*
  *"From 6.500 DKK. Fixed price, in writing, before anything starts."* → `/services`.
  Published pricing is the sharpest weapon against agencies; hiding all of it
  behind a second page wastes it.

- [x] **19. [N] Homepage process strip.** ✅ *`c5a8e8a`*
  The four `servicesProcess` steps (Call → Scope → Build → Handover), compressed.
  Kills the "what happens after I pay" fear before they leave the homepage.

- [x] **20. [S] Demote Garden below the CTA.** ✅ *`c5a8e8a`* — satisfied by the new section's CTA footer.

- [x] **20b. [P] [C] Reframe VAT as "ekskl. moms", behind one flag.** ✅ *flip `VAT_REGISTERED` in `data.ts` when the CVR lands; `llms.txt` and `data.th.ts` are the two manual sites.* ⚠️ **Bigger
  than "one constant" — the framing is the actual problem.** Ice plans to register a
  CVR after a few more clients, so this *will* flip.

  The claim now lives in **nine** places, but the real hazard is how it is phrased:
  *"No VAT is added — the figure you see is the figure you pay"* is sold as a
  **benefit**. Reversing a benefit reads as a 25% price rise, even when it is not.

  **What is actually true:** most Danish business clients are VAT-registered and
  **deduct moms, so a 25% addition is cost-neutral to them.** It only bites
  consumers and unregistered buyers. So the change is far less dramatic than it
  feels — provided the page never framed "no moms" as the reason to buy.

  **The fix, done now rather than at registration:**
  1. Quote every price **ekskl. moms**, the Danish B2B norm. Numbers never change
     when he registers.
  2. One `services.vat` object holding `{ registered: boolean, note: string }`, with
     all nine sites reading from it. Registering becomes a one-line flip.
  3. Drop "the figure you see is the figure you pay" as a *selling point*. Keep it
     as a factual note while it holds.

  **Do this before the CVR, not after.** Afterwards it is a visible price rise;
  beforehand it is housekeeping nobody notices.

### Block 5 — Proof *(highest value on the whole list)*

- [x] **21. [H] Get Racha's approval on the literal sentence.** ✅ *2026-08-18*
  See **Appendix B** for the full kit — three drafted quotes in Thai and English,
  the message to send, and what to capture. Ideally she writes her own in Thai.
  Then fill `services.testimonial` with `{ text, author, role, approvedOn }`.

  *Rules:* if she edits it, publish her version **word for word** — do not polish
  it. If she goes quiet, let it go; no chasing.

- [x] **22. [C] Publish the testimonial** ✅ *`b11ad9e`* once item 21 lands. The `/services` page
  already renders the block conditionally, so there is nothing to uncomment.

### Block 6 — Languages & niche
*Sequenced after Blocks 1–2: both pages quote the prices and the positioning.*

- [x] **24. [S] [C] Re-point the niche.** ✅ *`d5faf81`*
  Racha is **confirmed Thai-owned**, which means the existing case study is
  already niche proof: a Thai-owned wellness business in Scandinavia that had
  only a Facebook page → Danish-language site, 95+ Lighthouse, running
  unmaintained since launch. Update `services.proof` and `services.audience.fit`
  to point at the niche rather than at "small businesses" generally.

- [x] **25. [N] Build `/th` — Thai landing page.** ✅ *`d5faf81`* — **awaiting Ice's Thai proofread.**

- [x] **25b. [N] Thai OG share card.** ✅ *`e346d00`* — bundled Kanit (OFL), rendered and visually verified.
  - Covers **Denmark AND Sweden**. Do not write "in Denmark" anywhere.
  - Built to be **shared in a Facebook group**, not to rank on Google — that's
    how this community actually finds things. Strong OG preview image,
    mobile-first, fast.
  - Contact via **Messenger / LINE**, not a formal enquiry form with a budget
    dropdown.
  - Racha case study front and centre, with her Thai-language quote in the
    original Thai.
  - Roughly a quarter of `/services`' content.

- [x] **26. [C] State on `/th` that the websites get built in Danish/Swedish.** ✅ *`d5faf81`*
  The Thai page is a *sales* layer; their customers are Danish and Swedish. Being
  explicit keeps scope sane and is what they actually need.

- [x] **27. [N] Build `/da` — Danish landing page, UNLISTED.** ✅ *shipped
  2026-08-21, invisible on purpose.* `app/data.da.ts` + `app/da/page.tsx`, static,
  17/17 content checks.

  **Reachable only by typing the URL.** `noindex, nofollow`; not in `sitemap.ts`;
  not in `SITE_LANGUAGES`, so no nav chip and no browser-language banner; and **no
  hreflang at all**, because declaring a language alternate for a page that tells
  crawlers not to index it is a contradiction that would invite Google to serve
  unproofread Danish to Danish searchers — the exact outcome item 28 exists to
  prevent. Verified as absent from all six other prerendered pages.

  🔒 **One flag publishes it: `DRAFT` in `app/da/page.tsx`.** It controls the
  noindex AND a visible draft banner, so the page cannot be shared as finished by
  accident — losing the banner is the same act as publishing. The four remaining
  steps are listed in the comment above it.

  ⚠️ **Step 3 of that list widens the nav island with a fourth language chip.** It
  is at roughly 556px with three, against a 720px breakpoint. Re-measure before
  assuming 720 still holds.


- [x] **42. [N] Secondary project cards on the homepage — 3 small ones under the
  featured 3.** ✅ *`7ba7a1b`, `87924b8`; Saep via `291d2bf`, `b617c4b`, `631566f`.
  Merged to `main` in PR #5 (`37ad499`).* Ice's idea, 2026-08-21: *"typically people
  want to already see them right away and not click into the link… maybe like a
  little card, not like the featured ones."*

  **The instinct is right, with one correction to the premise.** "See more at once"
  is true for a RECRUITER and only half-true for a CLIENT — a salon owner wants one
  business like hers and then the price, not eight projects. The homepage is
  client-first, so this is not "show more equally": keep the three featured as the
  narrative and add a compact row for range.

  **The three: Lumina Spa · MockMate · Saep Fire Kitchen.** (Ice replaced Satoshi
  Standard with Saep, 2026-08-21.)

  - **Lumina Spa** is the one to argue for. Ten animated sections, no build step,
    **10.8 KB over the wire.** That is not a side project, it is a live
    demonstration of the exact thing he charges for — fast sites that load on
    mobile data. Currently the site's best-hidden asset.
  - **Saep Fire Kitchen** is a **Thai restaurant site**, which makes it unusually
    on-target: `/th`'s entire audience is Thai-owned restaurants in Denmark and
    Sweden, and right now that page proves the case with a massage salon. ⚠️ **It is
    an INVENTED restaurant in Nørrebro, not a client.** It must be labelled as a
    concept piece wherever it appears — showing an invented restaurant to a real
    restaurant owner is fine only if nobody can mistake it for client work.
  - **MockMate** — live, technical, needs no explanation.

  **Deliberately NOT included:** Millennial Consulting (strong evidence, but of
  management — dilutes next to code on a client-first page) and Cinema Booking
  (self-described as "my first full-stack project… with a team of students"; honest,
  and the weakest visible item sets the ceiling of the impression). Both stay on
  `/projects`, where they cost nothing.

  🔒 **The cards must look deliberately SECONDARY** — image, title, one line, tag.
  Three across, roughly a third the height of a featured card, no big numbers. If
  they look like the featured ones there is no "3 + 3", only **6 equal projects**,
  and the curation disappears. The hierarchy is the entire point.

  Derive from `cases` by id rather than retyping, so it cannot orphan or drift, and
  slot it between the sticky deck and the existing "see all" link — which then reads
  as the natural next step rather than the only one. Cost is about +40vh on a
  homepage whose deck is ~255vh.

  **✅ Both blockers cleared 2026-08-22 — this item is buildable now.** Full write-up
  in the log entry; the short version:

  1. ~~Saep is not on `main` or on this branch.~~ ✅ **Merged** — `291d2bf`, from
     `add-saep-case-study` (`32cd536`). `cases` is **9 entries**. The predicted
     `app/data.ts` conflict **never existed by the time it was acted on**: it was
     verified against `5e2608c`, and every later `data.ts` change on this branch
     landed in the services/pricing region while Saep appends after Lumina. Clean
     merge, no resolution. Merged rather than rebased, to avoid force-pushing a
     branch that was already on origin.
  2. ~~Saep has no live demo.~~ ✅ **`links.demo` is now
     `https://saep-fire-kitchen.netlify.app`** — `b617c4b`, verified HTTP 200 and
     rendering as the "Live Project" button on `/cases/saep`.

  **✅ The concept label is already in place for this item's benefit** — `631566f`.
  Saep's `sub` opens *"A concept piece for an invented Thai restaurant"*, so the
  card the cards will render is labelled before it exists. `/projects` was the gap:
  it renders `tag` + `title` + `sub` only, so the `overview` sentence never reached
  it. **Do not drop the label when writing the card markup** — the whole ⚠️ above
  depends on it, and the card is the one place a real restaurant owner meets Saep.

  **All three ids exist in `cases`** — `lumina`, `mockmate`, `saep` — so deriving by
  id needs no new data. What is left is markup and the 🔒 hierarchy constraint above,
  nothing else.

- [ ] **43. [N] `/da` has no share card.** Found 2026-08-22. `app/da/` contains only
  `page.tsx`, while `/sv` and `/th` each have an `opengraph-image.tsx`. `/da`'s
  `openGraph` block sets title, description, url and locale but **no image**, so it
  inherits the root card — English, "Hi, i'm Ice" over a list of frameworks.
  `app/sv/opengraph-image.tsx` names that exact outcome as the wrong first impression
  for a Nordic shop owner, which is why that file exists at all.

  **An oversight, not a decision.** The PUBLISH checklist inside `app/da/page.tsx`
  lists four steps — sitemap, `SITE_LANGUAGES`, hreflang — and never mentions the
  card. Flip `DRAFT` to `false` and `/da` ships with an English card, silently.

  🔒 **`noindex` is not protection here.** The only way anyone reaches `/da` today is
  a pasted link, which is precisely when a card renders — so **the item-28
  proofreader is the first person who will ever see it.** Do this before sending item
  28 out.

  Cheap: clone the Swedish card, swap `data.sv` → `data.da`, locale `da_DK`, Danish
  alt. **No font file** — æ ø å are Latin-1 and next/og's default covers them, same as
  Swedish and unlike `/th`'s bundled Kanit. Add the missing fifth checklist step in
  the same commit so it cannot be forgotten twice.

- [x] **44. [C] The language pages never say what changes cost after launch.** ✅
  *`dd09ccb`, `2f13556`.* Found 2026-08-22, from Ice asking whether the care plan was
  implemented. It is — item 33,
  `services.aftercare`, verified rendering on `/services`: small changes free, 650
  DKK/h beyond that, 2.400 for a 5-hour block, "nothing renews". **But `data.da.ts`,
  `data.sv.ts` and `data.th.ts` contain none of it** — zero matches for aftercare
  wording in all three.

  **A sequencing accident, not a judgement.** Item 33 shipped at 23:46 on 2026-08-21;
  `/sv` was built at 17:08 and `/da` at 22:49. Nobody propagated it afterwards.

  ⚠️ **On `/da` this is a hole in the argument, not a missing extra.** The hero's
  third sentence promises *"Ingen månedlige gebyrer, du ikke har bedt om"* — no
  monthly fees you didn't ask for — which raises the retainer question and then never
  answers it. What changes cost is the second thing a shop owner asks, straight after
  the price, and item 33 exists precisely to answer it.

  Derive the figures from `services.aftercare` at render time, the way these pages
  already read metrics from `services` and `cases`, so a price can never drift
  between languages.

  **Note the pattern, worth a standing check:** 43 and 44 have the same cause — a
  decision landing on `/services` after the standalone language pages were written.
  Whenever `/services` gains an argument, ask what `/da`, `/sv` and `/th` now fail to
  say.

- [ ] **28. [C] Danish copy proofread by a native speaker.** ⚠️ **STILL BLOCKING
  PUBLICATION — but no longer blocking the build.** ⚠️ **Do item 43 first** — it fixes the
  card the proofreader sees when they open the link. Item 44 is already done and its
  Danish is in the export, which is why the count moved from 81 lines to 93. A page whose whole argument is
  "I do careful work" is destroyed by one clumsy Danish sentence. Danes spot it in
  the first line.

  What changed is only the order: item 27 now produces the draft first, so the ask
  to a Dane is a concrete one — *"read these forty sentences"* — rather than a
  request to write a page. That is a far smaller favour, and a far easier one to
  get said yes to.

  ✅ **The deliverable now exists: `npm run copy da`.** Prints all 81 Danish lines
  as numbered plain text grouped by section, so a corrector can reply "3.2 should
  be X" and nothing has to be described twice. Works for `th` and `sv` too, so
  item 40 gets the same thing.

  Deliberately **not** a two-column table with the English alongside: a
  proofreader given both columns checks fidelity to the English, while one given
  only the Danish judges whether it reads like Danish — which is the actual
  question. Send the text, and the URL only if they want to see it in place.


- [x] **29. [C] Surface the meeting-language line prominently on `/da`, in Danish.**
  ✅ *done inside item 27, which was the point of folding it in — it had to be in
  the draft the proofreader reads, not a second round for one paragraph.*

  In the hero, in a highlighted block, not an FAQ: *"Siden bliver på dansk — det er
  dine kunder, der skal læse den, ikke mig. Selve samtalerne tager vi på engelsk…
  Sproget i møderne og sproget på siden er to forskellige ting, og jeg vil hellere
  sige det på forhånd end lade dig opdage det undervejs."*

  And the second half honoured: **no phone number anywhere on the page** and a
  written-first contact block, so nothing implies a Danish phone call. `why` also
  makes the narrowest true claim available — one Danish site, one client, still
  running — rather than anything that reads as Danish fluency.


- [x] **30. [S] hreflang + `lang`.** ✅ *`d5faf81`* — reciprocated both ways.

- [x] **30b. [S] Make `/th` discoverable.** ✅ *`e346d00`* — nav chip + Thai-browser offer banner. ⚠️ **Was wrongly deferred — this is a
  defect, not a nicety.** Ice caught it: *"how do people access my Thai version?"*

  The reasoning for deferring it ("the channel is Facebook, not on-site") covered
  the wrong half of the problem. What is actually true:

  - **Search is partly covered.** hreflang is reciprocated, so Google can serve
    `/th` to a Thai-language searcher, and `/th` is in the sitemap so it can rank
    on Thai queries in its own right. That mechanism works.
  - **On-site is completely broken.** A Thai visitor who lands on `/` — from a
    Google result in English or Danish, a referral, or a business card — has **no
    signal that `/th` exists at all.** That is precisely the person the page was
    built for, and they bounce.

  Two parts, both needed:

  1. **An always-visible language link**, including below `sm`, since this audience
    is overwhelmingly on phones. The pill nav has roughly 50px of headroom at
    360px, which "ไทย" only just fits. Cheapest fix that stays honest: drop `Work`
    from the compact set (the page scrolls straight into it) and spend the room on
    the language link instead.
  2. **A dismissible offer banner** shown only when `navigator.language` starts
    with `th`: *"ดูหน้าภาษาไทย →"*. Highest-conversion pattern for exactly this
    problem and it costs no nav space.
    **Never auto-redirect** — it breaks the back button, hides the English page
    from users who wanted it, and search engines treat language-based redirects as
    cloaking risk. Offer, do not decide for them.

  Build it for N languages, because `/da` will need the same affordance.

  *Related: item 25b (Thai OG card) is the other half of this — `/th` currently
  shares with the English card, which weakens the one channel that does work.*

- [x] **31. ~~Find the 3–5 Facebook groups where Thai business owners in Denmark
  and Sweden actually are.~~ ❌ DROPPED — Ice's call, 2026-08-21.**
  Closed rather than deleted so it does not return as a fresh idea. ⚠️ Worth
  being clear about the consequence: `/th` is live, indexed, and has a proper
  Thai share card, but **it was built to be pasted into a group** — that was the
  channel the whole page assumed. Without one it now rests on search alone, which
  is the weaker half for that audience. Nothing to fix in code; it just means
  `/th` will be slower than `/sv`, which was written for search from the start.


- [x] **32. [N] `/sv` — Swedish landing page.** ✅ *shipped* — no longer parked.
  Ice's call on 2026-08-21: "if it doesn't take much effort and time, let's just
  do it." It did not, and the reason is worth keeping — **Swedish has no
  proofreading gate.** Ice writes it fluently, so he is the native reviewer and
  the correction loop is a conversation rather than a dependency. That is the
  whole difference between this and `/da`, which is still blocked on item 28.


### Block 7 — Open business decisions

- [x] **33. [H] Optional care plan — DECIDED: a prepaid block of hours, and NO
  subscription.** ✅ *Ice's call, 2026-08-21.* Live on `/services` as its own
  section, 15/15 checks.

  **The market research is what settled it.** Danish agencies sell website care at
  **250 – 3.000 kr a month**, typically 500 – 2.000. But read what is inside those
  plans and they are all one product: hosting, security patches, daily backups,
  **WordPress core and plugin updates**. That plan exists because WordPress rots.
  A Webflow site is maintained by Webflow, and a static site on Netlify has no
  plugins to patch — so a monthly plan here would charge for a problem this stack
  deliberately does not have, and it would undercut the exact technical choice
  that makes "no yearly bill" true in the section directly above it.

  🔒 **So the product is CHANGES, not maintenance.** That is also what clients
  actually want, and it closes the thing the old position left dangling — what a
  ten-minute text change costs:

  | | Price | |
  |---|---|---|
  | Small changes | **Free** | A price, an opening hour, a typo. A 100 kr invoice costs more in admin than it earns — this is the 50–100 kr edit fee question, answered. |
  | Anything bigger | **650 DKK/h** | Billed in half hours, estimate given first. Inside the Danish freelance band (550–750) and above offer 01's implied project rate, which is correct: ad-hoc work has no economies of scale. |
  | A block | **2.400 DKK** | 5 hours, 12 months, rolls over once. **480 kr/h against 650** — the discount is what makes prepaying a decision rather than a favour. |

  ⚠️ **If a future version of this ever grows a recurring charge**, then
  `runningCosts.paidTo` ("I do not invoice you again unless you ask me for more
  work") and the "no monthly retainer" line in `servicesFaq` both become false and
  must change in the same commit. Verified consistent across `data.ts`, the FAQ,
  the chatbot grounding and `llms.txt`.

  **Rejected:** an optional annual plan (real recurring revenue, but softens the
  strongest line on the page, and launching a subscription product for one existing
  client is premature); both together (two products to explain on a page that
  already runs long); and doing nothing (leaves the edit-fee question open).


- [x] **34. ~~Later: the `.xyz` domain.~~ ❌ DROPPED — Ice's call, 2026-08-21.**
  Already paid for, and he is aware of the trust tradeoff with Danish
  small-business clients. Closed rather than deleted so it does not get
  re-raised as a new idea.


### Block 11 — Thai proofread (in progress)

- [ ] **40. [H] Proofread `app/data.th.ts` with Ice.** ⚠️ **The gate on sharing `/th`
  anywhere.** 83 lines of live Thai copy, all Claude drafts. Being reviewed in four
  chunks; **chunk 1 (the hero, 6 strings) was presented on 2026-08-20 and is awaiting
  his corrections.** Remaining chunks: 2 pricing + proof, 3 process + contact,
  4 form labels + validation messages.

  **Four questions raised in chunk 1, still unanswered — ask these first on resume:**
  1. **`ไอซ์`** — is that how Ice writes his own nickname in Thai? Appears in the
     hero body and in Racha's translated quote.
  2. **`ร้าน` in the h1.** Warm and concrete, but a cleaning business is not really a
     ร้าน. Is `ธุรกิจไทย` more accurate even though colder?
  3. **Politeness register is inconsistent across the file, and this is the biggest
     issue.** The hero body ends `ครับ`; the "why me" list does not. Most validation
     messages carry `ครับ`, two do not. **Get the rule from Ice, then apply it
     everywhere in one pass** rather than string by string.
  4. Do the two long hero paragraphs read naturally spoken, or like translated
     English?

  Extract every Thai string in file order with:
  `grep -n '[ก-๙]' app/data.th.ts`

### Block 10 — Navigation and hero polish
*All from Ice's viewport pass, which closed most of the layout debt.*

- [x] **37. [N] Replace the pill nav with something better than a hamburger.** ✅ *`8f432fe`* — **needs a look; it is interactive.**
  Ice's ask, and he is right that the pill is at its limit — five links plus a CTA
  plus a language chip, with `compactHidden` juggling three of them below `sm`.

  **Recommended: a full-screen overlay driven by a minimal mark.** Not three lines —
  something quieter (two short rules, a 2×2 dot grid, or just the word `Menu`).
  Opening it fills the viewport and sets the links in the **same oversized uppercase
  type as the hero marquee**, which is the site's actual signature. It matches the
  design language rather than importing a generic pattern, and it **ends the width
  problem permanently** — no more deciding which links survive at 320px.

  Alternatives considered: a thin left vertical rail (very editorial, but rotated
  labels cost readability and it eats mobile width); a bottom dock on mobile
  (thumb-reachable and app-like, but less distinctive — pairs with the overlay
  rather than replacing it).

  **Must not lose in the rewrite:** scroll-spy on the hash links, the language link
  being reachable on mobile, keyboard focus trapping while open, `Escape` to close,
  and `prefers-reduced-motion`. The current pill does all of these.

- [x] **38. [S] Hero corner blocks at the extremes.** ✅ *stacked below `sm`; the 744px nav overlap was resolved by item 37.* Two things from Ice's shots:
  - **360px:** the right block wraps to four ragged lines — *"Available for /
    projects / Copenhagen, / Denmark"* — squeezed by the `pr-14` that dodges the chat
    bubble, and it collides visually with the portrait.
  - **744px (iPad Mini):** the nav pill sits **directly across the portrait's eyes.**
    Worst possible position on the one screen that has to make a first impression.
    Item 37 may resolve this by itself, so sequence 37 first.

- [x] **39. [C] Stop "fixed price" reading as the only option.** ✅ *and it was not only wording — the chatbot and `llms.txt` were denying the day rate we sell.* Ice: *"what if some
  people want to pay hourly?"* Fair — `termsShort` states it as an absolute, and the
  offer 01 copy implies scope pricing is the only way in. Offer 02 is already a day
  rate, so the capability exists and is simply invisible from offer 01. One line
  ("fixed price by default; by the day where scope genuinely cannot be fixed") plus
  a pointer between the two offers. `priceNote` on offer 02 already says this after
  item 8 — surface it.

### Block 9 — Showing what more money buys

- [x] **36. [P] [C] Itemise the add-ons, at ONE price per add-on.** ✅ *shipped
  2026-08-21.* Seven add-ons priced individually on `/services` under offer 01,
  plus the two things that are deliberately **not** add-ons and one honest
  paragraph about the capabilities with no client build behind them.

  **It did not need item 33 after all.** The dependency I claimed was the edit-fee
  question, and this item's own text already scopes that out to 33. The add-on
  table and the recurring-revenue decision are independent.

  Prices set against the Danish market rather than invented (searched
  2026-08-21), sitting at or just under the agency floor — below it reads as
  inexperience, the same reasoning that put the base price above 5.000:

  | Add-on | Price | Basis |
  |---|---|---|
  | Edit your own text and images | 3.000 | No market figure. Derived from offer 01's own economics (~1.300–1.900 kr/day), a day and a half. Free on Webflow. |
  | A list you manage yourself | 3.500 | The item-7 CMS decision, priced. Needs Webflow's higher plan (~800 kr/yr) or is free to run on coded. |
  | A second language | 3.000 – 5.500 | **The one span**, tied to the two rungs above it. |
  | Online booking | 3.500 | Agencies quote 3.000 – 10.000. |
  | Take payment online | 5.000 | Agencies quote 5.000 – 10.000. |
  | Motion and animation | 2.500 | ~1 day. |
  | An extra page | 1.800 | Derived so it cannot undercut the ladder: 8 pages this way lands at 19.200 against a 20.000 ceiling. |

  🔒 **A second language is priced as a span on purpose, and it is the only one.**
  A flat figure was wrong at both ends — on a one-pager 4.500 was nearly the price
  of the whole site, and on an eight-pager it undercharged. It is the only add-on
  whose work genuinely tracks page count, because every page has to exist twice.
  The market model is proportional too: Danish agencies describe a second language
  as roughly doubling the content work, not as a fixed fee. **This is still "one
  price" in the sense the lock means — it does not fork by build method.**

  🔒 **The ladder's band is COMPUTED from the items** (`addOnBand(WEBSITE_ADD_ONS)`),
  not typed. It used to read `+ 3.000 – 8.000 DKK` against no itemisation; once the
  items existed, a hand-typed band was one edit away from advertising a floor or
  ceiling nothing behind it charged. Do not replace it with a literal.

  **Route 2 taken as well** (capability proof from his own products), in one
  paragraph: taking payment and anything with logins have no client build behind
  them, and the page says so and points at Bevisly and MockMate. Route 3 (build a
  demo) not taken, correctly — it is weeks of work.

  **Also updated so nothing contradicts the table:** the pricing FAQ now names the
  CMS and self-editing figures instead of saying "priced separately"; the chatbot
  grounding interpolates the whole list, so it can answer "how much for booking?"
  and is told not to imply a client build that does not exist; `llms.txt` was
  hand-edited, since it does not interpolate.

  ⚠️ **Known gap: the table is English-only.** `/th` and `/sv` render the price
  ladder, so they show the derived band — correct and non-contradictory, but not
  itemised. Worth doing when `/da` lands and there are three language pages to
  update at once.


### Block 8 — Projects page

- [x] **35. [N] Give projects their own route, and feature a subset on `/`.** ✅ *`92b9b85`*
  Ice's idea, and it fixes a real defect rather than only improving the page.

  **Two case studies are currently orphaned.** `cases` holds 7 entries but
  `projectCards` shows 5, so **`/cases/satoshi` and `/cases/cinema` are linked from
  nowhere on the site.** They build, they prerender, they sit in `sitemap.xml` — and
  no human or crawler can reach them by following a link. The only mention of
  Satoshi anywhere is a JSON-LD `workExample` pointing at the *external* live site,
  not the case study. Orphan pages get minimal crawl priority and no internal link
  equity, so this is an SEO leak as well as a dead end.

  **The shape:**
  - **`/projects`** — the full index, generated from `cases` so it can never fall
    out of sync again. Every case links to `/cases/[slug]`. Add to `sitemap.ts` and
    `llms.txt`.
  - **Homepage keeps the sticky-stack section** as *featured* work, with a
    "See all projects →" button into `/projects`.

  **✅ Decided by Ice: 3 featured, and the nav keeps the `#projects` hash.**

  **How many stay featured?** **3**, confirmed. The current five
  sticky cards occupy roughly 425vh of scrolling on their own, and the homepage has
  grown by two sections since (`HowItWorks`, plus the offers list). Racha ·
  Trailr · Bevisly covers client work, product and full-stack range in three.
  Ice's call — five still works, it is just long.

  **Nav:** keeps the `#projects` hash and its scroll-spy, confirmed. `/projects` is
  reached from the section's "See all projects →" button, not from the pill.

---

## 5. Suggested sequencing

| Phase | Items | Why this order |
|---|---|---|
| **0 — Unblock** | 5, 7, 21, 33 | Homework and decisions. Most are messages or a browser test, not code. Item 21 has the longest external latency — send it first. |
| **1 — Pricing** | 1, 2, 3, 4, 6, 8 | Everything downstream quotes these numbers. |
| **2 — Homepage flip** | 9, 10, 11, 12 | The actual pivot. Site starts reading as a freelancer's. |
| **3 — Page surgery** | 13, 14, 15, 16, 17 | Structural moves; low risk once copy is settled. |
| **4 — Conversion** | 18, 19, 20 | Additive. Safe to ship incrementally. |
| **5 — Proof** | 22, 23, 24 | Gated on item 21 landing. |
| **6 — Thai** | 25, 26, 31 | The niche play. Highest leverage remaining. |
| **7 — Discoverability** | 30b, 25b | `/th` exists but nothing points at it. Cheap, and it is what makes Block 6 actually pay off. |
| **8 — Projects** | 35 | Fixes two orphaned case studies and shortens the homepage. |
| **9 — Danish** | 27, 28, 29 | Gated on a native proofreader. |
| **10 — Later** | 32, 34 | Parked. |

---

## Appendix A — Research findings

*Recorded so we don't re-research. All figures as of 2026-08-17.*

### Webflow site plans (post May-2026 restructure)

| Plan | Billed yearly | Billed monthly | CMS? |
|---|---|---|---|
| Starter | Free | Free | No |
| Basic | $15/mo → **≈ 1.150 kr/yr** | $25/mo → ≈ 1.930 kr/yr | **No** |
| Premium | $25/mo → **≈ 1.930 kr/yr** | $39/mo → ≈ 3.010 kr/yr | Yes (20k items, 40 collections) |

Premium replaced the old CMS and Business plans on 13 May 2026.

### Danish market rates

- Simple 3–5 page site: **5.000–10.000 kr** from a freelancer, **10.000–25.000 kr** from an agency
- "Business card" sites, 3–10 pages: 8.500–16.500 kr
- Professional site generally: 6.000–30.000 kr
- Freelance hourly: **600–1.000 kr/h** · Agency hourly: 900–1.500 kr/h

### Danish hosting & domains

- one.com ≈ 19 kr/mo · Simply.com ≈ 29 kr/mo (Basic Suite rose to 69,95 kr/mo Jan 2026)
- → **≈ 230–840 kr/yr** for a Danish webhotel
- `.dk` domain: 70–120 kr/yr
- **So Webflow is 2–5× a Danish webhotel**, and infinitely more than the Netlify/Vercel free tier.

### Webflow freelancer market

- Webflow freelancers cluster at **$5–10k**; custom builds $15k+.
- But that's the market for *implementing someone else's Figma file* — a
  commodity service, and not what we sell. Noted so we don't take the discount
  argument at face value.

### The niche — market size

| | Denmark | Sweden |
|---|---|---|
| Thai-origin population | ~14,000 | **~64,000** (2019, SCB-derived; ~41,200 Thailand-born in 2017) |
| Thai massage salons | ~660 operating (1,443 ever registered) | **~2,000** (Swedish police estimate, 2022) |
| Local detail | Krak/DeGuleSider list only 65–70 — *most never got listed, which is itself the pitch* | Stockholm ~190 salons; **Helsingborg alone: 53 registered Thai therapists** |

Plus Thai restaurants, nail salons and cleaning businesses in both countries.
Call it **1,000+ Thai-owned micro-businesses within reach.** At 8 clients a year
that's a **0.8% conversion on a segment nobody else is talking to.**

**Why it's defensible:** a Danish or Swedish agency *cannot* sell into this
segment — the language and trust barrier runs both directions. And the real prize
is the referral loop: immigrant business communities buy almost entirely on word
of mouth inside the community. That's a compounding channel that can't be bought.

**Channel note:** they find things via **Facebook groups and each other**, not by
searching Google in Thai. `/th`'s job is to be the link someone drops in a group.

### Free CMS options for coded sites

- **Decap CMS** — MIT, free forever, no paid tier, git-based. Best fit for a
  static marketing site. Requires one-time setup.
- **Sanity** — free tier: 3 users, 2 datasets, 500k API requests/mo, 5 GB assets.
  Comfortably covers a small-business site.

### Sources

Webflow: [pricing announcement](https://webflow.com/blog/simplified-plans-and-updated-pricing-2026) ·
[Memberstack breakdown](https://www.memberstack.com/blog/new-webflow-pricing-in-2026-what-every-plan-costs-and-how-to-choose) ·
[freelancer rates](https://www.webflow.jobs/resources/webflow-freelancer-rates-2026)
Danish market: [webkonsulent.com](https://webkonsulent.com/artikler/hvad-koster-hjemmeside-danmark) ·
[hjemmesidekonsulent.dk](https://www.hjemmesidekonsulent.dk/artikel/hvad-koster-en-hjemmeside) ·
[webhotel priser](https://www.billig-webhosting.dk/webhotel-priser.php) ·
[Simply.com 2026 increase](https://webhotelsoversigt.dk/blog/ny-prisstigning-hos-simply-com/)
Niche: [Thai in Denmark](https://www.thailand-portalen.dk/thai-in-denmark/) ·
[Thai clinic registry](https://massageplus.dk/alle) ·
[Thai massage listings DK](https://www.degulesider.dk/thaimassage+danmark/firmaer) ·
[Thailändare i Sverige](https://sv.wikipedia.org/wiki/Thail%C3%A4ndare_i_Sverige) ·
[SVT: granskning av thai-salonger](https://www.svt.se/nyheter/lokalt/stockholm/granskning-av-thai-salonger) ·
[Integrationsbarometer](https://integrationsbarometer.dk/tal-og-analyser/INTEGRATION-STATUS-OG-UDVIKLING)
CMS: [Decap CMS](https://www.luckymedia.dev/insights/decap-cms) ·
[free headless CMS comparison](https://prismic.io/blog/best-free-headless-cms)

---

## Appendix B — Racha testimonial kit

**The bar is specificity, not formality.** A chat message is legally and
ethically sufficient — no signature needed. But *"can I use a quote?" → "yes!"*
is permission to **ask**, not approval of words written for her. She must say yes
to the **literal sentence**.

*Why it matters practically:* in a community this tight, a prospective client
will eventually ring Racha to check. If she reads the quote and thinks "I didn't
quite say that", that's worse than no testimonial at all.

> ⚠️ **The Thai below needs Ice's eye before sending** — especially the
> politeness register. `พี่` is a guess; adjust to however he actually addresses her.

### Draft quotes

**Option 1 — before / after** *(recommended: shows the outcome)*

> **TH:** "เมื่อก่อนมีแค่เฟซบุ๊ก ตอนนี้ลูกค้าเห็นบริการและราคาทั้งหมดได้เลยก่อนจะมา ไอซ์ทำเว็บให้เป็นภาษาเดนมาร์ก และใช้งานได้เรื่อยมาโดยที่ไม่ต้องโทรหาใครเลย"
>
> **EN:** "Before, I only had Facebook. Now my customers can see all my treatments and prices before they come. Ice built it in Danish, and it has just kept working without me having to call anyone."

**Option 2 — the money-and-trust fear** *(best for the niche)*

> **TH:** "ตอนแรกกังวลว่าเว็บไซต์จะแพงและจะดูแลเองไม่ได้ ไอซ์อธิบายทุกอย่างชัดเจน บอกราคาแน่นอนตั้งแต่ต้น และทุกอย่างเป็นชื่อของเราเอง ใช้งานได้ดีตั้งแต่วันแรก"
>
> **EN:** "At first I worried a website would be expensive and that I wouldn't be able to manage it. Ice explained everything clearly, gave me a fixed price from the start, and everything is in my own name. It has worked well since day one."

**Option 3 — short and blunt**

> **TH:** "ไอซ์ทำเว็บไซต์แรกให้ร้าน เร็ว เป็นภาษาเดนมาร์ก และตั้งแต่เปิดมาก็ไม่ต้องแก้อะไรหรือจ่ายเพิ่มเลย"
>
> **EN:** "Ice built my shop's first website. It's fast, it's in Danish, and since it launched I haven't had to fix anything or pay anyone extra."

### The message to send

```
พี่[ชื่อ] สวัสดีครับ 🙏

ผมกำลังทำเว็บไซต์ของตัวเองใหม่ครับ อยากขออนุญาตใส่ความเห็นสั้น ๆ จากพี่
เกี่ยวกับเว็บที่ผมทำให้ร้าน ถ้าพี่สะดวกนะครับ

ผมร่างไว้ 3 แบบ พี่เลือกแบบที่ตรงกับความรู้สึกพี่ที่สุดได้เลยครับ
หรือจะแก้คำก็ได้ — ถ้าพี่เขียนใหม่ด้วยคำของพี่เองจะดีที่สุดเลยครับ

1️⃣ [option 1]
2️⃣ [option 2]
3️⃣ [option 3]

ถ้าโอเคแบบไหน ตอบกลับมาบอกผมได้เลยครับว่า "โอเค ใช้ข้อ X ได้"

ผมจะใส่ชื่อร้าน Racha Beauty & Wellness กับชื่อพี่ไว้ข้างใต้ด้วยนะครับ
ถ้าไม่อยากให้ใส่ชื่อ บอกได้เลยครับ ไม่เป็นไรเลย 🙏
```

### What to capture

| | Why |
|---|---|
| Screenshot of her reply | The consent record. That's all that's needed. |
| The date | → `services.testimonial.approvedOn` |
| Explicit OK on name + business name | Publishing her name is personal-data processing; her yes covers it |
| Ask: can the Thai original be published? | So it can run in Thai on `/th` |

### Follow-up message — send *after* she says yes

Separate message on purpose; bundling makes the testimonial feel transactional.

```
ขอบคุณมากครับพี่ 🙏 ขอถามอีกสองเรื่องสั้น ๆ นะครับ

1. พี่พอรู้ไหมครับว่าคนไทยที่ทำธุรกิจในเดนมาร์กเขาคุยกันในกลุ่มเฟซบุ๊กกลุ่มไหนบ้าง?
   ผมอยากลองแนะนำตัวดูครับ
2. พี่พอรู้จักร้านไทยร้านอื่นที่ยังไม่มีเว็บไซต์ไหมครับ? ถ้ามีใครสนใจ
   ผมยินดีคุยให้ฟรีก่อนเลยครับ
```

---

## Appendix C — Design references

Four prompt PDFs in `~/Downloads/`. What to take from each:

| Reference | Already integrated? | What to take now |
|---|---|---|
| **Prompt portfolio overhaul** | ✅ Yes — this is the current site | Nothing new. The dark `#0C0C0C` editorial look stays. |
| **Prompt Personal Showcase** | ✅ Partially — the hero composition | Nothing new. The name-marquee-through-portrait is the site's best asset; keep it. |
| **Prompt Portfolio cosmic** | ✅ Partially | The footer's **"● Available for projects"** pulsing-dot pattern → item 9. |
| **Prompt AI designer portfolio** | ❌ Not integrated | **Structure only, not skin.** The hero pattern (short paragraph stack + two CTAs) → item 10. The offer → price → proof → CTA rhythm → items 11, 18. The closing full-width CTA slab. |

> ❌ **Do not build the testimonial carousel** from the AI-designer reference. It
> assumes five glowing quotes; we have zero approved. An empty or padded carousel
> is worse than none. Revisit if item 21 ever produces three or more.
>
> ❌ **Do not adopt its cream/white palette.** A re-skin is a week of work for
> zero conversion gain.
