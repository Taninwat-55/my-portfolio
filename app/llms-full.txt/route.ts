import { cases, cvData, leadCaseIds, personalInfo, services, siteContent } from "@/app/data";

export const dynamic = "force-static";

const BASE = "https://taninwatkaewpankan.xyz";

/**
 * /llms-full.txt (2026-10-26): the whole site as plain text for AI
 * assistants, generated from data.ts at build time so it can never drift
 * from the pages. /llms.txt stays the short, hand-written summary.
 */
export function GET() {
  const ordered = [
    ...leadCaseIds.flatMap((id) => cases.filter((c) => c.id === id)),
    ...cases.filter((c) => !leadCaseIds.includes(c.id)),
  ];

  const lines: string[] = [
    `# ${personalInfo.name} (${personalInfo.nickname})`,
    "",
    `${siteContent.roleLabel} and Creative Developer in ${personalInfo.location}. Open to full-time roles and client projects.`,
    `Site: ${BASE} · Email: ${personalInfo.email} · LinkedIn: ${personalInfo.socials.linkedin} · GitHub: ${personalInfo.socials.github}`,
    `MCP server (read-only): ${BASE}/mcp`,
    "",
    "## Summary",
    "",
    cvData.summary,
    "",
    "## What he does",
    "",
    ...siteContent.whatIDo.flatMap((w) => [`### ${w.title}`, "", w.body, ""]),
    "## Projects",
    "",
    ...ordered.flatMap((c) => [
      `### ${c.title}`,
      "",
      `${c.sub}`,
      "",
      `- Kind: ${c.tag}${c.concept ? " (concept, no client)" : ""}`,
      c.role ? `- Role: ${c.role}` : "",
      c.year ? `- Year: ${c.year}` : "",
      `- Scope: ${c.scope}`,
      `- Stack: ${c.stack.join(", ")}`,
      `- Results: ${c.metrics.map((m) => `${m.v} (${m.k})`).join("; ")}`,
      c.links.demo ? `- Live: ${c.links.demo}` : "",
      c.links.code ? `- Code: ${c.links.code}` : "",
      `- Case study: ${BASE}/cases/${c.id}`,
      "",
      `Overview: ${c.overview}`,
      "",
      `Challenge: ${c.challenge}`,
      "",
      `Approach: ${c.stackWhy}`,
      "",
      `How it was built: ${c.engineering}`,
      "",
      ...(c.making?.length ? ["The Making:", ...c.making.map((m) => `- ${m.label}: ${m.text}`), ""] : []),
    ]),
    "## Experience",
    "",
    ...cvData.experience.flatMap((e) => [`### ${e.role}, ${e.org} (${e.period})`, "", ...e.bullets.map((b) => `- ${b}`), ""]),
    "## Education",
    "",
    ...cvData.education.map((e) => `- ${e.degree}, ${e.school} (${e.period})`),
    "",
    "## Services",
    "",
    `Published prices: ${BASE}/services · Enquiries: ${BASE}/contact`,
    "",
    ...services.offers.flatMap((o) => [`### ${o.name}: ${o.priceRange}`, "", o.tagline, "", `Typical timeline: ${o.timeline}`, ""]),
    `Changes after launch: ${services.aftercare.small.price} per small change, ${services.aftercare.hourly.price} for bigger work. No subscriptions.`,
    "",
  ];

  return new Response(lines.filter((l, i, all) => !(l === "" && all[i - 1] === "")).join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
