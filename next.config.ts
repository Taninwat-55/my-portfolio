import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets <ViewTransition> animate client navigations: on the clock's /work, a
  // print's photo grows into its case study's hero (case-hero-<id>).
  experimental: {
    viewTransition: true,
  },
  outputFileTracingIncludes: {
    '/sitemap.xml': ['./posts/**/*.mdx'],
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
