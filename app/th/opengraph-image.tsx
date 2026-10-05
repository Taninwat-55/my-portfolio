import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { services } from "../data";
import { thContent as th, thUnits } from "../data.th";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "รับทำเว็บไซต์ให้ธุรกิจไทยในเดนมาร์กและสวีเดน — ร้านอาหาร ร้านนวด ร้านทำเล็บ ร้านทำความสะอาด";

/**
 * The Thai share card.
 *
 * This one matters more than the other two. /th's channel is a link pasted into a
 * Facebook group, so for most of its audience the card IS the page — it is what
 * they see before deciding whether to tap. Until this existed, /th inherited the
 * root card, which is in English and says "Hi, i'm Ice" over a list of frameworks.
 *
 * The font is bundled rather than reused from next/font: satori needs raw bytes and
 * reads ttf/otf/woff but not woff2, and everything next/font caches is woff2. See
 * assets/fonts/README.md. Without it every Thai glyph renders as a tofu box.
 *
 * Read at module scope so the file is loaded once per build rather than once per
 * image; this route is static, so that is a single read in practice.
 */
const kanit = readFile(
  path.join(process.cwd(), "assets/fonts/Kanit-SemiBold.ttf")
);

export default async function ThaiOgImage() {
  const fontData = await kanit;
  const ladder = services.offers[0].priceLadder;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Kanit",
          // The dark desk, with one sheet of paper on it (re-theme, Phase 5).
          padding: 36,
          backgroundColor: "#0C0C0C",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "48px 60px",
            backgroundColor: "#f6f5f1",
            borderRadius: 8,
            boxShadow: "0 18px 40px rgba(0, 0, 0, 0.55)",
          }}
        >

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 26,
              color: "#286a87",
              display: "flex",
            }}
          >
            {th.hero.eyebrow}
          </div>

          <div
            style={{
              fontSize: 76,
              lineHeight: 1.25,
              color: "#1d2731",
              display: "flex",
            }}
          >
            {th.hero.title}
          </div>

          <div
            style={{
              fontSize: 30,
              color: "#5a6672",
              display: "flex",
            }}
          >
            {th.hero.lead}
          </div>
        </div>

        {/* Price row, read from services.offers so a shared card can never
            advertise a figure the page no longer charges. */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 12 }}>
            {ladder?.slice(0, 2).map((rung) => (
              <div
                key={rung.scope}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  padding: "16px 22px",
                  borderRadius: 12,
                  border: "1.5px dashed #c9d5e6",
                  background: "#ece9e2",
                }}
              >
                <div
                  style={{
                    fontSize: 20,
                    color: "#5a6672",
                    display: "flex",
                  }}
                >
                  {thUnits(rung.scope)}
                </div>
                <div style={{ fontSize: 26, color: "#1d2731", display: "flex" }}>
                  {rung.price}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              fontSize: 22,
              color: "#5a6672",
              display: "flex",
            }}
          >
            taninwatkaewpankan.xyz/th
          </div>
        </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Kanit",
          data: fontData,
          weight: 600,
          style: "normal",
        },
      ],
    }
  );
}
