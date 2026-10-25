import { MetadataRoute } from 'next';
import { cases } from './data';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://taninwatkaewpankan.xyz';

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
        // The stack's cards that are not case studies (those come from `cases`
        // below). /about, /contact, /rates and /writing redirect since the clock
        // retired, so they are out of this list.
        { path: '/about', changeFrequency: "monthly" as const, priority: 0.8 },
        { path: '/contact', changeFrequency: "monthly" as const, priority: 0.8 },
        // Sample sites with what each would cost; the commercial sibling of /services.
        { path: '/showroom', changeFrequency: "weekly" as const, priority: 0.8 },
        { path: '/work', changeFrequency: "monthly" as const, priority: 0.8 },
        // The canonical home for the CV text since it left the homepage.
        { path: '/cv', changeFrequency: "monthly" as const, priority: 0.7 },
    ];

    const staticUrls = staticRoutes.map(({ path, changeFrequency, priority }) => ({
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
    }));

    return [...staticUrls, ...caseUrls];
}