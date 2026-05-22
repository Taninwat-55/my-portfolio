"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowLeft, Mail } from "lucide-react";

interface NavbarProps {
  variant?: "full" | "simple";
  backLinkHref?: string;
  backLinkText?: string;
}

export function Navbar({
  variant = "full",
  backLinkHref = "/",
  backLinkText = "Back to Home",
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-sand-100/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between relative">

        <Link
          href="/"
          className="font-bold text-xl tracking-tighter shrink-0 text-ink-900"
          aria-label="Home"
        >
          TK<span className="text-clay-500">.</span>
        </Link>

        {variant === "full" ? (
          <>
            <div className="hidden md:flex gap-8 text-sm font-medium text-ink-400 items-center absolute left-1/2 -translate-x-1/2">
              <a href="#about" className="hover:text-clay-500 transition-colors">About</a>
              <a href="#what-i-do" className="hover:text-clay-500 transition-colors">What I do</a>
              <a href="#projects" className="hover:text-clay-500 transition-colors">Projects</a>
              <a href="#experience" className="hover:text-clay-500 transition-colors">Experience</a>
              <a href="#garden" className="hover:text-clay-500 transition-colors">Garden</a>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="mailto:taninwat.kaewpankan@gmail.com"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-full bg-clay-500 text-white hover:bg-clay-600 transition-colors"
              >
                <Mail size={12} />
                Get in touch
              </a>
              <button
                className="md:hidden p-2 text-ink-500"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </>
        ) : (
          <Link
            href={backLinkHref}
            className="flex items-center gap-2 text-sm font-medium text-ink-400 hover:text-clay-500 transition-colors"
          >
            <ArrowLeft size={15} /> {backLinkText}
          </Link>
        )}
      </div>

      {variant === "full" && isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-sand-100 border-b border-border p-4 flex flex-col gap-2 shadow-sm">
          <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium p-2.5 text-ink-700 hover:bg-sand-200 rounded-lg">About</a>
          <a href="#what-i-do" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium p-2.5 text-ink-700 hover:bg-sand-200 rounded-lg">What I do</a>
          <a href="#projects" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium p-2.5 text-ink-700 hover:bg-sand-200 rounded-lg">Projects</a>
          <a href="#experience" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium p-2.5 text-ink-700 hover:bg-sand-200 rounded-lg">Experience</a>
          <a href="#garden" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium p-2.5 text-ink-700 hover:bg-sand-200 rounded-lg">Garden</a>
          <a
            href="mailto:taninwat.kaewpankan@gmail.com"
            className="mt-2 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-clay-500 text-white rounded-full"
          >
            <Mail size={14} />
            Get in touch
          </a>
        </div>
      )}
    </nav>
  );
}
