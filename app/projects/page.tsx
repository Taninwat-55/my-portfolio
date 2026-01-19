import { Metadata } from 'next';
import Image from 'next/image';
import { Github, ExternalLink } from 'lucide-react';
import { projects } from '../data';
import { Navbar } from '../components/Navbar';
import { SkipLink } from '../components/SkipLink';

export const metadata: Metadata = {
    title: "Projects",
    description: "A collection of web applications, experiments, and client work built using React, Next.js, and Node.js.",
    openGraph: {
        title: "Projects | Taninwat Kaewpankan",
        description: "A collection of web applications and client work built with React and Next.js.",
    },
};

export default function ProjectsPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 selection:bg-orange-500/30">
            <SkipLink />
            <Navbar variant="simple" backLinkHref="/" backLinkText="Back to Home" />

            <main id="main-content" className="container mx-auto px-6 pt-32 pb-20">
                <div className="mb-12 max-w-2xl">
                    <h1 className="text-4xl font-bold mb-4 tracking-tight">All Projects</h1>
                    <p className="text-zinc-600 dark:text-zinc-400 text-lg">
                        A collection of web applications, experiments, and client work I&apos;ve built using React, Next.js, and Node.js.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="group rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col h-full"
                        >
                            <div className="relative h-48 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                                    {project.category}
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold mb-3 group-hover:text-orange-500 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-zinc-600 dark:text-zinc-300 text-sm mb-6 flex-grow leading-relaxed">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tech.map((tech, i) => (
                                        <span key={i} className="text-xs font-mono px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded text-zinc-600 dark:text-zinc-400">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-3 mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-800">
                                    <a
                                        href={project.links.code}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold border border-zinc-200 dark:border-zinc-700 rounded hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                                    >
                                        <Github size={16} /> CODE
                                    </a>
                                    {project.links.demo ? (
                                        <a
                                            href={project.links.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded hover:opacity-90 transition-opacity"
                                        >
                                            <ExternalLink size={16} /> LIVE
                                        </a>
                                    ) : (
                                        <span className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 rounded cursor-not-allowed">
                                            COMING SOON
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}