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
        { path: '/garden', changeFrequency: "weekly" as const, priority: 0.8 },
    ];

    const staticUrls = staticRoutes.map(({ path, changeFrequency, priority }) => ({
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
    }));

    return [...staticUrls, ...caseUrls, ...blogUrls];
}