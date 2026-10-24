import type { ComponentType } from "react";

/**
 * The contract every world's effects meet, so swapping worlds never touches a
 * page. An effect is decoration: it draws at a real DOM element, which keeps
 * its own text, video and links whether or not the effect runs.
 *
 * Shaped by the phase 1 prototype (app/world/effects/crystallize). Phase 2
 * moves pages onto it through world.config.ts.
 */
export type RevealProps = {
  title: string;
  label?: string;
  /** hero: plays once the loader is done. view: plays when scrolled into view. */
  trigger: "hero" | "view";
  className?: string;
};

export type ScrambleProps = {
  text: string;
  as?: React.ElementType;
  className?: string;
  trigger: "loader" | "scroll";
};

export type WorldEffects = {
  /** Signal resolving into a project's clip box. */
  Reveal: ComponentType<RevealProps>;
  /** Signal settling into a line of type. */
  Scramble: ComponentType<ScrambleProps>;
  /** The threshold into the work: the grid lines bending flat to tunnel to portal. */
  Door: ComponentType;
  /** The opening log, before the hero. */
  Loader: ComponentType;
};
