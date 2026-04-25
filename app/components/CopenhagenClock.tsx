"use client";

import { useEffect, useState } from "react";

/**
 * Live local-time display for Copenhagen. Updates every 30s.
 * Server-renders a stable placeholder to avoid hydration mismatch, then the
 * client takes over on mount. Uses Intl with Europe/Copenhagen so the time
 * is correct regardless of where the visitor's browser thinks it is.
 */
export function CopenhagenClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Copenhagen",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const update = () => setTime(formatter.format(new Date()));
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!time) {
    return (
      <span
        suppressHydrationWarning
        className="inline-flex items-center gap-2 font-mono text-[11px] tracking-wider text-charcoal-400"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-charcoal-600" />
        <span>CPH</span>
        <span>--:--</span>
      </span>
    );
  }

  const [hh, mm] = time.split(":");

  return (
    <span
      aria-label={`Local time in Copenhagen: ${time}`}
      title="Local time in Copenhagen"
      className="inline-flex items-center gap-2 font-mono text-[11px] tracking-wider text-charcoal-300"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-ice-400 shadow-[0_0_6px_1px_rgba(103,200,245,0.5)]" />
      <span className="text-charcoal-400">CPH</span>
      <span>
        {hh}
        <span className="animate-pulse text-ice-400">:</span>
        {mm}
      </span>
    </span>
  );
}
