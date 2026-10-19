import Reveal from "../Reveal";
import { processSteps } from "@/data/process";

export default function Process() {
  return (
    <section className="section" aria-labelledby="process-title">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">How it works</p>
            <h2 id="process-title">From first message to finished room</h2>
          </div>
        </Reveal>
        <ol className="steps">
          {processSteps.map((s, i) => (
            <Reveal as="li" className="step" key={s.title} delay={i * 0.6}>
              <i aria-hidden />
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
