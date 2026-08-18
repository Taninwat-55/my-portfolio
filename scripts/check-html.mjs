#!/usr/bin/env node
/**
 * Query the prerendered HTML in .next/server/app without tripping over how React
 * actually writes it.
 *
 * This exists because the same class of mistake was made three times while
 * verifying this site, each time reporting something as missing when it was
 * present:
 *
 *   1. `grep hreflang`  — React emits the JSX prop name, so the HTML says hrefLang
 *   2. `grep srcset`    — same, the HTML says srcSet
 *   3. `grep "see all 7 projects"` — React separates interpolated values with
 *      comment nodes, so the HTML says `see all <!-- -->7<!-- --> projects`
 *
 * A plain grep is wrong for all three. Attribute names must be matched
 * case-insensitively, and visible text must have tags AND comment nodes removed
 * before matching. Doing that by hand each time is how it kept going wrong.
 *
 * Usage:
 *   node scripts/check-html.mjs text  <page>              print visible text
 *   node scripts/check-html.mjs find  <page> <needle>...  assert visible text
 *   node scripts/check-html.mjs attr  <page> <name>       list attribute values
 *   node scripts/check-html.mjs pages                     list available pages
 *
 *   <page> is the route: "index", "th", "services", "cases/racha".
 *
 * Exits non-zero when a `find` needle is absent, so it can gate a commit.
 */
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const ROOT = path.join(process.cwd(), ".next", "server", "app");

async function listPages(dir = ROOT, prefix = "") {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      out.push(...(await listPages(path.join(dir, entry.name), `${prefix}${entry.name}/`)));
    } else if (entry.name.endsWith(".html")) {
      out.push(prefix + entry.name.replace(/\.html$/, ""));
    }
  }
  return out.sort();
}

async function load(page) {
  try {
    return await readFile(path.join(ROOT, `${page}.html`), "utf8");
  } catch {
    const available = await listPages();
    console.error(
      `No prerendered HTML for "${page}".\nRun \`npm run build\` first, or pick one of:\n  ${available.join("\n  ")}`
    );
    process.exit(2);
  }
}

/**
 * Visible text only. Comments go FIRST — they sit between interpolated values and
 * would otherwise fuse words together once the tags are gone.
 */
const toText = (html) =>
  html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();

/** Case-insensitive on the attribute NAME, because React writes srcSet, hrefLang. */
const attrValues = (html, name) => {
  const re = new RegExp(`\\b${name}\\s*=\\s*"([^"]*)"`, "gi");
  return [...html.matchAll(re)].map((m) => m[1]);
};

const [command, page, ...rest] = process.argv.slice(2);

if (command === "pages") {
  console.log((await listPages()).join("\n"));
  process.exit(0);
}

if (!command || !page) {
  console.error("Usage: check-html.mjs <text|find|attr|pages> <page> [args]");
  process.exit(2);
}

const html = await load(page);

if (command === "text") {
  console.log(toText(html));
} else if (command === "find") {
  if (rest.length === 0) {
    console.error("find needs at least one needle");
    process.exit(2);
  }
  const text = toText(html);
  let failed = 0;
  for (const needle of rest) {
    const ok = text.includes(needle);
    if (!ok) failed++;
    console.log(`  ${ok ? "OK  " : "MISS"}  ${needle}`);
  }
  process.exit(failed > 0 ? 1 : 0);
} else if (command === "attr") {
  const name = rest[0];
  if (!name) {
    console.error("attr needs an attribute name");
    process.exit(2);
  }
  const values = attrValues(html, name);
  console.log(`  ${values.length} value(s) for "${name}" on /${page}`);
  for (const v of [...new Set(values)]) console.log(`    ${v}`);
} else {
  console.error(`Unknown command "${command}"`);
  process.exit(2);
}
