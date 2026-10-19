import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Jiugypsum Nigeria Limited collects, uses and protects personal information submitted through this website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <section className="section--tight" style={{ paddingBottom: "var(--section)" }}>
        <div className="container" style={{ maxWidth: "46rem" }}>
          <p><strong>{site.name}</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) operates {site.url.replace("https://", "")}. This policy explains what information we collect through the website and how we use it. Effective: 2026.</p>

          <h2 style={{ fontSize: "1.4rem", marginTop: "2rem" }}>Information we collect</h2>
          <ul className="ticks">
            <li><strong>Enquiry details:</strong> your name, phone number, email address, project location and description, and any budget or timing you choose to share.</li>
            <li><strong>Photos:</strong> images you choose to attach to a quote request.</li>
            <li><strong>Messages:</strong> what you write in the contact form, or send by email or WhatsApp.</li>
            <li><strong>Usage data:</strong> if analytics is enabled, general information such as pages visited and device type.</li>
          </ul>

          <h2 style={{ fontSize: "1.4rem", marginTop: "2rem" }}>How we use it</h2>
          <ul className="ticks">
            <li>To respond to your enquiry and prepare a quotation.</li>
            <li>To discuss and carry out agreed work.</li>
            <li>To understand how the website is used and improve it.</li>
          </ul>

          <h2 style={{ fontSize: "1.4rem", marginTop: "2rem" }}>How it is handled</h2>
          <p>Quote and contact submissions are sent to our team by email. Photos are not published. We do not sell your personal information. We may share it with service providers who help us run the website and email, or where the law requires.</p>

          <h2 style={{ fontSize: "1.4rem", marginTop: "2rem" }}>Cookies and analytics</h2>
          <p>The website itself does not need cookies to work. If analytics is enabled, it may set cookies to measure traffic.</p>

          <h2 style={{ fontSize: "1.4rem", marginTop: "2rem" }}>Your choices</h2>
          <p>You can ask to see, correct or delete the personal information we hold about you by contacting us below.</p>

          <h2 style={{ fontSize: "1.4rem", marginTop: "2rem" }}>Third-party links</h2>
          <p>We link to services such as WhatsApp and social networks. We are not responsible for their content or privacy practices.</p>

          <h2 style={{ fontSize: "1.4rem", marginTop: "2rem" }}>Changes</h2>
          <p>We may update this page from time to time. The current version is always on this page.</p>

          <h2 style={{ fontSize: "1.4rem", marginTop: "2rem" }}>Contact</h2>
          <p>Email <a href={`mailto:${site.email}`} style={{ textDecoration: "underline" }}>{site.email}</a> · Phone {site.phone.display} · {site.address.locality}, Nigeria</p>
        </div>
      </section>
    </>
  );
}
