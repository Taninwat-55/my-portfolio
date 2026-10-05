import { cases, clockContent, services, RESCUE_AUDIT_PRICE } from "../../data";
import { getSortedPostsData } from "../../lib/posts";
import { ClockHome, type InPlace } from "./ClockHome";
import type { ClockContentProps } from "./types";

const NOTES_SHOWN = 5;
// Enough of the stack to say what it was built with, short enough for a print.
const STACK_SHOWN = 4;

// UTC because post dates are bare "2025-12-18" strings, which parse as UTC
// midnight; in any timezone west of Greenwich they would print a day early.
const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/**
 * Every clock route renders this: /, /about, /contact, /work, /writing, /rates.
 *
 * A server component, so it can read the posts from disk and pick out only what
 * the objects show. ClockHome itself is a client component.
 */
export function Clock({ initialOpen = null }: { initialOpen?: InPlace | null }) {
  const content: ClockContentProps = {
    prints: clockContent.work.caseIds.map((id) => {
      const study = cases.find((c) => c.id === id);
      if (!study) throw new Error(`clockContent.work.caseIds: no case with id "${id}"`);
      return {
        id: study.id,
        title: study.title,
        sub: study.sub,
        stack: study.stack.slice(0, STACK_SHOWN),
        image: study.images[0],
        concept: Boolean(study.concept),
      };
    }),
    notes: getSortedPostsData()
      .slice(0, NOTES_SHOWN)
      .map((post) => ({
        slug: post.slug,
        title: post.title,
        date: dateFormat.format(new Date(post.date)),
      })),
    rates: [
      ...services.offers.map((offer) => ({ name: offer.name, price: offer.priceRange })),
      { name: clockContent.rates.auditLabel, price: RESCUE_AUDIT_PRICE },
    ],
    caseCount: cases.length,
  };

  // Marks <html> as night before the first paint, from Copenhagen's hour (the
  // same rule as ClockHome's lamp), so night visitors get no day frame while
  // React loads. Plain inline JS: it must run before hydration, not after.
  const nightScript = `try{var h=+new Intl.DateTimeFormat("en-GB",{hour:"2-digit",hourCycle:"h23",timeZone:"Europe/Copenhagen"}).format(new Date());if(h>=${clockContent.desk.lampOnFrom}||h<${clockContent.desk.lampOffAt})document.documentElement.setAttribute("data-desk-night","")}catch(e){}`;

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: nightScript }} />
      <ClockHome initialOpen={initialOpen} content={content} />
    </>
  );
}
