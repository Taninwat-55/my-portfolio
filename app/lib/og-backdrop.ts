/**
 * The shared background for every OG share card.
 *
 * WHY THIS EXISTS. All four cards (/, /services, /th, /sv) drew their glow with
 * two absolutely-positioned circles carrying `filter: blur(...)`. In a browser
 * that looks right. Satori — the renderer behind next/og — clips a filter to the
 * element's own bounding box, so every one of those cards shipped with a hard
 * rectangular seam across it where the blur was cut off. Visible on all four, and
 * on the root card that is the first impression on every LinkedIn share.
 *
 * Two radial gradients on the container produce the intended look with no
 * filtered element to clip, so there is no box to leak an edge. It also removes
 * four copies of the same two divs.
 *
 * Returns a style object rather than a component because satori is happiest with
 * plain style objects and the container already exists on every card.
 */
export function ogBackdrop(accent: string) {
  return {
    backgroundColor: "#0C0C0C",
    backgroundImage: [
      // Top-right, in the card's own accent colour.
      `radial-gradient(circle 620px at 92% -6%, ${accent}, rgba(12, 12, 12, 0) 70%)`,
      // Bottom-left, a cool pale lift, the same on every card.
      `radial-gradient(circle 440px at 0% 106%, rgba(215, 226, 234, 0.11), rgba(12, 12, 12, 0) 70%)`,
    ].join(", "),
  } as const;
}

/** The accent each card glows with, kept together so they stay distinguishable. */
export const OG_ACCENT = {
  /** Warm copper — the homepage's "available" dot colour. */
  home: "rgba(196, 113, 62, 0.30)",
  /** Crystal blue, for the commercial and language pages. */
  crystal: "rgba(127, 200, 227, 0.26)",
} as const;
