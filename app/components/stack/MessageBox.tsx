"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { stackContent } from "../../data";
import type { MessageEngineHandle } from "./MessageEngine";
import styles from "./stack.module.css";

// The AI SDK is about 111 KB gzipped. The box itself is a plain labelled input
// that renders with the page; the engine that talks to /api/chat loads the
// first time someone focuses it, never on idle like the old floating widget.
const MessageEngine = dynamic(() => import("./MessageEngine").then((m) => m.MessageEngine), {
  ssr: false,
});

/**
 * HyperCard's message box: one line at the bottom of the screen you could type
 * into. Here it asks the stack's AI about Ice. It lives in the stack layout, so
 * the conversation stays put while the visitor flips cards.
 */
export function MessageBox() {
  const copy = stackContent.messageBox;
  // On the prices page and the language landing pages the visitor is a
  // prospective client, so the box asks the services prompt (prices,
  // process); everywhere else, the portfolio one.
  const pathname = usePathname();
  const variant = /^\/(services|th|sv|da)(\/|$)/.test(pathname) ? "services" : "portfolio";
  const [armed, setArmed] = useState(false);
  const [value, setValue] = useState("");
  // True while a question is queued, streaming or rate-limited: Send is off
  // then, so a second question is never silently dropped.
  const [busy, setBusy] = useState(false);
  const engineRef = useRef<MessageEngineHandle | null>(null);
  // A question asked before the engine finished loading waits here.
  const queuedRef = useRef<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = value.trim();
    if (!text || busy) return;
    if (engineRef.current) {
      if (engineRef.current.send(text)) setValue("");
      return;
    }
    queuedRef.current = text;
    setBusy(true);
    setArmed(true);
    setValue("");
  };

  return (
    <div className={styles.msgDock}>
      {armed && <MessageEngine variant={variant} handleRef={engineRef} queuedRef={queuedRef} onBusy={setBusy} />}
      <form className={styles.msgBox} onSubmit={submit} aria-label="Ask about Ice">
        <label htmlFor="message-box" className={styles.msgLabel}>
          Message
        </label>
        <input
          id="message-box"
          className={styles.msgInput}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setArmed(true)}
          placeholder={copy.placeholder}
          aria-label={copy.label}
          autoComplete="off"
          enterKeyHint="send"
        />
        <button type="submit" className={styles.btn} disabled={!value.trim() || busy}>
          {copy.send}
        </button>
      </form>
    </div>
  );
}
