import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        background: "#F7F4F0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Warm glow top-right */}
      <div
        style={{
          position: "absolute",
          top: -120,
          right: -120,
          width: 560,
          height: 560,
          borderRadius: "50%",
          background: "rgba(196, 113, 62, 0.10)",
          filter: "blur(80px)",
          display: "flex",
        }}
      />
      {/* Subtle glow bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: -80,
          left: -80,
          width: 360,
          height: 360,
          borderRadius: "50%",
          background: "rgba(212, 137, 90, 0.07)",
          filter: "blur(60px)",
          display: "flex",
        }}
      />

      {/* Top row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* TK mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 52,
            height: 52,
            borderRadius: 12,
            background: "#1A1917",
            fontSize: 19,
            fontWeight: 700,
            color: "#F7F4F0",
            letterSpacing: "-0.5px",
            fontFamily: "Georgia, serif",
          }}
        >
          TK
        </div>

        {/* Availability pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            padding: "9px 20px",
            borderRadius: 100,
            border: "1px solid #D4CFC9",
            background: "#F0EDE8",
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
              color: "#6B6560",
              fontFamily: "monospace",
            }}
          >
            Open to opportunities · Copenhagen
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
            color: "#C4713E",
            fontFamily: "monospace",
            display: "flex",
          }}
        >
          Product Engineer
        </div>

        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            lineHeight: 0.95,
            letterSpacing: "-3px",
            color: "#1A1917",
            fontFamily: "Georgia, serif",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Taninwat</span>
          <span>Kaewpankan</span>
        </div>

        <div
          style={{
            fontSize: 22,
            color: "#3D3A36",
            lineHeight: 1.55,
            marginTop: 4,
            display: "flex",
          }}
        >
          Engineer who builds with product in mind.
        </div>

        {/* Tech tags */}
        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          {["React", "TypeScript", "Next.js", "Product Thinking"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                padding: "6px 14px",
                borderRadius: 6,
                border: "1px solid #E2DDD8",
                background: "#F0EDE8",
                fontSize: 13,
                color: "#6B6560",
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
          color: "#9E9892",
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
