import Link from "next/link";
import { siteContent, stackContent } from "../../data";
import { Menu } from "./Menu";
import styles from "./stack.module.css";

/**
 * The stack's menu bar. Menus are <details> (Menu.tsx) so they open without
 * JavaScript; each item is a plain link. The pixel face at the left is the stack's icon
 * (app/icon.png, drawn in scripts/dither-images.mjs) and goes home, the way
 * the Apple menu sat at the left of every Mac menu bar.
 */
export function MenuBar() {
  return (
    <header className={styles.menubar}>
      <Link href="/" className={styles.stackIcon} aria-label={`${stackContent.name}, home card`}>
        {/* eslint-disable-next-line @next/next/no-img-element -- a 32px pixel icon; next/image would smooth it */}
        <img src="/icon.png" alt="" width={32} height={32} />
        <span>{stackContent.name}</span>
      </Link>
      <nav aria-label="Stack menus" style={{ display: "contents" }}>
        {stackContent.menus.map((menu) => (
          <Menu key={menu.label} className={styles.menu}>
            <summary>{menu.label}</summary>
            <ul className={styles.menuList}>
              {menu.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </Menu>
        ))}
      </nav>
      <nav aria-label="Languages" className={styles.langs}>
        {siteContent.languages.map((lang) => (
          <a
            key={lang.code}
            href={lang.href}
            hrefLang={lang.code}
            lang={lang.code}
            aria-current={lang.code === "en" ? "true" : undefined}
            aria-label={lang.label}
          >
            {/* The endonym where there is room; the code on a phone's bar. */}
            <span className={styles.langLong}>{lang.label}</span>
            <span className={styles.langShort} aria-hidden="true">
              {lang.code.toUpperCase()}
            </span>
          </a>
        ))}
      </nav>
    </header>
  );
}
