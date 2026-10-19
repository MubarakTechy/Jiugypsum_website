"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track } from "@/lib/analytics";
import { QUOTE_HREF, whatsappUrl } from "@/lib/site";
import { ArrowRight } from "./icons";


export function QuoteLink({
  location,
  service,
  variant = "primary",
  size,
  block,
  className = "",
  children = "Get a Free Quote",
  arrow = true,
}: {
  location: string;
  service?: string;
  variant?: "primary" | "dark" | "outline" | "outline-light";
  size?: "sm";
  block?: boolean;
  className?: string;
  children?: ReactNode;
  arrow?: boolean;
}) {
  const href = service ? `${QUOTE_HREF}?service=${encodeURIComponent(service)}` : QUOTE_HREF;
  return (
    <Link
      href={href}
      className={`btn btn--${variant} ${size ? `btn--${size}` : ""} ${block ? "btn--block" : ""} ${className}`}
      onClick={() => track("quote_cta_click", { location, service })}
    >
      {children}
      {arrow && <ArrowRight />}
    </Link>
  );
}

export function WhatsAppLink({ location, className = "", children, text }: { location: string; className?: string; children: ReactNode; text?: string }) {
  return (
    <a href={whatsappUrl(text)} target="_blank" rel="noopener noreferrer" className={className} onClick={() => track("whatsapp_click", { location })}>
      {children}
    </a>
  );
}
