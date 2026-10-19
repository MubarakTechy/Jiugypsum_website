"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { QuoteLink } from "./QuoteLink";
import { Close, Menu } from "./icons";

const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the menu whenever the route changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset UI state on navigation
    setOpen(false);
  }, [pathname]);

  // lock page scroll + Escape to close while the menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
        <div className="container site-header__inner">
          <Link href="/" className="brand" aria-label={`${site.name} — home`}>
            <Image src="/logo.png" alt={site.name} width={720} height={197} priority style={{ height: 38, width: "auto" }} />
          </Link>

          <div className="nav-wrap">
            <nav aria-label="Main" className="nav-desktop">
              {nav.map((n) => (
                <Link key={n.href} href={n.href} aria-current={isActive(pathname, n.href) ? "page" : undefined}>
                  {n.label}
                </Link>
              ))}
            </nav>
            {/* The CTA is deliberately OUTSIDE the <nav> — it is a button, not a menu item. */}
            <QuoteLink location="header" size="sm" className="header-cta" />
          </div>

          <button type="button" className="menu-btn" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </header>

      <div id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`} {...(!open ? { inert: true } : {})}>
        <nav aria-label="Mobile">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="mm-link" aria-current={isActive(pathname, n.href) ? "page" : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>
        <QuoteLink location="mobile_menu" block />
        <div className="mm-contact">
          <a href={`tel:${site.phone.tel}`}>Call {site.phone.display}</a>
          <span>{site.hours.label}</span>
        </div>
      </div>
    </>
  );
}
