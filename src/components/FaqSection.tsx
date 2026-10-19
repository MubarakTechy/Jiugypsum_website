import type { Faq as FaqType } from "@/data/faqs";
import { site, whatsappUrl } from "@/lib/site";
import Faq from "./Faq";
import { QuoteLink } from "./QuoteLink";
import Reveal from "./Reveal";
import JsonLd from "./JsonLd";

/** FAQs live at the bottom of Home and Services, before the final CTA. Never in the main navigation. */
export default function FaqSection({ items }: { items: FaqType[] }) {
  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="container faq-wrap">
        <Reveal>
          <p className="eyebrow">Questions</p>
          <h2 id="faq-title">Before you get in touch</h2>
          <p className="lede">Straight answers to what people usually ask us first. If yours isn&apos;t here, just ask.</p>
          <p className="small muted">
            Call <a href={`tel:${site.phone.tel}`} style={{ textDecoration: "underline" }}>{site.phone.display}</a> or{" "}
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>message us on WhatsApp</a>.
          </p>
          <QuoteLink location="faq" variant="outline" />
        </Reveal>
        <Reveal delay={1}>
          <Faq items={items} />
        </Reveal>
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
    </section>
  );
}
