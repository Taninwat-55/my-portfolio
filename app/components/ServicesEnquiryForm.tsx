"use client";

import { useRef, useState } from "react";
import { Check, ChevronDown, Send, Loader2 } from "lucide-react";
import { personalInfo, servicesEnquiryOptions } from "../data";
import {
  validateEnquiry,
  EMPTY_ENQUIRY,
  FIELD_LIMITS,
  ENQUIRY_MESSAGES_EN,
  type EnquiryFields,
  type EnquiryErrors,
  type EnquiryMessages,
} from "../lib/services-enquiry";

/**
 * Project enquiry form for /services.
 *
 * Deliberately not the recruiter contact path (that is /contact and the CV): a
 * CV is the wrong artefact to put in front of someone deciding whether to pay
 * for a website. This asks the questions that make a reply useful: what kind of
 * project, roughly what budget, roughly when.
 *
 * Validation lives in app/lib/services-enquiry.ts and is shared with the route
 * handler, so the client and the server never disagree about what is valid.
 *
 * Every visible string is injectable via `copy`, defaulting to English, so /th can
 * render this form in Thai without a second copy of it existing. Duplicating the
 * form would have duplicated the validation, the honeypot, the error summary and
 * the POST — four things that must not have two versions.
 */

/**
 * All plain strings, with {tokens} instead of functions, so the whole object can
 * be handed straight from a Server Component to this Client Component. Functions
 * cannot cross that boundary.
 */
export type EnquiryCopy = {
  labels: Record<keyof EnquiryFields, string>;
  /**
   * Overrides the visible <option> text, keyed by the option VALUE.
   *
   * 🔒 Values themselves are never translated. app/lib/services-enquiry.ts builds
   * its server-side allowlist from servicesEnquiryOptions, so a translated value
   * would make the endpoint reject every submission from the translated form.
   * Anything missing here falls back to the English label.
   */
  optionLabels?: Partial<
    Record<"projectType" | "budget" | "timeline", Record<string, string>>
  >;
  chooseOne: string;
  honeypotLabel: string;
  budgetHint: string;
  messageHint: string;
  messagePlaceholder: string;
  submit: string;
  submitting: string;
  submittingSr: string;
  sentTitle: string;
  sentBody: string;
  sentUrgentPrefix: string;
  fixOne: string;
  /** Contains the literal token {n}. */
  fixMany: string;
  /** Contains the literal token {email}. */
  sendFailed: string;
  messages: EnquiryMessages;
};

export const ENQUIRY_COPY_EN: EnquiryCopy = {
  labels: {
    name: "Your name",
    email: "Email",
    company: "Business or company",
    projectType: "What do you need?",
    budget: "Rough budget",
    timeline: "When do you need it?",
    message: "About the project",
  },
  chooseOne: "Choose one…",
  honeypotLabel: "Website",
  budgetHint: "A rough band is fine — it just tells me what is realistic.",
  messageHint: "A few sentences is plenty. Links to anything existing help.",
  messagePlaceholder: "What does the business do, and what do you need built?",
  submit: "Send enquiry",
  submitting: "Sending…",
  submittingSr: "Sending your enquiry",
  sentTitle: "That is with me.",
  sentBody:
    "I read every enquiry myself and reply to all of them, including the ones I am not the right person for.",
  sentUrgentPrefix: "If it is urgent, write to",
  fixOne: "One thing to fix:",
  fixMany: "{n} things to fix:",
  sendFailed: "Could not send that. Email me directly at {email}.",
  messages: ENQUIRY_MESSAGES_EN,
};

type Status = "idle" | "submitting" | "sent" | "failed";

/**
 * The form's look: paper on the desk, the only one since the re-theme
 * (Phase 6 removed the old dark "night" tone once no page used it).
 */
// Errors in #8f461c, a darker clay: 6.3:1 on paper (clay-600 is 4.55).
const PAPER = {
  // No letter-spacing in Thai: tracking pulls a Thai word apart into letters.
  label:
    "block font-mono text-[11px] tracking-[0.18em] uppercase text-paper-ink mb-2 [:lang(th)_&]:tracking-normal",
  optional: "ml-2 font-sans normal-case tracking-normal text-paper-soft",
  fieldBase:
    "w-full rounded-md border bg-paper px-4 py-3 text-[15px] text-paper-ink " +
    "placeholder:text-paper-soft transition-colors " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-paper-link " +
    "focus-visible:ring-offset-2 focus-visible:ring-offset-paper " +
    "disabled:opacity-50 disabled:cursor-not-allowed",
  fieldOk: "border-paper-rule hover:border-paper-soft",
  fieldErr: "border-[#8f461c] focus-visible:ring-[#8f461c]",
  // appearance-none plus explicit option colours. Without the [&>option] rules the
  // OS-drawn menu on Windows Chrome inherits the page background, and the text
  // can end up unreadable against it.
  selectExtra:
    "appearance-none pr-11 cursor-pointer [&>option]:bg-paper [&>option]:text-paper-ink",
  error: "mt-2 font-mono text-[11px] leading-relaxed text-[#8f461c]",
  hint: "mt-2 text-[12px] leading-relaxed text-paper-soft",
  chevron: "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-paper-soft",
  summary:
    "mb-6 rounded-md border border-[#8f461c]/50 bg-[#8f461c]/8 px-4 py-3.5 text-[13px] leading-relaxed text-[#8f461c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8f461c]",
  summaryLink: "underline underline-offset-4 hover:text-paper-ink",
  sentIcon:
    "flex h-12 w-12 items-center justify-center rounded-full border border-paper-rule bg-paper-dim",
  sentIconSvg: "text-paper-ink",
  sentTitle: "text-lg font-medium text-paper-ink",
  sentBody: "max-w-sm text-sm leading-relaxed text-paper-soft",
  sentLink: "text-paper-link underline underline-offset-4",
  submit:
    "inline-flex w-full items-center justify-center gap-2 rounded-full bg-paper-ink px-6 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-[#2c3a48] disabled:opacity-60 disabled:hover:bg-paper-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-paper-link focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
  } as const;


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

