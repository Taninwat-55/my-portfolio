// Builds the screenshots the world draws in WebGL (the hero's work monitor
// and the glyph hall's cards) at 1280px wide.
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
const WIDTH = 1280;

// The projects the world shows. Add an id here when a project joins the hall.
const PROJECTS = ["trailr", "bevisly", "mockmate", "racha", "lumina"];

for (const project of PROJECTS) {
  const from = path.join(ASSETS, project);
  const to = path.join(OUT, project);
  await mkdir(to, { recursive: true });
  for (const file of (await readdir(from)).filter((f) => f.endsWith(".webp"))) {
    const info = await sharp(path.join(from, file))
      .resize({ width: WIDTH, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(to, file));
    console.log(`${project}/${file}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`);
  }
}
