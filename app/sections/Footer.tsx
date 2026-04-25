import Link from "next/link";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  FileDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { personalInfo, siteContent } from "../data";
import { CopenhagenClock } from "../components/CopenhagenClock";

// ─── Sitemap ────────────────────────────────────────────────────────────────
// Absolute paths so the same footer works from any page (deep-links from
// /lab or /projects still need to scroll into the homepage's anchored sections).
const sitemap = [
  { label: "Top", href: "/" },
  { label: "Identity", href: "/#journey" },
  { label: "Case Studies", href: "/#case-studies" },
  { label: "The Lab", href: "/lab" },
  { label: "Projects", href: "/projects" },
];

const languages = [
  { name: "Thai", level: "Native" },
  { name: "English", level: "Fluent" },
  { name: "Swedish", level: "Fluent" },
  { name: "Danish", level: "Beginner" },
];

const education = [
  {
    degree: "Professional Bachelor, Frontend Development",
    org: "Jensen Yrkeshögskola",
    period: "2024 — 2026",
  },
  {
    degree: "MSc Business & Economics",
    org: "Uppsala University",
    period: "2022 — 2023",
  },
  {
    degree: "BA Game Design & Project Management",
    org: "Uppsala University",
    period: "2019 — 2022",
  },
];

// ─── Section ────────────────────────────────────────────────────────────────

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      aria-label="Footer — contact and site map"
      className="relative border-t border-white/5 overflow-hidden"
    >
      {/* ambient glow at the top edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[760px] h-[300px] rounded-full bg-ice-500/8 blur-[120px]"
      />

      <div className="relative container mx-auto px-6 max-w-6xl">
        {/* ── Final CTA band ──────────────────────────────────────────── */}
        <div className="pt-28 md:pt-36 pb-20 md:pb-24">
          <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-ice-400 mb-5">
            05 / Let&apos;s talk
          </div>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] text-zinc-50 mb-6 max-w-3xl">
            Let&apos;s build{" "}
            <span className="bg-gradient-to-r from-ice-200 via-ice-300 to-ice-500 bg-clip-text text-transparent">
              something.
            </span>
          </h2>
          <p className="text-lg text-charcoal-300 leading-relaxed max-w-2xl mb-10">
            I&apos;m {siteContent.availability.toLowerCase()}. If you&apos;re hiring,
            collaborating, or just want to talk shop — drop a line. I respond fast.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button asChild variant="default" size="lg">
              <a
                href={`mailto:${personalInfo.email}`}
                aria-label={`Email ${personalInfo.email}`}
              >
                <Mail />
                {personalInfo.email}
              </a>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <a
                href={siteContent.cvLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open resume PDF"
              >
                <FileDown />
                Resume
              </a>
            </Button>
          </div>
        </div>

        {/* ── Credentials row: Languages + Education ──────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-10 py-14 border-t border-white/5">
          {/* Languages */}
          <div>
            <FooterHeading>Languages</FooterHeading>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <Badge
                  key={lang.name}
                  variant={lang.level === "Beginner" ? "default" : "ice"}
                  className="!text-[10px]"
                >
                  {lang.name} · {lang.level}
                </Badge>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <FooterHeading>Education</FooterHeading>
            <ul className="space-y-3.5">
              {education.map((edu) => (
                <li key={edu.degree} className="text-sm">
                  <div className="text-zinc-200">{edu.degree}</div>
                  <div className="font-mono text-[11px] tracking-wider uppercase text-charcoal-400 mt-1">
                    {edu.org} · {edu.period}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── 3-column grid ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10 py-14 border-t border-white/5">
          {/* Col 1 — name + location */}
          <div>
            <div className="font-bold text-2xl tracking-tighter text-zinc-50 mb-4">
              TK<span className="text-ice-400">.</span>
            </div>
            <div className="text-zinc-200 font-medium mb-1.5">
              {personalInfo.name}
            </div>
            <div className="text-charcoal-300 text-sm mb-4">
              {personalInfo.role}
            </div>
            <div className="inline-flex items-center gap-2 text-charcoal-400 text-sm">
              <MapPin size={14} strokeWidth={1.5} />
              {personalInfo.location}
            </div>
          </div>

          {/* Col 2 — sitemap */}
          <div>
            <FooterHeading>Sitemap</FooterHeading>
            <ul className="space-y-3">
              {sitemap.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1 text-sm text-charcoal-200 hover:text-ice-300 transition-colors"
                  >
                    {item.label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — connect */}
          <div>
            <FooterHeading>Elsewhere</FooterHeading>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${personalInfo.email}`}
                  data-cursor="external"
                  className="group inline-flex items-center gap-2 text-sm text-charcoal-200 hover:text-ice-300 transition-colors"
                  aria-label={`Email ${personalInfo.email}`}
                >
                  <Mail size={14} strokeWidth={1.5} />
                  Email
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="external"
                  className="group inline-flex items-center gap-2 text-sm text-charcoal-200 hover:text-ice-300 transition-colors"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin size={14} strokeWidth={1.5} />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="external"
                  className="group inline-flex items-center gap-2 text-sm text-charcoal-200 hover:text-ice-300 transition-colors"
                  aria-label="GitHub profile"
                >
                  <Github size={14} strokeWidth={1.5} />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={siteContent.cvLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm text-charcoal-200 hover:text-ice-300 transition-colors"
                  aria-label="Open resume PDF in a new tab"
                >
                  <FileDown size={14} strokeWidth={1.5} />
                  Resume (PDF)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────────────────────────── */}
        <div className="py-7 border-t border-white/5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-charcoal-400 font-mono text-[11px] tracking-wider uppercase">
          <div>© {year} Taninwat Kaewpankan · Built with Next.js + Tailwind</div>
          <CopenhagenClock />
        </div>
      </div>
    </footer>
  );
}

// ─── helpers ────────────────────────────────────────────────────────────────

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-ice-400 mb-5">
      {children}
    </div>
  );
}
