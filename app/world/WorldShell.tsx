import { SkipLink } from "@/app/components/SkipLink";
import { worldFontVariables } from "./fonts";
import { WorldBoot } from "./WorldBoot";
import "./tokens/crystallize.css";
import styles from "./world.module.css";

/**
 * The frame every world page sits in: the world's tokens and fonts, the boot
 * script (theme, loader-seen, JS flag) and the skip link. A component rather
 * than a layout so the stack pages, which still share URLs with world pages
 * until they move, are untouched.
 */
export function WorldShell({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: WorldBoot may set data-tone="ink" (a saved
    // dark theme) on this element before React hydrates it.
    <div data-world="crystallize" className={`${worldFontVariables} ${styles.world}`} suppressHydrationWarning>
      <WorldBoot />
      <SkipLink />
      {children}
    </div>
  );
}
