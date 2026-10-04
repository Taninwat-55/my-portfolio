"use client";

import { useState } from "react";
import { clockContent, personalInfo } from "../../data";
import styles from "./clock.module.css";

/**
 * The Contact object: a postcard that flips over to its writing side.
 *
 * `stage` comes from ClockHome: 0 shows the picture side, 1 turns it over once
 * the fly-in has landed. After that the visitor's own "Turn over" wins.
 */
export function Postcard({ stage }: { stage: number }) {
  const { contact } = clockContent;
  const [turned, setTurned] = useState<boolean | null>(null);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState<"idle" | "copied" | "selected">("idle");
  const flipped = turned ?? stage >= 1;

  const send = (event: React.FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams({
      subject: "A postcard from your portfolio",
      body: message,
    });
    // URLSearchParams encodes spaces as "+", which mail apps show literally.
    window.location.href = `mailto:${personalInfo.email}?${params.toString().replace(/\+/g, "%20")}`;
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
    <div className={`${styles.postcard} ${flipped ? styles.flipped : ""}`}>
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
        </div>

        <div className={`${styles.cardSide} ${styles.cardBack}`} aria-hidden={!flipped} inert={!flipped}>
          <form className={styles.cardForm} onSubmit={send}>
            <label htmlFor="postcard-message">Your message</label>
            <textarea
              id="postcard-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder={contact.placeholder}
              required
            />
            <button type="submit" className={styles.cardSend}>
              {contact.sendLabel}
            </button>
            <p className={styles.cardNote}>{contact.sendNote}</p>
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

      <button type="button" className={styles.turn} onClick={() => setTurned(!flipped)}>
        Turn over
      </button>
    </div>
  );
}
