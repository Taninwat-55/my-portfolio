"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { clockContent, personalInfo, siteContent, type ClockObjectId } from "../../data";
import { Portrait } from "./Portrait";
import { Hand } from "./Hand";
import { ObjectArt } from "./ObjectArt";
import { Envelope } from "./Envelope";
import { Postcard } from "./Postcard";
import { Prints } from "./Prints";
import { Notebook } from "./Notebook";
import { Receipt } from "./Receipt";
import { Lamp } from "./Lamp";
import { WallClock } from "./WallClock";
import { useCopenhagenTime, hourOf } from "./useCopenhagenTime";
import type { ClockContentProps } from "./types";
import styles from "./clock.module.css";

type Pointable = ClockObjectId | "contact";
/** Everything on the clock opens in place: the four objects and the postcard. */
export type InPlace = Pointable;

/**
 * Where each object lives. Every one opens over the cluster instead of
 * navigating away, and also has a real route (app/work/page.tsx and so on) that
 * renders the clock already open, so the URL can be shared and a direct visit
 * shows the object.
 *
 * Opening uses window.history.pushState rather than router.push: Next keeps
 * usePathname in sync with it, but does not re-render the page, so the envelope
 * can fly out of its spot instead of the whole tree remounting at /about.
 */
const IN_PLACE: Record<InPlace, string> = {
  ...(Object.fromEntries(clockContent.objects.map((o) => [o.id, o.href])) as Record<ClockObjectId, string>),
  contact: "/contact",
};
const idForPath = (path: string) =>
  (Object.keys(IN_PLACE) as InPlace[]).find((id) => IN_PLACE[id] === path) ?? null;

// When each stage of an object's opening starts, in ms after the fly-in lands.
// The envelope has three (flap, letter rises, letter unfolds); the others have
// one (fan out, open, print, turn over). A direct visit renders the last stage
// straight away.
const STAGE_DELAYS: Record<InPlace, number[]> = {
  work: [0],
  about: [0, 420, 1000],
  writing: [0],
  services: [0],
  contact: [500],
};
const DIALOG_LABELS: Record<InPlace, string> = {
  work: "Ice's work",
  about: "About Ice",
  writing: "Ice's notes",
  services: "Services and prices",
  contact: "Contact Ice",
};
/**
 * Where the hand rests when nothing is pointed at: up and to the left, at Work.
 * Not straight up, because that is where the lamp hangs, and a finger poking
 * the shade looked like a mistake. Pointing at Work also says "start here".
 * The same value is the CSS default for --angle on .hand in clock.module.css.
 */
const HAND_REST_ANGLE = -40;

// Long enough to see the hand swing before the object flies in.
const SWING_BEFORE_OPEN_MS = 380;

/**
 * Dragging objects around the desk. Mouse only: on touch a drag is a scroll,
 * and the keyboard has nothing to drag with, so both simply open objects as
 * before. A press that moves less than DRAG_THRESHOLD is still a click.
 *
 * Positions are kept in this visitor's localStorage. That is a convenience, not
 * data: if storage is blocked or cleared, the desk is tidy again.
 */
type Offset = { x: number; y: number };
type Offsets = Partial<Record<ClockObjectId, Offset>>;
const DESK_KEY = "clock-desk-v1";
const DRAG_THRESHOLD = 6;

function loadOffsets(): Offsets {
  try {
    const saved: unknown = JSON.parse(window.localStorage.getItem(DESK_KEY) ?? "{}");
    if (!saved || typeof saved !== "object") return {};
    return Object.fromEntries(
      Object.entries(saved).filter(
        ([id, o]) =>
          clockContent.objects.some((object) => object.id === id) &&
          typeof o?.x === "number" &&
          typeof o?.y === "number",
      ),
    ) as Offsets;
  } catch {
    return {};
  }
}

function saveOffsets(offsets: Offsets) {
  try {
    if (Object.keys(offsets).length === 0) window.localStorage.removeItem(DESK_KEY);
    else window.localStorage.setItem(DESK_KEY, JSON.stringify(offsets));
  } catch {
    // Storage blocked (private window, settings): the drag still works, it just
    // will not be remembered.
  }
}

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isCompact = () =>
  window.matchMedia("(max-width: 767px), (max-height: 520px) and (orientation: landscape)").matches;
/**
 * TEMPORARY, remove before merging clock-redesign: a switch for previewing night
 * mode in daytime. It only renders when the URL has ?preview (e.g.
 * localhost:3100/?preview), so no ordinary visitor can see it, and it fakes
 * Copenhagen's clock rather than a "night" flag, so the lamp, the dimming and
 * the mood line all change together the way they really would.
 */
const PREVIEW_NIGHT_TIME = "23:10";
const noSubscribe = () => () => {};
const usePreviewSwitch = () =>
  useSyncExternalStore(
    noSubscribe,
    () => new URLSearchParams(window.location.search).has("preview"),
    () => false,
  );

const isPlainClick = (event: React.MouseEvent) =>
  event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

