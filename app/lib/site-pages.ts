import { cases } from "@/app/data";

/**
 * The pages "Ask the site" may point to, by key. The model picks keys (the
 * show_pages tool in app/api/chat/route.ts), never URLs, so it cannot invent
 * a link; both the route and the box (app/world/AskSite.tsx) turn keys into
 * links from this one list.
 */
export const SITE_PAGES: Record<string, { href: string; label: string }> = {
  home: { href: "/", label: "Home" },
  about: { href: "/about", label: "About" },
  work: { href: "/work", label: "All projects" },
  services: { href: "/services", label: "Services and prices" },
  showroom: { href: "/showroom", label: "Sample sites" },
  contact: { href: "/contact", label: "Contact" },
  enquire: { href: "/contact#enquire", label: "Start an enquiry" },
  cv: { href: "/cv", label: "CV" },
  ...Object.fromEntries(cases.map((c) => [`case:${c.id}`, { href: `/cases/${c.id}`, label: c.title }])),
};

export const PAGE_KEYS = Object.keys(SITE_PAGES) as [string, ...string[]];

/** Keys to links, dropping anything unknown and any repeat. */
export const linksFor = (keys: string[]) =>
  [...new Set(keys)].flatMap((k) => (SITE_PAGES[k] ? [SITE_PAGES[k]] : [])).slice(0, 3);

/**
 * An answer's text without its closing "PAGES: key, key" line, and the keys
 * that line named. While the answer streams, a half-written PAGES line is
 * hidden too. Also drops any line where the model wrote a function call or a
 * tag instead (it did, before the PAGES line existed).
 */
export function readPagesLine(raw: string): { text: string; keys: string[] } {
  let keys: string[] = [];
  const text = raw
    .split("\n")
    .filter((line) => {
      const m = line.match(/^\s*\**PAGES\**\s*:\s*(.*)$/i);
      if (m) {
        keys = m[1].split(/[,\s]+/).map((k) => k.trim().replace(/[`'".]/g, "")).filter((k) => k && k !== "none");
        return false;
      }
      return !/show_pages|<\/?button|functions\./i.test(line);
    })
    .join("\n")
    // A PAGES line still arriving: "P", "PA", "PAG"... at the very end.
    .replace(/\n\s*P(A(G(E(S)?)?)?)?\s*$/i, "")
    .trim();
  return { text, keys };
}
