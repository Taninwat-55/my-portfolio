import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

/**
 * The share cards (opengraph-image.tsx on / and /services), in the
 * Crystallize world since 2026-10-25: paper, the drawn column hairlines, a
 * mono label row, the display serif. The colours are the world's tokens
 * (app/world/tokens/crystallize.css), written out because satori reads no
 * CSS variables.
 *
 * Satori needs ttf, otf or woff (never woff2), so the faces are bundled in
 * assets/fonts rather than read from next/font. See assets/fonts/README.md.
 */

export const OG_SIZE = { width: 1200, height: 630 };

const PAPER = "#f3f4f2";
const INK = "#0f1012";
const LINE = "#c9ccc8";
const MUTED = "#5c6166";
const SIGNAL = "#0b6e99";
const MARGIN = 64;
const COLS = 12;

const file = (p: string) => readFile(path.join(process.cwd(), p));

/** Read once per build, shared by every card. */
const assets = Promise.all([file("assets/fonts/instrument-serif-400.ttf"), file("assets/fonts/geist-mono-latin-400.woff")]);

/** The card faces by role, matching the site: display serif, mono signal. */
export const OG_FONT = { display: "Instrument Serif", mono: "Geist Mono" } as const;
export const OG_COLOR = { ink: INK, muted: MUTED, signal: SIGNAL, line: LINE } as const;

/** A small mono label, as the site sets its kickers. */
export function OgLabel({ children, color = MUTED }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ display: "flex", fontFamily: OG_FONT.mono, fontSize: 20, letterSpacing: 1.6, color }}>
      {children}
    </div>
  );
}

/** A receipt row: label, dotted leader, figure. */
export function OgRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 14 }}>
      <div style={{ display: "flex", fontFamily: OG_FONT.display, fontSize: 36 }}>{label}</div>
      <div style={{ display: "flex", flexGrow: 1, borderBottom: `2px dashed ${MUTED}`, marginBottom: 10 }} />
      <div style={{ display: "flex", fontFamily: OG_FONT.mono, fontSize: 24 }}>{value}</div>
    </div>
  );
}

export async function worldOgImage(content: React.ReactNode, label: string) {
  const [serif, mono] = await assets;
  const colWidth = (OG_SIZE.width - MARGIN * 2) / COLS;

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        position: "relative",
        width: OG_SIZE.width,
        height: OG_SIZE.height,
        background: PAPER,
        color: INK,
      }}
    >
      {/* The drawn grid: one hairline per column edge, the world's material. */}
      {Array.from({ length: COLS + 1 }, (_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: MARGIN + i * colWidth,
            width: 1,
            background: LINE,
          }}
        />
      ))}

      {/* The nav row: what the card is, and the address. */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: MARGIN,
          right: MARGIN,
          display: "flex",
          justifyContent: "space-between",
          fontFamily: OG_FONT.mono,
          fontSize: 20,
          letterSpacing: 1.6,
        }}
      >
        <div style={{ display: "flex" }}>{label.toUpperCase()}</div>
        <div style={{ display: "flex" }}>TANINWATKAEWPANKAN.XYZ</div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 110,
          left: MARGIN,
          right: MARGIN,
          bottom: 56,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        {content}
      </div>
    </div>,
    {
      ...OG_SIZE,
      fonts: [
        { name: OG_FONT.display, data: serif, weight: 400, style: "normal" },
        { name: OG_FONT.mono, data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
