/**
 * The stack's icons, drawn on a 16x16 one-bit grid the way HyperCard's were,
 * and rendered at 2x with crisp edges. Each row is a string: "#" is ink.
 * Drawn here rather than taken from an icon library because no library draws
 * in one-bit pixels, and a smooth vector arrow in this world is a costume.
 */
const ICONS = {
  prev: [
    "................",
    "................",
    "......#.........",
    ".....##.........",
    "....###.........",
    "...#############",
    "..##############",
    ".###############",
    "..##############",
    "...#############",
    "....###.........",
    ".....##.........",
    "......#.........",
    "................",
    "................",
    "................",
  ],
  home: [
    "................",
    ".......##.......",
    "......####......",
    ".....##..##.....",
    "....##....##....",
    "...##......##...",
    "..##........##..",
    ".##..........##.",
    "################",
    "..#..........#..",
    "..#..####....#..",
    "..#..#..#....#..",
    "..#..#..#....#..",
    "..#..#..#....#..",
    "..############..",
    "................",
  ],
  stack: [
    "................",
    "....##########..",
    "....#........#..",
    "..##########.#..",
    "..#........#.#..",
    "##########.#.#..",
    "#........#.#.#..",
    "#........#.#.#..",
    "#........#.#.#..",
    "#........#.#.#..",
    "#........#.####.",
    "#........#.#....",
    "#........###....",
    "#........#......",
    "##########......",
    "................",
  ],
  grid: [
    "................",
    ".####.####.####.",
    ".#..#.#..#.#..#.",
    ".#..#.#..#.#..#.",
    ".####.####.####.",
    "................",
    ".####.####.####.",
    ".#..#.#..#.#..#.",
    ".#..#.#..#.#..#.",
    ".####.####.####.",
    "................",
    ".####.####.####.",
    ".#..#.#..#.#..#.",
    ".#..#.#..#.#..#.",
    ".####.####.####.",
    "................",
  ],
} as const;

export type PixelIconName = keyof typeof ICONS | "next";

/** Each row's runs of ink, merged into one rect per run. */
function runs(rows: readonly string[]) {
  const rects: { x: number; y: number; w: number }[] = [];
  rows.forEach((row, y) => {
    let start = -1;
    for (let x = 0; x <= row.length; x++) {
      const on = row[x] === "#";
      if (on && start < 0) start = x;
      if (!on && start >= 0) {
        rects.push({ x: start, y, w: x - start });
        start = -1;
      }
    }
  });
  return rects;
}

export function PixelIcon({ name }: { name: PixelIconName }) {
  const rows = ICONS[name === "next" ? "prev" : name];
  return (
    <svg
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      style={name === "next" ? { transform: "scaleX(-1)" } : undefined}
    >
      {runs(rows).map(({ x, y, w }) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={w} height={1} />
      ))}
    </svg>
  );
}
