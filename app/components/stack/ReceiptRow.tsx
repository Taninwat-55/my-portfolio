import styles from "./longcard.module.css";

/** A receipt row: the label, a dotted leader, the figure, on one baseline. */
export function ReceiptRow({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={styles.row}>
      <div className={styles.rowLine}>
        <span className={styles.rowLabel}>{label}</span>
        <span className={styles.leader} aria-hidden="true" />
        <span className={styles.figure}>{value}</span>
      </div>
      {children}
    </div>
  );
}
