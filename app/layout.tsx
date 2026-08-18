import type { Metadata } from "next";
import { Kanit, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { personalInfo, siteContent } from "./data";
import "./globals.css";

// Only the weights the app actually uses. next/font emits a <link rel="preload">
// per weight, so the two unused ones (600, 800) were downloading and preloading
// files nothing rendered — which is exactly what the console warnings were about.
// light 300 · normal 400 · medium 500 · bold 700 · black 900
// "thai" is not decoration: Kanit is a Thai typeface (Cadson Demak) and the body
// stack is var(--font-kanit), sans-serif. Without this subset every Thai character
// on /th fell through to a generic system font, so the Thai page did not render in
// the site's own typeface at all. next/font emits one file per subset with a
// unicode-range, so Latin-only visitors never download the Thai glyphs.
const kanit = Kanit({
  subsets: ["latin", "thai"],
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
    { "@type": "WebSite", name: "Satoshi Standard", url: "https://satoshi-standard.vercel.app" },
    { "@type": "WebSite", name: "Racha Beauty & Wellness", url: "https://rachabeautywellness.com" },
  ],
  sameAs: [personalInfo.socials.linkedin, personalInfo.socials.github],
};

// One string, three consumers. Previously duplicated across the metadata
// default, the Open Graph card and the Twitter card, which is how a title
// change turns into a three-line edit that is easy to half-finish.
//
// siteTagline rather than roleLabel: this is what a person reads in a browser tab
// and a search result, and the site now leads with what it offers rather than
// with a job title. roleLabel is still the structured answer — it stays on
// Person.jobTitle in the JSON-LD above, on /services, in the chatbot prompt, and
// as the /cv heading.
const SITE_TITLE = `${personalInfo.nickname} · ${personalInfo.name} — ${siteContent.siteTagline}`;

// The description had the same problem the title had, and worse: TWO near-identical
// recruiter-framed sentences across three consumers — one on metadata.description,
// a slightly different one pasted into both the Open Graph and Twitter cards. One
// string now, rewritten client-first to match the new title, keeping the
// React/Next.js/TypeScript terms a recruiter searches for.
const SITE_DESCRIPTION =
  "Ice (Taninwat Kaewpankan) builds websites and web app frontends from Copenhagen. React, Next.js, TypeScript. Published prices, fixed scope, written quote first.";

export const metadata: Metadata = {
  metadataBase: new URL("https://taninwatkaewpankan.xyz"),
  title: {
    default: SITE_TITLE,
    template: "%s | Ice — Taninwat Kaewpankan",
  },
  description: SITE_DESCRIPTION,
  // Both audiences, deliberately. The engineer terms are what a recruiter
  // searches; the Danish terms are what a business owner actually types, and the
  // site is now written for them first.
  keywords: [
    "Web Developer Copenhagen",
    "freelance web developer Copenhagen",
    "freelance webudvikler København",
    "hjemmeside til lille virksomhed",
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
    siteName: "Ice — Taninwat Kaewpankan",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
