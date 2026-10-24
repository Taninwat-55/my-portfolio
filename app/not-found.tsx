import type { Metadata } from "next";
import Link from "next/link";
import StackLayout from "./(stack)/layout";
import stack from "./components/stack/stack.module.css";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

const ways = [
  { href: "/work", label: "All cards" },
  { href: "/build", label: "Build mine" },
];

/**
 * The 404 card. Next renders not-found at the root, outside the (stack)
 * route group, so it wraps itself in the stack layout to keep the menu bar,
 * nav bar and message box: a lost visitor lands in the same world, one click
 * from anything.
 */
export default function NotFound() {
  return (
    <StackLayout>
      <div>
        <h1 className={stack.title}>No such card</h1>
        <p className={stack.lead}>
          The link may be old, or the card has moved. Here is where most things are.
        </p>
        <div className={stack.buttons}>
          <Link href="/" className={`${stack.btn} ${stack.btnDefault}`}>
            Home card
          </Link>
          {ways.map((way) => (
            <Link key={way.href} href={way.href} className={stack.btn}>
              {way.label}
            </Link>
          ))}
        </div>
      </div>
    </StackLayout>
  );
}
