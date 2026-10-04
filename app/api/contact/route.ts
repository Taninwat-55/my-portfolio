import { NextRequest, NextResponse } from "next/server";
import { personalInfo, enquiryInbox } from "@/app/data";
import { getClientIp } from "@/app/lib/request-ip";
import { createRateLimiter } from "@/app/lib/rate-limit";
import { getResend } from "@/app/lib/resend";
import { escapeHtml } from "@/app/lib/services-enquiry";
import { validateContact, CONTACT_LIMITS, type ContactFields } from "@/app/lib/contact";

/**
 * The clock's postcard. The same defences as /api/services-enquiry, in the same
 * order, and that route's comments carry the reasoning for each one: JSON-only
 * as a CSRF floor, a per-IP limit, a global ceiling, failing closed in
 * production, honeypot and timing traps that answer 200, and no
 * acknowledgement email to the sender.
 *
 * Its own buckets, so a postcard and a project enquiry never spend each other's
 * budget. The two ceilings together cap this domain at 40 emails an hour.
 *
 * Two differences from the enquiry route, both from review: the global ceiling is
 * checked just before sending, so honeypot hits and invalid payloads cannot spend
 * it and close the postbox for real visitors; and a missing elapsedMs counts as a
 * bot, since the postcard always sends it.
 */
const checkRateLimit = createRateLimiter({ prefix: "rl:contact", limit: 3, window: "1 h" });
const checkGlobalLimit = createRateLimiter({ prefix: "rl:contact:global", limit: 20, window: "1 h" });

const mailtoHint = `Email me directly at ${personalInfo.email}.`;
const unavailable = () =>
  NextResponse.json({ error: `The postbox is briefly closed. ${mailtoHint}` }, { status: 503 });

export async function POST(req: NextRequest) {
  if (!req.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Unsupported content type" }, { status: 415 });
  }

  const verdict = await checkRateLimit(getClientIp(req));
  if (verdict === "limited") {
    return NextResponse.json(
      { error: `That is three postcards this hour. Try again later, or ${mailtoHint.toLowerCase()}` },
      { status: 429 },
    );
  }
  if (verdict === "unavailable" && process.env.NODE_ENV === "production") {
    console.error("[rl:contact] limiter unavailable — refusing to send.");
    return unavailable();
  }

  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    if (typeof body.website === "string" && body.website.trim() !== "") {
      console.warn("[contact] honeypot tripped");
      return NextResponse.json({ ok: true });
    }
    if (typeof body.elapsedMs !== "number" || body.elapsedMs < 2000) {
      console.warn("[contact] submitted too fast, or without timing", { ms: body.elapsedMs });
      return NextResponse.json({ ok: true });
    }

    const fields = validateContact(body);
    if (Object.keys(fields).length > 0) {
      return NextResponse.json({ error: "Invalid submission", fields }, { status: 400 });
    }

    const postcard = body as ContactFields;
    const email = postcard.email.trim();
    const message = postcard.message.trim().slice(0, CONTACT_LIMITS.message);
    // The first words of the message, on one line, so the inbox shows what it is.
    const preview = message.replace(/\s+/g, " ").slice(0, 60);

    const text = [`From: ${email}`, ``, message, ``, `--`, `Sent from the postcard on the homepage`].join("\n");
    const safeEmail = escapeHtml(email);
    const html = `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111111;line-height:1.55;max-width:560px;">
  <p style="margin:0 0 6px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#767676;">A postcard from the homepage</p>
  <p style="margin:0 0 20px;font-size:15px;">From <a href="mailto:${safeEmail}" style="color:#1a6c8c;">${safeEmail}</a></p>
  <div style="border-top:1px solid #e6e6e6;padding-top:16px;font-size:15px;white-space:pre-wrap;">${escapeHtml(message)}</div>
  <p style="margin:24px 0 0;font-size:12px;color:#9a9a9a;">Replying to this email goes straight to the sender.</p>
</div>`.trim();

    // Only real, valid sends count against the global ceiling.
    const globalVerdict = await checkGlobalLimit("all");
    if (globalVerdict === "limited") {
      console.error("[rl:contact:global] hourly ceiling reached — refusing.");
      return NextResponse.json({ error: `The postbox is full right now. ${mailtoHint}` }, { status: 429 });
    }
    if (globalVerdict === "unavailable" && process.env.NODE_ENV === "production") {
      console.error("[rl:contact:global] limiter unavailable — refusing to send.");
      return unavailable();
    }

    const resend = getResend("contact");
    if (!resend) {
      return NextResponse.json({ error: `Could not post that. ${mailtoHint}` }, { status: 500 });
    }

    const { data, error } = await resend.emails.send({
      from: "Homepage Postcard <hello@taninwatkaewpankan.xyz>",
      to: enquiryInbox,
      replyTo: email,
      subject: `[Postcard] ${preview}${message.length > preview.length ? "…" : ""}`,
      text,
      html,
    });

    if (error) {
      console.error("[contact] Resend rejected the send:", error);
      return NextResponse.json({ error: `Could not post that. ${mailtoHint}` }, { status: 502 });
    }

    console.info("[contact] sent", { id: data?.id });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] request failed:", err);
    return NextResponse.json({ error: `Could not post that. ${mailtoHint}` }, { status: 500 });
  }
}
