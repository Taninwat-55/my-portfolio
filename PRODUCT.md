# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two primary audiences, weighted equally:

- **Hiring side:** recruiters and hiring managers at Danish product companies and startups, mostly Copenhagen. They are screening for a Full-stack Engineer (TypeScript) and decide in seconds whether Ice is worth a call. They often arrive from a CV, LinkedIn or a job application.
- **Client side:** small businesses, often local or Thai-run, who need a hand-built website. They arrive by search or referral, not by cold outreach. They want to know what it costs, what they get, and whether they can trust him.

Both read in English first; Thai, Swedish and Danish visitors have their own pages.

## Product Purpose

The personal site of Taninwat "Ice" Kaewpankan. It exists to get him hired as an engineer and to let freelance clients find and hire him without a sales conversation. Success means a recruiter books a call or a client sends an enquiry.

## Positioning

An engineer who has run things. Ice ships real product (frontend at Trailr AI, an AI startup; full-stack side projects Bevisly and MockMate) and, before that, led operations and people at Millennial Consulting, rising from Operations Assistant to Head of Organization. Four languages, built from zero after moving to Sweden at 16 with no Swedish. Most junior engineers can claim the code; few can truthfully claim the delivery and people side too.

## Operating Context

- Recruiters skim on a laptop between other candidates; clients often browse on a phone.
- The site is judged as a work sample in itself: as a frontend developer's portfolio, its craft is evidence.
- An AI chatbot answers questions about Ice, grounded in `app/data.ts`.
- Enquiries go through one endpoint (`/api/services-enquiry`, Resend, rate-limited), reached from the `/services` form and the stack's Build mine card (`/build`).

## Capabilities and Constraints

- Next.js 16 App Router, TypeScript, Tailwind v4, Framer Motion; deployed on Netlify from `main` with no preview environment.
- `app/data.ts` is the single source of truth for all content; `cvData` must mirror the CV PDF one to one.
- Four languages: English, Thai (`/th`), Swedish (`/sv`), Danish (`/da`).
- The headline title is **Full-stack Engineer**. "Web developer" is used only on `/services`, for the audience that searches for it.
- Performance rule: anything in the first viewport must render without waiting for hydration (`<FadeIn immediate>`); the default path once cost an LCP of 7.9s.
- Current homepage: "Ice's Stack", a one-bit HyperCard-style stack of cards (since 2026-10-18; DESIGN.md is the system of record). The work leads: the site exists to showcase projects and his design, frontend and engineering craft, not his life story. Older pages keep the paper-on-desk world until their phase 2 reskin.

## Brand Commitments

- Branded around the nickname **Ice**; visitors must understand Ice and Taninwat Kaewpankan are one person.
- **Claim integrity:** every number and title must be defensible in an interview. Never inflate titles; the real Millennial progression is the stronger story.
- Public copy: no em dashes, colons only before a list or example, no generic AI-sounding pleasantries.
- Thai cultural elements, where used, must be authentic, not plausible-looking placeholders.

## Evidence on Hand

- Case studies in `app/data.ts` (`cases`): Millennial Consulting, Trailr AI, Bevisly, MockMate, Satoshi Standard, Cinema Booking, Racha Beauty, Lumina Spa, Saep Fire Kitchen. Images in `public/assets/`.
- Millennial: four cycles, ~20 client engagements, 90%+ satisfaction, ~5 projects and 25+ consultants per cycle.
- Racha Beauty: a live client site that has run since launch without maintenance.
- Garden notes (MDX) in `posts/`.
- CV PDF at `public/assets/Taninwat_Kaewpankan_CV.pdf`.
- Published price ranges on `/services`.
- **Absent, must not be fabricated:** client testimonials (Racha's is pending), logos of companies he has not worked with, metrics not listed above.

## Product Principles

1. Proof over polish talk: show shipped work and real numbers, never decoration that implies more than is true.
2. Serve both audiences without making either feel like the afterthought; each should find its path in seconds.
3. The site is a work sample: its own craft, speed and accessibility are part of the argument.
4. Buyers come to him: the client side informs and invites, it never pushes or pressures.
5. Personality is allowed, but never at the cost of a recruiter finding the essentials fast.

## Accessibility & Inclusion

Keyboard and screen-reader use are expected (skip link exists). Multilingual visitors, including Thai script, must be supported in every surface.
