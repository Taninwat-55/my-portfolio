import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/**
 * The tab icon, in the Crystallize world since 2026-10-25 (it was the Stack's
 * pixel face): the display serif's I on ink, with the signal dot. Drawn at
 * 64px so it stays sharp on high-density screens.
 */
export default async function Icon() {
  const serif = await readFile(path.join(process.cwd(), "assets/fonts/instrument-serif-400.ttf"));
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        width: 64,
        height: 64,
        background: "#0f1012",
        color: "#f3f4f2",
        fontFamily: "Instrument Serif",
        fontSize: 60,
        lineHeight: 1,
      }}
    >
      I
      <div style={{ position: "absolute", right: 12, bottom: 14, width: 9, height: 9, borderRadius: 5, background: "#7dd3f5" }} />
    </div>,
    { ...size, fonts: [{ name: "Instrument Serif", data: serif, weight: 400, style: "normal" }] },
  );
}
