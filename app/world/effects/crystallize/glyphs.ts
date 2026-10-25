import * as THREE from "three";

/** Darkest last: a cell's ink picks its glyph from this ramp. */
export const RAMP = " .:-=+*#%@";

/** One row of glyphs, white on black, in the world's mono face. */
export function buildGlyphAtlas(fontFamily: string) {
  const cell = 64;
  const canvas = document.createElement("canvas");
  canvas.width = cell * RAMP.length;
  canvas.height = cell;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  ctx.font = `${cell * 0.78}px ${fontFamily}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  Array.from(RAMP).forEach((char, i) => ctx.fillText(char, i * cell + cell / 2, cell / 2));
  return texture(canvas);
}

/**
 * The reveal's target: a drawing of the DOM box as it will look when the
 * glyphs are gone, so the hand-back to the real element is seamless. Colours,
 * border and every [data-replica] text are read from the live DOM.
 *
 * When real clips arrive this is swapped for a VideoTexture; the shader
 * doesn't care what it samples.
 */
export function drawReplica(box: HTMLElement) {
  const rect = box.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio, 2);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(rect.width * dpr));
  canvas.height = Math.max(1, Math.round(rect.height * dpr));
  const ctx = canvas.getContext("2d")!;
  ctx.scale(dpr, dpr);

  const style = getComputedStyle(box);
  ctx.fillStyle = style.backgroundColor;
  ctx.fillRect(0, 0, rect.width, rect.height);
  const border = parseFloat(style.borderTopWidth) || 0;
  if (border) {
    ctx.strokeStyle = style.borderTopColor;
    ctx.lineWidth = border;
    ctx.strokeRect(border / 2, border / 2, rect.width - border, rect.height - border);
  }

  box.querySelectorAll<HTMLElement>("[data-replica]").forEach((el) => {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    ctx.font = `${s.fontStyle} ${s.fontWeight} ${s.fontSize} ${s.fontFamily}`;
    ctx.fillStyle = s.color;
    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    if ("letterSpacing" in ctx) ctx.letterSpacing = s.letterSpacing === "normal" ? "0px" : s.letterSpacing;
    const text = el.textContent ?? "";
    const shown = s.textTransform === "uppercase" ? text.toUpperCase() : text;
    ctx.fillText(shown, r.left - rect.left, r.top - rect.top + r.height / 2);
  });

  return { texture: texture(canvas), style };
}

function texture(canvas: HTMLCanvasElement) {
  const t = new THREE.CanvasTexture(canvas);
  t.minFilter = THREE.LinearFilter;
  t.magFilter = THREE.LinearFilter;
  t.generateMipmaps = false;
  return t;
}

/**
 * A CSS colour ("rgb(15, 16, 18)" or "#0b6e99") to 0–1 channels, kept in
 * sRGB: the shader writes raw values, so no colour management applies.
 */
export function rgb(css: string) {
  const value = css.trim();
  if (value.startsWith("#")) {
    const hex = value.length === 4 ? Array.from(value.slice(1), (c) => c + c).join("") : value.slice(1);
    const n = parseInt(hex, 16);
    return new THREE.Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
  }
  const [r = 0, g = 0, b = 0] = value.match(/[\d.]+/g)?.map(Number) ?? [];
  return new THREE.Vector3(r / 255, g / 255, b / 255);
}
