/**
 * The active world. Every page in the new site reads its look from one world:
 * a token file (colour, type, easing, grid as CSS variables) and a set of
 * effect modules that share one interface (effects/types.ts).
 *
 * Crystallize is the launch world: everything starts as signal (glyphs, code,
 * ASCII) and crystallizes into the finished thing. Nordic light (warm, low
 * gold sun) is the planned alternative, kept swappable so it can replace or
 * warm Crystallize later without a rebuild. Its token file is a stub for now.
 *
 * Swapping worlds is this one line plus a token file. Components never hard
 * code a colour or a face; they read the variables the world defines.
 */
export type WorldName = "crystallize" | "nordic";

export const activeWorld: WorldName = "crystallize";

/**
 * Two type pairings live side by side until Ice picks one in the prototype
 * (/lab/crystallize, phase 1). The loser gets deleted with its font loads.
 *   a: Instrument Serif display, Geist text, Geist Mono signal
 *   b: Inter Tight display, Geist text, JetBrains Mono signal
 */
export type Pairing = "a" | "b";

export const defaultPairing: Pairing = "a";

/**
 * The page tone. Outside the door the world is light (paper); the door turns
 * it to ink, so the work lives in a dark room. Set as data-tone on any element.
 */
export type Tone = "paper" | "ink";
