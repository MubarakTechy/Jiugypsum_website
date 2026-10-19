import Image from "next/image";
import Link from "next/link";
import Reveal from "../Reveal";
import { ArrowRight } from "../icons";
import { services } from "@/data/services";

export default function ServicesOverview() {
  return (
    <section className="section section--mist" aria-labelledby="services-title">
      <div className="container split-sticky">
        <Reveal>
          <p className="eyebrow">What we do</p>
          <h2 id="services-title">Ceilings, walls and the finishing in between</h2>
          <p className="lede">Every service is aimed at one thing: a space that looks right on the day you move in and still looks right years later.</p>
          <Link href="/services" className="btn btn--dark">
            Explore All Services <ArrowRight />
          </Link>
        </Reveal>

        <ol className="svc-list">
          {services.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={Math.min(i, 3) * 0.5}>
              <Link href={`/services#${s.slug}`} className="svc-row zoom">
                <span className="svc-row__num">{String(i + 1).padStart(2, "0")}</span>
                <div className="svc-row__body">
                  <h3>{s.name}</h3>
                  <p>{s.short}</p>
                </div>
                <div className="frame svc-row__thumb">
                  <Image src={s.image.src} alt={s.image.alt} fill sizes="(min-width: 800px) 200px, 360px" />
                </div>
                <span className="svc-row__go" aria-hidden>
                  <ArrowRight />
                </span>
              </Link>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
