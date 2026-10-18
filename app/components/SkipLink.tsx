"use client";

export function SkipLink() {
    return (
        <a
            href="#main-content"
            // English on every page, including /th, /sv and /da, so screen
            // readers there read it with English rules.
            lang="en"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-60 focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:outline-[3px] focus:outline-dotted focus:outline-offset-2 focus:outline-black"
        >
            Skip to main content
        </a>
    );
}
