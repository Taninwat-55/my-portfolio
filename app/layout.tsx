import type { Metadata } from "next";
import { Inter, Orbitron, Share_Tech_Mono } from "next/font/google";
import { GoogleTagManager } from '@next/third-parties/google'; // Changed to GTM
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL('https://taninwatkaewpankan.xyz'),
  title: {
    default: "Taninwat Kaewpankan | Product Engineer & Frontend Dev",
    template: "%s | Taninwat Kaewpankan"
  },
  description: "Portfolio of Taninwat Kaewpankan. Frontend Engineer with a Master's in Business. Bridging technical precision with product strategy.",
  keywords: ["Frontend Developer", "Product Manager", "React", "Next.js", "Copenhagen"],
  openGraph: {
    title: "Taninwat Kaewpankan | Product Engineer",
    description: "Bridging business strategy and engineering precision.",
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
    title: "Taninwat Kaewpankan | Product Engineer",
    description: "Frontend Engineer with a Master's in Business.",
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
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${orbitron.variable} ${codeFont.variable} antialiased bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50`}>
        {children}
        {/* Using Google Tag Manager with your specific ID */}
        <GoogleTagManager gtmId="GTM-NJ6FFTVW" />
      </body>
    </html>
  );
}