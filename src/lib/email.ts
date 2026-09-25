import nodemailer from "nodemailer";
import { STUDIO } from "@/lib/studio";

/**
 * Email configuration.
 *
 * Reads SMTP credentials from environment variables. When these are set,
 * the form sends real emails server-side via SMTP. When not set, the form
 * falls back to opening the visitor's email client with a prefilled
 * inquiry body (mailto: link) — still functional, but requires the visitor
 * to actually press send in their own mail client.
 *
 * To enable real server-side SMTP delivery with Gmail:
 *   1. Enable 2-Step Verification on the Google account.
 *   2. Generate an App Password at https://myaccount.google.com/apppasswords
 *   3. Set the following environment variables in .env (or your host's env config):
 *        SMTP_HOST=smtp.gmail.com
 *        SMTP_PORT=465
 *        SMTP_USER=brightynexaistudio@gmail.com
 *        SMTP_PASS=<the 16-char app password (no spaces)>
 *      Also optional (defaults used if not set):
 *        SMTP_FROM=brightynexaistudio@gmail.com
 *        MAIL_TO=brightynexaistudio@gmail.com
 *
 * Without these env vars, the API returns a mailto: URL that the browser
 * opens with the inquiry body prefilled — no real server-side email is sent.
 */

type SmtpEnv = {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  to: string;
};

function readSmtpEnv(): SmtpEnv | null {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT ?? "", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !port || !user || !pass) return null;
  return {
    host,
    port,
    user,
    pass,
    from: process.env.SMTP_FROM ?? user,
    to: process.env.MAIL_TO ?? STUDIO.email,
  };
}

export function isSmtpConfigured(): boolean {
  return readSmtpEnv() !== null;
}

export type InquiryData = {
  fullName: string;
  email: string;
  business: string;
  need: string;
  hasWebsite: string;
  currentUrl: string;
  goal: string;
  pages: string[];
  contentStatus: string;
  styleRefs: string;
  budget: string;
  launchTime: string;
  projectDetails: string;
};

function buildInquiryBody(d: InquiryData): string {
  return [
    `New website project inquiry from brightyweb.space-z.ai`,
    ``,
    `Full Name: ${d.fullName}`,
    `Email Address: ${d.email}`,
    `Business / Brand Name: ${d.business}`,
    ``,
    `Website Need: ${d.need}`,
    `Existing Website: ${d.hasWebsite === "yes" ? "Yes" : "No"}${
      d.hasWebsite === "yes" && d.currentUrl ? ` — ${d.currentUrl}` : ""
    }`,
    ``,
    `Website Goal:`,
    d.goal,
    ``,
    `Required Pages: ${d.pages.length > 0 ? d.pages.join(", ") : "(none selected)"}`,
    `Content Status: ${d.contentStatus}`,
    ``,
    `Style / References:`,
    d.styleRefs || "(none provided)",
    ``,
    `Budget: ${d.budget}`,
    `Launch Time: ${d.launchTime}`,
    ``,
    `Project Details:`,
    d.projectDetails,
    ``,
    `—`,
    `Reply-To: ${d.email} (the visitor's email address)`,
    `Source: /start-a-project`,
  ].join("\n");
}

function buildAutoReplyBody(d: InquiryData): string {
  // Personalized greeting — uses first name if available, else falls back to "there".
  const firstName = d.fullName.trim().split(/\s+/)[0] || "there";
  return [
    `Hi ${firstName},`,
    ``,
    `Thank you for reaching out to Brightyweb.`,
    ``,
    `I've received your website project inquiry and will review the details you submitted.`,
    ``,
    `I'll get back to you at this email address once I've reviewed your project.`,
    ``,
    `Best,`,
    `Brightyweb`,
    `Web Design Studio`,
    `${STUDIO.email}`,
  ].join("\n");
}

export type SendResult =
  | { mode: "smtp"; ok: true }
  | { mode: "smtp"; ok: false; error: string }
  | { mode: "mailto"; ok: true; mailtoUrl: string };

export async function sendInquiryEmails(d: InquiryData): Promise<SendResult> {
  const cfg = readSmtpEnv();

  // No SMTP credentials configured → fall back to mailto: with prefilled body.
  // The visitor's email client will open with the inquiry ready to send.
  if (!cfg) {
    const subject = `New Website Project Inquiry — ${d.business}`;
    const body = buildInquiryBody(d);
    const mailtoUrl = `mailto:${encodeURIComponent(cfg?.to ?? STUDIO.email)}?subject=${encodeURIComponent(
      subject,
    )}&reply-to=${encodeURIComponent(d.email)}&body=${encodeURIComponent(body)}`;
    return { mode: "mailto", ok: true, mailtoUrl };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: cfg.host,
      port: cfg.port,
      secure: cfg.port === 465,
      auth: { user: cfg.user, pass: cfg.pass },
    });

    const subject = `New Website Project Inquiry — ${d.business}`;

    // 1) Inquiry email to the studio (with reply-to: visitor's email)
    await transporter.sendMail({
      from: cfg.from,
      to: cfg.to,
      replyTo: d.email,
      subject,
      text: buildInquiryBody(d),
    });

    // 2) Auto-reply to the visitor
    await transporter.sendMail({
      from: cfg.from,
      to: d.email,
      subject: `Your Brightyweb project inquiry — received`,
      text: buildAutoReplyBody(d),
    });

    return { mode: "smtp", ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown SMTP error";
    console.error("SMTP send failed:", message);
    return { mode: "smtp", ok: false, error: message };
  }
}
