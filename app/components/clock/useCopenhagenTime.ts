"use client";

import { useSyncExternalStore } from "react";

// Copenhagen's own clock, whatever timezone the visitor is in.
const format = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Copenhagen",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

const subscribe = (onChange: () => void) => {
  const id = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(id);
};
// A string, so an unchanged minute compares equal and does not re-render.
const getSnapshot = () => format.format(new Date());
// Nothing on the server: its clock is not the visitor's moment, and a time
// rendered there would mismatch on hydration a minute later.
const getServerSnapshot = () => null;

/** "23:10" in Copenhagen, or null until the page has hydrated. */
export function useCopenhagenTime(): string | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export const hourOf = (time: string) => Number(time.slice(0, 2));
