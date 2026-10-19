"use client";

import { useId, useState } from "react";
import type { Faq as FaqType } from "@/data/faqs";
import { Plus } from "./icons";

export default function Faq({ items }: { items: FaqType[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const uid = useId();
  return (
    <div className="faq">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div className="faq__item" key={f.q}>
            <h3 style={{ margin: 0, font: "inherit" }}>
              <button type="button" className="faq__q" aria-expanded={isOpen} aria-controls={`${uid}-${i}`} id={`${uid}-q${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                <span>{f.q}</span>
                <span className="faq__icon">
                  <Plus />
                </span>
              </button>
            </h3>
            <div id={`${uid}-${i}`} role="region" aria-labelledby={`${uid}-q${i}`} className={`faq__panel ${isOpen ? "is-open" : ""}`}>
              <div>
                <p>{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
