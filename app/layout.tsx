import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { MagneticCursor } from "./components/MagneticCursor";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
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
  jobTitle: "Product Engineer",
  description:
    "Product engineer based in Copenhagen. I take products from brief to live — React, TypeScript, Next.js, and full-stack thinking built in.",
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
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Supabase",
    "Full-Stack Development",
    "Product Thinking",
    "Startup",
    "Copenhagen",
  ],
  workExample: [
    { "@type": "WebSite", name: "Bevisly", url: "https://bevisly.com" },
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
    default: "Taninwat Kaewpankan | Product Engineer",
    template: "%s | Taninwat Kaewpankan",
  },
  description:
    "Product engineer based in Copenhagen. I take products from brief to live — React, TypeScript, Next.js, and full-stack thinking built in.",
  keywords: [
    "Product Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Copenhagen",
    "Denmark",
  ],
  openGraph: {
    title: "Taninwat Kaewpankan | Product Engineer",
    description: "Product engineer based in Copenhagen. Building end-to-end with React, TypeScript, and Next.js.",
    url: "https://taninwatkaewpankan.xyz",
    siteName: "Taninwat Kaewpankan Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taninwat Kaewpankan | Product Engineer",
    description: "Product engineer based in Copenhagen. Building end-to-end with React, TypeScript, and Next.js.",
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
        className={`${dmSans.variable} ${jetbrainsMono.variable} antialiased bg-sand-100 text-ink-900 selection:bg-clay-100 selection:text-clay-600`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <MagneticCursor />
        {children}
        <GoogleTagManager gtmId="GTM-NJ6FFTVW" />
      </body>
    </html>
  );
}
