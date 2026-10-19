import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Parallax from "@/components/Parallax";
import CtaBand from "@/components/CtaBand";
import { ArrowRight } from "@/components/icons";
import { getProject } from "@/data/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Jiugypsum | Gypsum & Interior Finishing Company in Abuja",
  description: "Jiugypsum Nigeria Limited is an Abuja gypsum ceiling, POP and interior finishing company focused on clean, durable work and clear communication.",
  alternates: { canonical: "/about" },
};

const strip = ["lounge-arches", "restaurant-ceiling", "curved-wall-led"].map(getProject);
const intro = getProject("lounge-arches").image;

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About us" title="Quality finishing, without the shortcuts.">
        <p>Jiugypsum Nigeria Limited is a gypsum ceiling, POP design and interior finishing company based in Abuja.</p>
      </PageHero>

      <section className="section">
        <div className="container about-intro">
          <Reveal>
            <h2>Who we are</h2>
            <p className="lede">We transform residential and commercial spaces into elegant, functional environments using modern techniques and quality materials.</p>
            <p>Jiugypsum was established to tackle a familiar problem: poor finishing and low-quality gypsum work. We aim to be known for clean, durable, modern interior solutions across Abuja and beyond.</p>
            <p className="small muted">{site.registration}.</p>
          </Reveal>
          <Reveal kind="image">
            <Parallax speed={0.05}>
              <div className="frame">
                <Image src={intro.src} alt={intro.alt} fill sizes="(min-width: 900px) 40vw, 90vw" />
              </div>
            </Parallax>
          </Reveal>
        </div>
      </section>

      <section className="section section--mist">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Our vision</p>
            <p className="vision">Not to become the largest company, but to build a reliable way of working that frees clients from poor materials and unethical practices.</p>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="approach-title">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <p className="eyebrow">How we work</p>
              <h2 id="approach-title">Our approach</h2>
            </div>
          </Reveal>
          <div className="pillars">
            {[
              { t: "Quality materials", p: "We choose durable, tested gypsum materials and explain the options so you can decide with confidence." },
              { t: "Skilled installation", p: "Our work is carried out by skilled professionals using modern installation techniques." },
              { t: "Safety on site", p: "We look after our workers, follow health and safety requirements and client site rules, and learn from any incidents or near misses." },
            ].map((x, i) => (
              <Reveal className="pillar" key={x.t} delay={i}>
                <h3>{x.t}</h3>
                <p>{x.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="about-work">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 id="about-work">See the finish for yourself</h2>
            </div>
            <Link href="/gallery" className="text-link">
              Visit the Gallery <ArrowRight />
            </Link>
          </Reveal>
          <div className="strip">
            {strip.map((p, i) => (
              <Reveal kind="image" delay={i} key={p.slug}>
                <Link href={`/gallery?project=${p.slug}`} className="zoom" aria-label={p.title}>
                  <div className="frame">
                    <Image src={p.image.src} alt={p.image.alt} fill sizes="33vw" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <p className="small muted" style={{ marginTop: "1.5rem" }}>
            Worked with us? <a href={site.googleReviewUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>Leave a review on Google</a>.
          </p>
        </div>
      </section>

      <CtaBand location="about_final" title="Let's Build Something Beautiful" text="Start your project with a team that cares how it looks when the work is done." />
    </>
  );
}
