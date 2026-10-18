import { readFile } from "node:fs/promises";
import path from "node:path";
import { clockContent, siteContent, stackContent } from "./data";
import { OG_FONT, OG_SIZE, stackOgImage } from "./lib/og-card";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Ice's Stack: Ice (Taninwat Kaewpankan), full-stack engineer in Copenhagen.";

/**
 * The homepage's share card: the Home card itself, in miniature. Title,
 * one line, availability and the stack on the left; the dithered portrait
 * on the right, drawn 1:1 from public/stack/ice-portrait-og.png.
 */
export default async function OgImage() {
  const portrait = await readFile(path.join(process.cwd(), "public/stack/ice-portrait-og.png"));
  const portraitSrc = `data:image/png;base64,${portrait.toString("base64")}`;

  return stackOgImage(
    <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", width: 600, gap: 22 }}>
        <div style={{ display: "flex", fontFamily: OG_FONT.display, fontSize: 88, lineHeight: 1 }}>
          {stackContent.home.title}
        </div>
        <div style={{ display: "flex", fontFamily: OG_FONT.body, fontSize: 30, lineHeight: 1.35 }}>
          {siteContent.roleLabel} in Copenhagen. Every card in this stack is something I built.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: OG_FONT.body, fontWeight: 700, fontSize: 22 }}>
          <div style={{ display: "flex", width: 14, height: 14, background: "#000" }} />
          {clockContent.availability}
        </div>
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            border: "3px solid #000",
            padding: "8px 16px",
            fontFamily: OG_FONT.pixel,
            fontSize: 22,
          }}
        >
          {stackContent.engineer.stack.join(" · ")}
        </div>
      </div>
      <img src={portraitSrc} width={288} height={383} alt="" style={{ border: "3px solid #000" }} />
    </div>,
  );
}
