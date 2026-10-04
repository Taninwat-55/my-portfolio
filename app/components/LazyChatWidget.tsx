"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Its own chunk, fetched only when rendered.
const ChatWidget = dynamic(() => import("./ChatWidget").then((m) => m.ChatWidget), {
  ssr: false,
});

/**
 * The chat widget, loaded once the page is idle instead of with the page.
 *
 * It is the largest script on the clock homepage (the AI SDK, zod and its
 * animations: 111 KB gzipped), and almost nobody opens it in the first seconds.
 * Loaded up front, Lighthouse's mobile simulation held the portrait's paint
 * behind it. Now the bubble appears a moment after the page settles.
 */
export function LazyChatWidget(props: React.ComponentProps<typeof ChatWidget>) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const show = () => setReady(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(show, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(show, 2000);
    return () => clearTimeout(id);
  }, []);

  return ready ? <ChatWidget {...props} /> : null;
}
