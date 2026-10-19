import Image from "next/image";
import Reveal from "../Reveal";
import Parallax from "../Parallax";
import { QuoteLink } from "../QuoteLink";
import { getProject } from "@/data/projects";

const img = getProject("drywall-framing").image;

const points = [
  { t: "Attention to finishing details", p: "Straight lines, clean edges and well-prepared surfaces. The things you notice once the room is lived in." },
  { t: "Clear communication", p: "You know what is happening and what comes next, from first call to final walkthrough." },
  { t: "Material and design guidance", p: "Not sure what suits your space? We talk through the options and help you choose." },
  { t: "A straightforward quotation process", p: "Tell us about the project and we come back with the questions and next steps. No guesswork." },
  { t: "Commitment to the agreed scope", p: "We confirm what is included before work begins, and build to that." },
];

export default function WhyChoose() {
  return (
    <section className="section section--dark on-dark" aria-labelledby="why-title">
      <div className="container why">
        <Reveal kind="image">
          <Parallax speed={0.04}>
            <div className="frame why__img">
              <Image src={img.src} alt={img.alt} fill sizes="(min-width: 960px) 40vw, 90vw" />
            </div>
          </Parallax>
        </Reveal>
        <Reveal delay={1}>
          <p className="eyebrow">Why Jiugypsum</p>
          <h2 id="why-title">Built on the details people notice</h2>
          <ul className="why__list">
            {points.map((x) => (
              <li key={x.t}>
                <div>
                  <h3>{x.t}</h3>
                  <p>{x.p}</p>
                </div>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: "2rem" }}>
            <QuoteLink location="why_choose" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
