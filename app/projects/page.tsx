import { Metadata } from "next";
import Image from "next/image";
import { Github, ExternalLink, Lock } from "lucide-react";

import { projects } from "../data";
import { Navbar } from "../components/Navbar";
import { SkipLink } from "../components/SkipLink";
import { Footer } from "../sections/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

          {/* Project grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// ─── Card ───────────────────────────────────────────────────────────────────

type Project = (typeof projects)[number];

function ProjectCard({ project }: { project: Project }) {
  const hasLiveDemo = project.links.demo && project.links.demo !== "#";

  return (
    <article className="group relative flex flex-col h-full rounded-2xl border border-white/5 bg-charcoal-900/40 backdrop-blur-sm overflow-hidden hover:border-ice-400/30 transition-colors duration-300">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-charcoal-900">
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
        />
        {/* gradient fade at the bottom for text legibility if needed */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-charcoal-950/80 to-transparent"
        />
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <Badge variant="ice">{project.category}</Badge>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-grow p-6 md:p-7">
        <h2 className="text-lg md:text-xl font-semibold tracking-tight text-zinc-50 group-hover:text-ice-100 transition-colors mb-3">
          {project.title}
        </h2>

        <p className="text-sm md:text-[15px] text-charcoal-300 leading-relaxed mb-6 flex-grow">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.slice(0, 4).map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
          {project.tech.length > 4 && (
            <Badge variant="outline">+{project.tech.length - 4}</Badge>
          )}
        </div>

        {/* Action row */}
        <div className="flex gap-2 mt-auto pt-5 border-t border-white/5">
          <Button asChild variant="ghost" size="sm" className="flex-1">
            <a
              href={project.links.code}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} source code`}
            >
              <Github />
              Code
            </a>
          </Button>

          {hasLiveDemo ? (
            <Button asChild variant="default" size="sm" className="flex-1">
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${project.title} live site`}
              >
                <ExternalLink />
                Live
              </a>
            </Button>
          ) : (
            <div
              aria-label="Live demo unavailable"
              className="flex-1 inline-flex items-center justify-center gap-2 h-9 rounded-md text-xs font-mono uppercase tracking-wider text-charcoal-500 border border-white/5 bg-white/[0.02]"
            >
              <Lock size={12} />
              Offline
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
