import Image from "next/image";
import Link from "next/link";
import Reveal from "../Reveal";
import Tilt from "../Tilt";
import { ArrowRight, ArrowUpRight } from "../icons";
import { featuredSlugs, getProject } from "@/data/projects";

export default function FeaturedProjects() {
  const items = featuredSlugs.map(getProject);
  return (
    <section className="section" aria-labelledby="featured-title">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 id="featured-title">Interiors we&apos;ve finished</h2>
          </div>
          <Link href="/gallery" className="text-link">
            View All Projects <ArrowRight />
          </Link>
        </Reveal>

        <div className="editorial">
          {items.map((p, i) => (
            <Reveal key={p.slug} delay={i % 2}>
              <Tilt max={2.5}>
                <Link href={`/gallery?project=${p.slug}`} className="feature zoom tilt" aria-label={`${p.title} — view in gallery`}>
                  <div className="frame">
                    <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 760px) 55vw, 100vw" style={{ objectPosition: i === 3 ? "center 35%" : "center" }} />
                  </div>
                  <div className="feature__cap glass">
                    <div>
                      <small>{p.category}</small>
                      <h3>{p.title}</h3>
                    </div>
                    <ArrowUpRight />
                  </div>
                </Link>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
