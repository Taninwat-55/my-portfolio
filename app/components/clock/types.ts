/**
 * The slices of content the clock's objects need, resolved on the server by
 * Clock.tsx. Passing these small shapes, rather than importing `cases` and
 * `services` into the client, keeps every case study's full text out of the
 * homepage's JavaScript.
 */

export type ClockPrint = {
  id: string;
  title: string;
  sub: string;
  stack: string[];
  image: string;
  /** A concept piece: marked on the print's front. */
  concept: boolean;
};

export type ClockNote = {
  slug: string;
  title: string;
  /** Already formatted for display, e.g. "18 Dec 2025". */
  date: string;
};

export type ClockRate = {
  name: string;
  price: string;
};

export type ClockContentProps = {
  prints: ClockPrint[];
  notes: ClockNote[];
  rates: ClockRate[];
  /** How many case studies /projects holds, for the "All projects" link. */
  caseCount: number;
};