export function ServicesEnquiryForm({
  copy = ENQUIRY_COPY_EN,
}: {
  copy?: EnquiryCopy;
} = {}) {
  const t = PAPER;
  const fieldClass = (invalid: boolean, extra = "") =>
    `${t.fieldBase} ${invalid ? t.fieldErr : t.fieldOk} ${extra}`;
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

    const found = validateEnquiry(form, copy.messages);
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
          copy.sendFailed.replace("{email}", personalInfo.email)
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
        <div className={t.sentIcon}>
          <Check size={22} strokeWidth={1.6} className={t.sentIconSvg} />
        </div>
        <p className={t.sentTitle}>{copy.sentTitle}</p>
        <p className={t.sentBody}>
          {copy.sentBody} {copy.sentUrgentPrefix}{" "}
          <a
            href={`mailto:${personalInfo.email}`}
            className={t.sentLink}
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
          className={t.summary}
        >
          {formError ? (
            <p>{formError}</p>
          ) : (
            <>
              <p className="mb-2 font-medium">
                {errorList.length === 1
                  ? copy.fixOne
                  : copy.fixMany.replace("{n}", String(errorList.length))}
              </p>
              <ul className="space-y-1">
                {errorList.map((key) => (
                  <li key={key}>
                    <a
                      href={`#enquiry-${key}`}
                      className={t.summaryLink}
                    >
                      {copy.labels[key]}
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
        <label htmlFor="enquiry-website">{copy.honeypotLabel}</label>
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
          <label htmlFor="enquiry-name" className={t.label}>
            {copy.labels.name}
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
            <p id="enquiry-name-error" className={t.error}>
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="enquiry-email" className={t.label}>
            {copy.labels.email}
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
            <p id="enquiry-email-error" className={t.error}>
              {errors.email}
            </p>
          )}
        </div>

        {/* Company */}
        <div className="sm:col-span-2">
          <label htmlFor="enquiry-company" className={t.label}>
            {copy.labels.company}
            <span className={t.optional}>optional</span>
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
            <p id="enquiry-company-error" className={t.error}>
              {errors.company}
            </p>
          )}
        </div>

        {/* Project type */}
        <div className="sm:col-span-2">
          <label htmlFor="enquiry-projectType" className={t.label}>
            {copy.labels.projectType}
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
              className={fieldClass(Boolean(errors.projectType), t.selectExtra)}
            >
              <option value="">{copy.chooseOne}</option>
              {servicesEnquiryOptions.projectType.map((option) => (
                <option key={option.value} value={option.value}>
                  {copy.optionLabels?.projectType?.[option.value] ?? option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              strokeWidth={1.5}
              aria-hidden
              className={t.chevron}
            />
          </div>
          {errors.projectType && (
            <p id="enquiry-projectType-error" className={t.error}>
              {errors.projectType}
            </p>
          )}
        </div>

        {/* Budget */}
        <div>
          <label htmlFor="enquiry-budget" className={t.label}>
            {copy.labels.budget}
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
              className={fieldClass(Boolean(errors.budget), t.selectExtra)}
            >
              <option value="">{copy.chooseOne}</option>
              {servicesEnquiryOptions.budget.map((option) => (
                <option key={option.value} value={option.value}>
                  {copy.optionLabels?.budget?.[option.value] ?? option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              strokeWidth={1.5}
              aria-hidden
              className={t.chevron}
            />
          </div>
          {errors.budget ? (
            <p id="enquiry-budget-error" className={t.error}>
              {errors.budget}
            </p>
          ) : (
            <p id="enquiry-budget-hint" className={t.hint}>
              {copy.budgetHint}
            </p>
          )}
        </div>

        {/* Timeline */}
        <div>
          <label htmlFor="enquiry-timeline" className={t.label}>
            {copy.labels.timeline}
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
              className={fieldClass(Boolean(errors.timeline), t.selectExtra)}
            >
              <option value="">{copy.chooseOne}</option>
              {servicesEnquiryOptions.timeline.map((option) => (
                <option key={option.value} value={option.value}>
                  {copy.optionLabels?.timeline?.[option.value] ?? option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              strokeWidth={1.5}
              aria-hidden
              className={t.chevron}
            />
          </div>
          {errors.timeline && (
            <p id="enquiry-timeline-error" className={t.error}>
              {errors.timeline}
            </p>
          )}
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <label htmlFor="enquiry-message" className={t.label}>
            {copy.labels.message}
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
            placeholder={copy.messagePlaceholder}
            className={fieldClass(
              Boolean(errors.message),
              "resize-y min-h-36 leading-relaxed"
            )}
          />
          {errors.message ? (
            <p id="enquiry-message-error" className={t.error}>
              {errors.message}
            </p>
          ) : (
            <p id="enquiry-message-hint" className={t.hint}>
              {copy.messageHint}
            </p>
          )}
        </div>
      </div>

      <div className="mt-7">
        <button
          type="submit"
          disabled={submitting}
          className={t.submit}
        >
          {submitting ? (
            <>
              <Loader2 size={16} strokeWidth={1.8} className="animate-spin" />
              {copy.submitting}
            </>
          ) : (
            <>
              {copy.submit}
              <Send size={15} strokeWidth={1.8} />
            </>
          )}
        </button>
        {submitting && (
          <span role="status" className="sr-only">
            {copy.submittingSr}
          </span>
        )}
      </div>
    </form>
  );
}
