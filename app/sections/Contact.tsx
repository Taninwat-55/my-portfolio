"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Mail, Github, Linkedin } from "lucide-react";
import { personalInfo, siteContent } from "../data";

const EASE = [0.22, 1, 0.36, 1] as const;

// ── Animated link row ─────────────────────────────────────────────────────────

function ContactLink({
  icon,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  value: string;
  href: string;
  external: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion() ?? false;

  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={reduced ? {} : { paddingLeft: hovered ? 16 : 4 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="flex items-center justify-between gap-4 border-t border-border py-5"
    >
      <div className="flex items-center gap-4">
        <span className={`shrink-0 transition-colors duration-300 ${hovered ? "text-clay-500" : "text-ink-300"}`}>
          {icon}
        </span>
        <span
          className={`text-xl md:text-2xl font-sans font-semibold tracking-tight transition-colors duration-300 ${
            hovered ? "text-clay-500" : "text-ink-900"
          }`}
        >
          {value}
        </span>
      </div>
      <ArrowUpRight
        size={20}
        className={`shrink-0 transition-all duration-300 ${
          hovered ? "text-clay-500 translate-x-0.5 -translate-y-0.5" : "text-ink-300"
        }`}
      />
    </motion.a>
  );
}

// ── Contact form ──────────────────────────────────────────────────────────────

type FormFields = { name: string; email: string; message: string };
type FormErrors = Partial<FormFields>;

function ContactForm() {
  const [form, setForm] = useState<FormFields>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const update =
    (key: keyof FormFields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Tell me your name";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = "Need a valid email";
    if (form.message.trim().length < 8) e.message = "A little more detail?";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setErrors({ message: "Something went wrong — try emailing me directly." });
    } finally {
      setSubmitting(false);
    }
  };

  const fieldBase =
    "w-full border border-border rounded-xl px-4 py-3 bg-sand-100 text-ink-900 text-sm focus:outline-none focus:ring-2 focus:ring-clay-300 transition-shadow placeholder:text-ink-300";
  const fieldError = "border-red-300 focus:ring-red-200";

  if (sent) {
    return (
      <div className="border border-border rounded-2xl p-8 bg-sand-50 text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-clay-100 border border-clay-300/40 flex items-center justify-center mb-4">
          <Check size={20} className="text-clay-600" strokeWidth={2.5} />
        </div>
        <h3 className="text-lg font-semibold text-ink-900 mb-2">Message sent!</h3>
        <p className="text-sm text-ink-500 leading-relaxed">
          Or reach me directly at{" "}
          <a href={`mailto:${personalInfo.email}`} className="text-clay-500 hover:underline">
            {personalInfo.email}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="border border-border rounded-2xl p-7 bg-sand-50 flex flex-col gap-5"
    >
      <div>
        <input
          type="text"
          placeholder="Your name"
          value={form.name}
          onChange={update("name")}
          className={`${fieldBase} ${errors.name ? fieldError : ""}`}
        />
        {errors.name && (
          <p className="mt-1.5 text-[11px] font-mono text-red-500">{errors.name}</p>
        )}
      </div>

      <div>
        <input
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={update("email")}
          className={`${fieldBase} ${errors.email ? fieldError : ""}`}
        />
        {errors.email && (
          <p className="mt-1.5 text-[11px] font-mono text-red-500">{errors.email}</p>
        )}
      </div>

      <div>
        <textarea
          placeholder="What's on your mind?"
          value={form.message}
          onChange={update("message")}
          rows={5}
          className={`${fieldBase} resize-none ${errors.message ? fieldError : ""}`}
        />
        {errors.message && (
          <p className="mt-1.5 text-[11px] font-mono text-red-500">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-full bg-clay-500 text-white text-sm font-medium hover:bg-clay-600 transition-colors disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export function Contact() {
  const links = [
    { icon: <Mail size={18} />, value: personalInfo.email, href: `mailto:${personalInfo.email}`, external: false },
    { icon: <Github size={18} />, value: "@Taninwat-55", href: personalInfo.socials.github, external: true },
    { icon: <Linkedin size={18} />, value: "taninwat-k", href: personalInfo.socials.linkedin, external: true },
  ];

  return (
    <section id="contact" aria-label="Contact" className="py-24 md:py-32 border-t border-border">
      <div className="container mx-auto px-6 max-w-5xl">

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-sm font-medium text-clay-500 tracking-widest uppercase mb-12"
        >
          Contact
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-16 md:gap-20">

          {/* Left: headline + animated links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[0.97] text-ink-900 mb-5">
              {siteContent.contactHeading}
            </h2>
            <p className="text-base text-ink-500 leading-relaxed mb-8 max-w-sm">
              {siteContent.contactBody}
            </p>

            <div>
              {links.map((link) => (
                <ContactLink key={link.value} {...link} />
              ))}
              <div className="border-b border-border" />
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
          >
            <ContactForm />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
