/**
 * The view-transition name a project's title carries wherever it links to its
 * case page (the hall's caption, a /work card, a case's "Next" door) and on
 * the case page's <h1>. Matching names make React animate the one title into
 * the other on a client navigation (next.config.ts: experimental
 * viewTransition). Unique per page, since each page shows a project's linked
 * title once.
 */
export const caseTitle = (id: string) => `case-title-${id}`;
