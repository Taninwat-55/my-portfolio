import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { clockContent, personalInfo, siteContent } from "./data";
import { ogBackdrop, OG_ACCENT } from "./lib/og-backdrop";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const DISC = 420;

/**
 * The homepage's share card, matching the clock homepage: Ice's portrait on its
 * disc on the right, who and what on the left.
 *
 * The portrait is a PNG because next/og (satori) cannot decode WebP. It is read
 * from disk at build time, since this route is prerendered.
 */
export default async function OgImage() {
  const portrait = await readFile(path.join(process.cwd(), "public/clock/face-neutral.png"));
  const portraitSrc = `data:image/png;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        ...ogBackdrop(OG_ACCENT.home),
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "64px 72px 64px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Left: who and what */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          width: 620,
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

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              display: "flex",
              fontSize: 14,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#7FC8E3",
              fontFamily: "monospace",
            }}
          >
            {/* The job title, not the client tagline: the homepage now leads
                with it, and the share card should say what the page says. */}
            {siteContent.roleLabel} · Copenhagen
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-3px",
              textTransform: "uppercase",
              color: "#BBCCD7",
            }}
          >
            Hi, I&apos;m Ice
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "rgba(215, 226, 234, 0.85)" }}>
            {personalInfo.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              lineHeight: 1.45,
              color: "rgba(215, 226, 234, 0.6)",
              maxWidth: 560,
            }}
          >
            {clockContent.availability}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
            {/* A deliberate four-tag pick for a 1200px card, not a mirror of
                cvData.skills. PostgreSQL is here because the title is full-stack. */}
            {["React", "TypeScript", "Next.js", "PostgreSQL"].map((tag) => (
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

        <div
          style={{
            display: "flex",
            fontSize: 14,
            letterSpacing: "0.1em",
            color: "rgba(215, 226, 234, 0.4)",
            fontFamily: "monospace",
          }}
        >
          taninwatkaewpankan.xyz
        </div>
      </div>

      {/* Right: the portrait on its disc, as on the homepage */}
      <div
        style={{
          display: "flex",
          position: "relative",
          width: DISC,
          height: DISC,
          borderRadius: "50%",
          backgroundImage: "radial-gradient(circle at 50% 40%, #2b3843, #1c252d 72%)",
          border: "1px solid rgba(127, 200, 227, 0.14)",
        }}
      >
        {/* A plain <img>: satori renders it, next/image does not apply here. */}
        <img src={portraitSrc} width={DISC} height={DISC} alt="" style={{ position: "absolute", left: 0, top: 0 }} />
      </div>
    </div>,
    { ...size },
  );
}
