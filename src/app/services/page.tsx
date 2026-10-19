import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import FaqSection from "@/components/FaqSection";
import CtaBand from "@/components/CtaBand";
import { QuoteLink } from "@/components/QuoteLink";
import { ArrowRight } from "@/components/icons";
import { services } from "@/data/services";
import { faqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Gypsum Ceiling, POP, Drywall & Interior Finishing Services in Abuja",
  description:
    "Gypsum ceiling installation, POP ceiling designs, drywall partitioning, custom TV units, screeding and painting, and interior finishing for homes and commercial spaces in Abuja.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title="Interior finishing, done properly.">
        <p>
          Jiugypsum combines design thinking, skilled installation and careful finishing to deliver ceilings, walls and built-in features for homes, estates, offices and commercial spaces.
        </p>
      </PageHero>

      <div className="container">
        {services.map((s, i) => (
          <article className="svc-detail" id={s.slug} key={s.slug} aria-labelledby={`${s.slug}-title`}>
            <Reveal kind="image" className="svc-detail__media">
              <div className="frame">
                <Image src={s.image.src} alt={s.image.alt} fill sizes="(min-width: 900px) 50vw, 100vw" style={{ objectPosition: "center 40%" }} />
                {s.image.illustrative && <span className="chip chip--illustrative glass">Illustrative image</span>}
              </div>
            </Reveal>
            <Reveal delay={1}>
              <p className="svc-detail__num">{String(i + 1).padStart(2, "0")}</p>
              <h2 id={`${s.slug}-title`}>{s.name}</h2>
              <p className="lede" style={{ fontSize: "1.08rem" }}>
                {s.benefit}
              </p>
              <div className="cols-2">
                <div>
                  <h3>Typical applications</h3>
                  <ul className="ticks">
                    {s.applications.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>What you get</h3>
                  <ul className="ticks">
                    {s.benefits.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="row-actions">
                <QuoteLink location={`service_${s.slug}`} service={s.name} />
                {s.galleryCategory && (
                  <Link href={`/gallery?category=${encodeURIComponent(s.galleryCategory)}`} className="text-link">
                    See related projects <ArrowRight />
                  </Link>
                )}
              </div>
            </Reveal>
          </article>
        ))}
      </div>

      <FaqSection items={faqs.filter((f) => f.services)} />
      <CtaBand location="services_final" />
    </>
  );
}
