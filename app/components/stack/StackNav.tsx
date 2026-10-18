"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { stackContent, stackHref, stackOrder } from "../../data";
import { PixelIcon } from "./PixelIcon";
import styles from "./stack.module.css";

const HREFS = stackOrder.map(stackHref);

/**
 * The nav bar under every card: previous, home, "n of N", all cards, next.
 * The stack wraps, the way HyperCard's did: next on the last card is the first.
 * The arrow keys flip too, except while someone is typing.
 */
export function StackNav() {
  const pathname = usePathname();
  const router = useRouter();
  const index = HREFS.indexOf(pathname);
  const onCard = index >= 0;
  const total = HREFS.length;
  const prev = onCard ? HREFS[(index - 1 + total) % total] : null;
  const next = onCard ? HREFS[(index + 1) % total] : null;

  useEffect(() => {
    if (!prev || !next) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.altKey || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const el = e.target as HTMLElement | null;
      if (el?.closest("input, textarea, select, [contenteditable='true'], details[open]")) return;
      if (e.key === "ArrowLeft") router.push(prev);
      if (e.key === "ArrowRight") router.push(next);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, router]);

  const { nav } = stackContent;

  return (
    <nav className={styles.nav} aria-label="Stack navigation">
      <Link
        href={prev ?? "/"}
        className={styles.navBtn}
        aria-label={nav.prev}
        aria-disabled={prev ? undefined : "true"}
        tabIndex={prev ? undefined : -1}
      >
        <PixelIcon name="prev" />
      </Link>
      <Link
        href="/"
        className={styles.navBtn}
        aria-label={nav.home}
        aria-current={pathname === "/" ? "page" : undefined}
      >
        <PixelIcon name="home" />
      </Link>
      <p className={styles.navPos} aria-live="polite">
        {onCard
          ? nav.position.replace("{n}", String(index + 1)).replace("{total}", String(total))
          : (nav.pages[pathname] ?? stackContent.grid.title)}
      </p>
      <Link
        href="/work"
        className={styles.navBtn}
        aria-label={nav.grid}
        aria-current={pathname === "/work" ? "page" : undefined}
      >
        <PixelIcon name="grid" />
      </Link>
      <Link
        href={next ?? "/"}
        className={styles.navBtn}
        aria-label={nav.next}
        aria-disabled={next ? undefined : "true"}
        tabIndex={next ? undefined : -1}
      >
        <PixelIcon name="next" />
      </Link>
    </nav>
  );
}
