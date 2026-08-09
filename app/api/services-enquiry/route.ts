import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { personalInfo } from "@/app/data";
import { getClientIp } from "@/app/lib/request-ip";
import { createRateLimiter } from "@/app/lib/rate-limit";
import {
  validateEnquiry,
  singleLine,
  optionLabel,
  FIELD_LIMITS,
  type EnquiryFields,
} from "@/app/lib/services-enquiry";

const resend = new Resend(process.env.RESEND_API_KEY);

// Three an hour is generous for a human — one enquiry, plus one "sorry, I
// forgot to mention" — and makes a flood impossible without a botnet.
// The prefix is required: without it this would share a Redis bucket with the
// chat limiter and the two would spend each other's budget.
const checkRateLimit = createRateLimiter({
  prefix: "rl:enquiry",
  limit: 3,
  window: "1 h",
});

const mailtoHint = `Email me directly at ${personalInfo.email}.`;

export async function POST(req: NextRequest) {
  // A cross-site <form> cannot send application/json without tripping a CORS
  // preflight, so requiring it is a free CSRF floor.
  if (!req.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Unsupported content type" }, { status: 415 });
  }

  const verdict = await checkRateLimit(getClientIp(req));

  if (verdict === "limited") {
    return NextResponse.json(
      {
        error: `Too many enquiries from this network. Try again in an hour, or email me directly at ${personalInfo.email}.`,
      },
      { status: 429 }
    );
  }

  // Fails CLOSED, unlike the chat route — and the asymmetry is deliberate.
  //
  // The chat route can fail open because Groq enforces its own per-key limits,
  // so the limiter is not its only defence. This endpoint has no second line:
  // Resend's ceiling IS the monthly quota, so "the downstream will stop them"
  // means "they exhaust the quota, and then it stops." The cost of failing open
  // is a flooded inbox, a burnt quota, and damage to the sending reputation of
  // the domain — i.e. it takes down the real email channel, not a widget.
  //
  // The cost of failing closed is mild: a 503 that names the email address,
  // which is printed on the same page and still converts.
  //
  // Only in production. Locally there is no Redis, and a permanently-503ing
  // form would be impossible to test.
  if (verdict === "unavailable" && process.env.NODE_ENV === "production") {
    console.error("[rl:enquiry] limiter unavailable — refusing to send.");
    return NextResponse.json(
      { error: `The form is briefly unavailable. ${mailtoHint}` },
      { status: 503 }
    );
  }

  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // Honeypot and timing traps answer 200 rather than 400. A rejection tells
    // the bot which field gave it away; a success makes it record a win and
    // move on.
    if (typeof body.website === "string" && body.website.trim() !== "") {
      console.warn("[enquiry] honeypot tripped");
      return NextResponse.json({ ok: true });
    }
    if (typeof body.elapsedMs === "number" && body.elapsedMs < 2000) {
      console.warn("[enquiry] submitted too fast", { ms: body.elapsedMs });
      return NextResponse.json({ ok: true });
    }

    const fields = validateEnquiry(body);
    if (Object.keys(fields).length > 0) {
      return NextResponse.json({ error: "Invalid submission", fields }, { status: 400 });
    }

    const enquiry = body as EnquiryFields;
    const name = singleLine(enquiry.name).slice(0, FIELD_LIMITS.name);
    const company = singleLine(enquiry.company ?? "").slice(0, FIELD_LIMITS.company);
    const email = enquiry.email.trim();
    const message = enquiry.message.trim().slice(0, FIELD_LIMITS.message);

    const projectType = optionLabel("projectType", enquiry.projectType);

    const subject = `[Enquiry] ${name}${company ? ` · ${company}` : ""} — ${projectType}`;

    const text = [
      `From:      ${name}${company ? ` (${company})` : ""}`,
      `Email:     ${email}`,
      `Project:   ${projectType}`,
      `Budget:    ${optionLabel("budget", enquiry.budget)}`,
      `Timeline:  ${optionLabel("timeline", enquiry.timeline)}`,
      ``,
      `-- Message --`,
      message,
      ``,
      `--`,
      `Sent from the /services enquiry form`,
    ].join("\n");

    // No acknowledgement email goes back to the enquirer. That would turn this
    // into a machine that emails arbitrary addresses on an anonymous POST — a
    // spam-relay primitive with our domain on the envelope. The success panel
    // on the page does that job instead.
    const { data, error } = await resend.emails.send({
      from: "Services Enquiry <hello@taninwatkaewpankan.xyz>",
      to: personalInfo.email,
      replyTo: email,
      subject,
      text,
    });

    if (error) {
      console.error("[enquiry] Resend rejected the send:", error);
      return NextResponse.json(
        { error: `Could not send that. ${mailtoHint}` },
        { status: 502 }
      );
    }

    console.info("[enquiry] sent", {
      id: data?.id,
      projectType: enquiry.projectType,
      budget: enquiry.budget,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    // resend.emails.send() can throw on a network failure or a bad key. Without
    // this the throw becomes an unhandled rejection and an opaque 500 with
    // nothing in the logs.
    console.error("[enquiry] request failed:", err);
    return NextResponse.json(
      { error: `Could not send that. ${mailtoHint}` },
      { status: 500 }
    );
  }
}
