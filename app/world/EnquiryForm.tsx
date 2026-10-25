"use client";

import { useSearchParams } from "next/navigation";
import { cases, conceptPrice, inShowroom, personalInfo, servicesEnquiryOptions } from "@/app/data";
import { ENQUIRY_COPY_EN } from "@/app/lib/enquiry-copy";
import { FIELD_LIMITS, type EnquiryFields } from "@/app/lib/services-enquiry";
import { useEnquiryForm } from "@/app/lib/useEnquiryForm";
import styles from "./form.module.css";

type Choice = "projectType" | "budget" | "timeline";

const copy = ENQUIRY_COPY_EN;

/**
 * The project enquiry, in the Crystallize world (2026-10-25; it replaced the
 * Stack's BlankCard). Same fields, option values, validation, traps and
 * endpoint as before, all through useEnquiryForm, so /api/services-enquiry's
 * allowlist applies unchanged; only the look is new. The three choices are
 * radio groups, so every option is visible without opening a menu.
 */
export function EnquiryForm({ initial }: { initial?: Partial<EnquiryFields> }) {
  const {
    form,
    errors,
    formError,
    status,
    submitting,
    errorList,
    update,
    setField,
    handleSubmit,
    honeypotRef,
    summaryRef,
    sentRef,
  } = useEnquiryForm(copy, initial);

  if (status === "sent") {
    return (
      <div ref={sentRef} tabIndex={-1} role="status" className={styles.sent}>
        <h3 className={styles.sentTitle}>{copy.sentTitle}</h3>
        <p>
          {copy.sentBody} {copy.sentUrgentPrefix} <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>.
        </p>
      </div>
    );
  }

  const field = (key: keyof EnquiryFields) => ({
    id: `enquiry-${key}`,
    name: key,
    value: form[key],
    onChange: update(key),
    disabled: submitting,
    className: styles.input,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `enquiry-${key}-error` : key === "message" ? "enquiry-message-hint" : undefined,
  });

  const errorFor = (key: keyof EnquiryFields) =>
    errors[key] ? (
      <p id={`enquiry-${key}-error`} className={styles.error}>
        {errors[key]}
      </p>
    ) : null;

  const group = (key: Choice, hint?: string) => (
    <fieldset
      className={styles.group}
      aria-invalid={errors[key] ? true : undefined}
      aria-describedby={errors[key] ? `enquiry-${key}-error` : hint ? `enquiry-${key}-hint` : undefined}
      id={`enquiry-${key}`}
      tabIndex={-1}
    >
      <legend className={styles.label}>{copy.labels[key]}</legend>
      <div className={styles.options}>
        {servicesEnquiryOptions[key].map((option) => (
          <label key={option.value} className={styles.option}>
            <input
              type="radio"
              name={key}
              value={option.value}
              checked={form[key] === option.value}
              onChange={() => setField(key, option.value)}
              disabled={submitting}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      {errors[key] ? (
        errorFor(key)
      ) : hint ? (
        <p id={`enquiry-${key}-hint`} className={styles.hint}>
          {hint}
        </p>
      ) : null}
    </fieldset>
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate aria-busy={submitting}>
      {(errorList.length > 0 || formError) && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className={styles.summary}>
          {formError ? (
            <p>{formError}</p>
          ) : (
            <>
              <p>
                <strong>
                  {errorList.length === 1 ? copy.fixOne : copy.fixMany.replace("{n}", String(errorList.length))}
                </strong>
              </p>
              <ul>
                {errorList.map((key) => (
                  <li key={key}>
                    <a href={`#enquiry-${key}`}>{copy.labels[key]}</a>, {errors[key]}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      {/* Honeypot, off-screen rather than sr-only so a screen reader never
          asks a person to fill in the trap. */}
      <div aria-hidden="true" className={styles.honeypot}>
        <label htmlFor="enquiry-website">{copy.honeypotLabel}</label>
        <input ref={honeypotRef} id="enquiry-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="enquiry-name" className={styles.label}>
          {copy.labels.name}
        </label>
        <input {...field("name")} type="text" autoComplete="name" aria-required="true" />
        {errorFor("name")}
      </div>

      <div>
        <label htmlFor="enquiry-email" className={styles.label}>
          {copy.labels.email}
        </label>
        <input {...field("email")} type="email" autoComplete="email" aria-required="true" />
        {errorFor("email")}
      </div>

      <div className={styles.wide}>
        <label htmlFor="enquiry-company" className={styles.label}>
          {copy.labels.company} <span className={styles.optional}>{copy.optional}</span>
        </label>
        <input {...field("company")} type="text" autoComplete="organization" />
        {errorFor("company")}
      </div>

      {group("projectType")}
      {group("budget", copy.budgetHint)}
      {group("timeline")}

      <div className={styles.wide}>
        <label htmlFor="enquiry-message" className={styles.label}>
          {copy.labels.message}
        </label>
        <textarea
          {...field("message")}
          rows={6}
          maxLength={FIELD_LIMITS.message}
          aria-required="true"
          placeholder={copy.messagePlaceholder}
        />
        {errorFor("message") ?? (
          <p id="enquiry-message-hint" className={styles.hint}>
            {copy.messageHint}
          </p>
        )}
      </div>

      <div className={styles.wide}>
        <button type="submit" className={styles.submit} disabled={submitting}>
          {submitting ? copy.submitting : copy.submit} <span aria-hidden="true">→</span>
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

/**
 * The form, pre-filled when the visitor arrives from a Showroom concept
 * (/contact?like=lumina): the project type, and a first line naming the
 * concept and its build-up, so the enquiry starts from a scope rather than a
 * blank page. Unknown or missing `like` gives the plain form. Wrap it in
 * <Suspense fallback={<EnquiryForm />}> so the page stays static.
 */
export function ShowroomEnquiryForm() {
  const like = useSearchParams().get("like");
  const concept = cases.find((c) => c.id === like && inShowroom(c));
  // The key starts the form fresh when ?like= changes on the same page.
  if (!concept?.showroom) return <EnquiryForm key="blank" />;

  const price = conceptPrice(concept.showroom);
  // Add-on names start with a capital on /services; mid-sentence they should not.
  const scope = price.rows
    .map((row, i) => (i === 0 ? row.label : row.label[0].toLowerCase() + row.label.slice(1)))
    .join(" + ");
  return (
    <EnquiryForm
      key={concept.id}
      initial={{
        projectType: "small-business-site",
        message: `I would like a site like ${concept.title} (${scope}, ${price.total}).\n\nAbout my business: `,
      }}
    />
  );
}
