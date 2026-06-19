/**
 * Builds the contact-form notification email (HTML + plain-text fallback).
 *
 * Design: a restrained white card on a light backdrop, matching the site —
 * a small label, the sender's name as the heading, compact meta rows, then the
 * message in larger, readable type so it stays the focal point. All user input
 * is HTML-escaped to keep the markup safe and unbroken.
 */

import { site } from "@/app/lib/site";

type ContactInput = { name: string; email: string; subject: string; message: string };

/** Escape the five HTML-significant characters so user input can't break/inject markup. */
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildContactEmail({ name, email, subject, message }: ContactInput): {
  html: string;
  text: string;
} {
  const nameE = esc(name);
  const emailE = esc(email);
  const subjectE = subject ? esc(subject) : "";
  // white-space: pre-wrap preserves the sender's line breaks; just escape.
  const messageE = esc(message);

  const metaRow = (label: string, value: string) => `
    <tr>
      <td style="padding:3px 0;width:72px;color:#8a8f98;font-size:13px;vertical-align:top;">${label}</td>
      <td style="padding:3px 0;color:#171717;font-size:14px;">${value}</td>
    </tr>`;

  const html = `<!doctype html>
<html>
  <body style="margin:0;background:#f4f4f5;">
    <div style="background:#f4f4f5;padding:28px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
              <tr>
                <td style="background:#ffffff;border:1px solid #e4e5e7;border-radius:12px;padding:28px 28px 22px;">
                  <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#8a8f98;">New portfolio message</p>
                  <h1 style="margin:0 0 18px;font-size:20px;line-height:1.3;font-weight:600;color:#171717;">${nameE}</h1>

                  <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;">
                    ${metaRow("Email", `<a href="mailto:${emailE}" style="color:#0d74ce;text-decoration:none;">${emailE}</a>`)}
                    ${subjectE ? metaRow("Subject", subjectE) : ""}
                  </table>

                  <div style="height:1px;background:#ececed;margin:18px 0;"></div>

                  <div style="font-size:15px;line-height:1.65;color:#2c2f36;white-space:pre-wrap;">${messageE}</div>

                  <div style="height:1px;background:#ececed;margin:22px 0 14px;"></div>
                  <p style="margin:0;font-size:12px;line-height:1.5;color:#8a8f98;">
                    Reply directly to this email to respond to ${nameE}.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding:14px 4px 0;text-align:center;font-size:11px;color:#aeb2b8;">
                  Sent from the contact form on ${esc(site.wordmark)}
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>`;

  const text = [
    "New portfolio message",
    "",
    `From:    ${name} <${email}>`,
    subject ? `Subject: ${subject}` : null,
    "",
    message,
    "",
    "—",
    `Reply directly to this email to respond to ${name}.`,
  ]
    .filter((l) => l !== null)
    .join("\n");

  return { html, text };
}
