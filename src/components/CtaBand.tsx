import Image from "next/image";
import Link from "next/link";
import { QuoteLink } from "./QuoteLink";
import Parallax from "./Parallax";
import Reveal from "./Reveal";

export default function CtaBand({
  location,
  title = "Ready to Transform Your Space?",
  text = "Tell us about your project, and let's discuss the right interior-finishing solution for your space.",
  secondary = { href: "/contact", label: "Contact Us" },
}: {
  location: string;
  title?: string;
  text?: string;
  secondary?: { href: string; label: string } | null;
}) {
  return (
    <section className="cta-band" aria-labelledby={`cta-${location}`}>
      <Parallax className="cta-band__bg" speed={0.05}>
        <Image src="/images/projects/curved-wall-led.webp" alt="" fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "center 40%" }} />
      </Parallax>
      <div className="container">
        <Reveal>
          <p className="eyebrow">Free quotation</p>
          <h2 id={`cta-${location}`}>{title}</h2>
          <p className="lede">{text}</p>
          <div className="cta-band__actions">
            <QuoteLink location={location} />
            {secondary && (
              <Link href={secondary.href} className="btn btn--outline-light">
                {secondary.label}
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
