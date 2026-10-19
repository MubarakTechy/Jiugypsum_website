"use client";

import { usePathname } from "next/navigation";
import { QuoteLink, WhatsAppLink } from "./QuoteLink";
import { Chat, Phone } from "./icons";
import { QUOTE_HREF, site } from "@/lib/site";

/** Mobile: persistent quote bar. Desktop: small WhatsApp button. Hidden on the quote page itself. */
export default function StickyActions() {
  const pathname = usePathname();
  const onQuote = pathname === QUOTE_HREF;
  return (
    <>
      <div className={`sticky-bar ${onQuote ? "is-hidden" : ""}`} {...(onQuote ? { inert: true } : {})}>
        <QuoteLink location="mobile_bar" arrow={false} />
        <WhatsAppLink location="mobile_bar" className="btn btn--outline btn--icon">
          <Chat aria-hidden />
          <span className="sr-only">Chat with us on WhatsApp</span>
        </WhatsAppLink>
        <a href={`tel:${site.phone.tel}`} className="btn btn--outline btn--icon">
          <Phone aria-hidden />
          <span className="sr-only">Call us</span>
        </a>
      </div>
      <WhatsAppLink location="desktop_float" className="wa-float">
        <Chat aria-hidden />
        WhatsApp us
      </WhatsAppLink>
    </>
  );
}
