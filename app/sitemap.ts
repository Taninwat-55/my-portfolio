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

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/garden`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.8,
        },
        ...caseUrls,
        ...blogUrls,
    ];
}