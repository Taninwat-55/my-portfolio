import type { ComponentType, RefObject } from "react";

/**
 * The contract every world's effects meet, so swapping worlds never touches a
 * page. An effect is decoration: it draws at a real DOM element (the target),
 * which keeps its own text, video and links whether or not the effect runs.
 *
 * progress runs 0 to 1. 0 is pure signal (glyphs), 1 is the finished thing.
 * Scroll-driven effects get progress from the scroll; timed ones run their own.
 */
export type EffectProps = {
  target: RefObject<HTMLElement | null>;
  progress?: number;
};

export type WorldEffects = {
  /** Signal resolving into an image, a clip or a line of type. */
  Reveal: ComponentType<EffectProps>;
  /** The threshold into the work: the grid lines bending flat to tunnel to portal. */
  Door: ComponentType<EffectProps>;
  /** The quiet ambient layer behind a section (the glyph field). */
  Field: ComponentType<EffectProps>;
};
