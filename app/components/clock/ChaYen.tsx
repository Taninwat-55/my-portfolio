import styles from "./clock.module.css";

/**
 * A glass of cha yen (Thai iced milk tea) beside the receipt. Decoration only:
 * not a door, not focusable, hidden from screen readers. It is the one Thai
 * thing on a desk that is otherwise all Copenhagen, for the Thai-run
 * businesses that are half the client audience.
 *
 * Drawn as it is served: orange tea packed with ice, evaporated milk poured on
 * top and marbling down, a striped straw. Proofed at 400px before it shipped.
 */
export function ChaYen() {
  return (
    <div className={styles.chaYen} aria-hidden="true">
      <svg className={styles.art} viewBox="0 0 80 150">
        <defs>
          <clipPath id="cy-inside">
            <path d="M14.5 34 L22 138 Q22 141 25 141 H55 Q58 141 58 138 L65.5 34 Z" />
          </clipPath>
          <linearGradient id="cy-tea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f2a35a" />
            <stop offset=".45" stopColor="#e57f35" />
            <stop offset="1" stopColor="#c95a24" />
          </linearGradient>
          <linearGradient id="cy-milk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f6e7cf" />
            <stop offset="1" stopColor="#f6e7cf" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* The straw, behind the front of the glass. */}
        <path d="M45 74 L57 4" stroke="#e9e4da" strokeWidth="5" strokeLinecap="round" />
        <path d="M51.6 36 L54.3 20" stroke="#c4413e" strokeWidth="5" />
        <g clipPath="url(#cy-inside)">
          <rect x="0" y="38" width="80" height="112" fill="url(#cy-tea)" />
          <path
            d="M0 38 H80 V52 C70 58 64 50 56 58 C48 66 50 80 42 84 C36 88 34 70 28 66 C22 62 16 70 10 64 L0 62 Z"
            fill="url(#cy-milk)"
          />
          <path
            d="M0 38 H80 V46 C68 50 60 44 50 50 C40 56 30 46 20 52 C12 56 6 50 0 52 Z"
            fill="#f6e7cf"
          />
          <path
            d="M42 84 C46 94 40 102 44 114"
            fill="none"
            stroke="#f6e7cf"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity=".45"
          />
          <g fill="#fff" opacity=".28">
            <rect x="18" y="40" width="15" height="13" rx="3" transform="rotate(-14 25 46)" />
            <rect x="38" y="36" width="14" height="13" rx="3" transform="rotate(12 45 42)" />
            <rect x="24" y="64" width="14" height="13" rx="3" transform="rotate(20 31 70)" />
            <rect x="44" y="70" width="13" height="12" rx="3" transform="rotate(-10 50 76)" />
            <rect x="27" y="92" width="14" height="12" rx="3" transform="rotate(-24 34 98)" />
            <rect x="40" y="108" width="12" height="11" rx="3" transform="rotate(16 46 113)" />
          </g>
          <path d="M20 44 L25.5 130" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" opacity=".35" />
        </g>
        {/* The glass, with a light edge so it reads on the dark desk. */}
        <path
          className={styles.chaYenGlass}
          d="M12 24 L22 138 Q22 142 26 142 H54 Q58 142 58 138 L68 24"
          fill="#fff"
          fillOpacity=".06"
        />
        <ellipse className={styles.chaYenGlass} cx="40" cy="24" rx="28" ry="4" fill="#fff" fillOpacity=".1" />
        <g fill="#fff" opacity=".6">
          <circle cx="57" cy="86" r="1.3" />
          <circle cx="54" cy="100" r="1" />
          <circle cx="56.5" cy="118" r="1.2" />
          <circle cx="24.5" cy="112" r="1" />
          <circle cx="23" cy="88" r="0.9" />
        </g>
      </svg>
    </div>
  );
}
