import { createMcpHandler } from "mcp-handler";
import { z } from "zod";
import {
  cases,
  conceptPrice,
  cvData,
  founding,
  foundingOpen,
  inShowroom,
  leadCaseIds,
  personalInfo,
  services,
  siteContent,
  vat,
} from "@/app/data";
import { createRateLimiter } from "@/app/lib/rate-limit";
import { getClientIp } from "@/app/lib/request-ip";

/**
 * A public, read-only MCP server (2026-10-26): an AI assistant can ask it
 * about Ice directly instead of scraping the site. It serves only what the
 * site already publishes, from data.ts, so it can never say something the
 * pages don't. No model runs here; the caller's model does the thinking, so
 * it costs nothing per call.
 *
 * Connect: `claude mcp add --transport http ice https://taninwatkaewpankan.xyz/mcp`
 */

const BASE = "https://taninwatkaewpankan.xyz";

// Its own namespace: sharing "rl:chat" would spend the chat's budget.
const checkRateLimit = createRateLimiter({ prefix: "rl:mcp", limit: 60, window: "1 h" });

/** Every tool answers with one JSON document. */
const json = (data: unknown) => ({
  content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
});

const caseSummary = (c: (typeof cases)[number]) => ({
  id: c.id,
  title: c.title,
  summary: c.sub,
  kind: c.tag,
  scope: c.scope,
  role: c.role ?? null,
  year: c.year ?? null,
  concept: Boolean(c.concept),
  url: `${BASE}/cases/${c.id}`,
});

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      "get_profile",
      {
        title: "Profile",
        description:
          "Who Ice (Taninwat Kaewpankan) is: title, location, summary, what he does, languages, and what he is open to.",
        inputSchema: z.object({}),
      },
      async () =>
        json({
          name: personalInfo.name,
          goesBy: personalInfo.nickname,
          title: siteContent.roleLabel,
          location: personalInfo.location,
          openTo: "Full-time roles and client projects",
          summary: cvData.summary,
          howHeWorks: siteContent.howIWork,
          whatHeDoes: siteContent.whatIDo,
          facts: siteContent.aboutFacts,
          url: `${BASE}/about`,
        }),
    );

    server.registerTool(
      "list_projects",
      {
        title: "Projects",
        description:
          "Every project with a case page, lead projects first. Optionally filter by kind (e.g. 'Full-Stack', 'Client Work', 'Product').",
        inputSchema: z.object({
          kind: z.string().optional().describe("Case-insensitive match on the project's kind"),
        }),
      },
      async ({ kind }) => {
        const ordered = [
          ...leadCaseIds.flatMap((id) => cases.filter((c) => c.id === id)),
          ...cases.filter((c) => !leadCaseIds.includes(c.id)),
        ];
        const k = kind?.toLowerCase();
        return json(ordered.filter((c) => !k || c.tag.toLowerCase().includes(k)).map(caseSummary));
      },
    );

    server.registerTool(
      "get_case",
      {
        title: "Case study",
        description:
          "One project in full: overview, challenge, approach, how it was built, results, stack and links. Use an id from list_projects.",
        inputSchema: z.object({ id: z.string().describe("Project id, e.g. 'trailr' or 'bevisly'") }),
      },
      async ({ id }) => {
        const c = cases.find((x) => x.id === id);
        if (!c) {
          return {
            ...json({ error: `No project '${id}'.`, ids: cases.map((x) => x.id) }),
            isError: true,
          };
        }
        return json({
          ...caseSummary(c),
          overview: c.overview,
          challenge: c.challenge,
          approach: c.stackWhy,
          howItWasBuilt: c.engineering,
          results: c.metrics.map((m) => `${m.v}: ${m.k}`),
          stack: c.stack,
          links: c.links,
          ...(inShowroom(c) ? { priceOfASiteLikeThis: conceptPrice(c.showroom!).total } : {}),
        });
      },
    );

    server.registerTool(
      "get_services",
      {
        title: "Services and prices",
        description:
          "Ice's freelance web development offers with their published prices, the optional monthly plan, and the founding-client offer. Prices are what the site publishes; a real project is quoted after an enquiry.",
        inputSchema: z.object({}),
      },
      async () =>
        json({
          offers: services.offers.map((o) => ({
            name: o.name,
            tagline: o.tagline,
            forWho: o.forWho,
            price: o.priceRange,
            timeline: o.timeline,
            includes: o.includes,
            priceLadder: o.priceLadder ?? null,
          })),
          localVisibility: { title: services.localVisibility.title, price: services.localVisibility.price },
          foundingClients: foundingOpen
            ? { label: founding.label, spotsLeft: founding.spotsLeft, discount: `${Math.round(founding.discount * 100)}%` }
            : null,
          vat: vat.note,
          url: `${BASE}/services`,
          enquire: `${BASE}/contact`,
        }),
    );

    server.registerTool(
      "get_cv",
      {
        title: "CV",
        description: "Ice's CV: summary, skills, projects, experience, education and the PDF link.",
        inputSchema: z.object({}),
      },
      async () =>
        json({
          ...cvData,
          pdf: `${BASE}/assets/Taninwat_Kaewpankan_CV.pdf`,
          url: `${BASE}/cv`,
        }),
    );

    server.registerTool(
      "get_contact",
      {
        title: "Contact",
        description: "How to reach Ice: email, LinkedIn, GitHub and the contact page with the project enquiry form.",
        inputSchema: z.object({}),
      },
      async () =>
        json({
          email: personalInfo.email,
          linkedin: personalInfo.socials.linkedin,
          github: personalInfo.socials.github,
          contactPage: `${BASE}/contact`,
          location: personalInfo.location,
        }),
    );
  },
  { serverInfo: { name: "ice-portfolio", version: "1.0.0" } },
);

async function guarded(request: Request) {
  // Fails open like the chat route: the tools only return public data, so an
  // unreachable Redis should not take the server offline.
  if ((await checkRateLimit(getClientIp(request))) === "limited") {
    return Response.json({ error: "Rate limit reached. Try again in an hour." }, { status: 429 });
  }
  return handler(request);
}

export { guarded as GET, guarded as POST, guarded as DELETE };
