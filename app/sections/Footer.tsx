import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, FileDown } from "lucide-react";
import { personalInfo, siteContent } from "../data";
import { CopenhagenAtmosphere } from "../components/CopenhagenAtmosphere";

const sitemap = [
  { label: "Top", href: "/" },
  { label: "About", href: "/#about" },
  { label: "What I do", href: "/#what-i-do" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Garden", href: "/garden" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      aria-label="Footer — contact and site map"
      className="relative border-t border-border"
    >
      <div className="container mx-auto px-6 max-w-5xl">

        {/* CTA band */}
        <div className="pt-24 md:pt-32 pb-16 md:pb-20">
          <p className="text-sm font-medium text-clay-500 tracking-widest uppercase mb-8">
            Contact
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-ink-900 mb-5">
            {siteContent.contactHeading}
          </h2>
          <p className="text-lg text-ink-500 leading-relaxed max-w-xl mb-10">
            {siteContent.contactBody}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-clay-500 text-white text-sm font-medium hover:bg-clay-600 transition-colors"
            >
              <Mail size={14} />
              {personalInfo.email}
            </a>
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-ink-700 text-sm font-medium hover:border-clay-400 hover:text-clay-500 transition-colors"
            >
              <Linkedin size={14} />
              LinkedIn
            </a>
          </div>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-12 border-t border-border">
          {/* Col 1 */}
          <div>
            <div className="font-bold text-2xl tracking-tighter text-ink-900 mb-4">
              TK<span className="text-clay-500">.</span>
            </div>
            <div className="text-ink-700 font-medium mb-1">{personalInfo.name}</div>
            <div className="text-ink-400 text-sm mb-4">{personalInfo.role}</div>
            <div className="inline-flex items-center gap-2 text-ink-400 text-sm">
              <MapPin size={13} strokeWidth={1.5} />
              {personalInfo.location}
            </div>
          </div>

          {/* Col 2 — sitemap */}
          <div>
            <p className="text-xs font-medium text-ink-300 tracking-widest uppercase mb-5">
              Sitemap
            </p>
            <ul className="space-y-3">
              {sitemap.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1 text-sm text-ink-500 hover:text-clay-500 transition-colors"
                  >
                    {item.label}
                    <ArrowUpRight
                      size={11}
                      className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — elsewhere */}
          <div>
            <p className="text-xs font-medium text-ink-300 tracking-widest uppercase mb-5">
              Elsewhere
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-clay-500 transition-colors"
                >
                  <Mail size={13} strokeWidth={1.5} />
                  Email
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-clay-500 transition-colors"
                >
                  <Linkedin size={13} strokeWidth={1.5} />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-clay-500 transition-colors"
                >
                  <Github size={13} strokeWidth={1.5} />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={siteContent.cvLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-clay-500 transition-colors"
                >
                  <FileDown size={13} strokeWidth={1.5} />
                  Resume (PDF)
                </a>
              </li>
            </ul>
          </div>
        </div>

      </div>

      {/* Atmosphere strip — full bleed */}
      <div className="border-t border-border">
        <CopenhagenAtmosphere year={year} />
      </div>
    </footer>
  );
}
