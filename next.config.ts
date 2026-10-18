import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets <ViewTransition> animate client navigations: the stack's stipple
  // dissolve between cards (app/(stack)/layout.tsx, stack-global.css).
  experimental: {
    viewTransition: true,
  },
  outputFileTracingIncludes: {
    '/sitemap.xml': ['./posts/**/*.mdx'],
  },
  // Posts lived under /blog before the /garden rename. Search Console still had
  // /blog/leading-volunteers as a 404 on 2026-10-18.
  async redirects() {
    return [
      { source: "/blog", destination: "/garden", permanent: true },
      { source: "/blog/:slug", destination: "/garden/:slug", permanent: true },
      // The clock homepage's in-place objects, retired with it on 2026-10-18.
      // Each goes to the card or page that now does its job.
      { source: "/about", destination: "/engineer", permanent: true },
      { source: "/contact", destination: "/build", permanent: true },
      { source: "/rates", destination: "/services", permanent: true },
      { source: "/writing", destination: "/garden", permanent: true },
      // One list of projects, not two: the stack's All cards grid replaced
      // the paper /projects page in phase 2 (2026-10-18).
      { source: "/projects", destination: "/work", permanent: true },
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
