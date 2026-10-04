import { MetadataRoute } from 'next';
import { getSortedPostsData } from './lib/posts';
import { cases } from './data';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://taninwatkaewpankan.xyz';

    // Get all blog posts
    const posts = getSortedPostsData();
    const blogUrls = posts.map((post) => ({
        url: `${baseUrl}/garden/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    const caseUrls = cases.map((c) => ({
        url: `${baseUrl}/cases/${c.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    // Nothing here auto-discovers routes — add every new top-level page to this
    // list or it will simply never be submitted.
    const staticRoutes = [
        { path: '', changeFrequency: "weekly" as const, priority: 1.0 },
        // Above the case pages: it is the commercial page, not a write-up.
        { path: '/services', changeFrequency: "monthly" as const, priority: 0.9 },
        // Above /cv and /garden: it is the hub every case study hangs off, and
        // the reason none of them can be orphaned again.
        { path: '/projects', changeFrequency: "monthly" as const, priority: 0.8 },
        { path: '/garden', changeFrequency: "weekly" as const, priority: 0.8 },
        // The About letter on the clock homepage, opened. Same page, own URL.
        { path: '/about', changeFrequency: "monthly" as const, priority: 0.7 },
        { path: '/contact', changeFrequency: "monthly" as const, priority: 0.6 },
        // Below /services: a secondary audience now that / is written for clients,
        // but the canonical home for the CV text since it left the homepage.
        { path: '/cv', changeFrequency: "monthly" as const, priority: 0.7 },
        // The Thai landing page. Its real channel is Facebook groups rather than
        // search, but it should still be indexable for anyone who does look.
        { path: '/th', changeFrequency: "monthly" as const, priority: 0.7 },
        // The Swedish landing page, for small businesses in Skåne. Unlike /th
        // this one IS a search play — a Skåne owner googles "hemsida småföretag
        // Malmö" rather than asking a community — so being indexed is the point
        // rather than a nice-to-have.
        { path: '/sv', changeFrequency: "monthly" as const, priority: 0.7 },
        // The Danish landing page. Held out of this list until item 28 passed —
        // a native speaker read all 93 lines on 2026-08-22 — because indexing
        // unproofread Danish was the one outcome that item existed to prevent.
        // Same priority as its siblings: a language landing page, not a case study.
        { path: '/da', changeFrequency: "monthly" as const, priority: 0.7 },
    ];

    const staticUrls = staticRoutes.map(({ path, changeFrequency, priority }) => ({
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
    }));

    return [...staticUrls, ...caseUrls, ...blogUrls];
}