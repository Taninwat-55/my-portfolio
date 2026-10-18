import manifest from "../../stack-manifest.json";

// [width, height] per output, written by scripts/dither-images.mjs.
const SIZES: Record<string, number[]> = manifest;

/** The width and height scripts/dither-images.mjs recorded for an output. */
function size(src: string) {
  const found = SIZES[src];
  if (!found) throw new Error(`${src} is not in app/stack-manifest.json. Run npm run dither.`);
  return { width: found[0], height: found[1] };
}

/**
 * A dithered image at its two fixed widths: the card size, and the phone size
 * under 760px. Not next/image: a dither must reach the screen at exactly the
 * width it was made for, unresized and unrecompressed, or the dots turn to
 * moiré. Both files are a few kilobytes of one-bit PNG.
 *
 * `src` is the card-size path ("/stack/racha/racha-landing.png"); the phone
 * size is the same path with -sm.
 */
export function DitherPicture({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const small = src.replace(/\.png$/, "-sm.png");
  const big = size(src);
  const sm = size(small);
  return (
    <picture>
      <source media="(max-width: 760px)" srcSet={small} width={sm.width} height={sm.height} />
      <img
        src={src}
        alt={alt}
        width={big.width}
        height={big.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
      />
    </picture>
  );
}

export function ditherSize(src: string) {
  return size(src);
}
