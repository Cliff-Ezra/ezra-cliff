import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/app/lib/site";
import { buildContactEmail } from "@/app/lib/contact-email";

/**
 * POST /api/contact — sends the contact-form message via Resend.
 *
 * Server-only: the API key never reaches the client. Validates input, drops
 * bot submissions via a honeypot, and replies with the visitor's address set
 * as reply-to so a single "Reply" goes back to them.
 *
 * Env:
 *   RESEND_API_KEY_EZ_PORTFOLIO  (required) — Resend API key
 *   CONTACT_FROM_EMAIL  (optional) — verified sender; defaults to Resend's
 *                        test address (only delivers to your Resend account
 *                        email until you verify a domain)
 *   CONTACT_TO_EMAIL    (optional) — recipient; defaults to site.email
 */

const resend = new Resend(process.env.RESEND_API_KEY_EZ_PORTFOLIO);

const FROM = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";
const TO = process.env.CONTACT_TO_EMAIL || site.email;

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/** Max accepted lengths — guards against oversized / abusive payloads. */
const MAX = { name: 100, email: 200, subject: 150, message: 5000 } as const;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const subject = String(body.subject ?? "").trim();
  const message = String(body.message ?? "").trim();
  const honeypot = String(body.company ?? "").trim();

  // Bot trap: a filled hidden field means a bot — accept silently, send nothing.
  if (honeypot) return NextResponse.json({ ok: true });

  if (!name || !isEmail(email) || !message) {
    return NextResponse.json(
      { error: "Please add your name, a valid email, and a message." },
      { status: 400 },
    );
  }

  if (
    name.length > MAX.name ||
    email.length > MAX.email ||
    subject.length > MAX.subject ||
    message.length > MAX.message
  ) {
    return NextResponse.json(
      { error: "One of your fields is too long. Please shorten it and try again." },
      { status: 400 },
    );
  }

  if (!process.env.RESEND_API_KEY_EZ_PORTFOLIO) {
    return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
  }

  const { html, text } = buildContactEmail({ name, email, subject, message });

  const { error } = await resend.emails.send({
    from: FROM,
    to: [TO],
    replyTo: email,
    subject: subject || `New message from ${name}`,
    html,
    text,
  });

  if (error) {
    return NextResponse.json(
      { error: "Couldn't send your message. Please email me directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
