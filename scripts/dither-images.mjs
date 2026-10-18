// Builds the one-bit artwork for the stack: every case screenshot and Ice's
// portrait, dithered with Bill Atkinson's algorithm (the one MacPaint and
// HyperCard shipped), plus the 32px pixel face used as the favicon.
//
//   npm run dither
//
// Outputs are committed to public/stack/ and app/icon.png, so Netlify never
// runs this. Re-run it after adding or replacing a screenshot in public/assets/.
//
// Each image is dithered at the exact CSS width it is drawn at, so one dither
// dot is one CSS pixel; `image-rendering: pixelated` keeps the dots square on
// retina. Scaled to any other width, a dither turns to moiré, which is why the
// card has fixed image widths per breakpoint instead of a fluid one.
//
// It also writes app/stack-manifest.json (every output's width and height), so
// the cards can reserve the right box before an image loads.

import sharp from "sharp";
import { readdir, mkdir, writeFile, readFile, rm } from "node:fs/promises";
import { crc32 } from "node:zlib";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const ASSETS = path.join(ROOT, "public/assets");
const OUT = path.join(ROOT, "public/stack");

// Widths match stack.module.css: card artwork on desktop, the same on phones,
// and grid thumbnails. The suffix is what ditheredSrc() in app/data.ts appends.
const SIZES = [
  { suffix: "", width: 480 },
  { suffix: "-sm", width: 320 },
  { suffix: "-thumb", width: 240 },
];
const PORTRAIT = {
  src: "assets/stack-src/ice-portrait.jpg",
  // 288px (384 tall) is the share card's portrait (app/lib/og-card.tsx), drawn 1:1
  // inside the card's 396px inner height.
  sizes: [{ suffix: "", width: 360 }, { suffix: "-sm", width: 280 }, { suffix: "-og", width: 288 }],
};

/**
 * The share cards' backdrop, 1200x630: the stack's desk (25% stipple), the
 * menu bar, and an empty ruled card with two stacked edges. Drawn here as
 * pixels because satori (next/og) cannot tile a stipple pattern; the cards
 * set their text over it. Geometry is mirrored in app/lib/og-card.tsx.
 */
export const OG = { w: 1200, h: 630, bar: 48, card: { x: 56, y: 84, w: 1074, h: 500 }, edge: 7, rule: 3, radius: 10 };

function ogDesk() {
  const { w, h, bar, card, edge, rule, radius } = OG;
  const px = Buffer.alloc(w * h, 255);
  const set = (x, y, v) => (px[y * w + x] = v);
  // Desk: 25% stipple, the same tile as the site's desk.
  for (let y = bar + rule; y < h; y++) for (let x = 0; x < w; x++) if (x % 2 === 0 && y % 2 === 0) set(x, y, 0);
  // Menu bar rule.
  for (let y = bar; y < bar + rule; y++) for (let x = 0; x < w; x++) set(x, y, 0);
  // A rounded, ruled, white rectangle.
  const box = (bx, by, bw, bh) => {
    for (let y = by; y < by + bh; y++) {
      for (let x = bx; x < bx + bw; x++) {
        const cx = x < bx + radius ? bx + radius : x >= bx + bw - radius ? bx + bw - radius - 1 : x;
        const cy = y < by + radius ? by + radius : y >= by + bh - radius ? by + bh - radius - 1 : y;
        const d = Math.hypot(x - cx, y - cy);
        if (d > radius) continue;
        const edgeDist = Math.min(x - bx, bx + bw - 1 - x, y - by, by + bh - 1 - y, radius - d);
        set(x, y, edgeDist < rule ? 0 : 255);
      }
    }
  };
  box(card.x + edge * 2, card.y + edge * 2, card.w, card.h);
  box(card.x + edge, card.y + edge, card.w, card.h);
  box(card.x, card.y, card.w, card.h);
  return px;
}

/**
 * Atkinson error diffusion on a greyscale buffer. Only 6/8 of the error is
 * passed on, which is what gives MacPaint images their bright, open highlights.
 */
