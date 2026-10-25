# Bundled fonts

Used **only** by the generated images: the share cards (`app/lib/og-card.tsx`,
rendered by every `opengraph-image.tsx`) and the icons (`app/icon.tsx`,
`app/apple-icon.tsx`). The site itself loads its faces through `next/font`
(`app/world/fonts.ts`).

`next/og` renders through satori, which needs raw font bytes and supports
**ttf, otf and woff, not woff2**, and only static (non-variable) files: a
variable Geist Mono dropped the connection (2026-10-25). `next/font/google`
caches only woff2, so the images cannot reuse the site's files.

| File | Role | Source |
| --- | --- | --- |
| `instrument-serif-400.ttf` | Display: names, titles, figures | github.com/google/fonts (`ofl/instrumentserif`) |
| `geist-mono-latin-400.woff` | Mono: labels, prices, the address | Fontsource CDN (`cdn.jsdelivr.net/fontsource/fonts/geist-mono@latest/latin-400-normal.woff`), a static copy of the Google Fonts release |

- **Fetched:** 2026-10-25, with Ice's OK.
- **Licence:** both families are under the SIL Open Font License 1.1
  (`OFL.txt`), which allows bundling and redistribution with software.
