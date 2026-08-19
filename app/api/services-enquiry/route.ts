import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { personalInfo, enquiryInbox } from "@/app/data";
import { getClientIp } from "@/app/lib/request-ip";
import { createRateLimiter } from "@/app/lib/rate-limit";
import {
  validateEnquiry,
  singleLine,
  escapeHtml,
  optionLabel,
  FIELD_LIMITS,
  type EnquiryFields,
} from "@/app/lib/services-enquiry";

/**
 * Built per request, not at module scope.
 *
 * `new Resend(undefined)` THROWS, and `next build` imports every route to collect
 * page data — so a module-scope client made the build itself depend on a
 * production secret. It passed wherever the key happened to be set and failed
 * everywhere it was not: the first Netlify deploy-preview build died on exactly
 * this, because Netlify scopes env vars per context and the preview context had
 * none. A clean clone of this repo could not build either.
 *
 * A build should never need a runtime secret. rate-limit.ts already reached that
 * conclusion for Upstash — same bug, same shape — which is why the failing log
 * showed Upstash *warning* while Resend *threw*. This brings the two into line.
 */
function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) {
    console.error("[enquiry] RESEND_API_KEY missing — cannot send.");
    return null;
  }
  try {
    return new Resend(process.env.RESEND_API_KEY);
  } catch (error) {
    console.error("[enquiry] could not construct Resend client:", error);
    return null;
  }
}

// Three an hour is generous for a human — one enquiry, plus one "sorry, I
// forgot to mention" — and makes a flood impossible without a botnet.
// The prefix is required: without it this would share a Redis bucket with the
// chat limiter and the two would spend each other's budget.
const checkRateLimit = createRateLimiter({
  prefix: "rl:enquiry",
  limit: 3,
  window: "1 h",
});

/**
 * A second limiter keyed on nothing, so it bounds total sends regardless of who
 * is asking.
 *
 * The per-IP limit above is only as good as the IP, and the IP comes from
 * headers. That is a reasonable throttle but a poor last line of defence: get
 * the header parsing wrong — as this route originally did — and the per-IP cap
 * silently becomes no cap at all. This one cannot be escaped by rotating
 * anything, so the worst case for a determined caller is 20 emails an hour
 * rather than an exhausted Resend quota and a burnt domain reputation.
 *
 * 20/hour is far above real demand for a freelance enquiry form. If it ever
 * trips legitimately that is a good problem, and the number is one line.
 */
const checkGlobalLimit = createRateLimiter({
  prefix: "rl:enquiry:global",
  limit: 20,
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

  // Backstop. Deliberately checked after the per-IP limit so that one abusive
  // caller burns their own quota first and a flood has to get past both.
  const globalVerdict = await checkGlobalLimit("all");

  if (globalVerdict === "limited") {
    console.error("[rl:enquiry:global] hourly ceiling reached — refusing.");
    return NextResponse.json(
      { error: `The form is busy right now. ${mailtoHint}` },
      { status: 429 }
    );
  }

  if (globalVerdict === "unavailable" && process.env.NODE_ENV === "production") {
    console.error("[rl:enquiry:global] limiter unavailable — refusing to send.");
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

    // Sent multipart. The text part is what most filters read and what shows in
    // a notification preview; the HTML part is what makes it scannable in an
    // inbox. Every interpolated value is escaped — this is a stranger's input
    // being rendered as markup in a mail client.
    const row = (label: string, value: string) => `
      <tr>
        <td style="padding:6px 16px 6px 0;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#767676;white-space:nowrap;vertical-align:top;">${label}</td>
        <td style="padding:6px 0;font-size:15px;color:#111111;vertical-align:top;">${value}</td>
      </tr>`;

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);

    const html = `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111111;line-height:1.55;max-width:560px;">
  <p style="margin:0 0 6px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#767676;">New project enquiry</p>
  <h1 style="margin:0 0 20px;font-size:20px;font-weight:600;">${safeName}${company ? ` <span style="font-weight:400;color:#767676;">· ${escapeHtml(company)}</span>` : ""}</h1>
  <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;margin:0 0 22px;">
    ${row("Email", `<a href="mailto:${safeEmail}" style="color:#1a6c8c;">${safeEmail}</a>`)}
    ${row("Project", escapeHtml(projectType))}
    ${row("Budget", escapeHtml(optionLabel("budget", enquiry.budget)))}
    ${row("Timeline", escapeHtml(optionLabel("timeline", enquiry.timeline)))}
  </table>
  <div style="border-top:1px solid #e6e6e6;padding-top:16px;">
    <p style="margin:0 0 8px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#767676;">Message</p>
    <div style="font-size:15px;white-space:pre-wrap;">${escapeHtml(message)}</div>
  </div>
  <p style="margin:24px 0 0;font-size:12px;color:#9a9a9a;">Sent from the /services enquiry form. Replying to this email goes straight to ${safeName}.</p>
</div>`.trim();

    // No acknowledgement email goes back to the enquirer. That would turn this
    // into a machine that emails arbitrary addresses on an anonymous POST — a
    // spam-relay primitive with our domain on the envelope. The success panel
    // on the page does that job instead.
    // A missing key is a server misconfiguration, not the visitor's problem, so
    // it returns the same 500 and the same mailto fallback as a send failure.
    const resend = getResend();
    if (!resend) {
      return NextResponse.json(
        { error: `Could not send that. ${mailtoHint}` },
        { status: 500 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Services Enquiry <hello@taninwatkaewpankan.xyz>",
      to: enquiryInbox,
      replyTo: email,
      subject,
      text,
      html,
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
