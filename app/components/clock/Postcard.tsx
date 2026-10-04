"use client";

import { useEffect, useRef, useState } from "react";
import { clockContent, personalInfo } from "../../data";
import { validateContact, type ContactErrors } from "../../lib/contact";
import styles from "./clock.module.css";

type Status = "idle" | "posting" | "posted" | "failed";

/**
 * The Contact object: a postcard that turns over to its writing side and
 * really posts, through /api/contact.
 *
 * `stage` comes from ClockHome: 0 shows the picture side, 1 turns it over once
 * the fly-in has landed. After that the visitor's own "Turn over" wins. Once
 * posted, it turns back to the picture side and takes a Copenhagen postmark.
 *
 * Spam traps mirror ServicesEnquiryForm: an off-screen honeypot field, and the
 * time since the card opened, which the server checks.
 */
export function Postcard({ stage }: { stage: number }) {
  const { contact } = clockContent;
  const [turned, setTurned] = useState<boolean | null>(null);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [failure, setFailure] = useState("");
  const [copied, setCopied] = useState<"idle" | "copied" | "selected">("idle");
  const [postedOn, setPostedOn] = useState("");
  // Set on mount, not during render: when the card opened is what the server's
  // timing trap measures against.
  const openedAt = useRef(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  const posted = status === "posted";
  const flipped = !posted && (turned ?? stage >= 1);

  const send = async (event: React.FormEvent) => {
    event.preventDefault();
    if (status === "posting") return;
    const found = validateContact({ message, email });
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("posting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          email,
          website: honeypot.current?.value ?? "",
          elapsedMs: Date.now() - openedAt.current,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setPostedOn(
          new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
        );
        setStatus("posted");
        window.setTimeout(() => statusRef.current?.focus(), 0);
      } else if (res.status === 400 && data.fields) {
        setErrors(data.fields);
        setStatus("idle");
      } else {
        setFailure(data.error ?? contact.failed.replace("{email}", personalInfo.email));
        setStatus("failed");
      }
    } catch {
      setFailure(contact.failed.replace("{email}", personalInfo.email));
      setStatus("failed");
    }
  };

  const writeAnother = () => {
    setMessage("");
    setErrors({});
    setStatus("idle");
    setTurned(true);
    openedAt.current = Date.now();
  };

  const copy = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const address = event.currentTarget.parentElement?.querySelector("[data-email]");
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied("copied");
    } catch {
      if (address) window.getSelection()?.selectAllChildren(address);
      setCopied("selected");
    }
  };

  return (
    <div className={`${styles.postcard} ${flipped ? styles.flipped : ""} ${posted ? styles.posted : ""}`}>
      <div className={styles.card}>
        <div className={`${styles.cardSide} ${styles.cardFront}`} aria-hidden={flipped}>
          <div className={styles.cardPicture}>
            <strong>{contact.front}</strong>
          </div>
          <span className={styles.stamp}>
            DK
            <br />
            post
          </span>
          {posted && (
            <span className={styles.postmark} aria-hidden="true">
              <span>{contact.postmark}</span>
              <span>{postedOn}</span>
            </span>
          )}
        </div>

        <div className={`${styles.cardSide} ${styles.cardBack}`} aria-hidden={!flipped} inert={!flipped}>
          <form className={styles.cardForm} onSubmit={send} noValidate>
            <label htmlFor="postcard-message">{contact.messageLabel}</label>
            <textarea
              id="postcard-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder={contact.placeholder}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={errors.message ? "postcard-message-error" : undefined}
              disabled={status === "posting"}
            />
            {errors.message && (
              <p id="postcard-message-error" className={styles.cardError}>
                {errors.message}
              </p>
            )}
            <label htmlFor="postcard-email">{contact.emailLabel}</label>
            <input
              id="postcard-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@company.com"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "postcard-email-error" : undefined}
              disabled={status === "posting"}
            />
            {errors.email && (
              <p id="postcard-email-error" className={styles.cardError}>
                {errors.email}
              </p>
            )}
            {/* Off-screen rather than hidden, so bots fill it; aria-hidden so
                screen readers never ask a person to. */}
            <div aria-hidden="true" className={styles.honeypot}>
              <label htmlFor="postcard-website">Website</label>
              <input ref={honeypot} id="postcard-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <button type="submit" className={styles.cardSend} disabled={status === "posting"}>
              {status === "posting" ? contact.sendingLabel : contact.sendLabel}
            </button>
            {status === "failed" && (
              <p className={styles.cardError} role="alert">
                {failure}
              </p>
            )}
          </form>

          <div className={styles.cardAddress}>
            <span className={styles.stamp} aria-hidden="true">
              DK
              <br />
              post
            </span>
            <div className={styles.cardLine}>
              <span data-email className={styles.cardEmail}>
                {personalInfo.email}
              </span>
              <button type="button" className={styles.cardCopy} onClick={copy}>
                {copied === "copied" ? "Copied" : copied === "selected" ? "Selected" : "Copy"}
              </button>
            </div>
            <div className={styles.cardLine}>
              <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
            <div className={styles.cardLine}>
              <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
            <div className={styles.cardLine}>
              <span>{personalInfo.location}</span>
            </div>
          </div>
        </div>
      </div>

      {posted ? (
        <p ref={statusRef} className={styles.postedNote} role="status" tabIndex={-1}>
          {contact.posted.replace("{email}", email.trim())}{" "}
          <button type="button" onClick={writeAnother}>
            {contact.another}
          </button>
        </p>
      ) : (
        <button type="button" className={styles.turn} onClick={() => setTurned(!flipped)}>
          Turn over
        </button>
      )}
    </div>
  );
}
