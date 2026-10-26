"use client";

import dynamic from "next/dynamic";
import { useFirstInteraction } from "./useFirstInteraction";
import styles from "./ask.module.css";

/**
 * Ask the site, loaded on the visitor's first move. The chat code (the AI
 * SDK's useChat and its stream parser) cost the homepage blocking time on a
 * slow phone (Lighthouse, 2026-10-26), and nobody asks before they have
 * moved. Until then a placeholder with the same shape holds the space.
 */
const AskSite = dynamic(() => import("./AskSite").then((m) => m.AskSite), {
  ssr: false,
  loading: () => <Placeholder />,
});

function Placeholder() {
  return (
    <div className={styles.ask} aria-hidden="true">
      <span className={styles.label}>Ask the site</span>
      <div className={styles.row}>
        <span className={`${styles.input} ${styles.placeholder}`}>What has he built with React?</span>
        <span className={styles.submit}>Ask →</span>
      </div>
    </div>
  );
}

export function AskSiteLazy({ className }: { className?: string }) {
  const awake = useFirstInteraction();
  return <div className={className}>{awake ? <AskSite /> : <Placeholder />}</div>;
}
