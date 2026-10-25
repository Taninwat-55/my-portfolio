/**
 * The hall's walk, shared by the canvas (which damps it into a camera glide)
 * and the DOM (which shows the captions from it). Kept free of three.js so
 * Hall.tsx can import it without pulling WebGL into the first chunk.
 */

/**
 * Dwell: the camera stops in front of each card, then moves briskly to the
 * next, instead of gliding past at constant speed (Ice, 2026-10-25: the card
 * was gone before its caption arrived). Whole steps are the cards; around
 * each one the curve is flat, between them it's steep.
 */
export const dwell = (raw: number) => {
  const base = Math.round(raw);
  const f = raw - base; // -0.5 … 0.5
  return base + Math.sign(f) * 0.5 * Math.abs(2 * f) ** 2.4;
};

/**
 * Where the walk stands for a scroll progress of 0…1 through the hall. The
 * DOM has an intro step, one step per card and a trailing step; card k's
 * step centred in the viewport is card k in front.
 */
export const stepsAt = (progress: number, cards: number) => dwell(progress * (cards + 1) - 1);

/**
 * Which caption shows: -1 the intro, 0…n-1 that card (from the moment it has
 * nearly crystallized until just before the camera passes it), -2 between
 * two cards, n past the last.
 */
export const frontAt = (steps: number, cards: number) => {
  const nearest = Math.round(steps);
  if (steps < -0.4) return -1;
  if (steps > cards - 0.6) return cards;
  return Math.abs(steps - nearest) < 0.38 ? nearest : -2;
};
