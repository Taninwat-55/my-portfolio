"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clockContent, personalInfo, siteContent, type ClockObjectId } from "../../data";
import { Portrait } from "./Portrait";
import { Hand } from "./Hand";
import { ObjectArt } from "./ObjectArt";
import { Envelope } from "./Envelope";
import styles from "./clock.module.css";

type Pointable = ClockObjectId | "contact";
type InPlace = "about";
type Stage = 0 | 1 | 2 | 3;

/**
 * Objects that open over the cluster instead of navigating away. Each one also
 * has a real route (app/about/page.tsx) that renders this component already
 * open, so the URL can be shared and a direct visit shows the letter.
 *
 * Opening uses window.history.pushState rather than router.push: Next keeps
 * usePathname in sync with it, but does not re-render the page, so the envelope
 * can fly out of its spot instead of the whole tree remounting at /about.
 */
const IN_PLACE: Record<InPlace, string> = { about: "/about" };
const isInPlace = (id: Pointable): id is InPlace => id in IN_PLACE;

// When each envelope stage starts, in ms after the fly-in lands.
const STAGE_DELAYS = [0, 420, 1000];
// Long enough to see the hand swing before the page changes.
const SWING_BEFORE_NAVIGATE_MS = 380;

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isCompact = () =>
  window.matchMedia("(max-width: 767px), (max-height: 520px) and (orientation: landscape)").matches;
const isPlainClick = (event: React.MouseEvent) =>
  event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

