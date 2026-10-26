import { cases } from "@/app/data";
import { OG_COLOR, OG_FONT, OG_SIZE, OgLabel, worldOgImage } from "@/app/lib/og-card";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "A case study by Ice (Taninwat Kaewpankan).";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.id }));
}

/**
 * Each case's own share card (2026-10-26; cases used to share the home
 * page's): the kind and year, the project's name large, its one line, and
 * the role, the way the case page opens.
 */
export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = cases.find((x) => x.id === slug);
  if (!c) return worldOgImage(<div style={{ display: "flex" }} />, "Ice · Case");

  return worldOgImage(
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <OgLabel>{[c.tag, c.year].filter(Boolean).join(" · ").toUpperCase()}</OgLabel>
      <div style={{ display: "flex", fontFamily: OG_FONT.display, fontSize: 132, lineHeight: 0.92, letterSpacing: -3 }}>
        {c.title}
      </div>
      <div style={{ display: "flex", fontFamily: OG_FONT.display, fontSize: 40, lineHeight: 1.15, maxWidth: 940 }}>
        {c.sub}
      </div>
      {c.role && (
        <div style={{ display: "flex", marginTop: 6 }}>
          <OgLabel color={OG_COLOR.ink}>{c.role.toUpperCase()}</OgLabel>
        </div>
      )}
    </div>,
    "Ice · Case study",
  );
}
