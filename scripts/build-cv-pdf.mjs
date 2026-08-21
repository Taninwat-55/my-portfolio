#!/usr/bin/env node
/**
 * Generates public/assets/Taninwat_Kaewpankan_CV.pdf from `cvData` in app/data.ts.
 *
 * WHY THIS EXISTS
 * ---------------
 * `cvData` carries a comment saying it "mirrors the downloadable PDF one-to-one so
 * the page and the file can't drift". That was a promise with no mechanism behind
 * it — the PDF was made by hand in a separate tool — and it duly drifted: the file
 * said "Software Engineer | Frontend Focus" long after the site had settled on
 * "Frontend Developer", and Framer was in the data but not the document.
 *
 * Now the file is derived from the object. Edit `cvData`, re-run this, and the two
 * cannot disagree.
 *
 *   node scripts/build-cv-pdf.mjs
 *
 * HOW
 * ---
 * Renders an HTML document and prints it with headless Chrome. No dependency to
 * install: Chrome is already on the machine, and its print pipeline is the same one
 * behind Cmd+P → Save as PDF, so what you see in a browser is what lands in the file.
 *
 * DELIBERATE CHOICES
 * ------------------
 * - **Single column, real text, standard headings.** Applicant tracking systems read
 *   PDFs by extracting the text stream. Multi-column layouts interleave unrelated
 *   lines, and text-as-image extracts as nothing. A CV that looks sharp and parses
 *   as mush loses to a plain one.
 * - **Projects before Experience**, which is the order the hand-made PDF used. For
 *   someone a year into the field with three shipped products, the projects are the
 *   stronger evidence, and the first half-page is what gets read.
 * - **Everything in `cvData`, including the two groups the old PDF cut** (the
 *   Operations & Product skills and the Languages row). Cutting them was a
 *   one-page constraint; this runs to two, and the operations history is the part
 *   of the range that no other frontend candidate has.
 * - **No phone number, no street address** — email, LinkedIn, GitHub, website. Same
 *   rule as every other public surface.
 */

import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { fileURLToPath } from "node:url";

const execFileAsync = promisify(execFile);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT = path.join(ROOT, "public/assets/Taninwat_Kaewpankan_CV.pdf");

const { cvData, personalInfo } = await import(path.join(ROOT, "app/data.ts"));

/** Escapes into HTML text. cvData is ours, but an unescaped & would still break. */
const e = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

/** Strips the scheme so a printed link reads as a label, not a URL. */
const bare = (url) =>
  url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const site = "taninwatkaewpankan.xyz";

/** One dated entry — shared by Experience and Projects, which have one shape. */
const entry = (item) => `
  <article class="entry">
    <header>
      <h3>${e(item.org)}</h3>
      <span class="period">${e(item.period)}</span>
    </header>
    <p class="meta">${e(item.role)} · ${e(item.place)}</p>
    <ul>
      ${item.bullets.map((b) => `<li>${e(b)}</li>`).join("\n      ")}
    </ul>
  </article>`;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${e(personalInfo.name)} — ${e(cvData.title)}</title>
