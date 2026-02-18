"use client";

import { motion } from "framer-motion";
import { useMode } from "../context/ModeContext";

export function ModeToggle() {
    const { mode, setMode } = useMode();

    return (
        <div
            className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full p-1 text-xs font-bold"
            role="group"
            aria-label="Portfolio mode"
        >
            <button
                onClick={() => setMode("pm")}
                className="relative px-3 py-1 rounded-full transition-colors duration-200 z-10"
                aria-pressed={mode === "pm"}
                aria-label="Switch to Product Manager mode"
            >
                {mode === "pm" && (
                    <motion.span
                        layoutId="mode-pill"
                        className="absolute inset-0 bg-orange-500 rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                )}
                <span className={`relative z-10 transition-colors duration-200 ${mode === "pm" ? "text-white" : "text-zinc-500 dark:text-zinc-400"}`}>
                    PM
                </span>
            </button>

            <button
                onClick={() => setMode("dev")}
                className="relative px-3 py-1 rounded-full transition-colors duration-200 z-10"
                aria-pressed={mode === "dev"}
                aria-label="Switch to Frontend Developer mode"
            >
                {mode === "dev" && (
                    <motion.span
                        layoutId="mode-pill"
                        className="absolute inset-0 bg-orange-500 rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                )}
                <span className={`relative z-10 transition-colors duration-200 ${mode === "dev" ? "text-white" : "text-zinc-500 dark:text-zinc-400"}`}>
                    Dev
                </span>
            </button>
        </div>
    );
}
