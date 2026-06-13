import type { Metadata } from "next";
import { SkipLink } from "./components/SkipLink";
import { ChatWidget } from "./components/ChatWidget";
import { CopenhagenAtmosphere } from "./components/CopenhagenAtmosphere";
import { Hero } from "./sections/Hero";
import { Marquee } from "./sections/Marquee";
import { About } from "./sections/About";
import { WhatIDo } from "./sections/WhatIDo";
import { Projects } from "./sections/Projects";
import { Garden } from "./sections/Garden";

export const metadata: Metadata = {
  alternates: { canonical: "https://taninwatkaewpankan.xyz" },
};

export default function Home() {
  return (
    <div
      className="min-h-screen bg-night-900 text-frost"
      style={{ overflowX: "clip" }}
    >
      <SkipLink />

      {/* Film grain — sits under modals/chat (z-50+) but over content */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-40 opacity-5"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <main id="main-content">
        <Hero />
        <Marquee />
        <About />
        <WhatIDo />
        <Projects />
        <Garden />
      </main>

      {/* Full-bleed bottom strip — replaces the footer */}
      <div className="w-full">
        <CopenhagenAtmosphere year={new Date().getFullYear()} />
      </div>

      <ChatWidget />
    </div>
  );
}
