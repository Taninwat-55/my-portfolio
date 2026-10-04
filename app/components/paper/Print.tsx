import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./paper.module.css";

interface PrintBase {
  image: string;
  /** Empty when the caption already says what the photo is. */
  alt?: string;
  sizes: string;
  /** A slight turn in degrees. */
  tilt?: number;
  /**
   * Wraps the photo in a named <ViewTransition>. Give it `case-hero-${id}` and
   * following the print grows its photo into that case study's hero, as the
   * clock's prints do. A name must be unique on the page.
   */
  transitionName?: string;
  /** Photo aspect ratio as CSS, e.g. "16 / 10". The clock's prints are 4 / 5. */
  ratio?: string;
}

// A linked print needs a caption: with an empty alt, the caption is the only
// thing that gives the link a name.
type PrintProps = PrintBase &
  (
    | {
        /** Makes the whole print a link. */
        href: string;
        /** Handwritten under the photo. */
        caption: string;
      }
    | {
        href?: undefined;
        /** Handwritten under the photo. Leave out for a bare photo. */
        caption?: string;
      }
  );

/** A photo print lying on the desk: paper border, photo, handwritten caption. */
export function Print({
  image,
  caption,
  alt = "",
  sizes,
  href,
  tilt = 0,
  transitionName,
  ratio,
}: PrintProps) {
  const style = {
    ...(tilt ? { "--tilt": `${tilt}deg` } : {}),
    ...(ratio ? { "--ratio": ratio } : {}),
  } as React.CSSProperties;

  const photo = (
    <span className={styles.printPhoto}>
      <Image src={image} alt={alt} fill sizes={sizes} />
    </span>
  );

  const content = (
    <>
      {transitionName ? <ViewTransition name={transitionName}>{photo}</ViewTransition> : photo}
      {caption &&
        (href ? (
          <span className={styles.printCaption}>{caption}</span>
        ) : (
          <figcaption className={styles.printCaption}>{caption}</figcaption>
        ))}
    </>
  );

  return href ? (
    <Link href={href} className={styles.print} style={style}>
      {content}
    </Link>
  ) : (
    <figure className={styles.print} style={style}>
      {content}
    </figure>
  );
}
