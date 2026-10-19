import Reveal from "../Reveal";
import { testimonials } from "@/data/testimonials";

/** Renders nothing until genuine, permission-granted testimonials are added to src/data/testimonials.ts */
export default function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section className="section section--mist" aria-labelledby="quotes-title">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">Client feedback</p>
            <h2 id="quotes-title">In their words</h2>
          </div>
        </Reveal>
        <div className="quotes">
          {testimonials.map((t) => (
            <Reveal as="figure" className="quote" key={t.name}>
              <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption>
                <strong>{t.name}</strong>
                {t.detail ? ` · ${t.detail}` : ""}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
