"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Moon, Sunrise, Sun, Sunset } from "lucide-react";

type Period = "night" | "dawn" | "day" | "dusk";

interface AtmosphereConfig {
  bg: string;
  color: string;
  icon: React.ReactNode;
  label: string;
}

function getPeriod(hour: number): Period {
  if (hour >= 21 || hour < 6) return "night";
  if (hour < 8) return "dawn";
  if (hour < 17) return "day";
  return "dusk";
}

function getDayLabel(hour: number): string {
  if (hour < 12) return "Morning in Copenhagen";
  if (hour < 17) return "Afternoon in Copenhagen";
  return "Evening in Copenhagen";
}

const CONFIGS: Record<Period, AtmosphereConfig> = {
  night: {
    bg: "linear-gradient(to right, #1E1B18, #252018)",
    color: "#C8A882",
    icon: <Moon size={14} strokeWidth={1.5} />,
    label: "Night in Copenhagen",
  },
  dawn: {
    bg: "linear-gradient(to right, #FFE4C4, #FECFA0)",
    color: "#7A4A25",
    icon: <Sunrise size={14} strokeWidth={1.5} />,
    label: "Dawn over Copenhagen",
  },
  day: {
    bg: "linear-gradient(to right, #F7F4F0, #F0EDE8)",
    color: "#6B6560",
    icon: <Sun size={14} strokeWidth={1.5} />,
    label: "",
  },
  dusk: {
    bg: "linear-gradient(to right, #F5C87A, #E8965A)",
    color: "#5C3318",
    icon: <Sunset size={14} strokeWidth={1.5} />,
    label: "Dusk in Copenhagen",
  },
};

function getCphTime() {
  const now = new Date();
  const timeStr = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Copenhagen",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);
  const hour = parseInt(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Copenhagen",
      hour: "numeric",
      hour12: false,
    }).format(now),
    10
  );
  return { timeStr, hour };
}

export function CopenhagenAtmosphere({ year }: { year: number }) {
  const [mounted, setMounted] = useState(false);
  const [timeStr, setTimeStr] = useState("--:--");
  const [period, setPeriod] = useState<Period>("day");
  const [hour, setHour] = useState(12);
  const [blockHeight, setBlockHeight] = useState<number | null>(null);

  useEffect(() => {
    const update = () => {
      const { timeStr: t, hour: h } = getCphTime();
      setTimeStr(t);
      setHour(h);
      setPeriod(getPeriod(h));

      fetch("https://mempool.space/api/blocks/tip/height")
        .then((r) => (r.ok ? r.json() : null))
        .then((h) => { if (typeof h === "number") setBlockHeight(h); })
        .catch(() => {});
    };
    update();
    setMounted(true);
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  const config = CONFIGS[period];
  const label = period === "day" ? getDayLabel(hour) : config.label;

  return (
    <div
      aria-label="Local atmosphere in Copenhagen"
      style={{
        background: mounted ? config.bg : CONFIGS.day.bg,
        color: mounted ? config.color : CONFIGS.day.color,
        transition: "background 2s ease, color 1s ease",
      }}
      className="w-full px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs tracking-wide"
    >
      {/* Left: copyright + block height */}
      <span className="flex items-center gap-2 opacity-60">
        <span>© {year} Taninwat Kaewpankan</span>
        {mounted && blockHeight !== null && (
          <>
            <span className="opacity-50">//</span>
            <motion.span
              key={blockHeight}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="font-mono tabular-nums"
            >
              # {blockHeight.toLocaleString("en-US")}
            </motion.span>
          </>
        )}
      </span>

      {/* Center: atmosphere */}
      <span className="flex items-center gap-2 font-medium">
        {mounted ? config.icon : <Sun size={14} strokeWidth={1.5} />}
        <span>{timeStr}</span>
        <span className="opacity-50">·</span>
        <span>{mounted ? label : "Copenhagen"}</span>
      </span>

      {/* Right: built with */}
      <span className="opacity-60">
        Built with Next.js + Tailwind
      </span>
    </div>
  );
}
