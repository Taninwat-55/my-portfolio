// Builds the screenshots the world draws in WebGL (the hero's work monitor,
// the glyph hall's cards and each case's reveal) at 1280px wide, plus a
// 960 and 720px copies (name-960.webp, name-720.webp) that phones get as the
// poster <img> through srcset (Reveal.tsx, worldImage.ts): the hero's
// 2,900px original held the homepage LCP at 3.5s on slow 4G, and a phone
// wanting ~721px skipped 720 for the 1280 copy (Lighthouse, 2026-10-25).
//
//   npm run textures
//
// Outputs are committed to public/world/, so Netlify never runs this. Re-run
// it after adding or replacing a screenshot in public/assets/.
//
// Why not Next's image optimizer: it resized the 2,900px originals on the
// first request, and the cards sat empty for seconds while it did (Ice,
// 2026-10-25). 1280px covers the monitor and a hall card at 2x; the
// originals would also cost ~20 MB of GPU memory each as textures.

import sharp from "sharp";
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const ASSETS = path.join(ROOT, "public/assets");
const OUT = path.join(ROOT, "public/world");
const WIDTHS = [1280, 960, 720];

// Every case's screenshot folder: the hall shows five, but every case page
// reveals its own screens. Add a folder here when a case joins.
const PROJECTS = ["trailr", "bevisly", "mockmate", "racha", "lumina", "millennial", "satoshi-standard", "saep", "forste-lys"];

for (const project of PROJECTS) {
  const from = path.join(ASSETS, project);
  const to = path.join(OUT, project);
  await mkdir(to, { recursive: true });
  for (const file of (await readdir(from)).filter((f) => f.endsWith(".webp"))) {
    for (const width of WIDTHS) {
      const name = width === WIDTHS[0] ? file : file.replace(/\.webp$/, `-${width}.webp`);
      const info = await sharp(path.join(from, file))
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(path.join(to, name));
      console.log(`${project}/${name}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`);
    }
  }
}
