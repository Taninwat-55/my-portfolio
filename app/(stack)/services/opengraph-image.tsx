import { services } from "../../data";
import { OG_FONT, OG_SIZE, OgRow, stackOgImage } from "../../lib/og-card";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt =
  "Freelance web development in Copenhagen: websites, web app frontends and redesign work, with published prices.";

/** The services card in miniature: the title, the lead, and the three offers as receipt rows. */
export default async function OgImage() {
  return stackOgImage(
    <div style={{ display: "flex", flexDirection: "column", width: "100%", gap: 18 }}>
      <div style={{ display: "flex", fontFamily: OG_FONT.display, fontSize: 80, lineHeight: 1 }}>
        {services.intro.title}
      </div>
      <div style={{ display: "flex", fontFamily: OG_FONT.body, fontSize: 28, lineHeight: 1.35, marginBottom: 14 }}>
        {services.intro.lead}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {services.offers.map((offer) => (
          <OgRow key={offer.id} label={offer.name} value={offer.priceRange} />
        ))}
      </div>
    </div>,
  );
}
