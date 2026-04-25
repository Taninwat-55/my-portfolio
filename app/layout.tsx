import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { SmoothScroll } from "./components/SmoothScroll";
import { CustomCursor } from "./components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Taninwat Kaewpankan",
  alternateName: "Ice",
  url: "https://taninwatkaewpankan.xyz",
  jobTitle: "Frontend Developer & Product Engineer",
  description:
    "Frontend Developer with a Master's in Business & Economics. I build fast, accessible interfaces with a product mindset.",
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Uppsala University",
    },
  ],
  knowsAbout: [
    "Frontend Development",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Product Engineering",
  ],
  sameAs: [
    "https://www.linkedin.com/in/taninwat-k-a187951aa/",
    "https://github.com/Taninwat-55",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://taninwatkaewpankan.xyz"),
  title: {
    default: "Taninwat Kaewpankan | Frontend Developer & Product Engineer",
    template: "%s | Taninwat Kaewpankan",
  },
  description:
    "Frontend Developer with a Master's in Business & Economics. I build fast, accessible interfaces with a product mindset.",
  keywords: [
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Product Engineer",
    "Copenhagen",
  ],
  alternates: {
    canonical: "https://taninwatkaewpankan.xyz",
  },
  openGraph: {
    title: "Taninwat Kaewpankan | Frontend Developer & Product Engineer",
    description: "Building fast, accessible interfaces with a product mindset.",
    url: "https://taninwatkaewpankan.xyz",
    siteName: "Taninwat Kaewpankan Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Taninwat Kaewpankan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taninwat Kaewpankan | Frontend Developer & Product Engineer",
    description: "Building fast, accessible interfaces with a product mindset.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-charcoal-950 text-charcoal-100 selection:bg-ice-400/30 selection:text-ice-100`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
        <CustomCursor />
        <GoogleTagManager gtmId="GTM-NJ6FFTVW" />
      </body>
    </html>
  );
}
