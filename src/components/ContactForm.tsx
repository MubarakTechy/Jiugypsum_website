
"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { track } from "@/lib/analytics";
import {
  ENQUIRY_TYPES,
  validateContact,
  type ContactErrors,
} from "@/lib/validation";
import { site, whatsappUrl } from "@/lib/site";
import { Field, describe } from "./Field";
import { Check } from "./icons";

type Status = "idle" | "sending" | "success";

export default function ContactForm() {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");
  const startedAt = useRef(Date.now());
  const busy = useRef(false);

  async function onSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (busy.current) return;

    const form = e.currentTarget;
    const data = Object.fromEntries(
      new FormData(form).entries()
    );

    const { errors: errs } = validateContact(data);

    setErrors(errs);
    setFormError("");

    const first = Object.keys(errs)[0];

    if (first) {
      form.querySelector<HTMLElement>(
        `[name="${first}"]`
      )?.focus();
      return;
    }

    busy.current = true;
    setStatus("sending");

    // Open the tab directly from the click to reduce
    // the chance of the browser blocking the popup.
    const whatsappTab = window.open("about:blank", "_blank");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          startedAt: startedAt.current,
        }),
      });

      const body = await res.json().catch(() => ({}));

      if (!res.ok || !body.ok || !body.whatsappUrl) {
        whatsappTab?.close();

        if (body.errors) {
          setErrors(body.errors);
        }

        setFormError(
          body.error ??
            "Something went wrong. Please try again."
        );

        busy.current = false;
        setStatus("idle");
        return;
      }

      if (whatsappTab) {
        whatsappTab.location.href = body.whatsappUrl;
      } else {
        // Fallback if the browser blocks a new tab.
        window.location.href = body.whatsappUrl;
        return;
      }

      track("contact_whatsapp_opened");

      setStatus("success");
      form.reset();
    } catch {
      whatsappTab?.close();

      setFormError(
        "We couldn't connect. Check your connection and try again. Your message is still here."
      );

      busy.current = false;
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <div className="form-card success" role="status">
        <div className="tick">
          <Check />
        </div>

        <h2>Continue in WhatsApp</h2>

        <p>
          Your enquiry is ready. Please press Send in
          WhatsApp to deliver your message to Jiugypsum.
        </p>

        <p className="small muted">
          Need a price for a project? The{" "}
          <Link
            href="/get-a-quote"
            style={{ textDecoration: "underline" }}
          >
            quote form
          </Link>{" "}
          gives us the details needed to prepare your quote.
        </p>
      </div>
    );
  }

  return (
    <form
      className="form-card"
      onSubmit={onSubmit}
      noValidate
      aria-labelledby="contact-form-title"
    >
      <h2 id="contact-form-title">Send us a message</h2>

      <p className="muted small">
        For general questions. If you want a price for a
        project, use the quote form instead.
      </p>

      {formError && (
        <div className="alert alert--error" role="alert">
          {formError}{" "}
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp us
          </a>{" "}
          or call{" "}
          <a href={`tel:${site.phone.tel}`}>
            {site.phone.display}
          </a>.
        </div>
      )}

      <div className="hp" aria-hidden="true">
        <label>
          Leave this empty
          <input
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div className="fields fields--2">
        <Field
          id="c-name"
          label="Full name"
          error={errors.fullName}
        >
          <input
            id="c-name"
            name="fullName"
            className="input"
            autoComplete="name"
            aria-invalid={!!errors.fullName}
            aria-describedby={describe(
              "c-name",
              errors.fullName
            )}
          />
        </Field>

        <Field
          id="c-contact"
          label="Phone number or email"
          error={errors.contact}
        >
          <input
            id="c-contact"
            name="contact"
            className="input"
            autoComplete="email"
            aria-invalid={!!errors.contact}
            aria-describedby={describe(
              "c-contact",
              errors.contact
            )}
          />
        </Field>

        <Field
          id="c-type"
          label="What is this about?"
          error={errors.enquiryType}
          className="span-2"
        >
          <select
            id="c-type"
            name="enquiryType"
            className="select"
            defaultValue=""
            aria-invalid={!!errors.enquiryType}
            aria-describedby={describe(
              "c-type",
              errors.enquiryType
            )}
          >
            <option value="" disabled>
              Choose one…
            </option>

            {ENQUIRY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id="c-msg"
          label="Message"
          error={errors.message}
          className="span-2"
        >
          <textarea
            id="c-msg"
            name="message"
            className="textarea"
            aria-invalid={!!errors.message}
            aria-describedby={describe(
              "c-msg",
              errors.message
            )}
          />
        </Field>
      </div>

      <button
        type="submit"
        className="btn btn--dark btn--block"
        disabled={status === "sending"}
        style={{ marginTop: "1.5rem" }}
      >
        {status === "sending" ? (
          <>
            <span className="spinner" aria-hidden />
            Preparing WhatsApp…
          </>
        ) : (
          "Continue to WhatsApp"
        )}
      </button>

      <p className="privacy-note">
        We use your details only to respond to your enquiry.
        See our <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </form>
  );
}
