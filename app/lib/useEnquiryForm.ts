"use client";

import { useRef, useState } from "react";
import { personalInfo } from "../data";
import {
  validateEnquiry,
  EMPTY_ENQUIRY,
  type EnquiryFields,
  type EnquiryErrors,
  type EnquiryMessages,
} from "./services-enquiry";

/**
 * The enquiry form's behaviour, shared by the paper form on /services and the
 * stack's blank card on /build. Two looks, one set of rules: validation, the
 * honeypot, the timing trap, the POST and the error handling must never have
 * two versions, because the route checks every one of them.
 */

export type EnquiryStatus = "idle" | "submitting" | "sent" | "failed";

/** Order matters — the error summary lists problems in the order they appear. */
export const FIELD_ORDER: (keyof EnquiryFields)[] = [
  "name",
  "email",
  "company",
  "projectType",
  "budget",
  "timeline",
  "message",
];

export function useEnquiryForm(
  copy: {
    messages: EnquiryMessages;
    /** Contains the literal token {email}. */
    sendFailed: string;
  },
  /** Fields filled in before the visitor arrives, e.g. from a Showroom link. */
  initial?: Partial<EnquiryFields>
) {
  const [form, setForm] = useState<EnquiryFields>({ ...EMPTY_ENQUIRY, ...initial });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<EnquiryStatus>("idle");
  const [formError, setFormError] = useState<string | null>(null);

  // Uncontrolled on purpose: a bot fills it, a person never sees it, and it
  // should not cause a single re-render.
  const honeypotRef = useRef<HTMLInputElement>(null);
  // Ref rather than state so the timestamp is stable without a mount effect.
  const startedAtRef = useRef<number>(Date.now());
  const summaryRef = useRef<HTMLDivElement>(null);
  const sentRef = useRef<HTMLDivElement>(null);

  const setField = (key: keyof EnquiryFields, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Clear this field's error as soon as it is touched. Re-running the whole
    // validator on every keystroke shouts at fields the visitor has not
    // reached yet.
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const update =
    (key: keyof EnquiryFields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setField(key, e.target.value);

  const focusSummary = () => requestAnimationFrame(() => summaryRef.current?.focus());

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
      setFormError((err as Error).message || copy.sendFailed.replace("{email}", personalInfo.email));
      focusSummary();
    }
  };

  return {
    form,
    errors,
    status,
    formError,
    submitting: status === "submitting",
    errorList: FIELD_ORDER.filter((key) => errors[key]),
    setField,
    update,
    handleSubmit,
    honeypotRef,
    summaryRef,
    sentRef,
  };
}
