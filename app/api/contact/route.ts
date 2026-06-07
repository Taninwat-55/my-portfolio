import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { name, email, message } = body as { name: string; email: string; message: string };

  const { error } = await resend.emails.send({
    from: "Portfolio Contact <hello@taninwatkaewpankan.xyz>",
    to: "taninwat.kaewpankan@gmail.com",
    replyTo: email,
    subject: `[Portfolio] Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
