"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Github } from "lucide-react";
import { projects } from "../data";
import { Magnetic } from "../components/Magnetic";

export function Projects() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selected = projects.find((p) => p.id === selectedId) ?? null;

  return (
    <section id="projects" aria-label="Projects" className="py-24 md:py-32">
      <div className="container mx-auto px-6 max-w-5xl">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium text-clay-500 tracking-widest uppercase mb-16"
        >
          Projects
        </motion.p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <Magnetic key={project.id} strength={0.15}>
            <motion.div
              layoutId={`project-card-${project.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setSelectedId(project.id)}
              className="group relative flex flex-col p-6 rounded-xl border border-border bg-sand-50 hover:border-clay-300 cursor-pointer transition-colors"
            >
              {/* Image */}
              {project.image && (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-sand-200 mb-5">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}

              {/* Category */}
              <span className="inline-flex self-start items-center px-2.5 py-1 rounded-full text-xs font-medium bg-clay-100 text-clay-600 mb-3">
                {project.category}
              </span>

              {/* Title */}
              <h3 className="text-lg font-semibold text-ink-900 mb-2 group-hover:text-clay-600 transition-colors">
                {project.title}
              </h3>

              {/* Description — truncated */}
              <p className="text-sm text-ink-500 leading-relaxed line-clamp-2 mb-4">
                {project.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {project.tech.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-[11px] font-medium bg-sand-300 text-ink-500"
                  >
                    {t}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="px-2 py-0.5 rounded text-[11px] text-ink-400">
                    +{project.tech.length - 3} more
                  </span>
                )}
              </div>
            </motion.div>
            </Magnetic>
          ))}
        </div>
      </div>

      {/* Expanded overlay */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 z-40 bg-ink-900/40 backdrop-blur-sm"
            />

            {/* Expanded card */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none">
              <motion.div
                layoutId={`project-card-${selected.id}`}
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-sand-50 rounded-2xl border border-border shadow-xl pointer-events-auto"
              >
                {/* Close button */}
                <button
                  onClick={() => setSelectedId(null)}
                  aria-label="Close"
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-sand-200 text-ink-500 hover:bg-sand-300 transition-colors"
                >
                  <X size={16} />
                </button>

                {/* Image */}
                {selected.image && (
                  <div className="relative w-full aspect-video rounded-t-2xl overflow-hidden bg-sand-200">
                    <Image
                      src={selected.image}
                      alt={selected.title}
                      fill
                      className="object-cover"
                      sizes="672px"
                    />
                  </div>
                )}

                <div className="p-6 md:p-8">
                  {/* Category */}
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-clay-100 text-clay-600 mb-4">
                    {selected.category}
                  </span>

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-ink-900 mb-4">{selected.title}</h2>

                  {/* Full description */}
                  <p className="text-sm leading-relaxed text-ink-600 mb-6">
                    {selected.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {selected.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded text-xs font-medium bg-sand-200 text-ink-600"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-3">
                    {selected.links.demo && (
                      <a
                        href={selected.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-clay-500 text-white text-sm font-medium hover:bg-clay-600 transition-colors"
                      >
                        <ArrowUpRight size={14} />
                        Live demo
                      </a>
                    )}
                    {selected.links.code && (
                      <a
                        href={selected.links.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-ink-700 text-sm font-medium hover:border-clay-400 hover:text-clay-500 transition-colors"
                      >
                        <Github size={14} />
                        Source code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
