import { ImageResponse } from "next/og";
import { services } from "../data";
import { daContent as da, daUnits } from "../data.da";
import { ogBackdrop, OG_ACCENT } from "../lib/og-backdrop";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Hjemmeside til små virksomheder i Danmark — fast pris, og du ejer domæne, hosting og kode.";

/**
 * The Danish share card. ITEM 43.
 *
 * WITHOUT THIS FILE, /da INHERITED THE ROOT CARD — English, "Hi, i'm Ice" over a
 * list of frameworks. app/sv/opengraph-image.tsx already names that outcome as the
 * wrong first impression for a Nordic shop owner, which is the whole reason that
 * file exists; /da simply never got the same treatment, because it was built after
 * the share-card work rather than during it.
 *
 * ⚠️ `noindex` DID NOT PROTECT THIS. While DRAFT is true the only way anyone
 * reaches /da is a pasted link — which is exactly when a card renders — so the
 * item-28 proofreader was going to be the first person to ever see it.
 *
 * NOT MARKED AS A DRAFT, deliberately. The page itself carries an unmissable draft
 * banner and is excluded from search, so the card's job is to show what the page
 * genuinely is. A "kladde" badge here would also have to be removed at publish
 * time, which is one more thing to forget — and DRAFT is a local const in page.tsx,
 * not exported, so this file cannot read it without making the flag public.
 *
 * NO BUNDLED FONT, same as /sv and unlike /th. Danish is Latin plus æ ø å, all of
 * which next/og's default font covers. Kanit is shipped as raw ttf on /th only
 * because satori reads ttf/otf/woff but not woff2 and every Thai glyph rendered as
 * a tofu box without it.
 *
 * NO PRICE TRANSFORM, unlike /sv. The figures in data.ts are already written the
 * Danish way — "6.500", a dot for thousands — so they render correctly as-is.
 * svPrice() exists because a Swedish reader can parse "6.500" as six and a half.
 *
 * The background comes from ogBackdrop() rather than blurred circles — see the note
 * in app/lib/og-backdrop.ts for why every card that used those shipped with a hard
 * rectangular seam across it.
 */
export default function DanishOgImage() {
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
            {da.hero.eyebrow}
          </div>

          {/* 66, not the 78 that /sv and /th use. Danish is a longer language
              than Swedish for the same sentence — "Hjemmeside til din virksomhed"
              against "Hemsida till ditt företag" — and at 78 the title wrapped to
              two lines while the lead wrapped to a second as well, which left the
              card visibly more cramped than its siblings and put an ugly break
              mid-sentence. Tuned per language rather than shared, because the
              constraint is the string length, not the design. */}
          <div
            style={{
              fontSize: 66,
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#BBCCD7",
              display: "flex",
            }}
          >
            {da.hero.title}
          </div>

          <div
            style={{
              fontSize: 26,
              color: "rgba(215, 226, 234, 0.75)",
              display: "flex",
            }}
          >
            {da.hero.lead}
          </div>
        </div>

        {/* Price row, read from services.offers so a shared card can never
            advertise a figure the page no longer charges. daUnits() translates
            the scope's unit word — "1–3 pages" becomes "1–3 sider" — while the
            numerals keep coming from data.ts. */}
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
                  {daUnits(rung.scope)}
                </div>
                <div style={{ fontSize: 26, color: "#D7E2EA", display: "flex" }}>
                  {rung.price}
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
            taninwatkaewpankan.xyz/da
          </div>
        </div>
      </div>
    ),
    size
  );
}
