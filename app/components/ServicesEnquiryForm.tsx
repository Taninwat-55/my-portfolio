"use client";

import { useRef, useState } from "react";
import { Check, ChevronDown, Send, Loader2 } from "lucide-react";
import { personalInfo, servicesEnquiryOptions } from "../data";
import {
  validateEnquiry,
  EMPTY_ENQUIRY,
  FIELD_LIMITS,
  type EnquiryFields,
  type EnquiryErrors,
} from "../lib/services-enquiry";

/**
 * Project enquiry form for /services.
 *
 * Deliberately not the recruiter contact path: HireModal offers a CV download,
 * which is the wrong artefact to put in front of someone deciding whether to
 * pay for a website. This asks the questions that make a reply useful — what
 * kind of project, roughly what budget, roughly when.
 *
 * Validation lives in app/lib/services-enquiry.ts and is shared with the route
 * handler, so the client and the server never disagree about what is valid.
 */

type Status = "idle" | "submitting" | "sent" | "failed";

const LABEL =
  "block font-mono text-[10px] tracking-[0.22em] uppercase text-frost/50 mb-2";

const OPTIONAL = "ml-2 font-sans normal-case tracking-normal text-frost/25";

const FIELD_BASE =
  "w-full rounded-xl border bg-white/3 px-4 py-3 text-[15px] text-frost " +
  "placeholder:text-frost/30 transition-colors " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-crystal-500 " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-night-900 " +
  "disabled:opacity-50 disabled:cursor-not-allowed";

const FIELD_OK = "border-frost/15 hover:border-frost/25";

const FIELD_ERR = "border-clay-500/70 focus-visible:ring-clay-400";

// appearance-none plus explicit option colours. Without the [&>option] rules the
// OS-drawn menu on Windows Chrome inherits the page background and renders
// near-white text on near-white.
const SELECT_EXTRA =
  "appearance-none pr-11 cursor-pointer [&>option]:bg-night-800 [&>option]:text-frost";

const ERROR_TEXT = "mt-2 font-mono text-[11px] leading-relaxed text-clay-400";

const HINT_TEXT = "mt-2 text-[12px] leading-relaxed text-frost/40";

const fieldClass = (invalid: boolean, extra = "") =>
  `${FIELD_BASE} ${invalid ? FIELD_ERR : FIELD_OK} ${extra}`;

/** Order matters — the error summary lists problems in the order they appear. */
const FIELD_ORDER: (keyof EnquiryFields)[] = [
  "name",
  "email",
  "company",
  "projectType",
  "budget",
  "timeline",
  "message",
];

const FIELD_LABELS: Record<keyof EnquiryFields, string> = {
  name: "Your name",
  email: "Email",
  company: "Business or company",
  projectType: "What do you need?",
  budget: "Rough budget",
  timeline: "When do you need it?",
  message: "About the project",
};

