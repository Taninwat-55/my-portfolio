"use client";

import { useEffect, useImperativeHandle, useRef } from "react";
import { personalInfo, stackContent } from "../../data";
import { messageText, useIceChat, type ChatVariant } from "../../lib/useIceChat";
import styles from "./stack.module.css";

export type MessageEngineHandle = { send: (text: string) => boolean };

/**
 * The message box's engine: the chat itself, and the window its answers open
 * in above the box. Loaded only after the box is first focused (MessageBox.tsx).
 */
export function MessageEngine({
  variant,
  handleRef,
  queuedRef,
  onBusy,
}: {
  variant: ChatVariant;
  handleRef: React.RefObject<MessageEngineHandle | null>;
  queuedRef: React.RefObject<string | null>;
  /** Tells the box when a send could not go through, so Send can say so. */
  onBusy: (busy: boolean) => void;
}) {
  const copy = stackContent.messageBox;
  const { messages, chatError, isLoading, isRateLimited, send, reset } = useIceChat(variant);
  const bodyRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(handleRef, () => ({ send }), [send]);

  // A question typed before this chunk arrived is sent the moment it does.
  useEffect(() => {
    if (queuedRef.current) {
      send(queuedRef.current);
      queuedRef.current = null;
    }
  }, [queuedRef, send]);

  const busy = isLoading || isRateLimited;
  useEffect(() => {
    onBusy(busy);
  }, [busy, onBusy]);

  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [messages, isLoading]);

  // Questions and answers, paired into turns.
  const turns: { id: string; q: string; a: string }[] = [];
  for (const msg of messages) {
    const text = messageText(msg);
    if (msg.role === "user") turns.push({ id: msg.id, q: text, a: "" });
    else if (turns.length) turns[turns.length - 1].a += text;
  }

  if (turns.length === 0 && !chatError) return null;

  return (
    <section className={`${styles.window} ${styles.answers}`} aria-label="Answers">
      <div className={styles.titlebar}>
        <span>Message</span>
      </div>
      {/* aria-busy holds the live announcement until the streamed reply is
          complete, so a screen reader reads it once instead of word by word. */}
      <div ref={bodyRef} className={styles.answersBody} aria-live="polite" aria-busy={isLoading}>
        {turns.map((turn, i) => (
          <div key={turn.id} className={styles.turn}>
            <p className={styles.question}>{turn.q}</p>
            <p className={styles.reply}>
              {turn.a || (isLoading && i === turns.length - 1 ? copy.thinking : "")}
            </p>
          </div>
        ))}
        {chatError && (
          <p className={styles.reply}>
            {isRateLimited ? (
              <>
                {copy.limit}{" "}
                <a className={styles.inlineLink} href={`mailto:${personalInfo.email}`}>
                  {personalInfo.email}
                </a>
              </>
            ) : (
              copy.transient
            )}
          </p>
        )}
      </div>
      <div className={styles.answersFoot}>
        <button type="button" className={styles.btn} onClick={reset}>
          {copy.clear}
        </button>
      </div>
    </section>
  );
}
