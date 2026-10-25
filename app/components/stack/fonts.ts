import { Atkinson_Hyperlegible, DotGothic16, JetBrains_Mono, Kanit, Pixelify_Sans } from "next/font/google";

/**
 * The stack's three voices. Loaded here rather than in the root layout so only
 * stack pages preload them; the paper pages keep Kanit.
 *
 * Chicago itself is out: ChicagoFLF has no verifiable licence or source
 * (checked 2026-10-18). Two OFL pixel faces share its job instead:
 *   - Pixelify Sans (--font-display) for card titles only. At display size it
 *     is the closest to Chicago's weight, but below about 28px its C closes
 *     into an O ("Read my OV"), so it never sets a label.
 *   - DotGothic16 (--font-pixel) for every menu, button, heading and label.
 *     It replaced Tiny5 on 2026-10-18: Tiny5 was correct but condensed, with
 *     pinhole counters that made "Business or company" a decoding job. This
 *     one is drawn on a 16px bitmap grid with open letters, so a label reads
 *     at a glance and still looks like a period system font.
 * Atkinson Hyperlegible carries the reading text; a pixel face at paragraph
 * length is a costume, not a reading experience.
 */
export const display = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-display",
});

export const pixel = DotGothic16({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel",
});

export const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-atkinson",
});

/**
 * Kanit and JetBrains Mono, which the stack's CSS still falls back to
 * (--font-kanit, --font-jetbrains-mono) and globals.css sets as the body
 * face. They sat in the root layout until 2026-10-25, which preloaded them on
 * the world pages too; here only stack pages get them. Only the weights in
 * use: light 300 · normal 400 · medium 500 · bold 700 · black 900. Mono is
 * not preloaded: nothing on first paint uses it.
 */
export const kanit = Kanit({
  subsets: ["latin"],
  variable: "--font-kanit",
  weight: ["300", "400", "500", "700", "900"],
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  preload: false,
});
