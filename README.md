# Taninwat Kaewpankan, portfolio

The personal site of **Ice** (Taninwat Kaewpankan), Full-stack Engineer and Creative Developer in Copenhagen.

**Live:** [taninwatkaewpankan.xyz](https://taninwatkaewpankan.xyz)

## The idea

The site is built around one idea, *it comes into focus*. Everything starts as signal (glyphs, mono type) and crystallizes into the finished thing. The homepage runs as one sequence: a short loader, the hero, a statement, a door built from the page's own grid lines, and a hall where each project resolves out of loose glyphs as you walk past it.

The effects are decoration on complete HTML. Every page renders on the server and reads fully without JavaScript. With reduced motion, data saver, low device memory or no WebGL2, visitors get the same content without the effects.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Hero, statement, door, the glyph hall of five projects |
| `/cases/[slug]` | A case: facts, screens, numbers, the write-up, the next case |
| `/work` | Every project with a case page |
| `/about` | Background, what I do, the story |
| `/services` | Freelance web development with published prices |
| `/showroom` | Sample sites for made-up businesses, each with its price |
| `/contact` | Direct lines for roles, the project enquiry form |
| `/cv` | The CV, mirroring the PDF |

## Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | CSS Modules on design tokens (`app/world/tokens/crystallize.css`), Tailwind for utilities |
| Motion | GSAP with ScrollTrigger, Lenis smooth scroll |
| WebGL | three.js and React Three Fiber, loaded after the page is up |
| Type | Instrument Serif, Geist, Geist Mono via `next/font` |
| Forms | Resend for delivery, Upstash rate limiting |
| AI | Vercel AI SDK and Groq (`/api/chat`, kept for a planned "ask the site" layer) |
| Hosting | Netlify (`@netlify/plugin-nextjs`), production builds from `main` |

## Structure

```
app/
├── (world)/            # Every page: home, cases, work, about, services, showroom, contact, cv
├── world/              # The design system: tokens, fonts, shell, nav, footer, form, cards
│   └── effects/crystallize/   # Loader, scramble, reveal, door, hall (WebGL lazy-loaded)
├── api/                # services-enquiry (Resend, fails closed), chat (Groq)
├── lib/                # Enquiry validation, rate limiting, share-card rendering
└── data.ts             # All site content, the single source of truth
public/assets/          # Original screenshots and the CV PDF
public/world/           # 720 and 1280 px copies the site serves (npm run textures)
assets/fonts/           # Fonts for the generated share images and icons
```

## Content

`app/data.ts` holds every word and number on the site: `personalInfo`, `siteContent`, `cvData`, `cases`, `services` and each page's own lines. Components read from it rather than hard-coding copy.

`cvData` and `public/assets/Taninwat_Kaewpankan_CV.pdf` must stay in sync. `npm run cv` rebuilds the PDF from `cvData`.

Every claim on the site has to be defensible in an interview. No invented numbers, titles or testimonials.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build and type check
npm run lint
npm run textures   # after adding or replacing a screenshot in public/assets
npm run cv         # after changing cvData
```

Pushing to `main` deploys to production through Netlify.
