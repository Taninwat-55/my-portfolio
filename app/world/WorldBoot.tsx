/**
 * Runs before first paint, inline, so nothing flashes:
 *   - data-world-js on <html> tells the CSS that JavaScript will run the
 *     effects, so a reveal can hide its finished state until the glyphs take
 *     over. Without JS (or under reduced motion) it never gets set and every
 *     box, line and word simply shows.
 *   - data-loader-seen skips the loader after its first play this session.
 *
 * The root layout's <html> carries suppressHydrationWarning, which covers
 * these attributes arriving before React hydrates.
 */
export const LOADER_KEY = "crystallize-loader";

const script = `try{var d=document.documentElement;if(!matchMedia("(prefers-reduced-motion: reduce)").matches)d.dataset.worldJs="1";if(sessionStorage.getItem("${LOADER_KEY}"))d.dataset.loaderSeen="1";else sessionStorage.setItem("${LOADER_KEY}","1")}catch(e){}`;

export function WorldBoot() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
