"use client";

import { personalInfo, servicesEnquiryOptions, stackContent } from "../../data";
import { FIELD_LIMITS, type EnquiryFields } from "../../lib/services-enquiry";
import { useEnquiryForm } from "../../lib/useEnquiryForm";
import { ENQUIRY_COPY_EN } from "../ServicesEnquiryForm";
import styles from "./stack.module.css";

type Choice = "projectType" | "budget" | "timeline";

/**
 * Build mine: author mode. The enquiry is a blank card the visitor fills in and
 * saves. Same fields, values, validation and endpoint as the /services form
 * (useEnquiryForm), so the route's allowlist and traps apply unchanged; only
 * the look differs, and the three dropdowns become HyperCard radio families.
 */
export function BlankCard() {
  const copy = ENQUIRY_COPY_EN;
  const stack = stackContent.build;
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
  } = useEnquiryForm(copy);

  if (status === "sent") {
    return (
      <div ref={sentRef} tabIndex={-1} role="status" className={styles.filed}>
        <h2 className={styles.heading}>{stack.savedTitle}</h2>
        <p className={styles.body}>
          {copy.sentBody} {copy.sentUrgentPrefix}{" "}
          <a className={styles.inlineLink} href={`mailto:${personalInfo.email}`}>
            {personalInfo.email}
          </a>
          .
        </p>
      </div>
    );
  }

  const field = (key: keyof EnquiryFields) => ({
    id: `card-${key}`,
    name: key,
    value: form[key],
    onChange: update(key),
    disabled: submitting,
    className: styles.input,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key]
      ? `card-${key}-error`
      : key === "message"
        ? "card-message-hint"
        : undefined,
  });

  const errorFor = (key: keyof EnquiryFields) =>
    errors[key] ? (
      <p id={`card-${key}-error`} className={styles.error}>
        {errors[key]}
      </p>
    ) : null;

  const family = (key: Choice, wide = false, hint?: string) => (
    <fieldset
      className={`${styles.family} ${wide ? styles.wide : ""}`}
      aria-invalid={errors[key] ? true : undefined}
      aria-describedby={errors[key] ? `card-${key}-error` : hint ? `card-${key}-hint` : undefined}
      id={`card-${key}`}
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
            {option.label}
          </label>
        ))}
      </div>
      {errors[key] ? errorFor(key) : hint ? <p id={`card-${key}-hint`} className={styles.hintText}>{hint}</p> : null}
    </fieldset>
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate aria-busy={submitting}>
      {(errorList.length > 0 || formError) && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className={styles.summary}>
          {formError ? (
            <p className={styles.body}>{formError}</p>
          ) : (
            <>
              <p className={styles.body}>
                <strong>
                  {errorList.length === 1
                    ? copy.fixOne
                    : copy.fixMany.replace("{n}", String(errorList.length))}
                </strong>
              </p>
              <ul>
                {errorList.map((key) => (
                  <li key={key}>
                    <a className={styles.inlineLink} href={`#card-${key}`}>
                      {copy.labels[key]}
                    </a>
                    : {errors[key]}
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
        <label htmlFor="card-website">{copy.honeypotLabel}</label>
        <input ref={honeypotRef} id="card-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="card-name" className={styles.label}>
          {copy.labels.name}
        </label>
        <input {...field("name")} type="text" autoComplete="name" aria-required="true" />
        {errorFor("name")}
      </div>

      <div>
        <label htmlFor="card-email" className={styles.label}>
          {copy.labels.email}
        </label>
        <input {...field("email")} type="email" autoComplete="email" aria-required="true" />
        {errorFor("email")}
      </div>

      <div className={styles.wide}>
        <label htmlFor="card-company" className={styles.label}>
          {copy.labels.company}
          <span className={styles.optional}>{copy.optional}</span>
        </label>
        <input {...field("company")} type="text" autoComplete="organization" />
        {errorFor("company")}
      </div>

      {family("projectType", true)}
      {family("budget", true, copy.budgetHint)}
      {family("timeline", true)}

      <div className={styles.wide}>
        <label htmlFor="card-message" className={styles.label}>
          {copy.labels.message}
        </label>
        <textarea
          {...field("message")}
          rows={5}
          maxLength={FIELD_LIMITS.message}
          aria-required="true"
          placeholder={copy.messagePlaceholder}
        />
        {errorFor("message") ?? (
          <p id="card-message-hint" className={styles.hintText}>
            {copy.messageHint}
          </p>
        )}
      </div>

      <div className={styles.wide}>
        <button type="submit" className={`${styles.btn} ${styles.btnDefault}`} disabled={submitting}>
          {submitting ? stack.saving : stack.save}
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
