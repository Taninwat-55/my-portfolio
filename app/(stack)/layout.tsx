import { ViewTransition } from "react";
import { SkipLink } from "../components/SkipLink";
import { MenuBar } from "../components/stack/MenuBar";
import { StackNav } from "../components/stack/StackNav";
import { MessageBox } from "../components/stack/MessageBox";
import { atkinson, display, jetbrainsMono, kanit, pixel } from "../components/stack/fonts";
import { personalInfo } from "../data";
import styles from "../components/stack/stack.module.css";
import "../components/stack/stack-global.css";

/**
 * Ice's Stack: the homepage, the project cards, the engineer and build cards,
 * and the all-cards grid share this frame. Being a layout, the menu bar, the
 * nav bar and the message box persist across cards, so a conversation in the
 * message box survives flipping through the stack. Each page renders one card.
 *
 * The card body is one named view transition ("stack-card"); stack-global.css
 * turns the change between cards into HyperCard's stipple dissolve.
 */
export default function StackLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${display.variable} ${pixel.variable} ${atkinson.variable} ${kanit.variable} ${jetbrainsMono.variable} ${styles.desk}`}
    >
      <SkipLink />
      <MenuBar />
      <div className={styles.stage}>
        <div className={styles.frame}>
          <main id="main-content" className={styles.card}>
            <ViewTransition name="stack-card">
              <div>{children}</div>
            </ViewTransition>
          </main>
        </div>
        <StackNav />
        <footer className={styles.colophon}>
          {personalInfo.business.name} · CVR {personalInfo.business.cvr}
        </footer>
      </div>
      <MessageBox />
    </div>
  );
}
