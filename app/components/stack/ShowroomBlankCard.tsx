"use client";

import { useSearchParams } from "next/navigation";
import { cases, conceptPrice, inShowroom } from "../../data";
import { BlankCard } from "./BlankCard";

/**
 * The Build mine card, pre-filled when the visitor arrives from a Showroom
 * placard (/build?like=lumina): the project type, and a first line naming the
 * concept and its build-up, so the enquiry starts from a scope rather than a
 * blank page. An unknown or missing `like` gives the plain blank card.
 */
export function ShowroomBlankCard() {
  const like = useSearchParams().get("like");
  const concept = cases.find((c) => c.id === like && inShowroom(c));
  // The key starts the form fresh when ?like= changes on the same page.
  if (!concept?.showroom) return <BlankCard key="blank" />;

  const price = conceptPrice(concept.showroom);
  // Add-on names start with a capital on /services; mid-sentence they should not.
  const scope = price.rows
    .map((row, i) => (i === 0 ? row.label : row.label[0].toLowerCase() + row.label.slice(1)))
    .join(" + ");
  return (
    <BlankCard
      key={concept.id}
      initial={{
        projectType: "small-business-site",
        message: `I would like a site like ${concept.title} (${scope}, ${price.total}).\n\nAbout my business: `,
      }}
    />
  );
}
