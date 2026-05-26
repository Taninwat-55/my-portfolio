import { MetadataRoute } from 'next';
import { getSortedPostsData } from './lib/posts';

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

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/garden`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.8,
        },
        ...blogUrls,
    ];
}