import { ImageResponse } from "next/og";
import { services } from "../data";
import { svContent as sv, svUnits, svPrice } from "../data.sv";
import { ogBackdrop, OG_ACCENT } from "../lib/og-backdrop";

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
 * The background comes from ogBackdrop() rather than blurred circles — see the
 * note in app/lib/og-backdrop.ts for why every card that used those shipped with
 * a hard rectangular seam across it.
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
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          ...ogBackdrop(OG_ACCENT.crystal),
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 26, color: "#7FC8E3", display: "flex" }}>
            {sv.hero.eyebrow}
          </div>

          <div
            style={{
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#BBCCD7",
              display: "flex",
            }}
          >
            {sv.hero.title}
          </div>

          <div
            style={{
              fontSize: 30,
              color: "rgba(215, 226, 234, 0.75)",
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
                  border: "1px solid rgba(215, 226, 234, 0.15)",
                  background: "rgba(255, 255, 255, 0.04)",
                }}
              >
                <div
                  style={{
                    fontSize: 20,
                    color: "rgba(215, 226, 234, 0.5)",
                    display: "flex",
                  }}
                >
                  {svUnits(rung.scope)}
                </div>
                <div style={{ fontSize: 26, color: "#D7E2EA", display: "flex" }}>
                  {svPrice(rung.price)}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              fontSize: 22,
              color: "rgba(215, 226, 234, 0.4)",
              display: "flex",
            }}
          >
            taninwatkaewpankan.xyz/sv
          </div>
        </div>
      </div>
    ),
    size
  );
}
