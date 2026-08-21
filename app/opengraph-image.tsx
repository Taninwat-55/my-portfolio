import { ImageResponse } from "next/og";
import { personalInfo, siteContent } from "./data";
import { ogBackdrop, OG_ACCENT } from "./lib/og-backdrop";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        ...ogBackdrop(OG_ACCENT.home),
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >

      {/* Top row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Ice mark */}
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

        {/* Availability pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            padding: "9px 20px",
            borderRadius: 100,
            border: "1px solid rgba(215, 226, 234, 0.2)",
            background: "rgba(255, 255, 255, 0.04)",
          }}
        >
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#C4713E",
              display: "flex",
            }}
          />
          <span
            style={{
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(215, 226, 234, 0.6)",
              fontFamily: "monospace",
            }}
          >
            {/* Was "Open to opportunities · Copenhagen". data.ts already
                explains why the page dropped that wording — to a business
                deciding whether to spend money, "open to work" says the person is
                between jobs, which invites them to negotiate the price down. The
                reasoning was applied to the hero and not to this card, which is
                the copy most people actually see first. */}
            {siteContent.heroCorners.right.status} ·{" "}
            {siteContent.heroCorners.right.place}
          </span>
        </div>
      </div>

      {/* Main content */}
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
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
          {/* Was "Frontend Engineer & Project Coordinator" — the hybrid title
              retired on 2026-08-22 for being unsearchable. The client register is
              right here rather than roleLabel, because a share card is read by a
              person, not by an ATS. */}
          {siteContent.siteTagline}
        </div>

        <div
          style={{
            fontSize: 84,
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: "-3px",
            textTransform: "uppercase",
            color: "#BBCCD7",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Hi, i&apos;m Ice</span>
        </div>

        <div
          style={{
            fontSize: 22,
            color: "rgba(215, 226, 234, 0.75)",
            lineHeight: 1.55,
            marginTop: 4,
            display: "flex",
          }}
        >
          {/* Was "I keep projects on track and build the product myself." —
              written for a hiring manager, on the card for a site that is now
              client-first. heroCorners.left is what the homepage itself says. */}
          {personalInfo.name} · {siteContent.heroCorners.left[0]}
        </div>

        {/* Tech tags */}
        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          {/* Left hard-coded on purpose: these are a deliberate four-tag pick for
              a 1200px card, not a mirror of cvData.skills, which has 30-odd
              entries and no notion of which matter most at a glance. */}
          {["React", "TypeScript", "Next.js", "Product Thinking"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                padding: "6px 14px",
                borderRadius: 6,
                border: "1px solid rgba(215, 226, 234, 0.15)",
                background: "rgba(255, 255, 255, 0.04)",
                fontSize: 13,
                color: "rgba(215, 226, 234, 0.6)",
                fontFamily: "monospace",
                letterSpacing: "0.04em",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: URL */}
      <div
        style={{
          fontSize: 14,
          letterSpacing: "0.1em",
          color: "rgba(215, 226, 234, 0.4)",
          fontFamily: "monospace",
          display: "flex",
        }}
      >
        taninwatkaewpankan.xyz
      </div>
    </div>,
    { ...size }
  );
}
