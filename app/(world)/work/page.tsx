import type { Metadata } from "next";
import { cases, conceptPrice, inShowroom, leadCaseIds, workPage } from "@/app/data";
import { GridLines } from "@/app/world/GridLines";
import { WorkCard } from "@/app/world/WorkCard";
import { WorldFooter } from "@/app/world/WorldFooter";
import { WorldNav } from "@/app/world/WorldNav";
import { WorldShell } from "@/app/world/WorldShell";
import page from "@/app/world/page.module.css";
import work from "@/app/world/work.module.css";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Every project by Ice (Taninwat Kaewpankan) with a case page: Trailr AI, Bevisly, MockMate, Racha Beauty, Lumina Spa, Millennial Consulting, Satoshi Standard and Saep Fire Kitchen.",
  alternates: { canonical: "https://taninwatkaewpankan.xyz/work" },
};

const lead = leadCaseIds.flatMap((id) => cases.filter((c) => c.id === id));
const rest = cases.filter((c) => !leadCaseIds.includes(c.id));

/**
 * Every case, in the Crystallize world (2026-10-25; it replaced the Stack's
 * all-cards grid). The hall's projects first, in its order, then the rest.
 */
export default function WorkPage() {
  const card = (c: (typeof cases)[number], eager: boolean) => (
    <WorkCard key={c.id} caseStudy={c} kicker={[c.tag, c.year].filter(Boolean).join(" · ")} eager={eager}>
      {inShowroom(c) && <span className={work.price}>{conceptPrice(c.showroom!).total}</span>}
    </WorkCard>
  );

  return (
    <WorldShell>
      <main id="main-content">
        <header className={page.head}>
          <GridLines />
          <WorldNav className={page.nav} />
          <p className={page.kicker}>Work</p>
          <h1 className={page.title}>All projects</h1>
          <p className={page.lead}>{workPage.lead}</p>
        </header>

        {[
          { id: "lead", title: workPage.leadGroup, items: lead },
          { id: "rest", title: workPage.restGroup, items: rest },
        ].map((group) => (
          <section key={group.id} className={page.section} aria-labelledby={`${group.id}-title`}>
            <h2 id={`${group.id}-title`} className={page.label}>
              {group.title}
            </h2>
            <div className={page.content}>
              <ul className={work.grid}>{group.items.map((c, i) => card(c, group.id === "lead" && i < 3))}</ul>
            </div>
          </section>
        ))}
      </main>
      <WorldFooter />
    </WorldShell>
  );
}
