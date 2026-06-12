import type { Metadata } from "next";
import { Kanit, JetBrains_Mono } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";

const kanit = Kanit({
  subsets: ["latin"],
  variable: "--font-kanit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Taninwat Kaewpankan",
  image: "https://taninwatkaewpankan.xyz/opengraph-image",
  alternateName: "Ice",
  url: "https://taninwatkaewpankan.xyz",
  jobTitle: "Product Engineer & Project Coordinator",
  description:
    "Product engineer and project coordinator based in Copenhagen — building and shipping web products with React, Next.js, and TypeScript.",
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
    "Product Engineering",
    "Frontend Development",
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
    default: "Ice · Taninwat Kaewpankan — Product Engineer & Project Coordinator",
    template: "%s | Ice — Taninwat Kaewpankan",
  },
  description:
    "Ice (Taninwat Kaewpankan) is a product engineer and project coordinator in Copenhagen — building and shipping web products with React, Next.js, and TypeScript.",
  keywords: [
    "Product Engineer",
    "Junior Frontend Developer",
    "Frontend Developer",
    "Project Coordinator",
    "React",
    "Next.js",
    "TypeScript",
    "Copenhagen",
    "Denmark",
  ],
  openGraph: {
    title: "Ice · Taninwat Kaewpankan — Product Engineer & Project Coordinator",
    description:
      "Product engineer and project coordinator in Copenhagen — building and shipping web products with React, Next.js, and TypeScript.",
    url: "https://taninwatkaewpankan.xyz",
    siteName: "Ice — Taninwat Kaewpankan",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ice · Taninwat Kaewpankan — Product Engineer & Project Coordinator",
    description:
      "Product engineer and project coordinator in Copenhagen — building and shipping web products with React, Next.js, and TypeScript.",
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
