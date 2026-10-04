import styles from "./paper.module.css";

interface TagProps {
  children: React.ReactNode;
  /** "tag" is a small ink label (a stack name); "chip" is a rounded pill (a status). */
  variant?: "tag" | "chip";
}

export function Tag({ children, variant = "tag" }: TagProps) {
  return <span className={variant === "chip" ? styles.chip : styles.tag}>{children}</span>;
}
