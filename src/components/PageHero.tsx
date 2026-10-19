import type { ReactNode } from "react";

export default function PageHero({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <section className="page-hero">
      <div className="container page-hero__grid">
        <div>
          <p className="eyebrow rise">{eyebrow}</p>
          <h1 className="rise" style={{ "--d": 1 } as React.CSSProperties}>
            {title}
          </h1>
        </div>
        {children && (
          <div className="lede rise" style={{ "--d": 2 } as React.CSSProperties}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
