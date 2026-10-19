import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { QuoteLink, WhatsAppLink } from "@/components/QuoteLink";
import { ArrowRight, Chat, Clock, Mail, Phone, Pin } from "@/components/icons";
import { mapsUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Jiugypsum | Call, WhatsApp or Visit Us in Abuja",
  description: "Contact Jiugypsum Nigeria Limited by phone, WhatsApp or email, or send a message. Based at Katampe Extension, Abuja.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact us" title="We'd like to hear from you.">
        <p>Questions about a service, an existing project or working together? Reach us any of these ways.</p>
      </PageHero>

      <section className="section">
        <div className="container two-col">
          <Reveal>
            <h2 style={{ fontSize: "1.6rem" }}>Get in touch</h2>
            <ul className="info-list">
              <li>
                <span className="ic"><Phone /></span>
                <div><b>Call</b><a href={`tel:${site.phone.tel}`}>{site.phone.display}</a></div>
              </li>
              <li>
                <span className="ic"><Chat /></span>
                <div><b>WhatsApp</b><WhatsAppLink location="contact_page" className="">{site.whatsapp.display}</WhatsAppLink></div>
              </li>
              <li>
                <span className="ic"><Mail /></span>
                <div>
                  <b>Email</b>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                  <p className="small muted" style={{ margin: "0.3rem 0 0" }}>
                    Also: {site.otherEmails.map((e, i) => (<span key={e}>{i > 0 && ", "}<a href={`mailto:${e}`}>{e}</a></span>))}
                  </p>
                </div>
              </li>
              <li>
                <span className="ic"><Pin /></span>
                <div>
                  <b>Visit</b>
                  {site.address.lines.map((l) => (<span key={l} style={{ display: "block" }}>{l}</span>))}
                  <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="text-link" style={{ marginTop: "0.6rem" }}>Get directions <ArrowRight /></a>
                </div>
              </li>
              <li>
                <span className="ic"><Clock /></span>
                <div><b>Hours</b>{site.hours.label}</div>
              </li>
            </ul>
            <div style={{ marginTop: "2.5rem", padding: "1.4rem", background: "var(--mist)", borderRadius: "var(--radius)" }}>
              <p style={{ fontWeight: 700, fontFamily: "var(--font-heading)", marginBottom: "0.4rem" }}>Want a price for a project?</p>
              <p className="small muted">The quote form collects everything we need to start.</p>
              <QuoteLink location="contact_secondary" variant="dark" />
            </div>
          </Reveal>
          <Reveal delay={1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
