# Bundled fonts

## Kanit-SemiBold.ttf

Used **only** by `app/th/opengraph-image.tsx`.

`next/og` renders through satori, which needs raw font bytes and supports
**ttf, otf and woff — not woff2**. `next/font/google` does not expose the files it
downloads, and everything it caches is woff2, so the OG route cannot reuse them.
Without this file every Thai character on the `/th` share card renders as a tofu
box, which is worse than no card at all on a page whose whole channel is being
pasted into Facebook groups.

Kanit rather than Noto Sans Thai because Kanit is already the site's body
typeface (`--font-kanit`, see `app/layout.tsx`), so the card matches the page.

- **Source:** <https://github.com/google/fonts/tree/main/ofl/kanit> (canonical
  upstream — Google Fonts' CSS endpoint serves woff2 to modern clients and EOT to
  old ones, never a usable ttf)
- **Version:** v17, SemiBold (600). One weight only; the card needs no others.
- **Licence:** SIL Open Font License 1.1 — see `OFL.txt`. Bundling and
  redistribution are permitted; the licence file must travel with the font.
- **Coverage checked:** 87 of the 91 assigned codepoints in U+0E01–U+0E5B, plus
  Latin. The four absent are unassigned in Unicode.

Not in `public/` on purpose: it is read at build time by the OG route and should
never be served to visitors as a static asset.