export function ClockHome({ initialOpen = null }: { initialOpen?: InPlace | null }) {
  const router = useRouter();
  const coreRef = useRef<HTMLDivElement>(null);
  const handRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const artRefs = useRef(new Map<Pointable, HTMLElement>());
  const triggerRefs = useRef(new Map<Pointable, HTMLAnchorElement>());
  const angle = useRef(0);
  const pointedRef = useRef<Pointable | null>(initialOpen);
  const openRef = useRef<InPlace | null>(initialOpen);
  const pushedRef = useRef(false);
  const flyInRef = useRef(false);
  const timers = useRef<number[]>([]);

  const [pointed, setPointed] = useState<Pointable | null>(initialOpen);
  const [open, setOpen] = useState<InPlace | null>(initialOpen);
  const [stage, setStage] = useState<Stage>(initialOpen ? 3 : 0);

  const [firstName, ...rest] = personalInfo.name.split(" ");
  const lastName = rest.join(" ");

  // ---- the hand -------------------------------------------------------------

  const swingTo = useCallback((degrees: number, animate = true) => {
    const hand = handRef.current;
    if (!hand) return;
    // Always take the short way round, so 350° → 10° is a 20° nudge, not a lap.
    angle.current += ((((degrees - angle.current) % 360) + 540) % 360) - 180;
    hand.style.transition = animate && !prefersReducedMotion() ? "" : "none";
    hand.style.setProperty("--angle", `${angle.current}deg`);
  }, []);

  const angleTo = useCallback((id: Pointable) => {
    const core = coreRef.current?.getBoundingClientRect();
    const target = artRefs.current.get(id)?.getBoundingClientRect();
    if (!core || !target) return 0;
    const dx = target.left + target.width / 2 - (core.left + core.width / 2);
    const dy = target.top + target.height / 2 - (core.top + core.height / 2);
    return (Math.atan2(dx, -dy) * 180) / Math.PI;
  }, []);

  const pointAt = useCallback(
    (id: Pointable) => {
      pointedRef.current = id;
      setPointed(id);
      handRef.current?.classList.remove(styles.idle);
      swingTo(angleTo(id));
    },
    [angleTo, swingTo],
  );

  const release = useCallback(() => {
    if (openRef.current) return;
    pointedRef.current = null;
    setPointed(null);
    swingTo(0);
    window.setTimeout(() => {
      if (!pointedRef.current) handRef.current?.classList.add(styles.idle);
    }, 600);
  }, [swingTo]);

  // A direct visit to /about starts with the hand already on the envelope.
  useEffect(() => {
    if (initialOpen) {
      handRef.current?.classList.remove(styles.idle);
      swingTo(angleTo(initialOpen), false);
    }
    const onResize = () => {
      if (pointedRef.current) swingTo(angleTo(pointedRef.current), false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [initialOpen, angleTo, swingTo]);

  const lookAt = useCallback(
    () => (pointedRef.current ? artRefs.current.get(pointedRef.current) ?? null : null),
    [],
  );

  // ---- opening and closing --------------------------------------------------

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  // Offset from the sheet's centre to the object's spot, so it can fly from there.
  const offsetTo = (id: Pointable) => {
    const sheet = sheetRef.current?.getBoundingClientRect();
    const art = artRefs.current.get(id)?.getBoundingClientRect();
    if (!sheet || !art) return { x: 0, y: 0 };
    return {
      x: art.left + art.width / 2 - (sheet.left + sheet.width / 2),
      y: art.top + art.height / 2 - (sheet.top + sheet.height / 2),
    };
  };

  const show = useCallback(
    (id: InPlace) => {
      clearTimers();
      openRef.current = id;
      flyInRef.current = true;
      setOpen(id);
      setStage(0);
      pointAt(id);
    },
    [pointAt],
  );

  // Runs once the sheet is in the DOM: fly in, then play the envelope's stages.
  useLayoutEffect(() => {
    const sheet = sheetRef.current;
    if (!open || !sheet || !flyInRef.current) return;
    flyInRef.current = false;
    const reduce = prefersReducedMotion();
    const { x, y } = offsetTo(open);
    const from = reduce
      ? { opacity: 0 }
      : isCompact()
        ? { transform: "translateY(100%)" }
        : { transform: `translate(${x}px, ${y}px) scale(0.15) rotate(-8deg)`, opacity: 0 };
    const animation = sheet.animate([from, { transform: "none", opacity: 1 }], {
      duration: reduce ? 150 : 560,
      easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
    });
    closeRef.current?.focus({ preventScroll: true });
    animation.finished
      .then(() => {
        STAGE_DELAYS.forEach((delay, i) => {
          timers.current.push(
            window.setTimeout(() => setStage((i + 1) as Stage), reduce ? 0 : delay),
          );
        });
      })
      .catch(() => {});
  }, [open]);

  const hide = useCallback(() => {
    const id = openRef.current;
    const sheet = sheetRef.current;
    if (!id || !sheet) return;
    clearTimers();
    openRef.current = null;
    const reduce = prefersReducedMotion();
    const { x, y } = offsetTo(id);
    const to = reduce
      ? { opacity: 0 }
      : isCompact()
        ? { transform: "translateY(100%)" }
        : { transform: `translate(${x}px, ${y}px) scale(0.15) rotate(8deg)`, opacity: 0 };
    const animation = sheet.animate([{ transform: "none", opacity: 1 }, to], {
      duration: reduce ? 120 : 380,
      easing: "cubic-bezier(0.5, 0, 0.75, 0)",
      fill: "forwards",
    });
    animation.finished
      .then(() => {
        setOpen(null);
        setStage(0);
        const trigger = triggerRefs.current.get(id);
        trigger?.focus({ preventScroll: true });
        if (!trigger?.matches(":hover")) release();
      })
      .catch(() => {});
  }, [release]);

  // Close button, Escape and backdrop all mean "go back to where I was".
  const requestClose = useCallback(() => {
    if (pushedRef.current) {
      pushedRef.current = false;
      window.history.back(); // popstate below does the closing
    } else {
      window.history.replaceState(null, "", "/");
      hide();
    }
  }, [hide]);

  // The browser's own back and forward buttons.
  useEffect(() => {
    const onPopState = () => {
      const id = (Object.keys(IN_PLACE) as InPlace[]).find(
        (key) => IN_PLACE[key] === window.location.pathname,
      );
      if (id && !openRef.current) show(id);
      if (!id && openRef.current) hide();
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [show, hide]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        requestClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, requestClose]);

  // Keep Tab inside the open object.
  const trapFocus = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;
    const scrim = event.currentTarget;
    const focusable = Array.from(
      scrim.querySelectorAll<HTMLElement>("button, a[href], [tabindex='0']"),
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  // ---- triggers -------------------------------------------------------------

  const onTriggerClick = (event: React.MouseEvent<HTMLAnchorElement>, id: Pointable, href: string) => {
    if (!isPlainClick(event)) return; // new tab and friends keep working
    if (id === "contact") return; // a mailto link: let the browser handle it
    event.preventDefault();
    const alreadyPointing = pointedRef.current === id;
    pointAt(id);
    const delay = alreadyPointing || prefersReducedMotion() ? 0 : SWING_BEFORE_NAVIGATE_MS;
    window.setTimeout(() => {
      if (isInPlace(id)) {
        window.history.pushState(null, "", IN_PLACE[id]);
        pushedRef.current = true;
        show(id);
      } else {
        router.push(href);
      }
    }, delay);
  };

  const triggerProps = (id: Pointable, href: string) => ({
    ref: (el: HTMLAnchorElement | null) => {
      if (el) triggerRefs.current.set(id, el);
      else triggerRefs.current.delete(id);
    },
    href,
    onPointerEnter: (event: React.PointerEvent) => {
      if (event.pointerType === "mouse") pointAt(id);
    },
    onPointerLeave: (event: React.PointerEvent<HTMLAnchorElement>) => {
      if (event.pointerType === "mouse" && document.activeElement !== event.currentTarget) release();
    },
    onFocus: () => pointAt(id),
    onBlur: (event: React.FocusEvent) => {
      const next = event.relatedTarget as HTMLElement | null;
      if (!next || ![...triggerRefs.current.values()].includes(next as HTMLAnchorElement)) release();
    },
    onClick: (event: React.MouseEvent<HTMLAnchorElement>) => onTriggerClick(event, id, href),
  });

  const artRef = (id: Pointable) => (el: HTMLElement | null) => {
    if (el) artRefs.current.set(id, el);
    else artRefs.current.delete(id);
  };

  // ---- render ---------------------------------------------------------------

  return (
    <div className={styles.page}>
      <div className={styles.frame} inert={open !== null}>
        <header className={styles.top}>
          <div className={styles.identity}>
            <h1 className={styles.name}>
              {firstName} <span className={styles.nickname}>“{personalInfo.nickname}”</span> {lastName}
            </h1>
            <p className={styles.role}>
              <strong>{siteContent.roleLabel}</strong> in Copenhagen
            </p>
            <p className={styles.availability}>{clockContent.availability}</p>
          </div>

          <a
            className={`${styles.pin} ${pointed === "contact" ? styles.pointed : ""}`}
            aria-label={`${clockContent.contact.label}: email ${personalInfo.email}`}
            {...triggerProps("contact", `mailto:${personalInfo.email}`)}
          >
            <span ref={artRef("contact")} className={styles.pinCard}>
              <ObjectArt id="contact" />
              <span className={styles.pinNote} aria-hidden="true">
                {clockContent.contact.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </span>
            </span>
            <span className={styles.label}>{clockContent.contact.label}</span>
          </a>
        </header>

        <main id="main-content" className={styles.stage}>
          <div className={styles.cluster}>
            <div className={styles.coreWrap}>
              <div ref={coreRef} className={styles.core}>
                <Hand ref={handRef} />
                <Portrait smiling={pointed !== null} lookAt={lookAt} />
              </div>
            </div>

            <nav aria-label="Sections">
              <ul className={styles.things}>
                {clockContent.objects.map((object) => (
                  <li key={object.id}>
                    <a
                      className={`${styles.thing} ${styles[object.id]} ${pointed === object.id ? styles.pointed : ""}`}
                      {...triggerProps(object.id, object.href)}
                    >
                      <span ref={artRef(object.id)} className={styles.artWrap}>
                        <ObjectArt id={object.id} />
                      </span>
                      <span className={styles.label}>{object.label}</span>
                      <span className={styles.sub}>{object.sub}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </main>

        <nav aria-label="Languages" className={styles.languages}>
          {siteContent.languages.map((language) => (
            <Link
              key={language.code}
              href={language.href}
              lang={language.code}
              aria-current={language.code === "en" ? "page" : undefined}
            >
              {language.label}
            </Link>
          ))}
        </nav>
      </div>

      {open && (
        <div
          className={styles.scrim}
          onKeyDown={trapFocus}
          onClick={(event) => {
            if (event.target === event.currentTarget) requestClose();
          }}
        >
          <button ref={closeRef} type="button" className={styles.close} onClick={requestClose}>
            Close <kbd>Esc</kbd>
          </button>
          <div
            ref={sheetRef}
            className={styles.sheet}
            role="dialog"
            aria-modal="true"
            aria-label="About Ice"
          >
            <Envelope stage={stage} />
          </div>
        </div>
      )}
    </div>
  );
}
