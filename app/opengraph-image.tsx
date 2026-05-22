import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#F7F4F0",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ width: 48, height: 4, background: "#C4713E", marginBottom: 40 }} />
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#1A1917",
            letterSpacing: "-2px",
            lineHeight: 1.1,
          }}
        >
          Taninwat Kaewpankan
        </div>
        <div style={{ fontSize: 28, color: "#C4713E", marginTop: 16, fontWeight: 500 }}>
          Software Engineer
        </div>
        <div style={{ fontSize: 20, color: "#9E9892", marginTop: 12 }}>
          Copenhagen, Denmark
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 80,
            right: 80,
            fontSize: 18,
            color: "#9E9892",
          }}
        >
          taninwatkaewpankan.xyz
        </div>
      </div>
    ),
    { ...size }
  );
}
