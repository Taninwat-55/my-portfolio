import { Geist, Geist_Mono, Instrument_Serif, Inter_Tight } from "next/font/google";

/**
 * The world's voices: a display face, a text face, and a mono for signal (the
 * labels, the agent logs and the glyph field itself; the crystallize motion is
 * literally mono turning into display). Loaded here rather than in the root
 * layout, like the stack's fonts, so only world pages download them.
 *
 * Pairing b's alternates are not preloaded: they only appear when the
 * prototype's switch selects them. JetBrains Mono (pairing b's mono) is
 * already loaded by the root layout as --font-jetbrains-mono, so it isn't
 * loaded twice. See world.config.ts for the pairings.
 */
export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

export const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-inter-tight",
  preload: false,
});

/** Every world font variable, for a layout's className. */
export const worldFontVariables = [geist, geistMono, instrumentSerif, interTight]
  .map((font) => font.variable)
  .join(" ");
