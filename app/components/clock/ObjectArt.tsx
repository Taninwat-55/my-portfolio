import type { ClockObjectId } from "../../data";
import styles from "./clock.module.css";

/**
 * The small drawings of each object as it sits pinned around the portrait.
 * Paper stays light in every theme: these are things on a surface, not UI chrome.
 */
export function ObjectArt({ id }: { id: ClockObjectId | "contact" }) {
  const common = { className: styles.art, "aria-hidden": true } as const;

  if (id === "work") {
    return (
      <svg {...common} viewBox="0 0 180 140">
        <rect className={styles.paperDim} x="52" y="10" width="92" height="112" rx="2" transform="rotate(9 98 66)" />
        <rect className={styles.paperDim} x="44" y="14" width="92" height="112" rx="2" transform="rotate(-4 90 70)" />
        <g transform="rotate(-10 86 72)">
          <rect className={styles.paper} x="40" y="16" width="92" height="112" rx="2" />
          <rect className={styles.inkWash} x="48" y="24" width="76" height="74" />
          <path className={styles.pencil} d="M48 98 L72 70 L88 86 L100 74 L124 98" />
          <text className={styles.handText} x="50" y="118">Bevisly</text>
        </g>
      </svg>
    );
  }

  if (id === "about") {
    return (
      <svg {...common} viewBox="0 0 180 140">
        <rect className={styles.envBack} x="14" y="26" width="152" height="96" rx="4" />
        <path className={styles.envFlap} d="M14 30 L90 82 L166 30" />
        <path className={styles.pencil} d="M14 122 L72 72 M166 122 L108 72" />
        <circle className={styles.wax} cx="90" cy="80" r="11" />
        <text className={styles.sealText} x="90" y="85" textAnchor="middle">I</text>
      </svg>
    );
  }

  if (id === "writing") {
    return (
      <svg {...common} viewBox="0 0 180 140">
        <rect className={styles.paper} x="50" y="8" width="88" height="124" rx="4" />
        <rect className={styles.cover} x="44" y="6" width="88" height="124" rx="4" />
        <path className={styles.spine} d="M54 6 V130" />
        <rect className={styles.paper} x="66" y="40" width="54" height="24" rx="2" />
        <text className={styles.handText} x="93" y="57" textAnchor="middle" fontSize="11">Garden</text>
        <path className={styles.band} d="M122 6 V130" />
      </svg>
    );
  }

  if (id === "services") {
    return (
      <svg {...common} viewBox="0 0 180 140">
        <path
          className={styles.paper}
          d="M50 6 H130 V128 l-8 -6 l-8 6 l-8 -6 l-8 6 l-8 -6 l-8 6 l-8 -6 l-8 6 l-8 -6 l-8 6 Z"
        />
        <text className={styles.monoText} x="90" y="24" textAnchor="middle">ICE · WEB</text>
        <path className={styles.pencil} d="M60 34 H120" strokeDasharray="3 3" />
        <path className={styles.pencil} d="M60 48 H96 M108 48 H120 M60 62 H90 M108 62 H120 M60 76 H98 M108 76 H120" />
        <path className={styles.pencil} d="M60 90 H120" strokeDasharray="3 3" />
        <path
          className={styles.ink}
          d="M62 100 V114 M66 100 V114 M68 100 V114 M73 100 V114 M76 100 V114 M80 100 V114 M83 100 V114 M88 100 V114 M90 100 V114 M95 100 V114 M99 100 V114 M101 100 V114 M106 100 V114 M110 100 V114 M113 100 V114 M118 100 V114"
        />
      </svg>
    );
  }

  return (
    <svg {...common} viewBox="0 0 132 92">
      <rect className={styles.paper} x="2" y="2" width="128" height="86" rx="3" />
      <rect className={styles.wax} x="100" y="9" width="22" height="26" />
      <path className={styles.pencil} d="M70 12 V80 M78 50 H122 M78 62 H118 M78 74 H112" />
    </svg>
  );
}
