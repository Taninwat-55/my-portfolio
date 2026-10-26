// Snapshots a live site into the portfolio log, so no version of a project is
// lost again (Ice, 2026-10-26: every sketch and old version of his projects
// was gone by the time the case pages wanted them).
//
//   npm run snap <url> <project> "<note>" [wait-ms, default 12000]
//   npm run snap https://bevisly.com bevisly "before the freelance redesign"
//
// Saves a desktop (1440x900) and a phone (390x844) screenshot to
// ~/Documents/portfolio-log/<project>/YYYY-MM-DD-<note-slug>-{desktop,phone}.png
// and appends a line to that folder's log.md. Uses the installed Chrome in
// headless mode; nothing to install.
//
// When to run it: the day a project starts (write the brief in log.md), the
// first deploy, right BEFORE any redesign (the "before" is what gets lost),
// and after shipping. Nina asks at "Nina, wrap up".

import { execFileSync } from "node:child_process";
import { appendFileSync, existsSync, mkdirSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";

const [url, project, note = "snapshot", wait = "12000"] = process.argv.slice(2);
if (!url || !project || !/^https?:\/\//.test(url)) {
  console.error('Usage: npm run snap <url> <project> "<note>"');
  process.exit(1);
}

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
if (!existsSync(CHROME)) {
  console.error(`Chrome not found at ${CHROME}`);
  process.exit(1);
}

const date = new Date().toISOString().slice(0, 10);
const slug = note.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "snapshot";
const dir = path.join(homedir(), "Documents", "portfolio-log", project.toLowerCase());
mkdirSync(dir, { recursive: true });

const shots = [
  ["desktop", "1440,900"],
  ["phone", "390,844"],
];
const saved = [];
for (const [name, size] of shots) {
  const file = path.join(dir, `${date}-${slug}-${name}.png`);
  execFileSync(
    CHROME,
    [
      "--headless=new",
      "--hide-scrollbars",
      "--disable-gpu",
      // Give scripts, fonts and data a moment, so the shot is the page, not a
      // loader. An app behind a slow session check may need more: pass a 4th
      // argument in ms ("Loading session..." on old Bevisly at 6000).
      `--virtual-time-budget=${wait}`,
      `--window-size=${size}`,
      `--screenshot=${file}`,
      url,
    ],
    { stdio: "ignore" },
  );
  saved.push(path.basename(file));
}

const log = path.join(dir, "log.md");
if (!existsSync(log)) appendFileSync(log, `# ${project}\n\nThe brief, decisions and snapshots, newest last.\n\n`);
appendFileSync(log, `- ${date} · ${note} · ${url} · ${saved.join(", ")}\n`);

console.log(`Saved to ${dir}:\n  ${saved.join("\n  ")}`);
