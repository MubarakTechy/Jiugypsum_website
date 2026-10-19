"use client";

import { useRef, type ElementType, type ReactNode } from "react";

/** Gentle pointer-driven tilt. Desktop (hover + fine pointer) only; no-op for touch and reduced motion. */
export default function Tilt({ as: Tag = "div", max = 5, className, children }: { as?: ElementType; max?: number; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  const enabled = () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || !enabled()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", `${(x * max * 2).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${(-y * max * 2).toFixed(2)}deg`);
  };
  const reset = () => {
    ref.current?.style.removeProperty("--rx");
    ref.current?.style.removeProperty("--ry");
  };

  return (
    <Tag ref={ref} className={className} onPointerMove={move} onPointerLeave={reset}>
      {children}
    </Tag>
  );
}
