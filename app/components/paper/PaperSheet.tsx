import styles from "./paper.module.css";

interface PaperSheetProps {
  children: React.ReactNode;
  /** A notebook page's margin line and the room beside it (the 404 page).
   *  The rules go on the text blocks, with `paper.lines`, so text sits on them. */
  ruled?: boolean;
  as?: "div" | "article" | "section";
  className?: string;
}

/** A sheet of paper lying on the dark desk. The page's main surface. */
export function PaperSheet({
  children,
  ruled = false,
  as: Tag = "div",
  className,
}: PaperSheetProps) {
  const classes = [styles.sheet, ruled && styles.ruled, className].filter(Boolean).join(" ");
  return (
    <Tag className={classes}>
      {children}
    </Tag>
  );
}
