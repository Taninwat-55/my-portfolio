import { services } from "../../data";
import { daContent as c, daUnits as units } from "../../data.da";
import { OG_FONT as FONT, OG_SIZE, OgRow, stackOgImage } from "../../lib/og-card";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Hjemmeside til små virksomheder i Danmark: fast pris, og du ejer domæne, hosting og kode.";

const price = (s: string) => s;

/**
 * The /da landing card in miniature: its title and lead, and the website
 * price ladder read from app/data.ts, in this language's units and format.
 */
export default async function OgImage() {
  return stackOgImage(
    <div style={{ display: "flex", flexDirection: "column", width: "100%", gap: 18 }}>
      <div style={{ display: "flex", fontFamily: FONT.display, fontWeight: 700, fontSize: 72, lineHeight: 1.1 }}>
        {c.hero.title}
      </div>
      <div style={{ display: "flex", fontFamily: FONT.body, fontSize: 28, lineHeight: 1.4, marginBottom: 14 }}>
        {c.hero.lead}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {(services.offers[0].priceLadder ?? []).map((rung) => (
          <OgRow key={rung.scope} label={units(rung.scope)} value={price(rung.price)} font={FONT} />
        ))}
      </div>
    </div>,
  );
}
