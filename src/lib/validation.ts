import { services } from "@/data/services";

/** Isomorphic validation — the SAME rules run in the browser and on the server. */

export const SERVICE_OPTIONS = [...services.map((s) => s.name), "Not sure yet / Something else"] as const;
export const PROPERTY_TYPES = ["Residential", "Commercial", "Other"] as const;
export const BUDGET_OPTIONS = [
  "Under ₦500,000",
  "₦500,000 – ₦1,000,000",
  "₦1,000,000 – ₦3,000,000",
  "₦3,000,000 – ₦10,000,000",
  "Above ₦10,000,000",
  "Not sure yet",
] as const;
export const START_OPTIONS = ["As soon as possible", "Within a month", "In 1 to 3 months", "Later / flexible"] as const;
export const ENQUIRY_TYPES = ["General question", "Existing project", "Supplier or partnership", "Other"] as const;

export const FILE_LIMITS = {
  maxFiles: 5,
  maxFileBytes: 3 * 1024 * 1024,
  maxTotalBytes: 4 * 1024 * 1024, // stays under the 4.5 MB request cap on common serverless hosts
  types: ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"],
} as const;

export type FieldErrors<K extends string> = Partial<Record<K, string>>;

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const digits = (s: string) => s.replace(/\D/g, "");
const oneOf = <T extends readonly string[]>(list: T, v: string): v is T[number] => (list as readonly string[]).includes(v);

function checkPhone(raw: string): string | undefined {
  if (!raw) return "Please enter a phone or WhatsApp number.";
  if (!/^[+\d\s()\-.]+$/.test(raw)) return "Use digits only, for example +234 801 234 5678.";
  const n = digits(raw).length;
  if (n < 7 || n > 15) return "That number doesn't look right. Please check it.";
}

/* ── Quote ─────────────────────────────────────────────────────────── */
export type QuoteValues = {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  location: string;
  propertyType: string;
  description: string;
  budget: string;
  startWhen: string;
};
export type QuoteErrors = FieldErrors<keyof QuoteValues>;

export function validateQuote(input: Record<string, unknown>): { values: QuoteValues; errors: QuoteErrors } {
  const v: QuoteValues = {
    fullName: str(input.fullName),
    phone: str(input.phone),
    email: str(input.email),
    service: str(input.service),
    location: str(input.location),
    propertyType: str(input.propertyType),
    description: str(input.description),
    budget: str(input.budget),
    startWhen: str(input.startWhen),
  };
  const e: QuoteErrors = {};

  if (v.fullName.length < 2) e.fullName = "Please enter your full name.";
  else if (v.fullName.length > 100) e.fullName = "That name is too long.";

  const phoneErr = checkPhone(v.phone);
  if (phoneErr) e.phone = phoneErr;

  if (v.email && (!EMAIL_RE.test(v.email) || v.email.length > 150)) e.email = "That email address doesn't look right.";

  if (!oneOf(SERVICE_OPTIONS, v.service)) e.service = "Please choose the service you need.";
  if (v.location.length < 2) e.location = "Please tell us where the project is.";
  else if (v.location.length > 150) e.location = "That is too long. A short area or address is enough.";
  if (!oneOf(PROPERTY_TYPES, v.propertyType)) e.propertyType = "Please choose the property type.";

  if (v.description.length < 10) e.description = "Please describe the work in a sentence or two (at least 10 characters).";
  else if (v.description.length > 3000) e.description = "Please keep this under 3,000 characters.";

  if (v.budget && !oneOf(BUDGET_OPTIONS, v.budget)) e.budget = "Please choose one of the options.";
  if (v.startWhen && !oneOf(START_OPTIONS, v.startWhen)) e.startWhen = "Please choose one of the options.";

  return { values: v, errors: e };
}

/* ── Contact ───────────────────────────────────────────────────────── */
export type ContactValues = { fullName: string; contact: string; enquiryType: string; message: string };
export type ContactErrors = FieldErrors<keyof ContactValues>;

export function validateContact(input: Record<string, unknown>): { values: ContactValues; errors: ContactErrors } {
  const v: ContactValues = {
    fullName: str(input.fullName),
    contact: str(input.contact),
    enquiryType: str(input.enquiryType),
    message: str(input.message),
  };
  const e: ContactErrors = {};
  if (v.fullName.length < 2) e.fullName = "Please enter your full name.";
  else if (v.fullName.length > 100) e.fullName = "That name is too long.";

  if (!v.contact) e.contact = "Please give us a phone number or email so we can reply.";
  else if (v.contact.includes("@")) {
    if (!EMAIL_RE.test(v.contact) || v.contact.length > 150) e.contact = "That email address doesn't look right.";
  } else {
    const p = checkPhone(v.contact);
    if (p) e.contact = p;
  }
  if (!oneOf(ENQUIRY_TYPES, v.enquiryType)) e.enquiryType = "Please choose what your enquiry is about.";
  if (v.message.length < 10) e.message = "Please write a short message (at least 10 characters).";
  else if (v.message.length > 3000) e.message = "Please keep this under 3,000 characters.";
  return { values: v, errors: e };
}

/* ── Files (shared by client pre-checks and server enforcement) ───── */
export function checkFileMeta(files: { name: string; size: number; type: string }[]): string | undefined {
  if (files.length > FILE_LIMITS.maxFiles) return `You can attach up to ${FILE_LIMITS.maxFiles} photos.`;
  let total = 0;
  for (const f of files) {
    if (!(FILE_LIMITS.types as readonly string[]).includes(f.type)) return `"${f.name}" isn't a supported image. Please use JPG, PNG or WebP.`;
    if (f.size > FILE_LIMITS.maxFileBytes) return `"${f.name}" is larger than ${FILE_LIMITS.maxFileBytes / 1024 / 1024} MB.`;
    total += f.size;
  }
  if (total > FILE_LIMITS.maxTotalBytes) return `Photos can total at most ${FILE_LIMITS.maxTotalBytes / 1024 / 1024} MB. Try fewer or smaller photos.`;
}

/** Server-side: confirm the bytes really are an image, not just a claimed MIME type. */
export function sniffImage(buf: Uint8Array): boolean {
  const is = (...b: number[]) => b.every((x, i) => buf[i] === x);
  if (buf.length < 12) return false;
  if (is(0xff, 0xd8, 0xff)) return true; // jpeg
  if (is(0x89, 0x50, 0x4e, 0x47)) return true; // png
  if (is(0x52, 0x49, 0x46, 0x46) && buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50) return true; // webp
  if (buf[4] === 0x66 && buf[5] === 0x74 && buf[6] === 0x79 && buf[7] === 0x70) return true; // heic/heif (ftyp)
  return false;
}
