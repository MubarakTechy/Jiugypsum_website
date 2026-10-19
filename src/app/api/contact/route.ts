import { validateContact } from "@/lib/validation";
import { clientIp, rateLimited } from "@/lib/rate-limit";
import { mailConfigured, rowsToHtml, sendNotification } from "@/lib/mail";

export const runtime = "nodejs";

const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(req: Request) {
  if (rateLimited(`contact:${clientIp(req)}`, 5, 10 * 60 * 1000)) {
    return json({ ok: false, error: "You've sent several messages recently. Please wait a few minutes or contact us on WhatsApp." }, 429);
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "We couldn't read your message. Please try again." }, 400);
  }

  if (String(body.company_website ?? "").trim()) return json({ ok: true });

  const startedAt = Number(body.startedAt);
  if (Number.isFinite(startedAt) && Date.now() - startedAt < 2000) {
    return json({ ok: false, error: "That was very quick. Please check your message and send again." }, 400);
  }

  const { values, errors } = validateContact(body);
  if (Object.keys(errors).length) return json({ ok: false, error: "Please fix the highlighted fields.", errors }, 422);

  if (!mailConfigured()) {
    console.error("[contact] SMTP is not configured. Message NOT delivered.");
    return json({ ok: false, error: "Our contact form is temporarily unavailable. Please call or WhatsApp us." }, 503);
  }

  const isEmail = values.contact.includes("@");
  const rows: [string, string][] = [
    ["Name", values.fullName],
    [isEmail ? "Email" : "Phone", values.contact],
    ["Enquiry type", values.enquiryType],
    ["Message", values.message],
  ];

  try {
    await sendNotification({
      subject: `Website enquiry: ${values.enquiryType} (${values.fullName})`,
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
      html: rowsToHtml("New website enquiry", rows),
      replyTo: isEmail ? values.contact : undefined,
    });
  } catch (err) {
    console.error("[contact] mail delivery failed:", err);
    return json({ ok: false, error: "We couldn't send your message just now. Please try again, or call or WhatsApp us." }, 502);
  }

  return json({ ok: true });
}
