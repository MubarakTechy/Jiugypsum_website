/**
 * /projects — client projects page (single self-contained file).
 *
 * Drop this at:  src/app/projects/page.tsx
 *
 * Needs (all already in your project):
 *   - components: PageHero, CtaBand, JsonLd, icons (ArrowRight, ArrowUpRight)
 *   - lib/site (site.url)
 *   - images in /public/images/projects/*.webp and /public/images/projects/restaurant-ceiling.webp
 *
 * Styles are embedded below (search for `const css`) and the photo viewer is
 * pure CSS (:target), so this page needs no client JavaScript.
 */
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Client Projects | Hotels, Restaurants & Commercial Interiors in Nigeria",
  description:
    "Commercial and hospitality interiors by Jiugypsum Nigeria Limited, including work with Nordic Hotels Nigeria and restaurant dining spaces. See the finished spaces.",
  alternates: { canonical: "/projects" },
};

/* ── Content ─────────────────────────────────────────────────────────── */

type Slot = "lead" | "side" | "tall" | "sq" | "wide" | "solo";
type Photo = { src: string; width: number; height: number; space: string; alt: string; slot: Slot };
type Project = {
  slug: string;
  client?: string; // leave out to show a project anonymously
  clientUrl?: string;
  sector: string;
  title: string;
  summary: string;
  spaces: string[];
  scope?: string[]; // add once confirmed, e.g. ["Ceilings", "Drywall"]
  location?: string; // add once confirmed, e.g. "Abuja"
  photos: Photo[];
  /** AI-generated visualisations. Shown in their own clearly labelled block, never mixed in with real photos. */
  concepts?: Photo[];
};

const projects: Project[] = [
  {
    slug: "nordic-hotels-nigeria",
    client: "Nordic Hotels Nigeria",
    clientUrl: "https://nordichotelsnigeria.com/",
    sector: "Hospitality",
    title: "Guest lounge, lobby and conference spaces",
    summary:
      "Nordic Hotels Nigeria is a boutique hotel group with properties in Abuja and Lagos. These photographs show interior spaces from our work with them: a guest lounge, lobby, conference room and a corridor, with dark ceilings, recessed spotlights, wall lighting and timber-toned panelling. The corridor photo was taken during fit-out.",
    spaces: ["Guest lounge", "Lobby", "Conference room", "Corridor"],
    photos: [
      { src: "/images/projects/nordic-lounge.webp", width: 1080, height: 1080, slot: "lead", space: "Guest lounge", alt: "Hotel lounge with a beige sofa, round stools and wall sconces beneath a dark ceiling with recessed spotlights" },
      { src: "/images/projects/nordic-pendants.webp", width: 1080, height: 1080, slot: "side", space: "Lounge pendant lighting", alt: "Cluster of white half-dome pendant lights over a hotel lounge with armchairs and wall lights" },
      { src: "/images/projects/nordic-conference.webp", width: 574, height: 1020, slot: "tall", space: "Conference room", alt: "Conference room with rows of dark chairs facing a projection screen under a black ceiling with spotlights" },
      { src: "/images/projects/nordic-lobby-columns.webp", width: 1080, height: 1080, slot: "sq", space: "Lobby seating", alt: "Hotel lobby seating area with round columns, armchairs and a row of wall lights" },
      { src: "/images/projects/nordic-corridor.webp", width: 574, height: 1020, slot: "tall", space: "Corridor, during fit-out", alt: "Long hotel corridor with a dark ceiling, recessed lights and partly painted pale walls" },
      { src: "/images/projects/nordic-display-unit.webp", width: 1080, height: 1080, slot: "sq", space: "Reception display unit", alt: "Timber display unit with shelves of ornaments, bottles and books beside a potted plant" },
      { src: "/images/projects/nordic-lobby.webp", width: 1080, height: 1080, slot: "wide", space: "Lobby and dining area", alt: "Open hotel lobby with a dark slatted ceiling, columns and a dining area in the distance" },
    ],
  },
  {
    slug: " Palmave restaurant-interior",
    sector: "Food & beverage",
    title: "Palmave Restaurant interiors",
    summary:
      "Palmave restaurant project. The photographs show arched wall panels above built-in banquette seating, a terrace with arched niches lit at night, and a dining area with a panelled ceiling and a black track-lighting layout.",
    spaces: ["Banquette wall", "Terrace", "Dining area ceiling"],
    photos: [
      { src: "/images/projects/lounge-arches.webp", width: 1080, height: 1080, slot: "lead", space: "Arched banquette wall", alt: "Arched decorative wall panels with integrated lighting above built-in upholstered banquette seating" },
      { src: "/images/projects/restaurant-ceiling.webp", width: 900, height: 1600, slot: "tall", space: "Dining area ceiling", alt: "Panelled ceiling with a framed track-lighting layout above restaurant tables and green columns" },
      { src: "/images/projects/red-lounge.webp", width: 1080, height: 1080, slot: "wide", space: "Terrace arches at night", alt: "Terrace with arched wall niches lit in deep red at night" },
    ],
    concepts: [
      { src: "/images/projects/restaurant-concept-dining-hall.webp", width: 1024, height: 1024, slot: "sq", space: "Main dining hall", alt: "AI-generated image: dining hall with tall arched windows hung with blue curtains, wall lights and long tables" },
      { src: "/images/projects/restaurant-concept-dining-hall-teal.webp", width: 768, height: 1365, slot: "tall", space: "Dining hall, teal curtains", alt: "AI-generated image: dining hall with arched windows in teal curtains, pendant lights and upholstered chairs" },
      { src: "/images/projects/restaurant-concept-bar-and-dining.webp", width: 1024, height: 1024, slot: "sq", space: "Bar and dining hall", alt: "AI-generated image: restaurant with a bar counter, shelving, round tables, garden views and guests dining" },
      { src: "/images/projects/restaurant-concept-banquette-wall.webp", width: 768, height: 1365, slot: "tall", space: "Banquette and arched wall", alt: "AI-generated image: banquette seating below glowing arched wall panels with a 'Palm Ave' sign" },
      { src: "/images/projects/restaurant-concept-arched-wall-wide.webp", width: 768, height: 1365, slot: "tall", space: "Arched wall, wide view", alt: "AI-generated image: wide view of the arched wall panels, banquette and dining tables on a tiled floor" },
      { src: "/images/projects/restaurant-concept-courtyard-night.webp", width: 800, height: 1305, slot: "tall", space: "Courtyard terrace at night", alt: "AI-generated image: courtyard terrace at night with pink-lit arched niches, planting and a canopy" },
    ],
  },
];

