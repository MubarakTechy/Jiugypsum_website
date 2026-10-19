"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

/**
 * Scroll-reveal that fails safe:
 *  - server HTML is fully visible (works with JS off, no flash for above-the-fold content)
 *  - only elements that start below the fold are hidden, then revealed on entry
 *  - skipped entirely for prefers-reduced-motion
 */
export default function Reveal({
  as: Tag = "div",
  kind = "up",
  delay = 0,
  className,
  children,
}: {
  as?: ElementType;
  kind?: "up" | "image";
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"idle" | "hidden" | "shown">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return; // already on screen: leave visible
    // eslint-disable-next-line react-hooks/set-state-in-effect -- deliberate: hide only after we know it's below the fold
    setState("hidden");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={className} data-reveal={state === "idle" ? undefined : state} data-kind={kind} style={{ "--d": delay } as CSSProperties}>
      {children}
    </Tag>
  );
}
