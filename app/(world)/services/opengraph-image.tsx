import { services } from "@/app/data";
import { OG_FONT, OG_SIZE, OgRow, worldOgImage } from "@/app/lib/og-card";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt =
  "Freelance web development in Copenhagen: websites, web app frontends and redesign work, with published prices.";

/** The services page in miniature: the title, then the offers as receipt rows. */
export default async function OgImage() {
  return worldOgImage(
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={{ display: "flex", fontFamily: OG_FONT.display, fontSize: 96, lineHeight: 0.95, letterSpacing: -2 }}>
        Ice&apos;s Stack
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 18 }}>
        {services.offers.map((offer) => (
          <OgRow key={offer.id} label={offer.name} value={offer.priceRange} />
        ))}
      </div>
    </div>,
    "Ice · Services",
  );
}
