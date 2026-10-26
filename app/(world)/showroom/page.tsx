import type { Metadata } from "next";
import Link from "next/link";
import {
  conceptPrice,
  founding,
  foundingOpen,
  foundingSpotsLine,
  foundingTerms,
  quoteExcludes,
  showroomCases,
  showroomPage,
} from "@/app/data";
import { GridLines } from "@/app/world/GridLines";
import { WorkCard } from "@/app/world/WorkCard";
import { WorldFooter } from "@/app/world/WorldFooter";
import { WorldNav } from "@/app/world/WorldNav";
import { WorldShell } from "@/app/world/WorldShell";
import page from "@/app/world/page.module.css";
import work from "@/app/world/work.module.css";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Showroom",
  description:
    "Sample websites for made-up businesses, each with the published price of a site like it. Priced by scope, not by style.",
  alternates: { canonical: "https://taninwatkaewpankan.xyz/showroom" },
};

/**
 * The shop floor, in the Crystallize world (2026-10-25). One card per sample
 * site with its price; the card opens the case page, which carries the full
 * price breakdown. Every figure comes from conceptPrice() in data.ts, so it
 * always agrees with /services.
 */
export default function ShowroomPage() {
  return (
    <WorldShell>
      <main id="main-content">
        <header className={page.head}>
          <GridLines />
          <WorldNav className={page.nav} />
          <p className={page.kicker}>Showroom</p>
          <h1 className={page.title}>Sample sites</h1>
          <p className={page.lead}>{showroomPage.lead}</p>
          {foundingOpen && (
            <div className={page.prose} style={{ marginTop: "calc(var(--unit) * 3)" }}>
              <p>
                <strong>{founding.label}.</strong> {foundingTerms} {foundingSpotsLine}
              </p>
            </div>
          )}
        </header>

        <section className={page.section} aria-labelledby="sites-title">
          <h2 id="sites-title" className={page.label}>
            The sites
          </h2>
          <div className={page.content}>
            <ul className={work.grid}>
              {showroomCases().map((c, i) => {
                const showroom = c.showroom!;
                const price = conceptPrice(showroom);
                return (
                  <WorkCard key={c.id} caseStudy={c} kicker={`${showroom.business} · ${showroom.style}`} eager={i < 3}>
                    <span className={`${work.meta} ${work.stamp}`}>{showroomPage.concept}</span>
                    <span className={work.price}>{price.total}</span>
                    {foundingOpen && (
                      <span className={work.founding}>
                        {founding.label} {price.founding}
                      </span>
                    )}
                  </WorkCard>
                );
              })}
            </ul>
            <div className={page.prose} style={{ marginTop: "calc(var(--unit) * 6)" }}>
              <p>{quoteExcludes}</p>
              <p>{showroomPage.more}</p>
            </div>
            <ul className={page.actions}>
              <li>
                <Link className={page.button} href="/contact#enquire">
                  Build mine <span aria-hidden="true">→</span>
                </Link>
              </li>
              <li>
                <Link className={page.buttonQuiet} href="/services">
                  {showroomPage.prices} <span aria-hidden="true">→</span>
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <WorldFooter />
    </WorldShell>
  );
}
