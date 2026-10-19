import Image from "next/image";
import Link from "next/link";
import { QuoteLink } from "../QuoteLink";
import Tilt from "../Tilt";
import { getProject } from "@/data/projects";

const main = getProject("wall2");
const inset = getProject("slat-ceiling");

export default function Hero() {
  const d = (n: number) => ({ "--d": n }) as React.CSSProperties;
  return (
    <section className="hero" aria-labelledby="hero-title">
      {/* Background image layer */}
      <div className="hero__bg" aria-hidden="true">
        <Image
          src={main.image.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero__bg-img"
        />
        <div className="hero__bg-overlay" />
      </div>

      <div className="container hero__grid">
        <div>
          <p className="eyebrow rise" style={d(0)}>
            Interior finishing · Abuja, Nigeria
          </p>
          <h1 id="hero-title" className="rise" style={d(1)}>
            Beautiful Ceilings. <span>Exceptional Interior Finishing.</span>
          </h1>
          <p className="lede rise" style={d(2)}>
            From modern gypsum ceiling designs to drywall partitioning and interior finishing, Jiugypsum helps transform residential and commercial spaces.
          </p>
          <div className="hero__actions rise" style={d(3)}>
            <QuoteLink location="hero" />
            <Link href="/gallery" className="btn btn--outline-light">
              Explore Our Projects
            </Link>
          </div>
          <ul className="hero__meta rise" style={d(4)}>
            <li>Gypsum &amp; POP ceilings</li>
            <li>Drywall partitioning</li>
            <li>Custom TV units</li>
          </ul>
        </div>

        <Tilt className="hero__visual" max={4}>
          <div className="hero__stage">
            <div className="hero__main">
              <Image src={main.image.src} alt={main.image.alt} fill priority sizes="(min-width: 960px) 40vw, 90vw" />
            </div>
            <div className="hero__inset">
              <Image src={inset.image.src} alt={inset.image.alt} fill sizes="(min-width: 960px) 16vw, 36vw" />
            </div>
            <div className="hero__panel glass-dark" role="note">
              <b>
                <i />
                Curved feature wall
              </b>
              <span>Gypsum profile with concealed LED edge lighting.</span>
            </div>
          </div>
        </Tilt>
      </div>
    </section>
  );
}