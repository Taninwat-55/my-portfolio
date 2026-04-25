"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowLeft } from "lucide-react";

interface NavbarProps {
    /** Show full navigation links (Journey, Projects, Blog) vs just a back link */
    variant?: "full" | "simple";
    /** URL for the back link when using simple variant */
    backLinkHref?: string;
    /** Label for the back link when using simple variant */
    backLinkText?: string;
}

export function Navbar({
    variant = "full",
    backLinkHref = "/",
    backLinkText = "Back to Home",
}: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-50 bg-charcoal-950/70 backdrop-blur-md border-b border-white/5">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between relative">
                <Link href="/" className="font-bold text-xl tracking-tighter shrink-0 text-zinc-100" aria-label="Home">
                    TK<span className="text-ice-400">.</span>
                </Link>

                {variant === "full" ? (
                    <>
                        <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-400 items-center absolute left-1/2 -translate-x-1/2">
                            <a href="#journey" className="hover:text-ice-400 transition-colors">Identity</a>
                            <a href="#case-studies" className="hover:text-ice-400 transition-colors">Case Studies</a>
                            <a href="#garden" className="hover:text-ice-400 transition-colors">Garden</a>
                        </div>

                        <div className="flex items-center gap-3">
                            <a
                                href="mailto:taninwat.kaewpankan@gmail.com"
                                className="hidden md:block px-4 py-2 text-xs font-bold bg-ice-400 text-charcoal-950 rounded-lg hover:bg-ice-300 transition-colors"
                            >
                                HIRE ME
                            </a>

                            <button
                                className="md:hidden p-2 text-zinc-400"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </>
                ) : (
                    <Link
                        href={backLinkHref}
                        className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-ice-400 transition-colors"
                    >
                        <ArrowLeft size={16} /> {backLinkText}
                    </Link>
                )}
            </div>

            {variant === "full" && isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-charcoal-950 border-b border-white/5 p-4 flex flex-col gap-4 shadow-xl">
                    <a href="#journey" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium p-2 text-zinc-300 hover:bg-white/5 rounded">Identity</a>
                    <a href="#case-studies" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium p-2 text-zinc-300 hover:bg-white/5 rounded">Case Studies</a>
                    <a href="#garden" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium p-2 text-zinc-300 hover:bg-white/5 rounded">Garden</a>
                    <a
                        href="mailto:taninwat.kaewpankan@gmail.com"
                        className="mt-2 w-full text-center px-4 py-3 text-xs font-bold bg-ice-400 text-charcoal-950 rounded-lg"
                    >
                        HIRE ME
                    </a>
                </div>
            )}
        </nav>
    );
}