export function ClockHome({
  initialOpen = null,
  content,
}: {
  initialOpen?: InPlace | null;
  content: ClockContentProps;
}) {
  const coreRef = useRef<HTMLDivElement>(null);
  const clusterRef = useRef<HTMLDivElement>(null);
  const handRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const artRefs = useRef(new Map<Pointable, HTMLElement>());
  const triggerRefs = useRef(new Map<Pointable, HTMLAnchorElement>());
  const angle = useRef(HAND_REST_ANGLE);
  const pointedRef = useRef<Pointable | null>(initialOpen);
  const openRef = useRef<InPlace | null>(initialOpen);
  const pushedRef = useRef(false);
  const flyInRef = useRef(false);
  const timers = useRef<number[]>([]);
  const drag = useRef<{
    id: ClockObjectId;
    el: HTMLAnchorElement;
    startX: number;
    startY: number;
    from: Offset;
    to: Offset;
    min: Offset;
    max: Offset;
    moved: boolean;
  } | null>(null);
  const suppressClick = useRef(false);
  const [offsets, setOffsets] = useState<Offsets>({});

  const [pointed, setPointed] = useState<Pointable | null>(initialOpen);
  const [open, setOpen] = useState<InPlace | null>(initialOpen);
  const [stage, setStage] = useState(initialOpen ? STAGE_DELAYS[initialOpen].length : 0);

  // The desk lamp follows Copenhagen's clock until the visitor flips it.
  const { desk } = clockContent;
  const realTime = useCopenhagenTime();
  const showPreview = usePreviewSwitch();
  const [previewingNight, setPreviewingNight] = useState(false);
  const time = previewingNight ? PREVIEW_NIGHT_TIME : realTime;
  const hour = time ? hourOf(time) : null;
  const night = hour !== null && (hour >= desk.lampOnFrom || hour < desk.lampOffAt);
  const [lampFlipped, setLampFlipped] = useState<boolean | null>(null);
  const lampOn = lampFlipped ?? night;
  const mood = hour !== null ? desk.moods.find((m) => hour < m.until)?.text : null;

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
    swingTo(HAND_REST_ANGLE);
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
        STAGE_DELAYS[open].forEach((delay, i) => {
          timers.current.push(window.setTimeout(() => setStage(i + 1), reduce ? 0 : delay));
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
      const id = idForPath(window.location.pathname);
      if (id && !openRef.current) show(id);
      if (!id && openRef.current) hide();
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [show, hide]);

  // Coming back from a case study or a post restores the homepage's tree, but
  // the URL is still /work or /writing, and nothing is open. Open it again,
  // already at its last stage, so Back lands where the visitor left.
  useEffect(() => {
    if (initialOpen) return;
    const id = idForPath(window.location.pathname);
    if (!id) return;
    const frame = requestAnimationFrame(() => {
      openRef.current = id;
      setOpen(id);
      setStage(STAGE_DELAYS[id].length);
      pointAt(id);
    });
    return () => cancelAnimationFrame(frame);
  }, [initialOpen, pointAt]);

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
      scrim.querySelectorAll<HTMLElement>("button, a[href], textarea, input:not([tabindex='-1']), [tabindex='0']"),
    ).filter((el) => !el.closest("[inert]"));
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

  // ---- dragging -------------------------------------------------------------

  // Read after mount: the server has no storage, and the first paint must match it.
  useEffect(() => {
    const frame = requestAnimationFrame(() => setOffsets(loadOffsets()));
    return () => cancelAnimationFrame(frame);
  }, []);

  const startDrag = (event: React.PointerEvent<HTMLAnchorElement>, id: ClockObjectId) => {
    if (event.pointerType !== "mouse" || event.button !== 0 || isCompact()) return;
    const el = event.currentTarget;
    const box = el.getBoundingClientRect();
    const bounds = clusterRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const from = offsets[id] ?? { x: 0, y: 0 };
    // Keep the whole object inside the cluster.
    drag.current = {
      id,
      el,
      startX: event.clientX,
      startY: event.clientY,
      from,
      to: from,
      min: { x: from.x + bounds.left - box.left, y: from.y + bounds.top - box.top },
      max: { x: from.x + bounds.right - box.right, y: from.y + bounds.bottom - box.bottom },
      moved: false,
    };
  };

  const moveDrag = (event: React.PointerEvent<HTMLAnchorElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = event.clientX - d.startX;
    const dy = event.clientY - d.startY;
    if (!d.moved) {
      if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
      d.moved = true;
      d.el.setPointerCapture(event.pointerId);
      d.el.classList.add(styles.dragging);
    }
    const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
    d.to = {
      x: clamp(d.from.x + dx, d.min.x, d.max.x),
      y: clamp(d.from.y + dy, d.min.y, d.max.y),
    };
    // Straight onto the element: re-rendering React per pointer move would lag.
    d.el.style.setProperty("--dx", `${d.to.x}px`);
    d.el.style.setProperty("--dy", `${d.to.y}px`);
    swingTo(angleTo(d.id), false);
  };

  const endDrag = () => {
    const d = drag.current;
    drag.current = null;
    if (!d?.moved) return;
    d.el.classList.remove(styles.dragging);
    // The click that follows this pointerup must not open the object.
    suppressClick.current = true;
    setOffsets((previous) => {
      const next = { ...previous, [d.id]: d.to };
      saveOffsets(next);
      return next;
    });
  };

  const tidyDesk = () => {
    setOffsets({});
    saveOffsets({});
  };

  // ---- triggers -------------------------------------------------------------

  const onTriggerClick = (event: React.MouseEvent<HTMLAnchorElement>, id: Pointable) => {
    if (suppressClick.current) {
      suppressClick.current = false;
      event.preventDefault();
      return;
    }
    if (!isPlainClick(event)) return; // new tab and friends keep working
    event.preventDefault();
    const alreadyPointing = pointedRef.current === id;
    pointAt(id);
    const delay = alreadyPointing || prefersReducedMotion() ? 0 : SWING_BEFORE_OPEN_MS;
    window.setTimeout(() => {
      window.history.pushState(null, "", IN_PLACE[id]);
      pushedRef.current = true;
      show(id);
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
    onClick: (event: React.MouseEvent<HTMLAnchorElement>) => onTriggerClick(event, id),
  });

  const artRef = (id: Pointable) => (el: HTMLElement | null) => {
    if (el) artRefs.current.set(id, el);
    else artRefs.current.delete(id);
  };

  // ---- render ---------------------------------------------------------------

  return (
    <div
      className={[styles.page, night ? styles.night : "", lampOn ? styles.lampIsOn : ""].join(" ")}
    >
      <div className={styles.frame} inert={open !== null}>
        <header className={styles.top}>
          <div className={styles.identity}>
            <h1 className={styles.name}>
              {firstName} <span className={styles.nickname}>“{personalInfo.nickname}”</span> {lastName}
            </h1>
            <p className={styles.role}>
              <strong>{siteContent.roleLabel}</strong> in Copenhagen
            </p>
            {/* Always rendered, so the line's height is reserved before the
                client knows the time and nothing below it jumps. The time
                itself is on the wall clock. */}
            <p className={styles.localTime}>{mood ?? "\u00a0"}</p>
            <p className={styles.availability}>{clockContent.availability}</p>
          </div>

          {/* The wall: Copenhagen's clock beside the pinned postcard. */}
          <div className={styles.wall}>
            <WallClock time={time} />
            <a
              className={`${styles.pin} ${pointed === "contact" ? styles.pointed : ""}`}
              {...triggerProps("contact", IN_PLACE.contact)}
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
          </div>
        </header>

        <main id="main-content" className={styles.stage}>
          <div ref={clusterRef} className={styles.cluster}>
            <div className={styles.coreWrap}>
              <div ref={coreRef} className={styles.core}>
                <Hand ref={handRef} />
                <Portrait smiling={pointed !== null} lookAt={lookAt} />
                {/* The pool of light on the head, then the lamp above it. */}
                <div className={styles.lampLight} aria-hidden="true" />
                <Lamp on={lampOn} onToggle={() => setLampFlipped(!lampOn)} />
              </div>
            </div>

            <nav aria-label="Sections">
              <ul className={styles.things}>
                {clockContent.objects.map((object) => (
                  <li key={object.id}>
                    <a
                      className={`${styles.thing} ${styles[object.id]} ${pointed === object.id ? styles.pointed : ""}`}
                      style={
                        offsets[object.id]
                          ? ({
                              "--dx": `${offsets[object.id]!.x}px`,
                              "--dy": `${offsets[object.id]!.y}px`,
                            } as React.CSSProperties)
                          : undefined
                      }
                      onPointerDown={(event) => startDrag(event, object.id)}
                      onPointerMove={moveDrag}
                      onPointerUp={endDrag}
                      onPointerCancel={endDrag}
                      onDragStart={(event) => event.preventDefault()}
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

        <div className={styles.bottom}>
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
          {Object.keys(offsets).length > 0 && (
            <button type="button" className={styles.tidy} onClick={tidyDesk}>
              {desk.tidyLabel}
            </button>
          )}
          {showPreview && (
            <button
              type="button"
              className={styles.tidy}
              aria-pressed={previewingNight}
              onClick={() => {
                setPreviewingNight(!previewingNight);
                setLampFlipped(null); // let the lamp follow the previewed clock
              }}
            >
              Preview: {previewingNight ? `night (${PREVIEW_NIGHT_TIME})` : "real time"}
            </button>
          )}
        </div>
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
            aria-label={DIALOG_LABELS[open]}
          >
            {open === "work" && (
              <Prints stage={stage} prints={content.prints} caseCount={content.caseCount} />
            )}
            {open === "about" && <Envelope stage={stage as 0 | 1 | 2 | 3} />}
            {open === "writing" && <Notebook stage={stage} notes={content.notes} />}
            {open === "services" && <Receipt stage={stage} rates={content.rates} />}
            {open === "contact" && <Postcard stage={stage} />}
          </div>
        </div>
      )}
    </div>
  );
}
