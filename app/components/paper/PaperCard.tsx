import Link from "next/link";
import styles from "./paper.module.css";

interface PaperCardProps {
  children: React.ReactNode;
  /** Makes the whole card a link. */
  href?: string;
  /** A slight turn in degrees, so a grid of cards reads as paper, not tiles. */
  tilt?: number;
  className?: string;
}

/** A small paper card for grids on the desk: offers, FAQs, list items. */
export function PaperCard({ children, href, tilt = 0, className }: PaperCardProps) {
  const classes = className ? `${styles.card} ${className}` : styles.card;
  const style = tilt ? ({ "--tilt": `${tilt}deg` } as React.CSSProperties) : undefined;

  if (href) {
    return (
      <Link href={href} className={classes} style={style}>
        {children}
      </Link>
    );
  }
  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
}
