import type { Metadata } from "next";
import { Kanit, JetBrains_Mono } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
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

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Taninwat Kaewpankan",
  image: "https://taninwatkaewpankan.xyz/opengraph-image",
  alternateName: "Ice",
  url: "https://taninwatkaewpankan.xyz",
  jobTitle: "Frontend Engineer & Project Coordinator",
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
  sameAs: [
    "https://www.linkedin.com/in/taninwat-k-a187951aa/",
    "https://github.com/Taninwat-55",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://taninwatkaewpankan.xyz"),
  title: {
    default: "Ice · Taninwat Kaewpankan — Frontend Engineer & Project Coordinator",
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
    title: "Ice · Taninwat Kaewpankan — Frontend Engineer & Project Coordinator",
    description:
      "Frontend engineer and project coordinator in Copenhagen, building and shipping web products with React, Next.js, and TypeScript.",
    url: "https://taninwatkaewpankan.xyz",
    siteName: "Ice — Taninwat Kaewpankan",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ice · Taninwat Kaewpankan — Frontend Engineer & Project Coordinator",
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
        className={`${kanit.variable} ${jetbrainsMono.variable} antialiased bg-night-900 text-frost`}
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
