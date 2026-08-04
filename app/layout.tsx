import type { Metadata } from "next";
import { Kanit, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { personalInfo, siteContent } from "./data";
import "./globals.css";

// Only the weights the app actually uses. next/font emits a <link rel="preload">
// per weight, so the two unused ones (600, 800) were downloading and preloading
// files nothing rendered — which is exactly what the console warnings were about.
// light 300 · normal 400 · medium 500 · bold 700 · black 900
const kanit = Kanit({
  subsets: ["latin"],
  variable: "--font-kanit",
  weight: ["300", "400", "500", "700", "900"],
});
// Not preloaded: mono only appears in the footer's block-height counter and in
// garden post code blocks, none of which are needed for first paint. Preloading it
// meant the browser fetched a font it wouldn't use for seconds, if at all.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  preload: false,
});

// Display serif, italic only — used as a counterpoint to Kanit for the small
// amount of sentence-case "voice" text: section subtitles, the story signature,
// and case-study straplines. Not preloaded, because none of it is above the fold.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument-serif",
  preload: false,
});

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personalInfo.name,
  image: "https://taninwatkaewpankan.xyz/opengraph-image",
  alternateName: personalInfo.nickname,
  url: "https://taninwatkaewpankan.xyz",
  jobTitle: siteContent.roleLabel,
  description:
    "Frontend engineer and project coordinator based in Copenhagen, building and shipping web products with React, Next.js, and TypeScript.",
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
    { "@type": "WebSite", name: "Satoshi Standard", url: "https://www.satoshi-standard.xyz" },
    { "@type": "WebSite", name: "Racha Beauty & Wellness", url: "https://rachabeautywellness.com" },
  ],
  sameAs: [personalInfo.socials.linkedin, personalInfo.socials.github],
};

// One string, three consumers. Previously duplicated across the metadata
// default, the Open Graph card and the Twitter card, which is how a title
// change turns into a three-line edit that is easy to half-finish.
const SITE_TITLE = `${personalInfo.nickname} · ${personalInfo.name} — ${siteContent.roleLabel}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://taninwatkaewpankan.xyz"),
  title: {
    default: SITE_TITLE,
    template: "%s | Ice — Taninwat Kaewpankan",
  },
  description:
    "Ice (Taninwat Kaewpankan) is a frontend engineer and project coordinator in Copenhagen, building and shipping web products with React, Next.js, and TypeScript.",
  keywords: [
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
    description:
      "Frontend engineer and project coordinator in Copenhagen, building and shipping web products with React, Next.js, and TypeScript.",
    url: "https://taninwatkaewpankan.xyz",
    siteName: "Ice — Taninwat Kaewpankan",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description:
      "Frontend engineer and project coordinator in Copenhagen, building and shipping web products with React, Next.js, and TypeScript.",
  },
  icons: {
    icon: "/icon.svg",
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
        className={`${kanit.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} antialiased bg-night-900 text-frost`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
        <GoogleTagManager gtmId="GTM-NJ6FFTVW" />
      </body>
    </html>
  );
}
