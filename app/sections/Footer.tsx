import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, FileDown } from "lucide-react";
import { personalInfo, siteContent } from "../data";
// personalInfo.email used in Elsewhere; siteContent.cvLink used in Elsewhere
import { CopenhagenAtmosphere } from "../components/CopenhagenAtmosphere";

const sitemap = [
  { label: "Top", href: "/" },
  { label: "About", href: "/#about" },
  { label: "What I do", href: "/#what-i-do" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Garden", href: "/garden" },
  { label: "Contact", href: "/#contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      aria-label="Footer — site map"
      className="relative border-t border-border"
    >
      <div className="container mx-auto px-6 max-w-5xl">

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-8 border-t border-border">
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

          {/* Col 2 — sitemap (2-column grid to keep height compact) */}
          <div>
            <p className="text-xs font-medium text-ink-300 tracking-widest uppercase mb-4">
              Sitemap
            </p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
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
