import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

/**
 * The world's voices: a display face, a text face, and a mono for signal (the
 * labels, the agent logs and the glyph field itself; the crystallize motion is
 * literally mono turning into display). Loaded here rather than in the root
 * layout, like the stack's fonts, so only world pages download them.
 *
 * Instrument Serif (display) with Geist (text) and Geist Mono (signal):
 * Ice chose this pairing over an all-grotesk one on 2026-10-25.
 */
export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

// Not preloaded: mono only sets small labels, and its fallback (size-matched
// by next/font) reads fine for the moment it takes to arrive. Each preload
// competes with the LCP for the first round trips on a slow phone.
export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  preload: false,
});

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

/** Every world font variable, for a layout's className. */
export const worldFontVariables = [geist, geistMono, instrumentSerif]
  .map((font) => font.variable)
  .join(" ");
