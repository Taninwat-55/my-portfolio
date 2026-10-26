"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { UIMessage } from "ai";
import { personalInfo } from "@/app/data";
import { linksFor, readPagesLine } from "@/app/lib/site-pages";
import { messageText, useIceChat } from "@/app/lib/useIceChat";
import styles from "./ask.module.css";

const STARTERS = ["What has he built?", "Is he open to full-time roles?", "What does a website cost?"];

type PageLink = { href: string; label: string };

/** An answer's text and the page buttons its closing PAGES line named. */
function readAnswer(msg: UIMessage): { text: string; links: PageLink[] } {
  const { text, keys } = readPagesLine(messageText(msg));
  return { text, links: linksFor(keys) };
}

/**
 * Ask the site (2026-10-26): one question box that answers from the site's own
 * content and puts the right pages under the answer as buttons. Backed by
 * /api/chat's "ask" prompt (Groq, rate-limited, grounded in data.ts). It says
 * plainly that a model answers, and every failure ends in the email address.
 */
export function AskSite({ className }: { className?: string }) {
  const { messages, chatError, isLoading, isRateLimited, send } = useIceChat("ask");
  const [draft, setDraft] = useState("");
  const thread = useRef<HTMLOListElement>(null);

  // Keep the newest answer in view as it streams, inside the box only.
  useEffect(() => {
    const el = thread.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const ask = (text: string) => {
    if (send(text)) setDraft("");
  };

  return (
    <div className={`${styles.ask} ${className ?? ""}`}>
      {messages.length > 0 && (
        <ol ref={thread} className={styles.thread} aria-live="polite" aria-busy={isLoading}>
          {messages.map((m) => {
            const { text, links } = m.role === "assistant" ? readAnswer(m) : { text: messageText(m), links: [] };
            if (!text && links.length === 0) return null;
            return (
              <li key={m.id} className={m.role === "user" ? styles.question : styles.answer}>
                {m.role === "user" ? <span className="sr-only">You asked: </span> : null}
                {text && <p>{text}</p>}
                {links.length > 0 && (
                  <ul className={styles.links} aria-label="Pages for this answer">
                    {links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href}>
                          {l.label} <span aria-hidden="true">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <li className={styles.answer}>
              <p className={styles.thinking}>Reading the site…</p>
            </li>
          )}
        </ol>
      )}

      {chatError && (
        <p className={styles.error} role="alert">
          {isRateLimited ? "That is all the questions for now. " : "That did not go through. Try again, or "}
          write to <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>.
        </p>
      )}

      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          ask(draft);
        }}
      >
        <label htmlFor="ask-site" className={styles.label}>
          Ask the site
        </label>
        <div className={styles.row}>
          <input
            id="ask-site"
            className={styles.input}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="What has he built with React?"
            maxLength={300}
            autoComplete="off"
            disabled={isRateLimited}
          />
          <button type="submit" className={styles.submit} disabled={isLoading || isRateLimited || !draft.trim()}>
            Ask <span aria-hidden="true">→</span>
          </button>
        </div>
        {messages.length === 0 && (
          <ul className={styles.starters} aria-label="Example questions">
            {STARTERS.map((q) => (
              <li key={q}>
                <button type="button" onClick={() => ask(q)} disabled={isLoading || isRateLimited}>
                  {q}
                </button>
              </li>
            ))}
          </ul>
        )}
        <p className={styles.note}>An AI model answers from this site&apos;s own content. It can be wrong; the pages are the source.</p>
      </form>
    </div>
  );
}
