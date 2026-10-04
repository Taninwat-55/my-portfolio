"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Post } from "../lib/posts";
import styles from "./notebook.module.css";

export type GardenEntry = Omit<Post, "content" | "author">;

// Matches the clock's notebook, which shows the 5 newest.
const PER_PAGE = 5;

/** Puts the page in the address (page 1 has none), without a navigation. */
function writePage(page: number) {
  const url = new URL(window.location.href);
  if (page === 1) url.searchParams.delete("page");
  else url.searchParams.set("page", String(page));
  window.history.replaceState(null, "", url);
}

/**
 * The contents list, paginated on phones only (Ice, 2026-10-04: at 360px two
 * notes fill the screen). Laptops always see every note.
 *
 * Every note is in the HTML as a real link on every page; phones just hide the
 * ones off the current page (.offPage, phone widths only). So no note is ever
 * reachable only through a button, the orphan-page trap /projects was built to
 * fix, and nothing shifts at hydration, since the server renders page 1.
 *
 * The page lives in the URL (?page=2, via replaceState) so that Back from a
 * note returns to the page it was opened from.
 */
export function GardenList({ posts }: { posts: GardenEntry[] }) {
  const pages = Math.max(1, Math.ceil(posts.length / PER_PAGE));
  const [page, setPage] = useState(1);
  const listRef = useRef<HTMLOListElement>(null);
  // Set by the pager, so paging moves focus but a restore from the URL doesn't.
  const pagedByUser = useRef(false);

  // Restore the page from the URL after a Back navigation. Read after mount,
  // not during render: the server has no URL to read, and page 1 is what it
  // sent. A layout effect, so the switch lands before the first paint and the
  // browser's scroll restoration measures the right notes.
  useLayoutEffect(() => {
    const raw = new URLSearchParams(window.location.search).get("page");
    if (raw === null) return;
    const fromUrl = Number(raw);
    if (Number.isInteger(fromUrl) && fromUrl >= 1 && fromUrl <= pages) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from the URL
      setPage(fromUrl);
    } else {
      // ?page=abc or ?page=99: page 1 is shown, so the address says so too.
      writePage(1);
    }
  }, [pages]);

  // After paging, focus the first note of the new page: the button that was
  // pressed may now be disabled, which would drop focus to <body>. Focus first
  // (without scrolling), then one scroll to the top of the list.
  useEffect(() => {
    if (!pagedByUser.current) return;
    pagedByUser.current = false;
    const list = listRef.current;
    list?.children[(page - 1) * PER_PAGE]?.querySelector("a")?.focus({ preventScroll: true });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list?.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
  }, [page]);

  const goTo = (next: number) => {
    pagedByUser.current = true;
    setPage(next);
    writePage(next);
  };

  const first = (page - 1) * PER_PAGE;

  return (
    <>
      <ol ref={listRef} className={`${styles.lined} ${styles.contents}`}>
        {posts.map((post, i) => (
          <li key={post.slug} className={i < first || i >= first + PER_PAGE ? styles.offPage : undefined}>
            <h2 className={styles.entryTitle}>
              <Link href={`/garden/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className={styles.entryMeta}>
              {post.category} <span aria-hidden="true">·</span>{" "}
              <time dateTime={post.date}>{post.date}</time> <span aria-hidden="true">·</span>{" "}
              {post.readTime}
            </p>
            <p className={styles.entryExcerpt}>{post.excerpt}</p>
          </li>
        ))}
      </ol>

      {pages > 1 && (
        <nav aria-label="Notes pages" className={styles.pager}>
          <button
            type="button"
            className={styles.pagerButton}
            onClick={() => goTo(page - 1)}
            disabled={page === 1}
          >
            <span aria-hidden="true">←</span> Newer
          </button>
          <p className={styles.pagerStatus} aria-live="polite">
            Page {page} of {pages}
          </p>
          <button
            type="button"
            className={styles.pagerButton}
            onClick={() => goTo(page + 1)}
            disabled={page === pages}
          >
            Older <span aria-hidden="true">→</span>
          </button>
        </nav>
      )}
    </>
  );
}
