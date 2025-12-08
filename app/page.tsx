"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, Download, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { personalInfo, skills, experience, projects } from "./data";
import { ThemeToggle } from "./components/theme-toggle";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 selection:bg-orange-500/30">

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl tracking-tighter" aria-label="Home">
            TK<span className="text-orange-500">.</span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400 items-center">
            <a href="#about" className="hover:text-orange-500 transition-colors">About</a>
            <a href="#skills" className="hover:text-orange-500 transition-colors">Skills</a>
            <a href="#work" className="hover:text-orange-500 transition-colors">Experience</a>
            <a href="#projects" className="hover:text-orange-500 transition-colors">Projects</a>
            <Link href="/blog" className="hover:text-orange-500 transition-colors">
              Blog
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <a
              href="mailto:taninwat.kaewpankan@gmail.com"
              className="px-4 py-2 text-xs font-bold bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg hover:opacity-90 transition-opacity"
              aria-label="Send email to hire me"
            >
              HIRE ME
            </a>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 pt-32 pb-20">

        {/* HERO SECTION */}
        <section className="mb-32 max-w-4xl">
          <motion.div
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={fadeInUp.transition}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 text-sm font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              Available for Product & Engineering Roles
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
              Bridging business strategy <br />
              with <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600">engineering precision.</span>
            </h1>

            <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl leading-relaxed">
              I am Taninwat "Ice" Kaewpankan. A Frontend Engineer with a
              <strong> Master's in Business & Economics</strong>. I combine technical skills in
              React & Node.js with product strategy to build meaningful digital experiences.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-8 rounded-lg transition-all flex items-center gap-2"
                aria-label="View my projects"
              >
                View Projects <ArrowRight size={18} />
              </a>
              <a
                href="/assets/_CV - Eng.pdf"
                target="_blank"
                className="bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-medium py-3 px-8 rounded-lg transition-all flex items-center gap-2"
                aria-label="Download my Resume PDF"
              >
                Download CV <Download size={18} />
              </a>
            </div>

            <div className="flex gap-6 mt-12 text-zinc-400">
              <a href={personalInfo.socials.github} target="_blank" aria-label="Visit my GitHub Profile" className="hover:text-orange-500 transition-colors"><Github /></a>
              <a href={personalInfo.socials.linkedin} target="_blank" aria-label="Visit my LinkedIn Profile" className="hover:text-orange-500 transition-colors"><Linkedin /></a>
              <a href={`mailto:${personalInfo.email}`} aria-label="Send me an email" className="hover:text-orange-500 transition-colors"><Mail /></a>
            </div>
          </motion.div>
        </section>

        {/* ABOUT / PROFILE SECTION */}
        <section id="about" className="mb-32 border-y border-zinc-100 dark:border-zinc-800 py-16">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="relative w-48 h-48 md:w-56 md:h-56 flex-shrink-0">
              <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-3xl scale-110"></div>
              <Image
                src="/assets/Ice-img.webp"
                alt="Taninwat Kaewpankan Profile"
                fill
                className="object-cover rounded-full shadow-lg relative z-10"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">About Me</h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                I am a developer with a background in Business and Game Design. I moved into engineering because I love the process of turning ideas into real, working software. 
                I like to focus on building user-friendly applications, and I am always eager to learn new tools and collaborate with a team to solve interesting problems.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                I hold a <strong>Bachelor of Arts in Game Design & Project Management</strong> and <strong>Master of Science in Business & Economics</strong> from Uppsala University and am currently
                sharpening my technical edge with a Professional Bachelor in Frontend Development. My goal is to work at the
                intersection of <strong>Product, Business, and Engineering</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* SKILLS - THE NEW "ROW" LAYOUT */}
        <section id="skills" className="mb-32">
          <h2 className="text-2xl font-bold mb-12 flex items-center gap-2">
            <span className="w-8 h-1 bg-orange-500 rounded-full"></span>
            Core Competencies
          </h2>

          <div className="space-y-4">
            {skills.map((skillGroup, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                // Layout: Horizontal row with hover effect, clean background
                className="group flex flex-col md:flex-row items-start md:items-center gap-6 p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/50 hover:border-orange-500/30 hover:bg-orange-50/50 dark:hover:bg-zinc-800/80 transition-all duration-300"
              >
                {/* Left Column: Icon & Title */}
                <div className="flex items-center gap-4 md:w-1/3">
                  <div className={`p-3 rounded-xl ${skillGroup.bg} ${skillGroup.color}`}>
                    <skillGroup.icon size={24} />
                  </div>
                  <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-200">{skillGroup.category}</h3>
                </div>

                {/* Right Column: Clean List of Skills */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 md:w-2/3">
                  {skillGroup.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                      {/* Subtle Dot Indicator */}
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50 group-hover:bg-orange-500 transition-colors"></span>
                      <span className="text-sm font-medium group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="work" className="mb-32 max-w-5xl">
          <h2 className="text-2xl font-bold mb-12 flex items-center gap-2">
            <span className="w-8 h-1 bg-orange-500 rounded-full"></span>
            Career Trajectory
          </h2>

          <div className="space-y-8 relative border-l-2 border-zinc-200 dark:border-zinc-800 ml-3 md:ml-6 pl-8 md:pl-12">
            {experience.map((item, idx) => (
              <div key={idx} className="relative">
                <span className="absolute -left-[41px] md:-left-[57px] top-1 h-5 w-5 rounded-full border-4 border-white dark:border-zinc-950 bg-orange-500"></span>

                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
                  <h3 className="text-xl font-bold">{item.role}</h3>
                  <span className="text-sm font-mono text-orange-800 dark:text-orange-300 bg-orange-100 dark:bg-orange-900/30 px-2 py-0.5 rounded">
                    {item.period}
                  </span>
                </div>
                <div className="text-zinc-600 dark:text-zinc-400 font-medium mb-3">{item.organization}</div>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="mb-20">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="w-8 h-1 bg-orange-500 rounded-full"></span>
              Featured Projects
            </h2>
            <Link
              href="/projects"
              className="hidden md:flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-orange-500 transition-colors"
            >
              View Full Archive <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -5 }}
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
                    {project.tech.slice(0, 3).map((tech, i) => (
                      <span key={i} className="text-xs font-mono px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded text-zinc-600 dark:text-zinc-400">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-800">
                    <a
                      href={project.links.code}
                      target="_blank"
                      aria-label={`View code for ${project.title}`}
                      className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold border border-zinc-200 dark:border-zinc-700 rounded hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <Github size={16} /> CODE
                    </a>
                    <a
                      href={project.links.demo}
                      target="_blank"
                      aria-label={`View live demo for ${project.title}`}
                      className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded hover:opacity-90 transition-opacity"
                    >
                      <ExternalLink size={16} /> LIVE
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile "View All" button */}
          <div className="mt-8 flex justify-center md:hidden">
            <Link
              href="/projects"
              className="bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-medium py-3 px-8 rounded-lg transition-all flex items-center gap-2"
            >
              View All Projects <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-zinc-200 dark:border-zinc-800 pt-12 pb-8 text-center text-zinc-600 dark:text-zinc-400 text-sm">
          <p className="mb-4">&copy; {new Date().getFullYear()} Taninwat Kaewpankan. Built with Next.js & Tailwind.</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="hover:text-orange-500">Back to Top</a>
            <a href="mailto:taninwat.kaewpankan@gmail.com" className="hover:text-orange-500">Contact</a>
          </div>
        </footer>

      </main>
    </div>
  );
}