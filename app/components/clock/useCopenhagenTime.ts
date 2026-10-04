"use client";

import { useSyncExternalStore } from "react";

/**
 * "HH:MM" clocks for the desk. Copenhagen's own clock drives the lamp, the mood
 * line and the wall clock whatever timezone the visitor is in; the visitor's
 * clock is only shown beside it, so the difference is obvious.
 */
const formatIn = (timeZone?: string) =>
  new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" });

const copenhagen = formatIn("Europe/Copenhagen");
const visitor = formatIn(); // the browser's own timezone

const subscribe = (onChange: () => void) => {
  const id = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(id);
};
// Nothing on the server: its clock is not the visitor's moment, and a time
// rendered there would mismatch on hydration a minute later.
const getServerSnapshot = () => null;
// Strings, so an unchanged minute compares equal and does not re-render.
const copenhagenNow = () => copenhagen.format(new Date());
const visitorNow = () => visitor.format(new Date());

/** "23:10" in Copenhagen, or null until the page has hydrated. */
export function useCopenhagenTime(): string | null {
  return useSyncExternalStore(subscribe, copenhagenNow, getServerSnapshot);
}

/** The visitor's own "07:10", or null until the page has hydrated. */
export function useVisitorTime(): string | null {
  return useSyncExternalStore(subscribe, visitorNow, getServerSnapshot);
}

export const hourOf = (time: string) => Number(time.slice(0, 2));
export const minuteOf = (time: string) => Number(time.slice(3, 5));
