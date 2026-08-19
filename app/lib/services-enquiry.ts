import { servicesEnquiryOptions } from "@/app/data";

/**
 * The single validator for the /services enquiry form.
 *
 * Both the client form and the route handler import this module. That is the
 * whole point: the <option> values the browser renders and the allowlist the
 * server enforces are derived from the same source, so they cannot drift into
 * a state where the form offers something the endpoint rejects — or worse,
 * where the endpoint accepts something the form never offered.
 */

export const FIELD_LIMITS = {
  name: 80,
  email: 254, // RFC 5321 maximum for a full address
  company: 100,
  message: 2000,
} as const;

export const NAME_MIN = 2;
export const MESSAGE_MIN = 12;

/**
 * Deliberately loose. Address grammar is far more permissive than any regex
 * worth maintaining, and the only authoritative test of an address is sending
 * to it. This exists to catch typos, not to be a spec.
 */
export const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export type EnquiryFields = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryFields, string>>;

export const EMPTY_ENQUIRY: EnquiryFields = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  budget: "",
  timeline: "",
  message: "",
};

const allowedValues = (options: readonly { value: string }[]) =>
  new Set(options.map((option) => option.value));

const ALLOWED = {
  projectType: allowedValues(servicesEnquiryOptions.projectType),
  budget: allowedValues(servicesEnquiryOptions.budget),
  timeline: allowedValues(servicesEnquiryOptions.timeline),
};

/**
 * The eight strings this validator can produce, injectable so a translated form
 * gets translated errors without a second validator.
 *
 * Deliberately all plain strings, with {tokens} rather than functions. A copy
 * object containing functions cannot be passed from a Server Component to a
 * Client Component — Next.js refuses to serialize it — and that would have forced
 * a client wrapper around every translated form.
 *
 * The alternative was duplicating validateEnquiry per language, which would have
 * meant two definitions of what "valid" means — exactly the drift this module
 * exists to prevent. The route handler passes nothing and stays English, which is
 * right: those messages travel back over the API and end up in logs.
 */
export type EnquiryMessages = {
  nameShort: string;
  tooLong: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  messageShort: string;
  /** Contains the literal token {max}, replaced with FIELD_LIMITS.message. */
  messageLong: string;
};

export const ENQUIRY_MESSAGES_EN: EnquiryMessages = {
  nameShort: "Tell me your name",
  tooLong: "That is a bit long",
  email: "I need a valid email to reply to",
  projectType: "Pick the closest match",
  budget: "Pick a range — a rough one is fine",
  timeline: "When do you need it?",
  messageShort: "A sentence or two about the project",
  messageLong: "Keep it under {max} characters",
};

/**
 * Takes `unknown` rather than EnquiryFields on purpose — the server calls this
 * with a parsed JSON body that could be anything at all, including numbers and
 * objects where strings are expected.
 */
export function validateEnquiry(
  input: unknown,
  messages: EnquiryMessages = ENQUIRY_MESSAGES_EN
): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const source = (input ?? {}) as Record<string, unknown>;
  const read = (key: string) =>
    typeof source[key] === "string" ? (source[key] as string) : "";

  const name = read("name").trim();
  if (name.length < NAME_MIN) errors.name = messages.nameShort;
  else if (name.length > FIELD_LIMITS.name) errors.name = messages.tooLong;

  const email = read("email").trim();
  if (!EMAIL_RE.test(email) || email.length > FIELD_LIMITS.email) {
    errors.email = messages.email;
  }

  if (read("company").trim().length > FIELD_LIMITS.company) {
    errors.company = messages.tooLong;
  }

  if (!ALLOWED.projectType.has(read("projectType"))) {
    errors.projectType = messages.projectType;
  }
  if (!ALLOWED.budget.has(read("budget"))) {
    errors.budget = messages.budget;
  }
  if (!ALLOWED.timeline.has(read("timeline"))) {
    errors.timeline = messages.timeline;
  }

  const message = read("message").trim();
  if (message.length < MESSAGE_MIN) {
    errors.message = messages.messageShort;
  } else if (message.length > FIELD_LIMITS.message) {
    errors.message = messages.messageLong.replace(
      "{max}",
      String(FIELD_LIMITS.message)
    );
  }

  return errors;
}

/** Strips CR/LF so a submitted name cannot inject into an email header. */
export const singleLine = (value: string) =>
  value.replace(/[\r\n]+/g, " ").trim();

/**
 * Escapes user input before it goes into the HTML email body.
 *
 * singleLine above protects the *headers*; this protects the *body*. Without
 * it, a submitted name of `<img src=x onerror=...>` would be interpolated raw
 * into markup that then renders in an email client. Anything a stranger typed
 * must pass through here before reaching the HTML template.
 */
export const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/**
 * Turns a stored option value back into its human label for the email body.
 *
 * Always the English label, whichever language the form was in. That is
 * deliberate: this output goes into the notification Ice reads, and a consistent
 * inbox beats echoing the visitor's UI language back at him.
 */
export function optionLabel(
  group: keyof typeof servicesEnquiryOptions,
  value: string
): string {
  const match = servicesEnquiryOptions[group].find(
    (option) => option.value === value
  );
  return match?.label ?? value;
}
