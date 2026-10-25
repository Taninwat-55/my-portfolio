import type { Metadata } from "next";
import Script from "next/script";
import { personalInfo, siteContent } from "./data";
import "./globals.css";

// Fonts live with the pages that use them: the world's in app/world/fonts.ts,
// the Stack's (Kanit and JetBrains Mono included) in
// app/components/stack/fonts.ts. Anything declared here is preloaded on every
// route, which cost the world pages 15 font files they never drew
// (Lighthouse, 2026-10-25).

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personalInfo.name,
  image: "https://taninwatkaewpankan.xyz/opengraph-image",
  alternateName: personalInfo.nickname,
  url: "https://taninwatkaewpankan.xyz",
  jobTitle: siteContent.roleLabel,
  description:
    "Full-stack engineer based in Copenhagen, building and shipping web products with React, Next.js, TypeScript and PostgreSQL, and designing the interfaces he builds.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Copenhagen",
    addressCountry: "DK",
  },
  worksFor: {
    "@type": "Organization",
    name: "Trailr AI",
    url: "https://trailr.ai",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Uppsala University",
    },
  ],
  knowsAbout: [
    "Frontend Development",
    "Product Engineering",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Supabase",
    "Full-Stack Development",
    "Project Coordination",
    "Agile / Scrum",
    "Stakeholder Management",
    "Product Thinking",
    "Startup",
    "Copenhagen",
  ],
  workExample: [
    { "@type": "WebSite", name: "Bevisly", url: "https://bevisly.com" },
    { "@type": "WebSite", name: "MockMate", url: "https://mockmate.space" },
    { "@type": "WebSite", name: "Satoshi Standard", url: "https://satoshi-standard.vercel.app" },
    { "@type": "WebSite", name: "Racha Beauty & Wellness", url: "https://rachabeautywellness.com" },
  ],
  sameAs: [personalInfo.socials.linkedin, personalInfo.socials.github],
};

// One string, three consumers. Previously duplicated across the metadata
// default, the Open Graph card and the Twitter card, which is how a title
// change turns into a three-line edit that is easy to half-finish.
//
// roleLabel since the clock homepage (2026-10-04): the page itself now leads with
// the job title, so its search result and browser tab say the same. Clients
// searching for a web developer land on /services, whose description and Danish
// keywords are written for them. Before the clock, this used siteTagline, because
// the long-scroll homepage was written for clients first.
const SITE_TITLE = `${personalInfo.nickname} · ${personalInfo.name}, ${siteContent.roleLabel} in Copenhagen`;

// One string, three consumers (metadata, Open Graph, Twitter). Both audiences in
// two sentences: the job and its stack for a recruiter, and the client work for
// a business owner, who reads on to /services.
const SITE_DESCRIPTION =
  "Ice (Taninwat Kaewpankan) is a full-stack engineer in Copenhagen: React, Next.js, TypeScript and PostgreSQL, from interface to database. Open to full-time roles, and taking on client projects with published prices.";

export const metadata: Metadata = {
  metadataBase: new URL("https://taninwatkaewpankan.xyz"),
  title: {
    default: SITE_TITLE,
    template: "%s | Ice · Taninwat Kaewpankan",
  },
  description: SITE_DESCRIPTION,
  // LinkedIn's Post Inspector reads the author from this meta tag.
  authors: [{ name: personalInfo.name, url: "https://taninwatkaewpankan.xyz" }],
  // Both audiences, deliberately. The engineer terms are what a recruiter
  // searches; the Danish terms are what a business owner actually types, and the
  // site is now written for them first.
  keywords: [
    "Web Developer Copenhagen",
    "freelance web developer Copenhagen",
    "freelance webudvikler København",
    "hjemmeside til lille virksomhed",
    "Full-stack Engineer",
    "Frontend Engineer",
    "Frontend Developer",
    "Product Engineer",
    "Project Coordinator",
    "React",
    "Next.js",
    "TypeScript",
    "Copenhagen",
    "Denmark",
  ],
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "https://taninwatkaewpankan.xyz",
    siteName: "Ice · Taninwat Kaewpankan",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="antialiased"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
        {/* Cloudflare Web Analytics: cookie-free, so no consent banner. It
            replaced GTM-NJ6FFTVW on 2026-10-18, whose container had no tags and
            shipped ~330 KB of script that recorded nothing. afterInteractive
            keeps it off the LCP path. */}
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "1fc05a95def54e78859eae949cc2df5f"}'
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
