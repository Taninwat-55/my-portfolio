import { MetadataRoute } from 'next';
import { getSortedPostsData } from './lib/posts'; // Adjust path if needed

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://taninwatkaewpankan.xyz';

    // Get all blog posts
    const posts = getSortedPostsData();
    const blogUrls = posts.map((post) => ({
        url: `${baseUrl}/garden/${post.slug}`,
        lastModified: new Date(post.date),
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/garden`,
            lastModified: new Date(),
        },
        ...blogUrls,
    ];
}