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
 * Takes `unknown` rather than EnquiryFields on purpose — the server calls this
 * with a parsed JSON body that could be anything at all, including numbers and
 * objects where strings are expected.
 */
export function validateEnquiry(input: unknown): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const source = (input ?? {}) as Record<string, unknown>;
  const read = (key: string) =>
    typeof source[key] === "string" ? (source[key] as string) : "";

  const name = read("name").trim();
  if (name.length < NAME_MIN) errors.name = "Tell me your name";
  else if (name.length > FIELD_LIMITS.name) errors.name = "That is a bit long";

  const email = read("email").trim();
  if (!EMAIL_RE.test(email) || email.length > FIELD_LIMITS.email) {
    errors.email = "I need a valid email to reply to";
  }

  if (read("company").trim().length > FIELD_LIMITS.company) {
    errors.company = "That is a bit long";
  }

  if (!ALLOWED.projectType.has(read("projectType"))) {
    errors.projectType = "Pick the closest match";
  }
  if (!ALLOWED.budget.has(read("budget"))) {
    errors.budget = "Pick a range — a rough one is fine";
  }
  if (!ALLOWED.timeline.has(read("timeline"))) {
    errors.timeline = "When do you need it?";
  }

  const message = read("message").trim();
  if (message.length < MESSAGE_MIN) {
    errors.message = "A sentence or two about the project";
  } else if (message.length > FIELD_LIMITS.message) {
    errors.message = `Keep it under ${FIELD_LIMITS.message} characters`;
  }

  return errors;
}

/** Strips CR/LF so a submitted name cannot inject into an email header. */
export const singleLine = (value: string) =>
  value.replace(/[\r\n]+/g, " ").trim();

/** Turns a stored option value back into its human label for the email body. */
export function optionLabel(
  group: keyof typeof servicesEnquiryOptions,
  value: string
): string {
  const match = servicesEnquiryOptions[group].find(
    (option) => option.value === value
  );
  return match?.label ?? value;
}
