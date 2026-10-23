
import {
  FILE_LIMITS,
  checkFileMeta,
  sniffImage,
  validateQuote,
} from "@/lib/validation";

import { clientIp, rateLimited } from "@/lib/rate-limit";

import {
  mailConfigured,
  rowsToHtml,
  sendNotification,
  type MailAttachment,
} from "@/lib/mail";

export const runtime = "nodejs";

const json = (body: unknown, status = 200) =>
  Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });

function makeReference() {
  const d = new Date()
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, "");

  return `JQ-${d}-${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}`;
}

const safeName = (n: string) =>
  n.replace(/[^\w.\-]+/g, "_").slice(0, 80) || "photo";

export async function POST(req: Request) {
  // 1. Rate limiting
  if (
    rateLimited(
      `quote:${clientIp(req)}`,
      5,
      10 * 60 * 1000
    )
  ) {
    return json(
      {
        ok: false,
        error:
          "You've sent several requests recently. Please wait a few minutes or contact us on WhatsApp.",
      },
      429
    );
  }

  // 2. Read the multipart form, including photos
  let form: FormData;

  try {
    form = await req.formData();
  } catch {
    return json(
      {
        ok: false,
        error:
          "We couldn't read your submission. Please try again.",
      },
      400
    );
  }

  // 3. Honeypot bot protection
  if (
    String(form.get("company_website") ?? "").trim()
  ) {
    return json({
      ok: true,
      reference: "JQ-RECEIVED",
    });
  }

  // 4. Reject submissions that arrive too quickly
  const startedAt = Number(form.get("startedAt"));

  if (
    Number.isFinite(startedAt) &&
    startedAt > 0 &&
    Date.now() - startedAt < 2500
  ) {
    return json(
      {
        ok: false,
        error:
          "That was very quick. Please check your details and send again.",
      },
      400
    );
  }

  // 5. Validate all quote fields
  const { values, errors } = validateQuote(
    Object.fromEntries(form.entries())
  );

  if (Object.keys(errors).length) {
    return json(
      {
        ok: false,
        error: "Please fix the highlighted fields.",
        errors,
      },
      422
    );
  }

  // 6. Validate uploaded photos
  const uploads = form
    .getAll("photos")
    .filter(
      (f): f is File =>
        typeof f !== "string" && f.size > 0
    );

  const metaError = checkFileMeta(
    uploads.map((f) => ({
      name: f.name,
      size: f.size,
      type: f.type,
    }))
  );

  if (metaError) {
    return json(
      {
        ok: false,
        error: metaError,
        errors: { photos: metaError },
      },
      422
    );
  }

  const attachments: MailAttachment[] = [];

  for (const f of uploads.slice(0, FILE_LIMITS.maxFiles)) {
    const buf = Buffer.from(await f.arrayBuffer());

    if (!sniffImage(buf)) {
      const msg = `"${f.name}" doesn't look like a real image file.`;

      return json(
        {
          ok: false,
          error: msg,
          errors: { photos: msg },
        },
        422
      );
    }

    attachments.push({
      filename: safeName(f.name),
      content: buf,
      contentType: f.type,
    });
  }

  // 7. Get Jiugypsum's WhatsApp number from the environment
  const businessNumber =
    process.env.WHATSAPP_BUSINESS_NUMBER?.replace(
      /\D/g,
      ""
    );

  if (!businessNumber) {
    console.error(
      "[quote] WhatsApp business number is not configured."
    );

    return json(
      {
        ok: false,
        error:
          "Our contact service is temporarily unavailable. Please contact us directly on WhatsApp.",
      },
      503
    );
  }

  // 8. Create a unique quote reference and message details
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

  // 9. Prepare the WhatsApp message.
  // Uploaded photos are not embedded in this link.
  const whatsappMessage = [
    "Hello Jiugypsum, I'd like to request a project quote.",
    "",
    "New website quote request",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Please let me know the next steps. Thank you.",
  ].join("\n");

  const whatsappUrl =
    `https://wa.me/${businessNumber}?text=` +
    encodeURIComponent(whatsappMessage);

  // 10. Send the existing email notification when configured.
  // WhatsApp handoff can still proceed if email delivery fails.
  let emailSent = false;

  if (mailConfigured()) {
    try {
      await sendNotification({
        subject: `New quote request ${reference}: ${values.service} (${values.fullName})`,
        text: rows
          .map(([key, value]) => `${key}: ${value}`)
          .join("\n"),
        html: rowsToHtml("New quote request", rows),
        replyTo: values.email || undefined,
        attachments,
      });

      emailSent = true;
    } catch (err) {
      console.error(
        "[quote] Email notification failed:",
        err
      );
    }
  } else {
    console.warn(
      "[quote] SMTP not configured; email notification skipped."
    );
  }

  // 11. Return the URL for the frontend to open.
  return json({
    ok: true,
    reference,
    whatsappUrl,
    emailSent,
  });
}
