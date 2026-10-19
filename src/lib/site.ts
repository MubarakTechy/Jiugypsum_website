/**
 * Single source of truth for business details.
 * Everything here was carried over from the previous PHP site (footer.php,
 * index.php JSON-LD, privacy.php). Edit here and the whole site updates.
 */
export const site = {
  name: "Jiugypsum Nigeria Limited",
  shortName: "Jiugypsum",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://jiugypsum.ng").replace(/\/$/, ""),
  description:
    "Gypsum ceilings, POP designs, drywall partitioning, custom TV units, screeding, painting and interior finishing for homes and commercial spaces in Abuja, Nigeria.",

  phone: { display: "+234 913 461 3391", tel: "+2349134613391" },
  whatsapp: { display: "+234 915 363 0030", number: "2349153630030" },
  email: "contact@jiugypsum.ng",
  otherEmails: ["support@jiugypsum.ng", "jiugypsum.ng@gmail.com"],

  address: {
    lines: ["Aminu Saleh Crescent, Katampe Extension", "Kubwa Express Road", "Abuja, Nigeria"],
    street: "Aminu Saleh Crescent, Katampe Extension",
    locality: "Abuja",
    region: "FCT",
    postalCode: "900108",
    country: "NG",
  },
  hours: { label: "Monday to Saturday, 8:00 am – 6:00 pm", schema: "Mo-Sa 08:00-18:00" },

  social: [
    { name: "Facebook", href: "https://www.facebook.com/share/17d2iNP62K/" },
    { name: "Instagram", href: "https://www.instagram.com/jiugypsumng" },
    { name: "TikTok", href: "https://tiktok.com/@jiugypsum.ng" },
    { name: "X", href: "https://x.com/jiugypsum_ng" },
  ],
  googleReviewUrl: "https://g.page/r/CV-LIzAX59_lEBM/review",
  registration: "Registered with the Corporate Affairs Commission (CAC), Nigeria",

  /**
   * TRUST DATA — intentionally empty until the owner confirms it.
   *
   * The old site claimed "10+ years", "500+ projects completed" and "500+ happy
   * customers", plus three named testimonials. None of that could be verified,
   * so it was NOT carried over. To show confirmed figures, add them here, e.g.
   *   verifiedStats: [{ value: "12", label: "Years in interior finishing" }]
   * and the home page trust strip will display them automatically.
   * Testimonials (src/data/testimonials.ts) work the same way.
   */
  verifiedStats: [] as { value: string; label: string }[],
} as const;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.address.street}, ${site.address.locality}, Nigeria`,
)}`;

export function whatsappUrl(text = "Hello Jiugypsum, I'd like to discuss a project.") {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(text)}`;
}

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
] as const;

export const QUOTE_HREF = "/get-a-quote";
