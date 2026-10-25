/**
 * The world's copy of a screenshot (npm run textures): "/assets/trailr/x.webp"
 * becomes "/world/trailr/x.webp" at 1280px, plus a 720px copy for phones. The
 * originals are ~2,900px; the poster <img> never needs them.
 */
export function worldImage(src: string) {
  const large = src.replace(/^\/assets\//, "/world/");
  const small = large.replace(/\.webp$/, "-720.webp");
  return { src: large, srcSet: `${small} 720w, ${large} 1280w` };
}
