"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type PortfolioMode = "pm" | "dev";

interface ModeContextType {
    mode: PortfolioMode;
    setMode: (mode: PortfolioMode) => void;
}

const ModeContext = createContext<ModeContextType>({
    mode: "dev",
    setMode: () => { },
});

export function ModeProvider({ children }: { children: ReactNode }) {
    const [mode, setModeState] = useState<PortfolioMode>("dev");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("portfolio-mode") as PortfolioMode | null;
        if (saved === "pm" || saved === "dev") {
            setModeState(saved);
        }
        setMounted(true);
    }, []);

    const setMode = (newMode: PortfolioMode) => {
        setModeState(newMode);
        localStorage.setItem("portfolio-mode", newMode);
    };

    // Avoid hydration mismatch — render with default until mounted
    if (!mounted) return <>{children}</>;

    return (
        <ModeContext.Provider value={{ mode, setMode }}>
            {children}
        </ModeContext.Provider>
    );
}

export function useMode() {
    return useContext(ModeContext);
}
