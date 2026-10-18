import { Atkinson_Hyperlegible, Pixelify_Sans, Tiny5 } from "next/font/google";

/**
 * The stack's three voices. Loaded here rather than in the root layout so only
 * stack pages preload them; the paper pages keep Kanit.
 *
 * Chicago itself is out: ChicagoFLF has no verifiable licence or source
 * (checked 2026-10-18). Two OFL pixel faces share its job instead:
 *   - Pixelify Sans (--font-display) for card titles only. At display size it
 *     is the closest to Chicago's weight, but below about 28px its C closes
 *     into an O ("Read my OV"), so it never sets a label.
 *   - Tiny5 (--font-pixel) for every menu, button, heading and label: bold,
 *     compact, and its C, 5 and B stay distinct at 16 to 22px.
 * Atkinson Hyperlegible carries the reading text; a pixel face at paragraph
 * length is a costume, not a reading experience.
 */
export const display = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-display",
});

export const pixel = Tiny5({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-pixel",
});

export const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-atkinson",
});
