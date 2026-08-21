#!/usr/bin/env node
/**
 * Prints every string from a language file as plain numbered text.
 *
 *   npm run copy da     → app/data.da.ts
 *   npm run copy th     → app/data.th.ts
 *   npm run copy sv     → app/data.sv.ts
 *   npm run copy da > da.txt
 *
 * WHY THIS EXISTS
 * ---------------
 * Item 28 needs a Danish native speaker to read the copy on /da. The ask has to
 * be small or it does not get said yes to, and the two obvious things to hand
 * over are both bad: a URL means scrolling a page and describing where the
 * problem is, and the source file means reading TypeScript. Nobody proofreads
 * TypeScript.
 *
 * So this prints numbered lines grouped by section. A corrector can reply
 * "3.2 should be 'hedder', 5.1 is too formal" and every reference is unambiguous.
 * It works for any of the three language files, so the Thai and Swedish reviews
 * get the same thing.
 *
 * Deliberately NOT a translation table with the English alongside. A proofreader
 * asked to compare two columns checks fidelity to the English; one given only
 * the Danish judges whether it reads like Danish, which is the actual question.
 */

import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const LANGS = {
  da: { file: "app/data.da.ts", export: "daContent", name: "Danish" },
  th: { file: "app/data.th.ts", export: "thContent", name: "Thai" },
  sv: { file: "app/data.sv.ts", export: "svContent", name: "Swedish" },
};

const code = process.argv[2];
const lang = LANGS[code];
if (!lang) {
  console.error(
    `Usage: npm run copy <${Object.keys(LANGS).join("|")}>\n` +
      `  e.g. npm run copy da > danish-copy.txt`
  );
  process.exit(1);
}

const mod = await import(path.join(ROOT, lang.file));
const content = mod[lang.export];

/**
 * Keys holding machinery rather than prose.
 *
 * `errors` and `form` ARE user-facing and are included — a clumsy validation
 * message is exactly the kind of thing that gets shipped unread. But the option
 * VALUES are an API contract, so only their labels appear, and `locale` is a tag.
 */
const SKIP = new Set(["locale"]);

/** Section titles, so the output reads as a document rather than a dump. */
const TITLES = {
  meta: "Page title and search description",
  hero: "Top of the page",
  why: "Why me",
  pricing: "Prices",
  proof: "The example (Racha)",
  process: "How it works",
  contact: "Contact",
  form: "The enquiry form",
  errors: "Form error messages",
  backToEnglish: "Link back to English",
};

const lines = [];
let section = 0;

/** Depth-first walk, emitting `section.item` for every string found. */
function walk(node, label, depth) {
  if (typeof node === "string") {
    lines.push({ label, text: node });
    return;
  }
  if (Array.isArray(node)) {
    node.forEach((child, i) => walk(child, `${label}[${i + 1}]`, depth + 1));
    return;
  }
  if (node && typeof node === "object") {
    for (const [key, value] of Object.entries(node)) {
      if (SKIP.has(key)) continue;
      walk(value, label ? `${label}.${key}` : key, depth + 1);
    }
  }
}

const out = [];
out.push(`${lang.name} copy — taninwatkaewpankan.xyz/${code}`);
out.push("=".repeat(60));
out.push("");
out.push(
  `Every line of ${lang.name} on the page, numbered. Reply with the number and`
);
out.push(
  `your correction — "4.2 should be X" — and nothing has to be described twice.`
);
out.push("");
out.push(
  "Corrections of any size are welcome, including ones that feel pedantic."
);
out.push("Word choice and tone count as much as grammar: if a sentence is");
out.push("correct but reads like a translation, that is worth knowing.");
out.push("");

for (const [key, value] of Object.entries(content)) {
  if (SKIP.has(key)) continue;
  section += 1;
  lines.length = 0;
  walk(value, "", 0);
  if (!lines.length) continue;

  out.push("");
  out.push(`${section}. ${TITLES[key] ?? key.toUpperCase()}`);
  out.push("-".repeat(60));
  lines.forEach((line, i) => {
    // The path is shown dimly after the text rather than before it, so the eye
    // lands on the sentence rather than on a key name.
    out.push(`${section}.${i + 1}  ${line.text}`);
    if (line.label) out.push(`        (${line.label})`);
    out.push("");
  });
}

const total = out.filter((l) => /^\d+\.\d+\s/.test(l)).length;
out.push("");
out.push("=".repeat(60));
out.push(`${total} lines in total.`);

console.log(out.join("\n"));
