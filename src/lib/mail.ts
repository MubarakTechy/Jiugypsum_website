import nodemailer, { type Transporter } from "nodemailer";

export type MailAttachment = { filename: string; content: Buffer; contentType?: string };

export function mailConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.MAIL_TO);
}

export function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

/** Strip CR/LF so user input can never inject extra mail headers. */
export const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

let transporter: Transporter | undefined;

function getTransporter() {
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT ?? 465);
    const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465;
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transporter;
}

export async function sendNotification(opts: {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
  attachments?: MailAttachment[];
}) {
  await getTransporter().sendMail({
    from: process.env.MAIL_FROM ?? process.env.SMTP_USER,
    to: process.env.MAIL_TO,
    replyTo: opts.replyTo,
    subject: oneLine(opts.subject),
    text: opts.text,
    html: opts.html,
    attachments: opts.attachments,
  });
}

/** Simple two-column HTML table used by both notification emails. */
export function rowsToHtml(title: string, rows: [string, string][]): string {
  const body = rows
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 14px;background:#E8EFED;font-weight:600;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:8px 14px;border-bottom:1px solid #E8EFED;white-space:pre-wrap">${esc(v)}</td></tr>`,
    )
    .join("");
  return `<div style="font-family:Arial,Helvetica,sans-serif;color:#172B2B;max-width:640px"><h2 style="color:#004F52;margin:0 0 12px">${esc(title)}</h2><table style="border-collapse:collapse;width:100%;font-size:14px">${body}</table></div>`;
}
