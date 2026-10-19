import type { Metadata } from "next";
import { Suspense } from "react";
import QuoteForm from "@/components/QuoteForm";
import { WhatsAppLink } from "@/components/QuoteLink";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get a Free Quote | Gypsum Ceiling & Interior Finishing, Abuja",
  description: "Tell Jiugypsum about your space and the work you have in mind. We'll review your requirements and discuss the next steps toward a quotation.",
  alternates: { canonical: "/get-a-quote" },
};

export default function QuotePage() {
  return (
    <section className="page-hero" style={{ paddingBottom: "var(--section)" }}>
      <div className="container two-col">
        <div className="sticky">
          <p className="eyebrow rise">Free quotation</p>
          <h1 className="rise" style={{ "--d": 1 } as React.CSSProperties}>Let&apos;s Talk About Your Project.</h1>
          <p className="lede rise" style={{ "--d": 2 } as React.CSSProperties}>
            Tell us a little about your space and the work you have in mind. Our team can review your requirements and discuss the next steps toward a quotation.
          </p>
          <h2 style={{ fontSize: "1.1rem", marginTop: "2rem" }}>What happens next</h2>
          <ol className="next-steps">
            <li><span>You send the details. It takes a few minutes.</span></li>
            <li><span>We review them and get in touch with any questions.</span></li>
            <li><span>We discuss the requirements and the next steps toward your quotation.</span></li>
          </ol>
          <p className="small muted" style={{ marginTop: "2rem" }}>
            Prefer to talk? Call <a href={`tel:${site.phone.tel}`} style={{ textDecoration: "underline" }}>{site.phone.display}</a> or{" "}
            <WhatsAppLink location="quote_page" className="">
              <span style={{ textDecoration: "underline" }}>message us on WhatsApp</span>
            </WhatsAppLink>.
          </p>
        </div>
        <Suspense fallback={<div className="form-card">Loading form…</div>}>
          <QuoteForm />
        </Suspense>
      </div>
    </section>
  );
}
