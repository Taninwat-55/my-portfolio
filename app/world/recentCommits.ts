import { execFileSync } from "node:child_process";

/**
 * The latest commits to this site, for the hero's build log: the loader's
 * agent log made real and kept current. Server only.
 *
 * Read from git when the page renders: per request in dev, once at build in
 * production (so it shows the commits the deploy was built from). Empty when
 * git isn't available, and the log simply doesn't render.
 */
export type Commit = { subject: string; when: string };

export function recentCommits(count = 3): Commit[] {
  try {
    const out = execFileSync("git", ["log", `-${count}`, "--no-merges", "--format=%s%x1f%cr"], {
      encoding: "utf8",
      timeout: 2000,
    });
    return out
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const [subject, when] = line.split("\x1f");
        return { subject, when };
      });
  } catch {
    return [];
  }
}
