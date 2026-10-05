"use client";

export function SkipLink() {
    return (
        <a
            href="#main-content"
            // English on every page, including /th, /sv and /da, so screen
            // readers there read it with English rules.
            lang="en"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-60 focus:px-4 focus:py-2 focus:bg-crystal-500 focus:text-night-900 focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-crystal-300"
        >
            Skip to main content
        </a>
    );
}
