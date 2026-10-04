/**
 * The postcard on the clock homepage: two fields, validated identically in the
 * browser (Postcard.tsx) and on the server (app/api/contact/route.ts).
 *
 * Deliberately separate from services-enquiry.ts rather than a reuse of
 * validateEnquiry: that one requires a name, a project type and a budget, which
 * a "say hej" note should not ask for. The pieces that are the same rule (the
 * email pattern, the minimum message) are imported, not copied.
 */
import { EMAIL_RE, MESSAGE_MIN } from "./services-enquiry";

export const CONTACT_LIMITS = { email: 254, message: 2000 } as const;

export type ContactFields = { message: string; email: string };
export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

export const CONTACT_MESSAGES = {
  messageShort: `A little more, please: at least ${MESSAGE_MIN} characters.`,
  messageLong: `That is over ${CONTACT_LIMITS.message} characters. Email is better for that one.`,
  emailInvalid: "I need an email address to reply to.",
} as const;

export function validateContact(input: unknown): ContactErrors {
  const errors: ContactErrors = {};
  const fields = (input ?? {}) as Partial<Record<keyof ContactFields, unknown>>;
  const message = typeof fields.message === "string" ? fields.message.trim() : "";
  const email = typeof fields.email === "string" ? fields.email.trim() : "";

  if (message.length < MESSAGE_MIN) errors.message = CONTACT_MESSAGES.messageShort;
  else if (message.length > CONTACT_LIMITS.message) errors.message = CONTACT_MESSAGES.messageLong;

  if (!EMAIL_RE.test(email) || email.length > CONTACT_LIMITS.email) {
    errors.email = CONTACT_MESSAGES.emailInvalid;
  }
  return errors;
}