export function ServicesEnquiryForm() {
  const [form, setForm] = useState<EnquiryFields>(EMPTY_ENQUIRY);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);

  // Uncontrolled on purpose: a bot fills it, a person never sees it, and it
  // should not cause a single re-render.
  const honeypotRef = useRef<HTMLInputElement>(null);
  // Ref rather than state so the timestamp is stable without a mount effect.
  const startedAtRef = useRef<number>(Date.now());
  const summaryRef = useRef<HTMLDivElement>(null);
  const sentRef = useRef<HTMLDivElement>(null);

  const update =
    (key: keyof EnquiryFields) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { value } = e.target;
      setForm((prev) => ({ ...prev, [key]: value }));
      // Clear this field's error as soon as it is touched. Re-running the whole
      // validator on every keystroke shouts at fields the visitor has not
      // reached yet.
      setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
    };

  const focusSummary = () =>
    requestAnimationFrame(() => summaryRef.current?.focus());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    const found = validateEnquiry(form);
    setErrors(found);
    setFormError(null);

    if (Object.keys(found).length > 0) {
      // Focus the summary rather than the first bad field: a screen reader then
      // reads every problem at once instead of one, and sighted users see the
      // full list.
      focusSummary();
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/services-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          website: honeypotRef.current?.value ?? "",
          elapsedMs: Date.now() - startedAtRef.current,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus("sent");
        requestAnimationFrame(() => sentRef.current?.focus());
        return;
      }

      // The server disagreed with our validation — surface its verdict rather
      // than a generic failure.
      if (res.status === 400 && data.fields) {
        setErrors(data.fields as EnquiryErrors);
        setStatus("idle");
        focusSummary();
        return;
      }

      throw new Error(typeof data.error === "string" ? data.error : "");
    } catch (err) {
      // Recoverable, unlike the chat widget's old sticky error: the button
      // re-enables and the message always names the address that still works.
      setStatus("failed");
      setFormError(
        (err as Error).message ||
          `Could not send that. Email me directly at ${personalInfo.email}.`
      );
      focusSummary();
    }
  };

  if (status === "sent") {
    return (
      <div
        ref={sentRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col items-center gap-4 py-8 text-center focus:outline-none"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-crystal-500/30 bg-crystal-500/10">
          <Check size={22} strokeWidth={1.6} className="text-crystal-300" />
        </div>
        <p className="text-lg font-medium text-frost">That is with me.</p>
        <p className="max-w-sm text-sm font-light leading-relaxed text-frost/60">
          I read every enquiry myself and reply to all of them, including the
          ones I am not the right person for. If it is urgent, write to{" "}
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-frost/80 underline underline-offset-4 transition-colors hover:text-crystal-300"
          >
            {personalInfo.email}
          </a>
          .
        </p>
      </div>
    );
  }

  const errorList = FIELD_ORDER.filter((key) => errors[key]);
  const showSummary = errorList.length > 0 || formError;
  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate aria-busy={submitting}>
      {showSummary && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="mb-6 rounded-2xl border border-clay-500/40 bg-clay-500/10 px-4 py-3.5 text-[13px] leading-relaxed text-clay-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-clay-400"
        >
          {formError ? (
            <p>{formError}</p>
          ) : (
            <>
              <p className="mb-2 font-medium">
                {errorList.length === 1
                  ? "One thing to fix:"
                  : `${errorList.length} things to fix:`}
              </p>
              <ul className="space-y-1">
                {errorList.map((key) => (
                  <li key={key}>
                    <a
                      href={`#enquiry-${key}`}
                      className="underline underline-offset-4 hover:text-clay-200"
                    >
                      {FIELD_LABELS[key]}
                    </a>{" "}
                    — {errors[key]}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      {/* Honeypot. Positioned off-screen rather than sr-only: screen readers
          announce sr-only content, which would ask a blind visitor to fill in
          the trap. */}
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] top-0 h-px w-px overflow-hidden"
      >
        <label htmlFor="enquiry-website">Website</label>
        <input
          ref={honeypotRef}
          id="enquiry-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label htmlFor="enquiry-name" className={LABEL}>
            {FIELD_LABELS.name}
          </label>
          <input
            id="enquiry-name"
            name="name"
            type="text"
            autoComplete="name"
            aria-required="true"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "enquiry-name-error" : undefined}
            value={form.name}
            onChange={update("name")}
            disabled={submitting}
            className={fieldClass(Boolean(errors.name))}
          />
          {errors.name && (
            <p id="enquiry-name-error" className={ERROR_TEXT}>
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="enquiry-email" className={LABEL}>
            {FIELD_LABELS.email}
          </label>
          <input
            id="enquiry-email"
            name="email"
            type="email"
            autoComplete="email"
            aria-required="true"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "enquiry-email-error" : undefined}
            value={form.email}
            onChange={update("email")}
            disabled={submitting}
            className={fieldClass(Boolean(errors.email))}
          />
          {errors.email && (
            <p id="enquiry-email-error" className={ERROR_TEXT}>
              {errors.email}
            </p>
          )}
        </div>

        {/* Company */}
        <div className="sm:col-span-2">
          <label htmlFor="enquiry-company" className={LABEL}>
            {FIELD_LABELS.company}
            <span className={OPTIONAL}>optional</span>
          </label>
          <input
            id="enquiry-company"
            name="company"
            type="text"
            autoComplete="organization"
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={
              errors.company ? "enquiry-company-error" : undefined
            }
            value={form.company}
            onChange={update("company")}
            disabled={submitting}
            className={fieldClass(Boolean(errors.company))}
          />
          {errors.company && (
            <p id="enquiry-company-error" className={ERROR_TEXT}>
              {errors.company}
            </p>
          )}
        </div>

        {/* Project type */}
        <div className="sm:col-span-2">
          <label htmlFor="enquiry-projectType" className={LABEL}>
            {FIELD_LABELS.projectType}
          </label>
          <div className="relative">
            <select
              id="enquiry-projectType"
              name="projectType"
              aria-required="true"
              aria-invalid={errors.projectType ? true : undefined}
              aria-describedby={
                errors.projectType ? "enquiry-projectType-error" : undefined
              }
              value={form.projectType}
              onChange={update("projectType")}
              disabled={submitting}
              className={fieldClass(Boolean(errors.projectType), SELECT_EXTRA)}
            >
              <option value="">Choose one…</option>
              {servicesEnquiryOptions.projectType.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              strokeWidth={1.5}
              aria-hidden
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-frost/35"
            />
          </div>
          {errors.projectType && (
            <p id="enquiry-projectType-error" className={ERROR_TEXT}>
              {errors.projectType}
            </p>
          )}
        </div>

        {/* Budget */}
        <div>
          <label htmlFor="enquiry-budget" className={LABEL}>
            {FIELD_LABELS.budget}
          </label>
          <div className="relative">
            <select
              id="enquiry-budget"
              name="budget"
              aria-required="true"
              aria-invalid={errors.budget ? true : undefined}
              aria-describedby="enquiry-budget-hint enquiry-budget-error"
              value={form.budget}
              onChange={update("budget")}
              disabled={submitting}
              className={fieldClass(Boolean(errors.budget), SELECT_EXTRA)}
            >
              <option value="">Choose one…</option>
              {servicesEnquiryOptions.budget.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              strokeWidth={1.5}
              aria-hidden
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-frost/35"
            />
          </div>
          {errors.budget ? (
            <p id="enquiry-budget-error" className={ERROR_TEXT}>
              {errors.budget}
            </p>
          ) : (
            <p id="enquiry-budget-hint" className={HINT_TEXT}>
              A rough band is fine — it just tells me what is realistic.
            </p>
          )}
        </div>

        {/* Timeline */}
        <div>
          <label htmlFor="enquiry-timeline" className={LABEL}>
            {FIELD_LABELS.timeline}
          </label>
          <div className="relative">
            <select
              id="enquiry-timeline"
              name="timeline"
              aria-required="true"
              aria-invalid={errors.timeline ? true : undefined}
              aria-describedby={
                errors.timeline ? "enquiry-timeline-error" : undefined
              }
              value={form.timeline}
              onChange={update("timeline")}
              disabled={submitting}
              className={fieldClass(Boolean(errors.timeline), SELECT_EXTRA)}
            >
              <option value="">Choose one…</option>
              {servicesEnquiryOptions.timeline.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              strokeWidth={1.5}
              aria-hidden
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-frost/35"
            />
          </div>
          {errors.timeline && (
            <p id="enquiry-timeline-error" className={ERROR_TEXT}>
              {errors.timeline}
            </p>
          )}
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <label htmlFor="enquiry-message" className={LABEL}>
            {FIELD_LABELS.message}
          </label>
          <textarea
            id="enquiry-message"
            name="message"
            rows={6}
            maxLength={FIELD_LIMITS.message}
            aria-required="true"
            aria-invalid={errors.message ? true : undefined}
            aria-describedby="enquiry-message-hint enquiry-message-error"
            value={form.message}
            onChange={update("message")}
            disabled={submitting}
            placeholder="What does the business do, and what do you need built?"
            className={fieldClass(
              Boolean(errors.message),
              "resize-y min-h-36 leading-relaxed"
            )}
          />
          {errors.message ? (
            <p id="enquiry-message-error" className={ERROR_TEXT}>
              {errors.message}
            </p>
          ) : (
            <p id="enquiry-message-hint" className={HINT_TEXT}>
              A few sentences is plenty. Links to anything existing help.
            </p>
          )}
        </div>
      </div>

      <div className="mt-7">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-frost px-6 py-3.5 text-sm font-medium text-night-900 transition-colors hover:bg-crystal-300 disabled:opacity-60 disabled:hover:bg-frost focus:outline-none focus-visible:ring-2 focus-visible:ring-crystal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-night-900"
        >
          {submitting ? (
            <>
              <Loader2 size={16} strokeWidth={1.8} className="animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send enquiry
              <Send size={15} strokeWidth={1.8} />
            </>
          )}
        </button>
        {submitting && (
          <span role="status" className="sr-only">
            Sending your enquiry
          </span>
        )}
      </div>
    </form>
  );
}
