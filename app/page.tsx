import { Navbar } from "./components/Navbar";
import { SkipLink } from "./components/SkipLink";
import { Hero } from "./sections/Hero";
import { SkillTree } from "./sections/SkillTree";
import { CaseStudies } from "./sections/CaseStudies";
import { Garden } from "./sections/Garden";
import { Footer } from "./sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-charcoal-950 text-charcoal-100">
      <SkipLink />
      <Navbar variant="full" />

      <main id="main-content">
        {/* ───── Section 1 — The Hook (Hero) ───── */}
        <Hero />

        {/* ───── Section 2 — The Skill Tree (Identity) ───── */}
        <SkillTree />

        {/* ───── Section 3 — The Case Studies ───── */}
        <CaseStudies />

        {/* ───── Section 4 — The Garden (Interactive Blog) ───── */}
        <Garden />

        {/* ───── Section 5 — Footer (Final CTA + Sitemap) ───── */}
        <Footer />
      </main>
    </div>
  );
}
