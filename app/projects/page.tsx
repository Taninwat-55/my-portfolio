import { Metadata } from "next";

import { Navbar } from "../components/Navbar";
import { SkipLink } from "../components/SkipLink";
import { ClientProjectsGrid } from "./ClientProjectsGrid";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "The full archive — web applications, experiments, and client work I've built using React, Next.js, and Node.js.",
  openGraph: {
    title: "Projects | Taninwat Kaewpankan",
    description:
      "The full archive of web applications and client work built with React, Next.js, and TypeScript.",
  },
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-charcoal-950 text-charcoal-100">
      <SkipLink />
      <Navbar variant="simple" backLinkHref="/" backLinkText="Back to Home" />

      <main id="main-content" className="relative">
        {/* ambient glow + faded grid behind the header */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 right-[-10%] w-[680px] h-[480px] rounded-full bg-ice-500/8 blur-[120px]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[60vh] bg-grid-ice mask-radial-fade opacity-50 pointer-events-none"
        />

        <div className="relative container mx-auto px-6 pt-32 md:pt-40 pb-24 max-w-6xl">
          {/* Page header */}
          <div className="max-w-2xl mb-16 md:mb-20">
            <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-ice-400 mb-5">
              Project Archive
            </div>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] text-zinc-50 mb-6">
              Things I&apos;ve{" "}
              <span className="bg-gradient-to-r from-ice-200 via-ice-300 to-ice-500 bg-clip-text text-transparent">
                shipped.
              </span>
            </h1>
            <p className="text-lg text-charcoal-300 leading-relaxed">
              The full set — production web apps, experiments, client work, and a few
              learning projects. Built with React, Next.js, TypeScript, and the rest
              of the modern frontend stack.
            </p>
          </div>

          {/* Project grid client wrapper */}
          <ClientProjectsGrid />
        </div>
      </main>
    </div>
  );
}
