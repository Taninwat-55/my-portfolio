import type { Metadata } from "next";
import Link from "next/link";
import { aboutPage, contactPage, founding, foundingOpen, foundingSpotsLine, foundingTerms, personalInfo } from "@/app/data";
import { EnquiryForm } from "@/app/world/EnquiryForm";
import { GridLines } from "@/app/world/GridLines";
import { WorldFooter } from "@/app/world/WorldFooter";
import { WorldNav } from "@/app/world/WorldNav";
import { WorldShell } from "@/app/world/WorldShell";
import styles from "@/app/world/page.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Ice (Taninwat Kaewpankan), full-stack engineer in Copenhagen: email and LinkedIn for roles, and a project enquiry form for websites at fixed prices.",
  alternates: { canonical: "https://taninwatkaewpankan.xyz/contact" },
};

/**
 * Contact, in the Crystallize world (2026-10-25). One page for both
 * audiences (Ice's call): the direct lines for a role first, then the
 * project enquiry form, which replaced the Stack's /build card (/build and
 * /build?like= redirect here with the query intact).
 */
export default function ContactPage() {
  // Shown as the address itself, derived so it can never disagree with the link.
  const bare = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  const lines = [
    { label: "Email", href: `mailto:${personalInfo.email}`, text: personalInfo.email },
    { label: "LinkedIn", href: personalInfo.socials.linkedin, text: bare(personalInfo.socials.linkedin), external: true },
    { label: "GitHub", href: personalInfo.socials.github, text: bare(personalInfo.socials.github), external: true },
  ];

  return (
    <WorldShell>
      <main id="main-content">
        <header className={styles.head}>
          <GridLines />
          <WorldNav className={styles.nav} />
          <p className={styles.kicker}>Contact</p>
          <h1 className={styles.title}>Get in touch</h1>
          <p className={styles.lead}>{contactPage.lead}</p>
          <dl className={styles.facts}>
            <div>
              <dt>Based</dt>
              <dd>{personalInfo.location}</dd>
            </div>
            <div>
              <dt>Open to</dt>
              <dd>Full-time roles and client projects</dd>
            </div>
          </dl>
        </header>

        <section className={styles.section} aria-labelledby="role-title">
          <h2 id="role-title" className={styles.label}>
            {contactPage.role.title}
          </h2>
          <div className={`${styles.content} ${styles.narrow}`}>
            <div className={styles.prose}>
              <p>{contactPage.role.body}</p>
            </div>
            <dl className={styles.facts}>
              {lines.map((l) => (
                <div key={l.label}>
                  <dt>{l.label}</dt>
                  <dd>
                    <a href={l.href} {...(l.external ? { target: "_blank", rel: "me noopener" } : {})}>
                      {l.text}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
            <ul className={styles.actions}>
              <li>
                <a className={styles.button} href={`mailto:${personalInfo.email}`}>
                  Email me <span aria-hidden="true">→</span>
                </a>
              </li>
              <li>
                <Link className={styles.buttonQuiet} href={aboutPage.cv.href}>
                  {aboutPage.cv.label} <span aria-hidden="true">→</span>
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <section id="enquire" className={styles.section} aria-labelledby="project-title">
          <h2 id="project-title" className={styles.label}>
            {contactPage.project.title}
          </h2>
          <div className={styles.content}>
            <div className={styles.prose}>
              <p>{contactPage.project.body}</p>
              <p>{contactPage.project.price}</p>
              {foundingOpen && (
                <p>
                  <strong>{founding.label}.</strong> {foundingTerms} {foundingSpotsLine}
                </p>
              )}
              <p>
                <Link href="/services">Prices and what is included</Link> ·{" "}
                <Link href="/showroom">Sample sites and what each would cost</Link>
              </p>
            </div>
            <div style={{ marginTop: "calc(var(--unit) * 5)" }}>
              {/* ?like= from a Showroom concept fills it in after mount. */}
              <EnquiryForm />
            </div>
          </div>
        </section>
      </main>
      <WorldFooter />
    </WorldShell>
  );
}
