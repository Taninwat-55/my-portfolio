"use client";

import Image from "next/image";
import { Github, ExternalLink, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects } from "../data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

type Project = (typeof projects)[number];

function ProjectCard({ project }: { project: Project }) {
  const hasLiveDemo = project.links.demo && project.links.demo !== "#";
  const hasCodeLink = !!project.links.code;

  return (
    <motion.article 
      variants={fadeUp}
      className="group relative flex flex-col h-full rounded-2xl border border-white/5 bg-charcoal-900/40 backdrop-blur-sm overflow-hidden hover:border-ice-400/30 hover:-translate-y-1 hover:shadow-2xl hover:shadow-ice-500/10 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-charcoal-900">
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-charcoal-950/80 to-transparent"
        />
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
          {hasCodeLink ? (
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
          ) : (
            <div
              aria-label="Source code private"
              className="flex-1 inline-flex items-center justify-center gap-2 h-9 rounded-md text-xs font-mono uppercase tracking-wider text-charcoal-500 border border-white/5 bg-white/[0.02]"
            >
              <Lock size={12} />
              Private
            </div>
          )}

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
    </motion.article>
  );
}

export function ClientProjectsGrid() {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } }
      }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </motion.div>
  );
}
