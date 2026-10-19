import { FILE_LIMITS, checkFileMeta, sniffImage, validateQuote } from "@/lib/validation";
import { clientIp, rateLimited } from "@/lib/rate-limit";
import { mailConfigured, rowsToHtml, sendNotification, type MailAttachment } from "@/lib/mail";

export const runtime = "nodejs";

const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

function makeReference() {
  const d = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `JQ-${d}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

const safeName = (n: string) => n.replace(/[^\w.\-]+/g, "_").slice(0, 80) || "photo";

export async function POST(req: Request) {
  if (rateLimited(`quote:${clientIp(req)}`, 5, 10 * 60 * 1000)) {
    return json({ ok: false, error: "You've sent several requests recently. Please wait a few minutes or contact us on WhatsApp." }, 429);
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return json({ ok: false, error: "We couldn't read your submission. Please try again." }, 400);
  }

  // Bots fill the hidden field; humans can't see it. Answer quietly and do nothing.
  if (String(form.get("company_website") ?? "").trim()) return json({ ok: true, reference: "JQ-RECEIVED" });

  const startedAt = Number(form.get("startedAt"));
  if (Number.isFinite(startedAt) && Date.now() - startedAt < 2500) {
    return json({ ok: false, error: "That was very quick. Please check your details and send again." }, 400);
  }

  const { values, errors } = validateQuote(Object.fromEntries(form.entries()));
  if (Object.keys(errors).length) return json({ ok: false, error: "Please fix the highlighted fields.", errors }, 422);

  const uploads = form.getAll("photos").filter((f): f is File => typeof f !== "string" && f.size > 0);
  const metaError = checkFileMeta(uploads.map((f) => ({ name: f.name, size: f.size, type: f.type })));
  if (metaError) return json({ ok: false, error: metaError, errors: { photos: metaError } }, 422);

  const attachments: MailAttachment[] = [];
  for (const f of uploads.slice(0, FILE_LIMITS.maxFiles)) {
    const buf = Buffer.from(await f.arrayBuffer());
    if (!sniffImage(buf)) {
      const msg = `"${f.name}" doesn't look like a real image file.`;
      return json({ ok: false, error: msg, errors: { photos: msg } }, 422);
    }
    attachments.push({ filename: safeName(f.name), content: buf, contentType: f.type });
  }

  if (!mailConfigured()) {
    console.error("[quote] SMTP is not configured (SMTP_HOST / SMTP_USER / SMTP_PASS / MAIL_TO). Submission NOT delivered.");
    return json({ ok: false, error: "Our online form is temporarily unavailable. Please call or WhatsApp us and we'll help right away." }, 503);
  }

  const reference = makeReference();
  const rows: [string, string][] = [
    ["Reference", reference],
    ["Name", values.fullName],
    ["Phone / WhatsApp", values.phone],
    ["Email", values.email || "Not provided"],
    ["Service", values.service],
    ["Property type", values.propertyType],
    ["Project location", values.location],
    ["Budget", values.budget || "Not given"],
    ["Preferred start", values.startWhen || "Not given"],
    ["Photos attached", String(attachments.length)],
    ["Project description", values.description],
  ];

  try {
    await sendNotification({
      subject: `New quote request ${reference}: ${values.service} (${values.fullName})`,
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
      html: rowsToHtml("New quote request", rows),
      replyTo: values.email || undefined,
      attachments,
    });
  } catch (err) {
    console.error("[quote] mail delivery failed:", err);
    return json({ ok: false, error: "We couldn't send your request just now. Your details are still on screen. Please try again, or call or WhatsApp us." }, 502);
  }

  return json({ ok: true, reference });
}
