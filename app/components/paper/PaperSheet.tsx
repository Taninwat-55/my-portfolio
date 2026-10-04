import styles from "./paper.module.css";

interface PaperSheetProps {
  children: React.ReactNode;
  /** Notebook lines with a margin, for notes and the 404 page. */
  ruled?: boolean;
  /** Where the ruled lines start, e.g. "92px", so a heading can sit above them. */
  ruleTop?: string;
  as?: "div" | "article" | "section";
  className?: string;
}

/** A sheet of paper lying on the dark desk. The page's main surface. */
export function PaperSheet({
  children,
  ruled = false,
  ruleTop,
  as: Tag = "div",
  className,
}: PaperSheetProps) {
  const classes = [styles.sheet, ruled && styles.ruled, className].filter(Boolean).join(" ");
  const style = ruleTop ? ({ "--rule-top": ruleTop } as React.CSSProperties) : undefined;
  return (
    <Tag className={classes} style={style}>
      {children}
    </Tag>
  );
}
