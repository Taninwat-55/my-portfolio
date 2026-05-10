# Taninwat Kaewpankan — Portfolio

Personal portfolio website with a **dual-mode PM / Dev toggle**, allowing visitors to switch between a Product Manager-focused and a Frontend Developer-focused narrative.

🌐 **Live site:** [taninwatkaewpankan.xyz](https://taninwatkaewpankan.xyz)

---

## Features

- **PM / Dev Mode Toggle** — Switches hero copy, about text, skills order, experience descriptions, project descriptions, and CV download link based on the selected role
- **Mode persistence** — Selected mode is saved to `localStorage` and survives page refresh
- **Blog** — MDX-powered blog with syntax highlighting and SEO metadata
- **Dark / Light mode** — System-aware theme with manual toggle
- **Fully responsive** — Mobile-first layout with accessible navigation
- **SEO optimized** — Structured data (JSON-LD), Open Graph, sitemap, and robots.txt
- **95+ Lighthouse scores** — Optimized images (WebP), font loading, and static generation

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Content | MDX (blog posts) |
| Fonts | Inter, Orbitron, Share Tech Mono (Google Fonts) |
| Analytics | Google Tag Manager |
| Deployment | Netlify |

---

## Project Structure

```
app/
├── context/
│   └── ModeContext.tsx     # PM/Dev mode state + localStorage
├── components/
│   ├── ModeToggle.tsx      # Animated pill toggle
│   ├── Navbar.tsx          # 3-column navbar (logo | links | actions)
│   ├── theme-toggle.tsx    # Dark/light mode toggle
│   └── SkipLink.tsx        # Accessibility skip link
├── blog/                   # Blog listing + dynamic [slug] page
├── projects/               # Full project archive
├── data.ts                 # All content (mode-specific variants)
├── page.tsx                # Home page
└── layout.tsx              # Root layout with providers
posts/                      # MDX blog post files
public/assets/              # Images (WebP) + mode-specific CV PDFs
```

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view locally.

```bash
npm run build   # Production build + type check
```

---

## Content Management

See [`.agent/skills/content_manager/SKILL.md`](.agent/skills/content_manager/SKILL.md) for the workflow on adding new blog posts and projects.

---
