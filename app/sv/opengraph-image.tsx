import { ImageResponse } from "next/og";
import { services } from "../data";
import { svContent as sv, svUnits, svPrice } from "../data.sv";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Hemsida till småföretag i Skåne — fast pris, du äger allt. Malmö, Lund, Helsingborg.";

/**
 * The Swedish share card.
 *
 * Without one, /sv would inherit the root card, which is in English and says
 * "Hi, i'm Ice" over a list of frameworks — the wrong first impression for a
 * Skåne shop owner.
 *
 * NO BUNDLED FONT HERE, unlike /th. Kanit had to be shipped as raw ttf because
 * satori reads ttf/otf/woff but not woff2, and every Thai glyph rendered as a
 * tofu box without it. Swedish is Latin with three diacritics (å ä ö), which
 * next/og's default font covers, so a font file would be weight for nothing.
 *
 * Since the re-theme (Phase 5) it is a paper sheet on the dark desk, like the
 * page it shares, rather than ogBackdrop()'s glow.
 */
export default function SwedishOgImage() {
  const ladder = services.offers[0].priceLadder;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
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
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 26, color: "#286a87", display: "flex" }}>
            {sv.hero.eyebrow}
          </div>

          <div
            style={{
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#1d2731",
              display: "flex",
            }}
          >
            {sv.hero.title}
          </div>

          <div
            style={{
              fontSize: 30,
              color: "#5a6672",
              display: "flex",
            }}
          >
            {sv.hero.lead}
          </div>
        </div>

        {/* Price row, read from services.offers so a shared card can never
            advertise a figure the page no longer charges — and put through
            svPrice() so the thousands separator is the Swedish one here too. */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
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
                  {svUnits(rung.scope)}
                </div>
                <div style={{ fontSize: 26, color: "#1d2731", display: "flex" }}>
                  {svPrice(rung.price)}
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
            taninwatkaewpankan.xyz/sv
          </div>
        </div>
        </div>
      </div>
    ),
    size
  );
}
