import { site } from "@/lib/site";

/** Verified facts only. Add confirmed numbers to site.verifiedStats and they appear here automatically. */
export default function TrustStrip() {
  const items =
    site.verifiedStats.length > 0
      ? site.verifiedStats.map((s) => ({ k: s.label, v: s.value }))
      : [
          { k: "Projects", v: "Homes, offices & hospitality" },
          { k: "Based in", v: "Abuja, Nigeria" },
          { k: "Services", v: "Ceilings · Drywall · Finishing" },
          { k: "Company", v: "CAC-registered" },
        ];
  return (
    <section className="trust" aria-label="At a glance">
      <div className="container">
        <dl className="trust__grid" style={{ margin: 0 }}>
          {items.map((i) => (
            <div className="trust__item" key={i.k}>
              <dt>{i.k}</dt>
              <dd>{i.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
