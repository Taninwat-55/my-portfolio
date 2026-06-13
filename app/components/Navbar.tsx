"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface NavbarProps {
  backLinkHref?: string;
  backLinkText?: string;
}

export function Navbar({
  backLinkHref = "/",
  backLinkText = "Back to Home",
}: NavbarProps) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-night-900/80 backdrop-blur-md border-b border-frost/10">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-xl tracking-tighter shrink-0 text-frost"
          aria-label="Home"
        >
          Ice<span className="text-crystal-500">.</span>
        </Link>

        <Link
          href={backLinkHref}
          className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-frost/60 hover:text-frost transition-colors"
        >
          <ArrowLeft size={15} /> {backLinkText}
        </Link>
      </div>
    </nav>
  );
}