function atkinson(gray, width, height) {
  const px = Float32Array.from(gray);
  const out = Buffer.alloc(width * height);
  const spread = [
    [1, 0], [2, 0],
    [-1, 1], [0, 1], [1, 1],
    [0, 2],
  ];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      const value = px[i] < 128 ? 0 : 255;
      out[i] = value;
      const err = (px[i] - value) / 8;
      for (const [dx, dy] of spread) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || nx >= width || ny >= height) continue;
        px[ny * width + nx] += err;
      }
    }
  }
  return out;
}

/**
 * Writes where a PNG came from into the file itself, as a tEXt chunk under the
 * key impeccable reads ("impeccable:prompt"), so every shipping raster carries
 * its provenance and a re-run of this script never loses it.
 */
async function embedOrigin(file, origin) {
  const png = await readFile(file);
  const data = Buffer.concat([Buffer.from("impeccable:prompt\0", "latin1"), Buffer.from(origin, "latin1")]);
  const type = Buffer.from("tEXt", "latin1");
  const chunk = Buffer.alloc(12 + data.length);
  chunk.writeUInt32BE(data.length, 0);
  type.copy(chunk, 4);
  data.copy(chunk, 8);
  chunk.writeUInt32BE(crc32(Buffer.concat([type, data])), 8 + data.length);
  // After the signature (8 bytes) and IHDR (25 bytes), before everything else.
  await writeFile(file, Buffer.concat([png.subarray(0, 33), chunk, png.subarray(33)]));
}

const ORIGIN = (src, width) =>
  `Not generated. Atkinson dither of ${path.relative(ROOT, src)} (Ice's own screenshot or photo) at ${width}px, by scripts/dither-images.mjs.`;

async function dither(input, outFile, width, { lift = 1, contrast = 1 } = {}) {
  const { data, info } = await sharp(input)
    .resize({ width, withoutEnlargement: false })
    .flatten({ background: "#ffffff" })
    .greyscale()
    .normalise()
    .linear(contrast, -(128 * contrast) + 128)
    .raw()
    .toBuffer({ resolveWithObject: true });
  // lift > 1 brightens the midtones (a power curve), leaving black and white put.
  const toned = lift === 1 ? data : data.map((v) => 255 * (v / 255) ** (1 / lift));
  const bits = atkinson(toned, info.width, info.height);
  await sharp(bits, { raw: { width: info.width, height: info.height, channels: 1 } })
    .png({ palette: true, colours: 2, compressionLevel: 9 })
    .toFile(outFile);
  await embedOrigin(outFile, ORIGIN(input, info.width));
  return info;
}

/** The 32x32 one-bit face, as a greyscale buffer (0 ink, 255 paper). */
function pixelFace() {
  const S = 32;
  const px = Buffer.alloc(S * S, 255);
  const ink = (x, y) => {
    if (x >= 0 && x < S && y >= 0 && y < S) px[y * S + x] = 0;
  };
  const inEllipse = (x, y, cx, cy, rx, ry) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1;

  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      // Hair: a full cap, swept higher on the right, cut by the forehead.
      const cap = inEllipse(x, y, 16.5, 9, 10.5, 7.5) && y <= 12;
      const forehead = inEllipse(x, y, 15.5, 14.5, 8.5, 5.5);
      if (cap && !forehead) ink(x, y);
      // Face outline: the sides and jaw of an oval, below the hairline.
      const outer = inEllipse(x, y, 16, 17.5, 9.5, 10);
      const inner = inEllipse(x, y, 16, 17.5, 8.4, 8.9);
      if (outer && !inner && y >= 11) ink(x, y);
      // Blazer: dark shoulders with a light shirt opening in the middle.
      if (y >= 28) {
        const shirt = Math.abs(x - 16) <= 31 - y;
        if (!shirt) ink(x, y);
      }
    }
  }
  // Square glasses: two outlined lenses and a bridge.
  for (const left of [8, 18]) {
    for (let x = left; x <= left + 6; x++) {
      ink(x, 15);
      ink(x, 19);
    }
    for (let y = 15; y <= 19; y++) {
      ink(left, y);
      ink(left + 6, y);
    }
    ink(left + 3, 17); // pupil
  }
  ink(15, 16);
  ink(16, 16);
  ink(17, 16);
  // Nose and a small closed smile.
  ink(16, 21);
  ink(15, 22);
  for (let x = 13; x <= 19; x++) ink(x, 24);
  ink(12, 23);
  ink(20, 23);
  return px;
}

