import type { Metadata } from "next";
import { Inter, Orbitron, Share_Tech_Mono } from "next/font/google";
import { GoogleTagManager } from '@next/third-parties/google'; // Changed to GTM
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";

// Load your fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron"
});
const codeFont = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-code"
});

// Person JSON-LD structured data for SEO
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Taninwat Kaewpankan',
  alternateName: 'Ice',
  url: 'https://taninwatkaewpankan.xyz',
  jobTitle: 'Aspiring Product Manager',
  description: "Aspiring Product Manager with a Master's in Business & Economics. I bridge the gap between business strategy, user needs, and technical execution.",
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'Uppsala University',
    },
  ],
  knowsAbout: ['Product Management', 'Frontend Development', 'React', 'Next.js', 'TypeScript', 'Business Strategy'],
  sameAs: [
    'https://www.linkedin.com/in/taninwat-k-a187951aa/',
    'https://github.com/Taninwat-55',
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://taninwatkaewpankan.xyz'),
  title: {
    default: "Taninwat Kaewpankan | Aspiring Product Manager",
    template: "%s | Taninwat Kaewpankan"
  },
  description: "Aspiring Product Manager with a Master's in Business & Economics. I bridge the gap between business strategy, user needs, and technical execution.",
  keywords: ["Product Manager", "Junior PM", "Business Strategy", "Technical PM", "Copenhagen", "Product Engineer"],
  alternates: {
    canonical: 'https://taninwatkaewpankan.xyz',
  },
  openGraph: {
    title: "Taninwat Kaewpankan | Aspiring Product Manager",
    description: "Bridging business strategy with product vision.",
    url: 'https://taninwatkaewpankan.xyz',
    siteName: 'Taninwat Kaewpankan Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Taninwat Kaewpankan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Taninwat Kaewpankan | Aspiring Product Manager",
    description: "Aspiring PM with a Master's in Business & Economics.",
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${orbitron.variable} ${codeFont.variable} antialiased bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50`}>
        {/* Person JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {/* Wrap everything inside ThemeProvider */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <GoogleTagManager gtmId="GTM-NJ6FFTVW" />
        </ThemeProvider>
      </body>
    </html>
  );
}