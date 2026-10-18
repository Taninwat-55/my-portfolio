# Bundled fonts

Used **only** by the share cards (`app/lib/og-card.tsx`, rendered by every
`opengraph-image.tsx`). The site itself loads its faces through `next/font`.

`next/og` renders through satori, which needs raw font bytes and supports
**ttf, otf and woff, not woff2**. `next/font/google` does not expose the files
it downloads, and everything it caches is woff2, so the share cards cannot reuse
them. These are static (non-variable) woff files, one per weight and subset.

| File | Role on the card |
| --- | --- |
| `pixelify-sans-latin-700.woff` | Card titles (as on the site) |
| `dotgothic16-latin-400.woff` | Menu bar, figures, the stack field |
| `atkinson-hyperlegible-latin-{400,700}.woff` | Body text and row labels |
| `chakra-petch-{thai,latin}-{400,700}.woff` | Every word on the `/th` card |

- **Source:** Fontsource's CDN (`cdn.jsdelivr.net/fontsource/fonts/<family>@latest/<subset>-<weight>-normal.woff`),
  which republishes the Google Fonts releases as static files. Fetched 2026-10-18.
- **Licence:** all four families are under the SIL Open Font License 1.1
  (`OFL.txt`), which allows bundling and redistribution with software.
