"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowLeft } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

interface NavbarProps {
    /** Show full navigation links (About, Skills, etc.) vs just a back link */
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
        <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="font-bold text-xl tracking-tighter" aria-label="Home">
                    TK<span className="text-orange-500">.</span>
                </Link>

                {variant === "full" ? (
                    <>
                        {/* Desktop Nav Links */}
                        <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400 items-center">
                            <a href="#about" className="hover:text-orange-500 transition-colors">About</a>
                            <a href="#skills" className="hover:text-orange-500 transition-colors">Skills</a>
                            <a href="#work" className="hover:text-orange-500 transition-colors">Experience</a>
                            <a href="#projects" className="hover:text-orange-500 transition-colors">Projects</a>
                            <Link href="/blog" className="hover:text-orange-500 transition-colors">Blog</Link>
                        </div>

                        {/* Actions & Mobile Menu Toggle */}
                        <div className="flex items-center gap-4">
                            <ThemeToggle />

                            {/* Desktop Hire Me Button */}
                            <a
                                href="mailto:taninwat.kaewpankan@gmail.com"
                                className="hidden md:block px-4 py-2 text-xs font-bold bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg hover:opacity-90 transition-opacity"
                            >
                                HIRE ME
                            </a>

                            {/* Mobile Hamburger Button */}
                            <button
                                className="md:hidden p-2 text-zinc-600 dark:text-zinc-400"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </>
                ) : (
                    /* Simple variant: Back link + theme toggle */
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <Link
                            href={backLinkHref}
                            className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-orange-500 transition-colors"
                        >
                            <ArrowLeft size={16} /> {backLinkText}
                        </Link>
                    </div>
                )}
            </div>

            {/* Mobile Menu Dropdown (full variant only) */}
            {variant === "full" && isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 p-4 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-5">
                    <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded">About</a>
                    <a href="#skills" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded">Skills</a>
                    <a href="#work" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded">Experience</a>
                    <a href="#projects" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded">Projects</a>
                    <Link href="/blog" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded">Blog</Link>
                    <a
                        href="mailto:taninwat.kaewpankan@gmail.com"
                        className="mt-2 w-full text-center px-4 py-3 text-xs font-bold bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg"
                    >
                        HIRE ME
                    </a>
                </div>
            )}
        </nav>
    );
}
