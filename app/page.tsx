import { Navbar } from "./components/Navbar";
import { SkipLink } from "./components/SkipLink";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { WhatIDo } from "./sections/WhatIDo";
import { Projects } from "./sections/Projects";
import { ExperienceTimeline } from "./sections/ExperienceTimeline";
import { Garden } from "./sections/Garden";
import { Footer } from "./sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-sand-100 text-ink-900">
      <SkipLink />
      <Navbar variant="full" />

      <main id="main-content" className="pt-16">
        <Hero />
        <About />
        <WhatIDo />
        <Projects />
        <ExperienceTimeline />
        <Garden />
        <Footer />
      </main>
    </div>
  );
}
