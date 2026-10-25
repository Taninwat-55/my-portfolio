import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** The home-screen icon: app/icon.tsx at 180px, with room for the name. */
export default async function AppleIcon() {
  const serif = await readFile(path.join(process.cwd(), "assets/fonts/instrument-serif-400.ttf"));
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        width: 180,
        height: 180,
        background: "#0f1012",
        color: "#f3f4f2",
        fontFamily: "Instrument Serif",
        fontSize: 92,
        lineHeight: 1,
      }}
    >
      Ice
      <div style={{ width: 14, height: 14, borderRadius: 7, background: "#7dd3f5", marginTop: 40 }} />
    </div>,
    { ...size, fonts: [{ name: "Instrument Serif", data: serif, weight: 400, style: "normal" }] },
  );
}
