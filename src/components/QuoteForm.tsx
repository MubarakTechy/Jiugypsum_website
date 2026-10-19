"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { track } from "@/lib/analytics";
import { BUDGET_OPTIONS, FILE_LIMITS, PROPERTY_TYPES, SERVICE_OPTIONS, START_OPTIONS, checkFileMeta, validateQuote, type QuoteErrors } from "@/lib/validation";
import { services } from "@/data/services";
import { site, whatsappUrl } from "@/lib/site";
import { Field, describe } from "./Field";
import { ArrowRight, Check, Close } from "./icons";

type Status = "idle" | "sending" | "success";
type Errs = QuoteErrors & { photos?: string };

/** Resize + re-encode phone photos in the browser so uploads stay small and reliable. Falls back to the original. */
async function compress(file: File): Promise<File> {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type) || file.size < 400 * 1024) return file;
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", 0.82));
    if (!blob || blob.size >= file.size) return file;
    return new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" });
  } catch {
    return file;
  }
}

export default function QuoteForm() {
  const params = useSearchParams();
  const preset = params.get("service");
  const presetService = SERVICE_OPTIONS.find((s) => s === preset) ?? services.find((s) => s.slug === preset)?.name ?? "";

  const [errors, setErrors] = useState<Errs>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [done, setDone] = useState<{ ref: string; name: string } | null>(null);
  const started = useRef(false);
  const startedAt = useRef(Date.now());
  const busy = useRef(false);

  useEffect(() => {
    const urls = files.map((f) => URL.createObjectURL(f));
    // eslint-disable-next-line react-hooks/set-state-in-effect -- derive object URLs and revoke them on change
    setPreviews(urls);
    return () => urls.forEach(URL.revokeObjectURL);
  }, [files]);

  const onStart = () => {
    if (started.current) return;
    started.current = true;
    track("quote_form_start", { service: presetService || undefined });
  };

  async function addFiles(list: FileList | null) {
    if (!list?.length) return;
    const picked = await Promise.all(Array.from(list).map(compress));
    const next = [...files, ...picked];
    const problem = checkFileMeta(next);
    if (problem) {
      setErrors((e) => ({ ...e, photos: problem }));
      return;
    }
    setErrors((e) => ({ ...e, photos: undefined }));
    setFiles(next);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy.current) return; // block duplicate submissions
    const form = e.currentTarget;
    const fd = new FormData(form);
    const { errors: errs } = validateQuote(Object.fromEntries(fd.entries()));
    setErrors(errs);
    setFormError("");
    const first = Object.keys(errs)[0];
    if (first) {
      (form.querySelector(`[name="${first}"]`) as HTMLElement | null)?.focus();
      return;
    }

    busy.current = true;
    setStatus("sending");
    track("quote_form_submit"); // attempt; success is tracked separately after the server confirms
    fd.delete("photos");
    files.forEach((f) => fd.append("photos", f, f.name));
    fd.set("startedAt", String(startedAt.current));

    try {
      const res = await fetch("/api/quote", { method: "POST", body: fd });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body.ok) {
        track("quote_form_success", { service: String(fd.get("service") ?? "") });
        setDone({ ref: body.reference, name: String(fd.get("fullName")).split(" ")[0] });
        setStatus("success");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (body.errors) setErrors(body.errors);
      setFormError(body.error ?? "Something went wrong. Please try again.");
    } catch {
      setFormError("We couldn't reach the server. Check your connection and try again. Everything you entered is still here.");
    }
    busy.current = false;
    setStatus("idle"); // form stays mounted, so entered data is preserved
  }

  if (status === "success" && done) {
    return (
      <div className="form-card success" role="status" aria-live="polite">
        <div className="tick"><Check /></div>
        <h2>Thank you, {done.name}. We&apos;ve got your request.</h2>
        <p>Your reference is <span className="ref">{done.ref}</span></p>
        <p>Here&apos;s what happens next:</p>
        <ol className="next-steps">
          <li><span>Our team reviews the details you sent.</span></li>
          <li><span>We contact you on the phone number or email you gave to ask any questions and discuss the requirements.</span></li>
          <li><span>We take it from there toward your quotation and, once you&apos;re happy, confirm scope and schedule.</span></li>
        </ol>
        <p style={{ marginTop: "1.5rem" }}>
          Have more photos or drawings? <a href={whatsappUrl(`Hello Jiugypsum, my quote reference is ${done.ref}. I'd like to send more details.`)} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", fontWeight: 700 }}>Send them on WhatsApp</a>.
        </p>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={onSubmit} onChange={onStart} noValidate aria-labelledby="quote-form-title">
      <h2 id="quote-form-title">Your project details</h2>

      {formError && (
        <div className="alert alert--error" role="alert">
          {formError} You can also <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">WhatsApp us</a> or call <a href={`tel:${site.phone.tel}`}>{site.phone.display}</a>.
        </div>
      )}

      <div className="hp" aria-hidden="true">
        <label>Leave this empty<input type="text" name="company_website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <fieldset>
        <legend>About you</legend>
        <div className="fields fields--2">
          <Field id="q-name" label="Full name" error={errors.fullName}>
            <input id="q-name" name="fullName" className="input" autoComplete="name" placeholder="e.g. Amina Yusuf" aria-invalid={!!errors.fullName} aria-describedby={describe("q-name", errors.fullName)} />
          </Field>
          <Field id="q-phone" label="Phone or WhatsApp number" error={errors.phone}>
            <input id="q-phone" name="phone" type="tel" inputMode="tel" className="input" autoComplete="tel" placeholder="+234 801 234 5678" aria-invalid={!!errors.phone} aria-describedby={describe("q-phone", errors.phone)} />
          </Field>
          <Field id="q-email" label="Email address" optional error={errors.email} className="span-2">
            <input id="q-email" name="email" type="email" className="input" autoComplete="email" placeholder="you@example.com" aria-invalid={!!errors.email} aria-describedby={describe("q-email", errors.email)} />
          </Field>
        </div>
      </fieldset>

      <fieldset>
        <legend>Your project</legend>
        <div className="fields fields--2">
          <Field id="q-service" label="Service required" error={errors.service} className="span-2">
            <select id="q-service" name="service" className="select" defaultValue={presetService} key={presetService} aria-invalid={!!errors.service} aria-describedby={describe("q-service", errors.service)}>
              <option value="" disabled>Choose a service…</option>
              {SERVICE_OPTIONS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </Field>
          <Field id="q-loc" label="Project location" error={errors.location} hint="Area or address, e.g. Katampe, Abuja">
            <input id="q-loc" name="location" className="input" autoComplete="off" placeholder="Area / address" aria-invalid={!!errors.location} aria-describedby={describe("q-loc", errors.location, "hint")} />
          </Field>
          <div className="field">
            <span className="label" id="q-prop-label">Property type</span>
            <div className="choice" role="radiogroup" aria-labelledby="q-prop-label" aria-invalid={!!errors.propertyType} aria-describedby={errors.propertyType ? "q-prop-err" : undefined}>
              {PROPERTY_TYPES.map((p) => (
                <label key={p}><input type="radio" name="propertyType" value={p} /><span>{p}</span></label>
              ))}
            </div>
            {errors.propertyType && <p className="err" id="q-prop-err" role="alert">{errors.propertyType}</p>}
          </div>
          <Field id="q-desc" label="Project description" error={errors.description} hint="Rooms or areas, rough sizes, the look you want, anything we should know." className="span-2">
            <textarea id="q-desc" name="description" className="textarea" placeholder="Tell us about the space and the work you have in mind…" aria-invalid={!!errors.description} aria-describedby={describe("q-desc", errors.description, "hint")} />
          </Field>
        </div>
      </fieldset>

      <fieldset>
        <legend>Helpful extras</legend>
        <div className="fields fields--2">
          <Field id="q-budget" label="Budget range" optional error={errors.budget}>
            <select id="q-budget" name="budget" className="select" defaultValue="">
              <option value="">Prefer not to say</option>
              {BUDGET_OPTIONS.map((b) => <option key={b}>{b}</option>)}
            </select>
          </Field>
          <Field id="q-start" label="Expected start" optional error={errors.startWhen}>
            <select id="q-start" name="startWhen" className="select" defaultValue="">
              <option value="">Not sure yet</option>
              {START_OPTIONS.map((b) => <option key={b}>{b}</option>)}
            </select>
          </Field>
          <div className="field span-2">
            <label htmlFor="q-photos">Photos or inspiration images <span className="opt">(optional)</span></label>
            <div className="upload">
              <input id="q-photos" type="file" accept={FILE_LIMITS.types.join(",")} multiple onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} aria-describedby="q-photos-hint" aria-invalid={!!errors.photos} />
              {previews.length > 0 && (
                <ul className="thumbs" aria-label="Selected photos">
                  {previews.map((src, i) => (
                    <li key={src}>
                      {/* eslint-disable-next-line @next/next/no-img-element -- local blob preview */}
                      <img src={src} alt={`Selected photo ${i + 1}: ${files[i]?.name}`} />
                      <button type="button" onClick={() => setFiles((f) => f.filter((_, j) => j !== i))} aria-label={`Remove ${files[i]?.name}`}><Close /></button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <p className="hint" id="q-photos-hint">Up to {FILE_LIMITS.maxFiles} photos (JPG, PNG or WebP), {FILE_LIMITS.maxTotalBytes / 1024 / 1024} MB in total. Large photos are shrunk automatically.</p>
            {errors.photos && <p className="err" role="alert">{errors.photos}</p>}
          </div>
        </div>
      </fieldset>

      <button type="submit" className="btn btn--primary btn--block" disabled={status === "sending"}>
        {status === "sending" ? (<><span className="spinner" aria-hidden /> Sending your request…</>) : (<>Send My Request <ArrowRight /></>)}
      </button>
      <p className="privacy-note">
        We use these details only to respond to your request and prepare your quotation. Photos are sent to our team by email and are not published. See our <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </form>
  );
}
