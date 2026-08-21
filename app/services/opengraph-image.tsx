import { ImageResponse } from "next/og";
import { ogBackdrop, OG_ACCENT } from "../lib/og-backdrop";
import { services } from "../data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Freelance web development in Copenhagen — websites, web app frontends, and redesign work, with published prices.";

/**
 * A services-specific card, because the root one inherits otherwise and it is
 * built for the wrong reader: it says "Open to opportunities" and "Hi, I'm Ice"
 * over a list of frameworks. Shared into a business owner's inbox or a Facebook
 * group, that reads as a job hunt.
 *
 * This one leads with what is sold and what it costs. The prices are read from
 * data.ts, so a card can never advertise a figure the page no longer charges.
 */
export default function ServicesOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          ...ogBackdrop(OG_ACCENT.crystal),
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Cool glow top-right — cooler than the root card's warm one, since
            clay is reserved for the "open to work" signal. */}

        {/* Top row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 52,
              height: 52,
              borderRadius: 12,
              background: "#D7E2EA",
              fontSize: 17,
              fontWeight: 700,
              color: "#0C0C0C",
              letterSpacing: "-0.5px",
            }}
          >
            ICE
          </div>

          <div
            style={{
              display: "flex",
              padding: "9px 20px",
              borderRadius: 100,
              border: "1px solid rgba(215, 226, 234, 0.2)",
              background: "rgba(255, 255, 255, 0.04)",
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(215, 226, 234, 0.6)",
              fontFamily: "monospace",
            }}
          >
            Copenhagen · Dansk · English · Svenska
          </div>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 13,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#7FC8E3",
              fontFamily: "monospace",
              display: "flex",
            }}
          >
            Freelance &amp; Client Work
          </div>

          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-3px",
              textTransform: "uppercase",
              color: "#BBCCD7",
              display: "flex",
            }}
          >
            Websites that work
          </div>

          <div
            style={{
              fontSize: 22,
              color: "rgba(215, 226, 234, 0.75)",
              lineHeight: 1.5,
              marginTop: 2,
              display: "flex",
            }}
          >
            Built in Webflow or coded from scratch. Fixed scope, fixed price.
          </div>

          {/* Price row — the whole reason this card exists. */}
          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            {services.offers.map((offer) => (
              <div
                key={offer.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  padding: "14px 18px",
                  borderRadius: 10,
                  border: "1px solid rgba(215, 226, 234, 0.15)",
                  background: "rgba(255, 255, 255, 0.04)",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "rgba(215, 226, 234, 0.45)",
                    fontFamily: "monospace",
                    display: "flex",
                  }}
                >
                  {offer.name}
                </div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: "#D7E2EA",
                    display: "flex",
                  }}
                >
                  {offer.priceRange}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            fontSize: 14,
            letterSpacing: "0.1em",
            color: "rgba(215, 226, 234, 0.4)",
            fontFamily: "monospace",
            display: "flex",
          }}
        >
          taninwatkaewpankan.xyz/services
        </div>
      </div>
    ),
    { ...size }
  );
}
