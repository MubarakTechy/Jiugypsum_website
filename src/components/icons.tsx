import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, focusable: false } as const;

export const ArrowRight = (p: P) => (<svg {...base} className="arrow" {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
export const ArrowUpRight = (p: P) => (<svg {...base} {...p}><path d="M7 17 17 7M8 7h9v9" /></svg>);
export const Plus = (p: P) => (<svg {...base} strokeWidth={2.5} {...p}><path d="M12 5v14M5 12h14" /></svg>);
export const Check = (p: P) => (<svg {...base} strokeWidth={2.5} {...p}><path d="M20 6 9 17l-5-5" /></svg>);
export const Close = (p: P) => (<svg {...base} {...p}><path d="M18 6 6 18M6 6l12 12" /></svg>);
export const Menu = (p: P) => (<svg {...base} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>);
export const Chevron = ({ dir = "right", ...p }: P & { dir?: "left" | "right" }) => (<svg {...base} {...p}><path d={dir === "right" ? "m9 6 6 6-6 6" : "m15 6-6 6 6 6"} /></svg>);
export const Phone = (p: P) => (<svg {...base} {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>);
export const Chat = (p: P) => (<svg {...base} {...p}><path d="M21 12a8 8 0 0 1-11.8 7L3 21l2.1-5.9A8 8 0 1 1 21 12z" /></svg>);
export const Mail = (p: P) => (<svg {...base} {...p}><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" /><path d="m22 6-10 7L2 6" /></svg>);
export const Pin = (p: P) => (<svg {...base} {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>);
export const Clock = (p: P) => (<svg {...base} {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>);
