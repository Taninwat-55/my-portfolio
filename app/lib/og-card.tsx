import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

/**
 * The share cards (opengraph-image.tsx on /, /services, /th, /sv, /da), in the
 * stack's world: one bit, the desk, the menu bar, one ruled card. The desk
 * and card are a prerendered PNG (public/stack/og-desk.png, drawn by
 * scripts/dither-images.mjs) because satori cannot tile a stipple; this sets
 * the menu bar and the card's contents over it.
 *
 * Satori needs ttf, otf or woff (never woff2), so the faces are bundled in
 * assets/fonts as static woff files rather than read from next/font.
 */

export const OG_SIZE = { width: 1200, height: 630 };

/** Mirrors OG in scripts/dither-images.mjs: the card's box inside the backdrop. */
const CARD = { x: 56, y: 84, w: 1074, h: 500 };
export const OG_PAD = 52;
/** The card's inner box, after padding: where content goes. */
export const OG_INNER = { w: CARD.w - OG_PAD * 2, h: CARD.h - OG_PAD * 2 };

const root = process.cwd();
const file = (p: string) => readFile(path.join(root, p));
const dataUri = async (p: string) => `data:image/png;base64,${(await file(p)).toString("base64")}`;

/** Read once per build, shared by every card. */
const assets = Promise.all([
  file("assets/fonts/pixelify-sans-latin-700.woff"),
  file("assets/fonts/dotgothic16-latin-400.woff"),
  file("assets/fonts/atkinson-hyperlegible-latin-400.woff"),
  file("assets/fonts/atkinson-hyperlegible-latin-700.woff"),
  dataUri("public/stack/og-desk.png"),
  dataUri("app/icon.png"),
]);
const thaiFonts = Promise.all([
  file("assets/fonts/chakra-petch-thai-700.woff"),
  file("assets/fonts/chakra-petch-latin-700.woff"),
  file("assets/fonts/chakra-petch-thai-400.woff"),
  file("assets/fonts/chakra-petch-latin-400.woff"),
]);

/** The card faces by role, matching the site: display, pixel UI, body. */
export const OG_FONT = { display: "Pixelify", pixel: "DotGothic", body: "Atkinson" } as const;
/**
 * /th sets its words in Chakra Petch, as the page does. Figures stay in
 * DotGothic16: in bold Chakra Petch a 5 reads as an S ("6.S00 DKK"), and a
 * price is the one thing on the card that must not be misread.
 */
export const OG_FONT_TH = { display: "Chakra", pixel: "DotGothic", body: "Chakra" } as const;

export async function stackOgImage(content: React.ReactNode, { thai = false } = {}) {
  const [pixelify, dotgothic, atkinson400, atkinson700, desk, icon] = await assets;
  const fonts: NonNullable<ConstructorParameters<typeof ImageResponse>[1]>["fonts"] = [
    { name: "Pixelify", data: pixelify, weight: 700, style: "normal" },
    { name: "DotGothic", data: dotgothic, weight: 400, style: "normal" },
    { name: "Atkinson", data: atkinson400, weight: 400, style: "normal" },
    { name: "Atkinson", data: atkinson700, weight: 700, style: "normal" },
  ];
  if (thai) {
    const [th700, lat700, th400, lat400] = await thaiFonts;
    fonts.push(
      { name: "Chakra", data: th700, weight: 700, style: "normal" },
      { name: "Chakra", data: lat700, weight: 700, style: "normal" },
      { name: "Chakra", data: th400, weight: 400, style: "normal" },
      { name: "Chakra", data: lat400, weight: 400, style: "normal" },
    );
  }

  return new ImageResponse(
    <div style={{ display: "flex", position: "relative", width: 1200, height: 630, background: "#fff" }}>
      {/* A plain <img>: satori renders it 1:1, which a one-bit image needs;
          next/image does not exist inside an ImageResponse. */}
      {/* eslint-disable-next-line @next/next/no-img-element -- satori renders plain <img> only */}
      <img src={desk} width={1200} height={630} alt="" style={{ position: "absolute", left: 0, top: 0 }} />

      {/* The menu bar: the stack's icon and name, the address on the right. */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 1200,
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          fontFamily: OG_FONT.pixel,
          fontSize: 22,
          color: "#000",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- satori renders plain <img> only */}
          <img src={icon} width={32} height={32} alt="" />
          Ice&apos;s Stack
        </div>
        <div style={{ display: "flex" }}>taninwatkaewpankan.xyz</div>
      </div>

      {/* The card's contents. */}
      <div
        style={{
          position: "absolute",
          left: CARD.x + OG_PAD,
          top: CARD.y + OG_PAD,
          width: OG_INNER.w,
          height: OG_INNER.h,
          display: "flex",
          color: "#000",
        }}
      >
        {content}
      </div>
    </div>,
    { ...OG_SIZE, fonts },
  );
}

/** A receipt row for a card: label, dashed leader, figure. */
export function OgRow({ label, value, font = OG_FONT }: { label: string; value: string; font?: typeof OG_FONT | typeof OG_FONT_TH }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 14, fontSize: 26 }}>
      <div style={{ display: "flex", fontFamily: font.body, fontWeight: 700 }}>{label}</div>
      <div style={{ display: "flex", flexGrow: 1, borderBottom: "3px dashed #000", marginBottom: 8 }} />
      <div style={{ display: "flex", fontFamily: font.pixel }}>{value}</div>
    </div>
  );
}
