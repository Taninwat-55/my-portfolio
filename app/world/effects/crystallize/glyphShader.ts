import * as THREE from "three";
import { worldImage } from "../../worldImage";
import { RAMP } from "./glyphs";

/**
 * The crystallize material, shared by every surface that resolves from signal
 * into an image: the hero band (a flat screen-space quad) and the hall's cards
 * (planes in 3D). Same shader, two vertex stages.
 */

/** Full-screen quad: the canvas is the surface. */
export const screenVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

/** A plane in the scene, seen through the camera. */
export const sceneVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

/*
 * Per cell: read the target's ink at the cell centre, draw the ramp glyph
 * for that much ink, and once the cell's threshold passes, show the target's
 * real pixels instead. Thresholds are a left-to-right sweep plus noise, so it
 * crystallizes in patches rather than wiping. The pointer raises progress
 * within ~140px of itself.
 *
 * uCover crops the target like object-fit: cover. uSolid 1 paints the
 * background behind glyphs (the hero band); 0 leaves it transparent, so a
 * card in the hall arrives as loose characters floating in the dark.
 * uOpacity fades a whole surface (distance, in the hall).
 */
export const glyphFragment = /* glsl */ `
  uniform sampler2D uTarget;
  uniform sampler2D uAtlas;
  uniform float uProgress;
  uniform float uTime;
  uniform float uCell;
  uniform float uGlyphs;
  uniform float uSolid;
  uniform float uOpacity;
  uniform vec2 uRes;
  uniform vec2 uCover;
  uniform vec2 uPointer;
  uniform vec3 uBg;
  uniform vec3 uInk;
  uniform vec3 uSignal;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  vec2 cover(vec2 uv) { return (uv - 0.5) * uCover + 0.5; }

  void main() {
    vec2 px = vUv * uRes;
    vec2 cell = floor(px / uCell);
    vec2 inCell = fract(px / uCell);
    vec2 centre = (cell + 0.5) * uCell / uRes;

    vec3 target = texture2D(uTarget, cover(vUv)).rgb;
    vec3 sampled = texture2D(uTarget, cover(centre)).rgb;
    float ink = clamp(length(sampled - uBg) / max(length(uInk - uBg), 0.001), 0.0, 1.0);

    float p = uProgress;
    if (uPointer.x >= 0.0) {
      p += (1.0 - smoothstep(0.0, 140.0, distance(px, uPointer))) * 0.5;
    }
    float threshold = (cell.x * uCell / uRes.x) * 0.35 + hash(cell) * 0.65;
    float resolved = smoothstep(threshold - 0.06, threshold + 0.02, p * 1.08);

    float flicker = hash(cell + floor(uTime * 10.0));
    // Every unresolved cell carries a glyph: a light base (: - =) everywhere,
    // denser glyphs where the target has ink.
    float index = floor(clamp(0.22 + ink * 0.7 + (flicker - 0.5) * 0.24, 0.1, 0.999) * uGlyphs);
    float glyph = texture2D(uAtlas, vec2((index + inCell.x) / uGlyphs, inCell.y)).r;
    vec3 glyphColour = mix(uSignal, uInk, ink * 0.6);

    vec3 unresolved = mix(uBg, glyphColour, glyph);
    float alpha = mix(max(uSolid, glyph), 1.0, resolved) * uOpacity;
    gl_FragColor = vec4(mix(uSolid > 0.5 ? unresolved : glyphColour, target, resolved), alpha);
  }
`;

export function glyphUniforms(cell = 11) {
  return {
    uTarget: { value: null as THREE.Texture | null },
    uAtlas: { value: null as THREE.Texture | null },
    uProgress: { value: 0 },
    uTime: { value: 0 },
    uCell: { value: cell },
    uGlyphs: { value: RAMP.length },
    uSolid: { value: 1 },
    uOpacity: { value: 1 },
    uRes: { value: new THREE.Vector2(1, 1) },
    uCover: { value: new THREE.Vector2(1, 1) },
    uPointer: { value: new THREE.Vector2(-1, -1) },
    uBg: { value: new THREE.Vector3() },
    uInk: { value: new THREE.Vector3() },
    uSignal: { value: new THREE.Vector3() },
  };
}

/**
 * object-fit: cover as a UV scale. Fits the target's short side to the box
 * and crops the long one, centred.
 */
export function coverScale(boxAspect: number, imageAspect: number) {
  return imageAspect > boxAspect
    ? new THREE.Vector2(boxAspect / imageAspect, 1)
    : new THREE.Vector2(1, imageAspect / boxAspect);
}

/**
 * A project screenshot as a texture, from the 1280px copy in public/world/
 * (npm run textures) rather than the 2,900px original: small, static, and
 * ready on the first request, where resizing on the fly left the cards
 * empty for seconds. "/assets/trailr/x.webp" loads "/world/trailr/x.webp".
 */
export function loadImage(src: string) {
  const url = worldImage(src).src;
  return new Promise<THREE.Texture>((resolve, reject) => {
    new THREE.TextureLoader().load(
      url,
      (t) => {
        t.minFilter = THREE.LinearFilter;
        t.generateMipmaps = false;
        resolve(t);
      },
      undefined,
      reject,
    );
  });
}

export const aspectOf = (t: THREE.Texture) => {
  const img = t.image as { width: number; height: number };
  return img.width / img.height;
};
