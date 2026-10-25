import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets <ViewTransition> animate client navigations: the stack's stipple
  // dissolve between cards (app/(stack)/layout.tsx, stack-global.css).
  experimental: {
    viewTransition: true,
  },
  async redirects() {
    return [
      // The garden (posts, formerly /blog) was cut on 2026-10-25 for the
      // site overhaul. Old post links go home rather than to a 404; each
      // points straight at / so no redirect chains through /garden.
      { source: "/garden", destination: "/", permanent: true },
      { source: "/garden/:slug", destination: "/", permanent: true },
      { source: "/blog", destination: "/", permanent: true },
      { source: "/blog/:slug", destination: "/", permanent: true },
      // The clock homepage's in-place objects, retired with it on 2026-10-18.
      // Each goes to the card or page that now does its job.
      // About moved from the Stack's /engineer card to /about, and the
      // enquiry form from /build to /contact, on 2026-10-25. Next passes the
      // query on, so /build?like=lumina keeps its prefill.
      { source: "/build", destination: "/contact", permanent: true },
      { source: "/engineer", destination: "/about", permanent: true },

      { source: "/rates", destination: "/services", permanent: true },
      { source: "/writing", destination: "/", permanent: true },
      // One list of projects, not two: the stack's All cards grid replaced
      // the paper /projects page in phase 2 (2026-10-18).
      { source: "/projects", destination: "/work", permanent: true },
      // The language pages (Thai, Swedish, Danish) were dropped for the site
      // overhaul on 2026-10-25: English only, no switch. A Danish /services
      // may come back later.
      { source: "/th", destination: "/", permanent: true },
      { source: "/sv", destination: "/", permanent: true },
      { source: "/da", destination: "/", permanent: true },
      // The overhaul's prototype became the homepage on 2026-10-25.
      { source: "/lab/crystallize", destination: "/", permanent: true },
      // Cinema Booking was delisted on 2026-10-24; its card may still be indexed.
      { source: "/cases/cinema", destination: "/work", permanent: true },
    ];
  },
  // Security headers for improved protection
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