const num = (i: number) => String(i + 1).padStart(2, "0");

/* ── Page ────────────────────────────────────────────────────────────── */

export default function ProjectsPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <PageHero eyebrow="Projects" title="Commercial spaces we've worked on.">
        <p>Hotels, restaurants and other commercial interiors where ceilings, lighting and finishing have to look right and keep working every day.</p>
      </PageHero>

      <div className="pj">
        <div className="container">
          <nav className="pj-index" aria-label="Projects on this page">
            <p className="pj-label">On this page</p>
            <ol>
              {projects.map((p, i) => (
                <li key={p.slug}>
                  <a href={`#${p.slug}`}>
                    <span className="pj-index__n">{num(i)}</span>
                    <span className="pj-index__t">{p.client ?? p.title}</span>
                    <span className="pj-index__s">{p.sector}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {projects.map((p, i) => (
          <section key={p.slug} id={p.slug} className={`pj-case${i % 2 ? " pj-case--alt" : ""}${p.photos.length === 1 ? " pj-case--solo" : ""}`} aria-labelledby={`${p.slug}-title`}>
            <div className="container">
              <div className="pj-case__head">
                <div className="pj-case__id">
                  <p className="pj-label">
                    {num(i)} <span aria-hidden>/</span> {p.sector}
                  </p>
                  <h2 id={`${p.slug}-title`}>{p.client ?? p.title}</h2>
                  {p.client && <p className="pj-case__sub">{p.title}</p>}
                </div>
                <div className="pj-case__body">
                  <p className="pj-case__summary">{p.summary}</p>
                  <dl className="pj-facts">
                    <div>
                      <dt>Sector</dt>
                      <dd>{p.sector}</dd>
                    </div>
                    <div>
                      <dt>Spaces shown</dt>
                      <dd>{p.spaces.join(", ")}</dd>
                    </div>
                    {p.scope && p.scope.length > 0 && (
                      <div>
                        <dt>Our scope</dt>
                        <dd>{p.scope.join(", ")}</dd>
                      </div>
                    )}
                    {p.location && (
                      <div>
                        <dt>Location</dt>
                        <dd>{p.location}</dd>
                      </div>
                    )}
                  </dl>
                  {p.clientUrl && (
                    <a href={p.clientUrl} className="pj-visit" target="_blank" rel="noopener noreferrer">
                      Visit {p.client} <ArrowUpRight />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  )}
                </div>
              </div>

              <ul className={`pj-mosaic pj-mosaic--${p.photos.length > 1 ? "multi" : "solo"}${p.photos.length === 3 ? " pj-mosaic--n3" : ""}`}>
                {p.photos.map((ph, k) => (
                  <li key={ph.src} className={`pj-slot pj-slot--${ph.slot}`}>
                    <a href={`#v-${p.slug}-${k}`} className="pj-photo" aria-label={`View larger: ${ph.space}`}>
                      <span className="pj-photo__frame">
                        <Image src={ph.src} alt={ph.alt} fill sizes={ph.slot === "lead" ? "(min-width: 1000px) 58vw, 100vw" : "(min-width: 1000px) 40vw, 50vw"} />
                      </span>
                      <span className="pj-photo__cap">
                        <span>{ph.space}</span>
                        <span aria-hidden className="pj-photo__zoom">View</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              {/* CSS-only viewer: each photo has an overlay that shows when the URL hash targets it */}
              {p.photos.map((ph, k) => {
                const prev = (k - 1 + p.photos.length) % p.photos.length;
                const next = (k + 1) % p.photos.length;
                return (
                  <div key={`v-${ph.src}`} id={`v-${p.slug}-${k}`} className="pj-viewer" role="dialog" aria-label={`${ph.space}, photo ${k + 1} of ${p.photos.length}`}>
                    <a href={`#${p.slug}`} className="pj-viewer__bg" aria-label="Close viewer" tabIndex={-1} />
                    <figure className="pj-viewer__fig">
                      <Image src={ph.src} alt={ph.alt} width={ph.width} height={ph.height} loading="lazy" />
                      <figcaption>
                        <span className="pj-viewer__meta">
                          {[p.sector, p.client].filter(Boolean).join(" · ")} — {k + 1} / {p.photos.length}
                        </span>
                        <strong>{ph.space}</strong>
                      </figcaption>
                    </figure>
                    <a href={`#${p.slug}`} className="pj-viewer__btn pj-viewer__close">Close</a>
                    {p.photos.length > 1 && (
                      <>
                        <a href={`#v-${p.slug}-${prev}`} className="pj-viewer__btn pj-viewer__prev" aria-label="Previous photo">‹</a>
                        <a href={`#v-${p.slug}-${next}`} className="pj-viewer__btn pj-viewer__next" aria-label="Next photo">›</a>
                      </>
                    )}
                  </div>
                );
              })}

              {p.concepts && p.concepts.length > 0 && (
                <div className="pj-concepts" aria-labelledby={`${p.slug}-concepts`}>
                  <div className="pj-concepts__head">
                    <h3 id={`${p.slug}-concepts`}>Palmave Visualisations</h3>
                   
                  </div>
                  <ul className="pj-concepts__grid">
                    {p.concepts.map((ph, k) => (
                      <li key={ph.src}>
                        <a href={`#vc-${p.slug}-${k}`} className="pj-photo" aria-label={`View larger (AI-generated): ${ph.space}`}>
                          <span className="pj-photo__frame">
                           
                            <Image src={ph.src} alt={ph.alt} fill sizes="(min-width: 1000px) 30vw, 50vw" />
                          </span>
                          <span className="pj-photo__cap">
                            <span>{ph.space}</span>
                            <span aria-hidden className="pj-photo__zoom">View</span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                  {p.concepts.map((ph, k) => {
                    const prev = (k - 1 + p.concepts!.length) % p.concepts!.length;
                    const next = (k + 1) % p.concepts!.length;
                    return (
                      <div key={`vc-${ph.src}`} id={`vc-${p.slug}-${k}`} className="pj-viewer" role="dialog" aria-label={`AI-generated image: ${ph.space}, ${k + 1} of ${p.concepts!.length}`}>
                        <a href={`#${p.slug}-concepts`} className="pj-viewer__bg" aria-label="Close viewer" tabIndex={-1} />
                        <figure className="pj-viewer__fig">
                          <Image src={ph.src} alt={ph.alt} width={ph.width} height={ph.height} loading="lazy" />
                          <figcaption>
                            <span className="pj-viewer__meta">Palmave Resurants  — {k + 1} / {p.concepts!.length}</span>
                            <strong>{ph.space}</strong>
                          </figcaption>
                        </figure>
                        <a href={`#${p.slug}-concepts`} className="pj-viewer__btn pj-viewer__close">Close</a>
                        <a href={`#vc-${p.slug}-${prev}`} className="pj-viewer__btn pj-viewer__prev" aria-label="Previous image">‹</a>
                        <a href={`#vc-${p.slug}-${next}`} className="pj-viewer__btn pj-viewer__next" aria-label="Next image">›</a>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        ))}

        <section className="pj-more" aria-label="More work">
          <div className="container pj-more__row">
            <p>Looking for residential interiors, feature walls and ceilings?</p>
            <Link href="/gallery" className="text-link">
              See the full gallery <ArrowRight />
            </Link>
          </div>
        </section>
      </div>

      <CtaBand location="projects_final" title="Planning a commercial space?" text="Tell us about your hotel, restaurant, office or showroom and we'll discuss the right approach for it." />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Client projects",
          url: `${site.url}/projects`,
          isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
        }}
      />
    </>
  );
}

/* ── Styles (all classes prefixed "pj-"; colours/fonts come from globals.css) ── */

const css = `
.pj { --pj-gap: clamp(0.75rem, 1.6vw, 1.5rem); --pj-pad: clamp(3.5rem, 8vw, 7rem); background: var(--paper); }
.pj-label { margin: 0 0 1rem; font: 700 0.74rem/1.3 var(--font-heading); letter-spacing: 0.16em; text-transform: uppercase; color: var(--teal-700); }
.pj-label span { margin-inline: 0.25rem; opacity: 0.6; }

.pj-index { padding-block: clamp(1.75rem, 3vw, 2.75rem) clamp(2.5rem, 5vw, 4rem); }
.pj-index ol { border-top: 1px solid var(--line-strong); }
.pj-index li { border-bottom: 1px solid var(--line); }
.pj-index a { display: grid; grid-template-columns: 2.5rem 1fr; gap: 0.15rem 1rem; align-items: baseline; padding: 1.15rem 0; transition: padding-left 0.35s var(--ease), color 0.2s; }
.pj-index a:hover { padding-left: 0.6rem; color: var(--teal-600); }
.pj-index__n { font: 700 0.78rem/1 var(--font-heading); letter-spacing: 0.12em; color: var(--teal-700); }
.pj-index__t { font: 800 clamp(1.15rem, 0.8vw + 1rem, 1.55rem)/1.25 var(--font-heading); color: var(--teal-900); letter-spacing: -0.01em; }
.pj-index__s { grid-column: 2; font-size: 0.88rem; color: var(--muted); }
@media (min-width: 720px) { .pj-index a { grid-template-columns: 3rem 1fr auto; } .pj-index__s { grid-column: auto; } }

.pj-case { padding-block: var(--pj-pad); border-top: 1px solid var(--line); scroll-margin-top: var(--header-h); }
.pj-case--alt { background: var(--mist); }
.pj-case__head { display: grid; gap: 1.75rem 4rem; margin-bottom: clamp(2rem, 5vw, 4rem); }
.pj-case__id h2 { margin: 0 0 0.35em; font-size: clamp(2.1rem, 3.6vw + 0.6rem, 4rem); letter-spacing: -0.03em; line-height: 1.04; }
.pj-case__sub { margin: 0; font: 600 clamp(1.05rem, 0.4vw + 1rem, 1.25rem)/1.45 var(--font-heading); color: var(--muted); }
.pj-case__summary { margin: 0 0 1.75rem; max-width: 40em; font-size: 1.06rem; }
.pj-facts { border-top: 1px solid var(--line-strong); }
.pj-facts > div { display: grid; gap: 0.15rem 1.5rem; padding: 0.85rem 0; border-bottom: 1px solid var(--line); }
.pj-facts dt { font: 700 0.72rem/1.9 var(--font-heading); letter-spacing: 0.14em; text-transform: uppercase; color: var(--teal-700); }
.pj-facts dd { margin: 0; font-size: 0.98rem; }
@media (min-width: 560px) { .pj-facts > div { grid-template-columns: 9rem 1fr; } }
.pj-visit { display: inline-flex; align-items: center; gap: 0.5rem; margin-top: 1.5rem; padding-bottom: 0.3rem; font: 700 0.95rem/1.2 var(--font-heading); color: var(--teal-700); border-bottom: 2px solid var(--orange); transition: gap 0.25s var(--ease), color 0.2s; }
.pj-visit:hover { gap: 0.8rem; color: var(--teal-900); }
.pj-visit svg { width: 16px; height: 16px; }
@media (min-width: 960px) {
  .pj-case__head { grid-template-columns: repeat(12, minmax(0, 1fr)); align-items: start; }
  .pj-case__id { grid-column: 1 / 6; position: sticky; top: calc(var(--header-h) + 2rem); }
  .pj-case__body { grid-column: 7 / 13; padding-top: 0.4rem; }
}

.pj-mosaic { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(1.5rem, 3vw, 2.5rem) var(--pj-gap); align-items: start; }
.pj-slot { grid-column: span 2; min-width: 0; }
.pj-slot--tall { grid-column: span 1; }
.pj-photo { display: block; color: inherit; cursor: zoom-in; }
.pj-photo__frame { position: relative; display: block; overflow: hidden; background: var(--mist); aspect-ratio: var(--ar, 1 / 1); }
.pj-case--alt .pj-photo__frame { background: #d5dfdc; }
.pj-photo__frame img { object-fit: cover; transition: transform 1.2s var(--ease); }
.pj-photo:hover .pj-photo__frame img, .pj-photo:focus-visible .pj-photo__frame img { transform: scale(1.035); }
.pj-photo__cap { display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; margin-top: 0.7rem; padding-top: 0.6rem; border-top: 1px solid var(--line-strong); font: 600 0.88rem/1.4 var(--font-heading); }
.pj-photo__zoom { font: 700 0.68rem/1 var(--font-heading); letter-spacing: 0.14em; text-transform: uppercase; color: var(--teal-700); opacity: 0.75; transition: opacity 0.2s, transform 0.3s var(--ease); }
.pj-photo:hover .pj-photo__zoom, .pj-photo:focus-visible .pj-photo__zoom { opacity: 1; transform: translateX(3px); }
.pj-slot--lead, .pj-slot--sq { --ar: 1 / 1; }
.pj-slot--side { --ar: 4 / 5; }
.pj-slot--tall { --ar: 9 / 16; }
.pj-slot--wide { --ar: 4 / 3; }
.pj-slot--solo { --ar: 4 / 5; }
.pj-mosaic--solo { grid-template-columns: minmax(0, 1fr); }
.pj-mosaic--solo .pj-slot { max-width: 30rem; }
@media (min-width: 900px) {
  .pj-mosaic--multi { grid-template-columns: repeat(12, minmax(0, 1fr)); }
  .pj-mosaic--multi > :nth-child(1) { grid-column: 1 / 8; }
  .pj-mosaic--multi > :nth-child(2) { grid-column: 8 / 13; align-self: end; }
  .pj-mosaic--multi > :nth-child(3) { grid-column: 1 / 4; }
  .pj-mosaic--multi > :nth-child(4) { grid-column: 4 / 9; margin-top: clamp(2rem, 5vw, 4.5rem); }
  .pj-mosaic--multi > :nth-child(5) { grid-column: 9 / 13; }
  .pj-mosaic--multi > :nth-child(6) { grid-column: 1 / 6; }
  .pj-mosaic--multi > :nth-child(7) { grid-column: 6 / 13; align-self: end; }
}
/* one photo: image beside the text instead of beneath it */
@media (min-width: 960px) {
  .pj-case--solo .container { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); gap: 0 clamp(3rem, 6vw, 6rem); align-items: start; }
  .pj-case--solo .pj-case__head { grid-column: 2; grid-row: 1; grid-template-columns: minmax(0, 1fr); margin-bottom: 0; }
  .pj-case--solo .pj-mosaic { grid-column: 1; grid-row: 1; }
  .pj-case--solo .pj-mosaic--solo .pj-slot { max-width: none; }
  .pj-case--solo .pj-case__id { grid-column: auto; position: static; margin-bottom: 1.5rem; }
  .pj-case--solo .pj-case__body { grid-column: auto; padding-top: 0; }
}

/* CSS-only photo viewer */
.pj-viewer { display: none; position: fixed; inset: 0; z-index: 200; background: rgba(8, 28, 29, 0.96); padding: 4.5rem clamp(0.75rem, 4vw, 3rem) 1.5rem; place-items: center; }
.pj-viewer:target { display: grid; animation: pj-in 0.3s var(--ease); }
.pj-viewer__bg { position: absolute; inset: 0; cursor: zoom-out; }
.pj-viewer__fig { position: relative; margin: 0; max-width: 100%; max-height: 100%; display: grid; grid-template-rows: minmax(0, 1fr) auto; gap: 0.9rem; justify-items: center; pointer-events: none; }
.pj-viewer__fig img { width: auto; height: auto; max-width: 100%; max-height: calc(100vh - 11rem); max-height: calc(100dvh - 11rem); object-fit: contain; }
.pj-viewer__fig figcaption { display: grid; gap: 0.2rem; text-align: center; color: #fff; }
.pj-viewer__meta { font: 700 0.7rem/1.3 var(--font-heading); letter-spacing: 0.14em; text-transform: uppercase; color: #ffc27a; }
.pj-viewer__btn { position: absolute; z-index: 2; display: grid; place-items: center; min-width: 48px; height: 48px; padding: 0 1rem; background: rgba(8, 28, 29, 0.75); border: 1px solid rgba(255, 255, 255, 0.35); color: #fff; font: 700 0.85rem/1 var(--font-heading); letter-spacing: 0.06em; transition: background 0.2s, color 0.2s; }
.pj-viewer__btn:hover, .pj-viewer__btn:focus-visible { background: #fff; color: var(--teal-900); outline: none; }
.pj-viewer__close { top: 1rem; right: clamp(0.75rem, 3vw, 2rem); }
.pj-viewer__prev, .pj-viewer__next { top: 50%; margin-top: -24px; font-size: 1.6rem; padding: 0; width: 48px; }
.pj-viewer__prev { left: clamp(0.4rem, 2vw, 1.5rem); }
.pj-viewer__next { right: clamp(0.4rem, 2vw, 1.5rem); }
@keyframes pj-in { from { opacity: 0; } to { opacity: 1; } }

.pj-more { border-top: 1px solid var(--line); padding-block: clamp(2rem, 4vw, 3rem); }
.pj-more__row { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem 2rem; }
.pj-more p { margin: 0; font: 700 clamp(1.1rem, 0.6vw + 1rem, 1.35rem)/1.4 var(--font-heading); color: var(--teal-900); }

/* 3-photo layout (restaurant) */
@media (min-width: 900px) {
  .pj-mosaic--n3 > :nth-child(1) { grid-column: 1 / 8; }
  .pj-mosaic--n3 > :nth-child(2) { grid-column: 9 / 13; align-self: start; }
  .pj-mosaic--n3 > :nth-child(3) { grid-column: 3 / 10; margin-top: 0; align-self: start; }
}

/* AI-generated visualisations: deliberately separate and labelled */
.pj-concepts { margin-top: var(--pj-pad); padding-top: clamp(2rem, 4vw, 3rem); border-top: 1px solid var(--line-strong); scroll-margin-top: var(--header-h); }
.pj-concepts__head { max-width: 46rem; margin-bottom: clamp(1.5rem, 3vw, 2.5rem); }
.pj-concepts__head h3 { margin: 0 0 0.6rem; font: 800 clamp(1.4rem, 1vw + 1.1rem, 1.9rem)/1.2 var(--font-heading); letter-spacing: -0.02em; color: var(--teal-900); }
.pj-concepts__note { margin: 0; padding: 0.9rem 1.1rem; background: #fff; border-left: 3px solid var(--orange); font-size: 0.95rem; color: var(--ink); }
.pj-concepts__grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(1.25rem, 2.5vw, 2rem) var(--pj-gap); }
.pj-concepts__grid .pj-photo__frame { aspect-ratio: 4 / 5; }
@media (min-width: 900px) { .pj-concepts__grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
.pj-ai { position: absolute; left: 0; top: 0; z-index: 2; padding: 0.4rem 0.7rem; background: rgba(8, 28, 29, 0.88); color: #fff; font: 700 0.64rem/1.2 var(--font-heading); letter-spacing: 0.14em; text-transform: uppercase; }

@media (prefers-reduced-motion: reduce) { .pj *, .pj-viewer, .pj-viewer * { animation: none !important; transition: none !important; } }
`;