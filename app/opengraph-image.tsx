import { personalInfo, siteContent } from "./data";
import { OG_COLOR, OG_FONT, OG_SIZE, OgLabel, worldOgImage } from "./lib/og-card";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = `${personalInfo.name} (${personalInfo.nickname}), ${siteContent.roleLabel} and Creative Developer in Copenhagen, Denmark.`;

/**
 * The homepage's share card: the hero in miniature. The label, the name
 * small, the two roles large, availability under them.
 */
export default async function OgImage() {
  return worldOgImage(
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <OgLabel>DESIGN AND ENGINEERING FROM COPENHAGEN, DENMARK</OgLabel>
      <div style={{ display: "flex", fontFamily: OG_FONT.display, fontSize: 44, marginTop: 8 }}>
        {personalInfo.name} ({personalInfo.nickname})
      </div>
      <div style={{ display: "flex", flexDirection: "column", fontFamily: OG_FONT.display, fontSize: 128, lineHeight: 0.92, letterSpacing: -3 }}>
        <div style={{ display: "flex" }}>{siteContent.roleLabel}</div>
        <div style={{ display: "flex" }}>Creative Developer</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 14 }}>
        <div style={{ display: "flex", width: 12, height: 12, borderRadius: 6, background: OG_COLOR.signal }} />
        <OgLabel color={OG_COLOR.ink}>OPEN TO FULL-TIME ROLES AND CLIENT PROJECTS</OgLabel>
      </div>
    </div>,
    "Ice · Portfolio",
  );
}
