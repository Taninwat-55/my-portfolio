/**
 * The corridor both rooms share. The door folds the page's grid lines into
 * these rails and the hall carries the same rails on, so the lines a visitor
 * walks through the doorway are the lines of the hall (Ice, 2026-10-27: they
 * were two different corridors, and the hand-off showed it). Kept free of
 * three.js so either canvas can import it.
 */

export const MIN_RAILS = 16; // a 4-column phone grid is too sparse for a tunnel

// The door's camera, whose screen the corridor's cross-section fills.
export const FOV = 50;
export const CAM_Z = 5;

// The hall dims its rails so they don't compete with the cards; the door
// fades to the same strength as it turns to ink.
export const RAIL_ALPHA_INSIDE = 0.35;
export const FOG_INSIDE: [number, number] = [8, 34];

/** Each rail's angle around the corridor's axis. Evenly spread until the door has measured the grid. */
export const railAngles: number[] = Array.from({ length: MIN_RAILS }, (_, i) =>
  railAngle(i, i / (MIN_RAILS - 1)),
);

/** Even rails to the top half, odd to the bottom; `u` 0…1 runs left to right. */
export function railAngle(i: number, u: number) {
  return (i % 2 === 0 ? 1 : -1) * Math.PI * (1 - u);
}

/** Half the corridor's width and height: the door camera's screen at its start. */
export function corridorHalf(width: number, height: number) {
  const hh = CAM_Z * Math.tan(((FOV / 2) * Math.PI) / 180);
  return { hw: (hh * width) / height, hh };
}

/** Where a rail at this angle meets the corridor's walls. */
export function railPoint(angle: number, hw: number, hh: number) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const reach = Math.min(hw / Math.max(Math.abs(cos), 1e-4), hh / Math.max(Math.abs(sin), 1e-4));
  return { x: cos * reach, y: sin * reach };
}