async function main() {
  const dirs = (await readdir(ASSETS, { withFileTypes: true })).filter((d) => d.isDirectory());
  const manifest = {};
  for (const dir of dirs) {
    await mkdir(path.join(OUT, dir.name), { recursive: true });
    const files = (await readdir(path.join(ASSETS, dir.name))).filter((f) => f.endsWith(".webp"));
    for (const file of files) {
      const src = path.join(ASSETS, dir.name, file);
      const base = file.replace(/\.webp$/, "");
      // Screenshots are mostly flat mid-tones; a touch of contrast keeps their
      // type and edges from dissolving into even stipple.
      for (const { suffix, width } of SIZES) {
        const rel = `/stack/${dir.name}/${base}${suffix}.png`;
        const info = await dither(src, path.join(ROOT, "public", rel), width, { contrast: suffix === "-thumb" ? 1.2 : 1.15 });
        manifest[rel] = [info.width, info.height];
      }
    }
  }

  // The portrait: lifting the midtones brings the face forward; without it the
  // skin dithers as dark as the navy blazer and the features flatten.
  for (const { suffix, width } of PORTRAIT.sizes) {
    const rel = `/stack/ice-portrait${suffix}.png`;
    const info = await dither(path.join(ROOT, PORTRAIT.src), path.join(ROOT, "public", rel), width, { lift: 1.35, contrast: 1.1 });
    manifest[rel] = [info.width, info.height];
  }
  // The Home card's miniature on /work: the face, cropped out of a 240px
  // dither (cropping keeps the dots 1:1, resizing would not).
  const thumbFull = path.join(OUT, "ice-portrait-full-thumb.png");
  await dither(path.join(ROOT, PORTRAIT.src), thumbFull, 240, { lift: 1.35, contrast: 1.1 });
  const thumb = path.join(OUT, "ice-portrait-thumb.png");
  await sharp(thumbFull).extract({ left: 0, top: 34, width: 240, height: 118 }).png({ palette: true, colours: 2 }).toFile(thumb);
  await embedOrigin(thumb, `Not generated. A 240x118 crop of the Atkinson dither of ${PORTRAIT.src} at 240px, by scripts/dither-images.mjs.`);
  await rm(thumbFull);
  manifest["/stack/ice-portrait-thumb.png"] = [240, 118];

  // The favicon is drawn, not derived: any photo scaled to 32px dithers or
  // thresholds into noise. These are the features that make it read as Ice,
  // taken from the portrait: swept-up hair, square glasses, a small smile, a
  // dark blazer over a light collarless shirt.
  await sharp(pixelFace(), { raw: { width: 32, height: 32, channels: 1 } })
    .png({ palette: true, colours: 2 })
    .toFile(path.join(ROOT, "app/icon.png"));
  await embedOrigin(
    path.join(ROOT, "app/icon.png"),
    "Not generated. A 32x32 one-bit face drawn pixel by pixel in code (pixelFace() in scripts/dither-images.mjs), after Ice's portrait.",
  );

  // The share cards' backdrop.
  const desk = path.join(ROOT, "public/stack/og-desk.png");
  await sharp(ogDesk(), { raw: { width: OG.w, height: OG.h, channels: 1 } })
    .png({ palette: true, colours: 2, compressionLevel: 9 })
    .toFile(desk);
  await embedOrigin(desk, "Not generated. The share-card backdrop (desk stipple, menu bar, ruled card), drawn pixel by pixel in ogDesk() in scripts/dither-images.mjs.");
  manifest["/stack/og-desk.png"] = [OG.w, OG.h];

  await writeFile(path.join(ROOT, "app/stack-manifest.json"), JSON.stringify(manifest, null, 1) + "\n");
  console.log(`Dithered ${Object.keys(manifest).length} images into public/stack/, plus app/icon.png and app/stack-manifest.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
