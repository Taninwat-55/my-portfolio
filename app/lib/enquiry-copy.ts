import { ENQUIRY_MESSAGES_EN, type EnquiryFields, type EnquiryMessages } from "./services-enquiry";

/**
 * The enquiry form's visible strings. Every one is injectable, defaulting to
 * English, so /th, /sv and /da render the stack's blank card (BlankCard.tsx)
 * in their language without a second copy of the form existing. Moved here
 * from the paper ServicesEnquiryForm when that form was retired (2026-10-18).
 */

/**
 * All plain strings, with {tokens} instead of functions, so the whole object can
 * be handed straight from a Server Component to the client form. Functions
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
  /** Beside the one optional field's label. */
  optional: string;
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
  optional: "optional",
  honeypotLabel: "Website",
  budgetHint: "A rough band is fine. It just tells me what is realistic.",
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
