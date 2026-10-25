/**
 * The world's copy of a screenshot (npm run textures): "/assets/trailr/x.webp"
 * becomes "/world/trailr/x.webp" at 1280px, plus 960 and 720px copies for phones. The
 * originals are ~2,900px; the poster <img> never needs them.
 */
export function worldImage(src: string) {
  const large = src.replace(/^\/assets\//, "/world/");
  const size = (w: number) => large.replace(/\.webp$/, `-${w}.webp`);
  return { src: large, srcSet: `${size(720)} 720w, ${size(960)} 960w, ${large} 1280w` };
}
