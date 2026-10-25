"use client";

import { useSyncExternalStore } from "react";

/**
 * Ice's local time in Copenhagen, with CET or CEST: a visitor in another
 * timezone sees at a glance whether he's likely to answer today. Ticks every
 * 15 s; the server renders a placeholder because it can't know the minute
 * the page is read.
 */
const time = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Copenhagen",
});
const zone = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Copenhagen", timeZoneName: "short" });

function snapshot() {
  const now = Date.now();
  const name = zone.formatToParts(now).find((p) => p.type === "timeZoneName")?.value ?? "";
  return `${time.format(now)} ${name}`;
}

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 15_000);
  return () => clearInterval(id);
}

export function LocalTime() {
  const value = useSyncExternalStore(subscribe, snapshot, () => "--:--");
  return <time>{value}</time>;
}
