import Image from "next/image";
import Link from "next/link";
import { nav, site, mapsUrl } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link href="/" className="footer-logo" aria-label={`${site.name} — home`}>
              <Image src="/logo.png" alt={site.name} width={720} height={197} style={{ height: 34, width: "auto" }} />
            </Link>
            <p style={{ maxWidth: "42ch" }}>
              Gypsum ceilings, POP designs, drywall partitioning, custom TV units and interior finishing for homes and commercial spaces in Abuja.
            </p>
            <p className="small">{site.registration}.</p>
            <ul className="socials" aria-label="Social media">
              {site.social.map((s) => (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer">
            <h3>Explore</h3>
            <ul>
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href}>{n.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
            </ul>
          </nav>

          <div>
            <h3>Contact</h3>
            <address>
              <a href={`tel:${site.phone.tel}`}>{site.phone.display}</a>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                {site.address.lines.map((l) => (
                  <span key={l} style={{ display: "block" }}>
                    {l}
                  </span>
                ))}
              </a>
              <span>{site.hours.label}</span>
            </address>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <span>Website by WorbixAgency</span>
        </div>
      </div>
    </footer>
  );
}
