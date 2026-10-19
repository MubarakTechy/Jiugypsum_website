import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: [string, number][] = [["", 1], ["/services", 0.9], ["/gallery", 0.9], ["/get-a-quote", 0.9], ["/about", 0.7], ["/contact", 0.7], ["/privacy", 0.2]];
  return pages.map(([path, priority]) => ({ url: `${site.url}${path}`, lastModified: new Date(), priority }));
}
