/**
 * The active world. Every page in the new site reads its look from one world:
 * a token file (colour, type, easing, grid as CSS variables) and a set of
 * effect modules that share one interface (effects/types.ts).
 *
 * Crystallize: everything starts as signal (glyphs, code, ASCII) and
 * crystallizes into the finished thing. Ice chose it on 2026-10-25 over
 * Nordic light, which turned out to be only a warmer palette.
 *
 * A new world is a token file plus a name here. Components never hard code
 * a colour or a face; they read the variables the world defines.
 */
export type WorldName = "crystallize";

export const activeWorld: WorldName = "crystallize";

/**
 * The page tone. Outside the door the world is light (paper); the door turns
 * it to ink, so the work lives in a dark room. Set as data-tone on any element.
 */
export type Tone = "paper" | "ink";