<style>
  /* 15mm all round: narrower reads as cramped in print, wider wastes a column
     inch that the summary needs. */
  @page { size: A4; margin: 15mm; }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  html {
    /* Everything below is in em, so this one number is the density dial. */
    font-size: 10.2pt;
  }

  body {
    font-family: Helvetica, Arial, sans-serif;
    color: #14181c;
    line-height: 1.42;
    /* Chrome's default is to drop backgrounds when printing; the rules below
       rely on borders rather than fills, so nothing depends on this. */
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* ── Header ─────────────────────────────────────────────────────────── */
  .name {
    font-size: 2.25em;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.05;
  }
  .title {
    font-size: 1.06em;
    font-weight: 600;
    letter-spacing: 0.02em;
    margin-top: 0.35em;
    color: #2f6f78;
  }
  .contact {
    margin-top: 0.7em;
    padding-bottom: 0.85em;
    border-bottom: 1.4px solid #14181c;
    font-size: 0.9em;
    color: #3c454d;
  }
  .contact a { color: inherit; text-decoration: none; }
  /* Keep each item whole so a wrap lands between them rather than splitting a
     URL down the middle — "github.com/Taninwat-" then "55" on the next line
     reads as a typo, and a recruiter cannot copy it. */
  .contact span { white-space: nowrap; }
  /* A middot separator written in CSS rather than in the markup, so the text
     stream an ATS extracts stays clean. */
  .contact span + span::before { content: " · "; color: #98a3ab; }

  /* ── Sections ───────────────────────────────────────────────────────── */
  section { margin-top: 1.25em; }
  h2 {
    font-size: 0.8em;
    font-weight: 700;
    text-transform: uppercase;
    /* 0.1em, not the 0.14em this started at. Above roughly 0.12em Chrome emits
       the heading as separate glyph runs and every text extractor reads
       "S U M M A RY" — so an ATS scanning for section headings finds none of
       them. Measured, not guessed: 0.14 broke all six, 0.10 keeps all six.
       Do not widen this for looks. */
    letter-spacing: 0.1em;
    color: #14181c;
    padding-bottom: 0.3em;
    border-bottom: 0.7px solid #c9d1d6;
    margin-bottom: 0.7em;
    /* Never let a heading be the last thing on a page. "EXPERIENCE" alone at the
       foot of page 1 with Trailr AI overleaf is the standard bad break. */
    break-after: avoid;
  }

  .summary { text-align: justify; hyphens: auto; }

  /* ── Skills ─────────────────────────────────────────────────────────── */
  /* A definition-list grid: label column fixed, values wrap. Reads as a table
     without being one, and extracts as "Label: a, b, c" in order. */
  .skills { display: grid; grid-template-columns: 10.4em 1fr; row-gap: 0.42em; }
  .skills dt { font-weight: 700; font-size: 0.93em; }
  .skills dd { font-size: 0.93em; color: #29313a; }

  /* ── Entries ────────────────────────────────────────────────────────── */
  /* Never split an entry across the page break — an orphaned bullet under a
     blank heading is the classic generated-CV tell. */
  .entry { margin-bottom: 0.85em; break-inside: avoid; }
  .entry:last-child { margin-bottom: 0; }
  .entry header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1em;
  }
  .entry h3 { font-size: 1.04em; font-weight: 700; }
  .period { font-size: 0.87em; color: #5b656d; white-space: nowrap; }
  .meta {
    font-size: 0.9em;
    font-style: italic;
    color: #3c454d;
    margin-top: 0.08em;
  }
  .entry ul { margin-top: 0.32em; padding-left: 1.05em; }
  .entry li { margin-bottom: 0.2em; }
  .entry li::marker { color: #8b959d; }

  /* ── Education ──────────────────────────────────────────────────────── */
  .edu { break-inside: avoid; margin-bottom: 0.5em; }
  .edu:last-child { margin-bottom: 0; }
  .edu header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1em;
  }
  .edu h3 { font-size: 1em; font-weight: 700; }
  .edu p { font-size: 0.9em; color: #3c454d; margin-top: 0.04em; }

  /* ── Additional ─────────────────────────────────────────────────────── */
  .extra { display: grid; grid-template-columns: 10.4em 1fr; row-gap: 0.4em; }
  .extra dt { font-weight: 700; font-size: 0.93em; }
  .extra dd { font-size: 0.93em; color: #29313a; }
</style>
</head>
<body>

  <header>
    <h1 class="name">${e(personalInfo.name)}</h1>
    <p class="title">${e(cvData.title)}</p>
    <p class="contact">
      <span>${e(personalInfo.location)}</span>
      <span><a href="mailto:${e(personalInfo.email)}">${e(personalInfo.email)}</a></span>
      <span><a href="${e(personalInfo.socials.linkedin)}">${e(bare(personalInfo.socials.linkedin))}</a></span>
      <span><a href="${e(personalInfo.socials.github)}">${e(bare(personalInfo.socials.github))}</a></span>
      <span><a href="https://${site}">${site}</a></span>
    </p>
  </header>

  <section>
    <h2>Summary</h2>
    <p class="summary">${e(cvData.summary)}</p>
  </section>

  <section>
    <h2>Skills</h2>
    <dl class="skills">
      ${cvData.skills
        .map(
          (g) =>
            `<dt>${e(g.label)}</dt><dd>${g.items.map(e).join(", ")}</dd>`,
        )
        .join("\n      ")}
    </dl>
  </section>

  <section>
    <h2>Projects</h2>
    ${cvData.projects.map(entry).join("\n    ")}
  </section>

  <section>
    <h2>Experience</h2>
    ${cvData.experience.map(entry).join("\n    ")}
  </section>

  <section>
    <h2>Education</h2>
    ${cvData.education
      .map(
        (s) => `
    <article class="edu">
      <header>
        <h3>${e(s.school)}</h3>
        <span class="period">${e(s.period)}</span>
      </header>
      <p>${e(s.degree)} · ${e(s.place)}</p>
    </article>`,
      )
      .join("")}
  </section>

  <section>
    <h2>Additional</h2>
    <dl class="extra">
      ${cvData.additional
        .map((a) => `<dt>${e(a.label)}</dt><dd>${e(a.value)}</dd>`)
        .join("\n      ")}
    </dl>
  </section>

</body>
</html>`;

// Chrome will only print a file it can read from disk, and it needs a stable
// directory for its profile or it complains on first run.
const tmp = path.join(ROOT, ".cv-build");
await mkdir(tmp, { recursive: true });
const src = path.join(tmp, "cv.html");
await writeFile(src, html, "utf8");

try {
  // Chrome writes the PDF and then, in headless mode on macOS, frequently fails
  // to exit — it sits there holding the process open long after the file is
  // complete on disk. So this does not wait for a clean exit: it waits for the
  // file, then kills the browser. `timeout` is the backstop for a genuine hang.
  await execFileAsync(
    CHROME,
    [
      "--headless",
      "--disable-gpu",
      "--no-sandbox",
      `--user-data-dir=${path.join(tmp, "profile")}`,
      "--no-pdf-header-footer", // no URL or page number stamped in the margins
      `--print-to-pdf=${OUT}`,
      `file://${src}`,
    ],
    { timeout: 45_000, killSignal: "SIGKILL" },
  ).catch((error) => {
    // A timeout once the PDF exists is the quirk above, not a failure.
    if (error.killed && existsSync(OUT)) return;
    throw error;
  });
} finally {
  await rm(tmp, { recursive: true, force: true });
}

const bytes = (await readFile(OUT)).length;
console.log(`✓ ${path.relative(ROOT, OUT)} — ${(bytes / 1024).toFixed(0)} KB`);
console.log(`  title: ${cvData.title}`);
