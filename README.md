# Taninwat Kaewpankan — Portfolio

Single-page portfolio for **Ice** — Product Engineer & Project Coordinator, Copenhagen.

🌐 **Live:** [taninwatkaewpankan.xyz](https://taninwatkaewpankan.xyz)

---

## Current state — July 2026

One flat identity: **Product Engineer & Project Coordinator**. The old PM/Dev mode
toggle was removed; there is no longer any mode system, `ModeContext`, or
role-specific content variant. If you find a reference to one, it's stale.

The homepage is a single scrolling narrative:

```
Hero → Marquee → About → WhatIDo → Projects → CV → Garden → CopenhagenAtmosphere
```

**Recently added:** the `CV` section. The CV renders on-page from `cvData` and is
deliberately veiled — a scroll-driven CSS mask reveals ~12% → ~55% and stops. The
rest is behind the PDF download. Tuning constants live at the top of
`app/sections/CV.tsx`.

**Claim integrity:** every number and title on this site has to be defensible in an
interview. Millennial Consulting is **Operations Assistant → Operations Manager →
Head of Organization** (four cycles, ~20 client engagements, 90%+ satisfaction,
~5 projects and 25+ consultants per cycle). Don't inflate titles; the real
progression is the stronger story.

---

## Features

- **Single-page scroll narrative** with Framer Motion reveals throughout
- **Veiled CV section** — scroll-driven mask, PDF download for the full document
- **Case studies** — long-form project write-ups at `/cases/[slug]` with JSON-LD
- **Garden** — MDX-powered writing at `/garden/[slug]`, with interactive post tools
- **AI chatbot** — floating widget answering questions about Ice's background,
  grounded in `chatbotContext` + `experience` from `data.ts`
- **Contact form** — Resend-backed, rate-limited
- **SEO** — JSON-LD, Open Graph images, sitemap, robots.txt, `llms.txt`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Content | MDX via `next-mdx-remote` + `gray-matter` |
| AI | Vercel AI SDK + Groq |
| Rate limiting | Upstash Redis |
| Email | Resend |
| Fonts | Kanit, JetBrains Mono |
| Icons | lucide-react |
| Deployment | Netlify (`@netlify/plugin-nextjs`), auto-build from `main` |

---

## Project Structure

```
app/
├── sections/               # Homepage sections, rendered in order by page.tsx
│   ├── Hero.tsx            # Name, roleLabel, tagline, contact
│   ├── Marquee.tsx
│   ├── About.tsx           # Story + scroll-revealed "how I work"
│   ├── WhatIDo.tsx         # 3 capability blocks
│   ├── Projects.tsx        # Sticky-stacking project cards
│   ├── CV.tsx              # Veiled CV + PDF download
│   └── Garden.tsx
├── components/
│   ├── ChatWidget.tsx      # AI chat
│   ├── HireModal.tsx       # Contact + CV download
│   ├── Navbar.tsx, FadeIn.tsx, Magnet.tsx, AnimatedText.tsx
│   ├── CopenhagenAtmosphere.tsx   # Footer strip
│   └── post-tools/         # Interactive widgets embedded in MDX posts
├── cases/[slug]/           # Case study pages
├── garden/                 # Blog listing + [slug] pages
├── api/
│   ├── chat/               # Groq-backed chatbot
│   └── contact/            # Resend + Upstash rate limit
├── lib/posts.ts            # MDX loading
├── data.ts                 # ALL site content — single source of truth
└── page.tsx                # Homepage composition
posts/                      # MDX blog posts
public/assets/              # WebP images + Taninwat_Kaewpankan_CV.pdf
```

---

## Content model

**`app/data.ts` is the single source of truth.** Almost nothing is hardcoded in
components. Key exports:

| Export | Drives |
|---|---|
| `personalInfo` | Name, location, email, socials |
| `siteContent` | `roleLabel`, hero tagline, about story, `whatIDo`, CV link |
| `cvData` | The on-page CV — **mirrors the PDF one-to-one** |
| `experience` | Chatbot context only (not rendered to visitors) |
| `cases` | Case study pages |
| `projectCards` | Homepage project cards |
| `chatbotContext` | System prompt grounding for the AI widget |

⚠️ **`cvData` and `public/assets/Taninwat_Kaewpankan_CV.pdf` must stay in sync.**
If one changes, change the other. The page and the download are meant to be the
same document.

---

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build + type check
npm run lint
```

Deployment is automatic: **push to `main` → Netlify builds → production.** There is
no preview environment, so verify locally before pushing.

To check on a real phone, open the Network URL that `next dev` prints
(e.g. `http://192.168.0.219:3000`) on a device on the same Wi-Fi.

---

## Known open items

- [ ] Verify the CV veil on **real iOS Safari** — it relies on `mask-image`
      (`-webkit-` prefixed), which is the most browser-sensitive thing on the site
- [ ] Trailr bullet differs between `cvData` and the PDF (page says "…Nordisk Film
      and DR during this period", PDF says "Enterprise trials with Nordisk Film")
- [ ] The "hybrid Agile/waterfall adopted org-wide" claim appears in the Millennial
      case study and `posts/leading-volunteers.mdx`, but was deliberately dropped
      from the CV. Decide once, apply everywhere.
- [ ] No `CV` link in the Hero nav (4 items already; adding a 5th risks the mobile
      wrap that was fixed in `d576cef`)

---

## Content Management

See [`.agent/skills/content_manager/SKILL.md`](.agent/skills/content_manager/SKILL.md)
for the workflow on adding blog posts and case studies.
