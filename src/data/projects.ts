import image from "next/dist/api/image";

export type ProjectCategory = "Ceilings" | "Feature Walls" | "Drywall" | "Interior Finishing";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  /** Describe only what is visible in the photo. Add location/scope when the owner confirms it. */
  description: string;
  stage?: "Finished" | "In progress";
  /** Add once verified, e.g. "Maitama, Abuja" */
  location?: string;
  image: { src: string; width: number; height: number; alt: string };
};

/**
 * Gallery data. To add a project: drop an optimised .webp into
 * /public/images/projects and add an entry here (newest first).
 *
 * IMPORTANT: confirm every photo is Jiugypsum's own completed work before
 * publishing. Three images on the old site looked like 3D renders / stock and
 * are NOT in this list (see README → "Images to verify").
 */
export const projects: Project[] = [
  {
    slug: "curved-wall-led",
    title: "Curved feature wall with edge lighting",
    category: "Feature Walls",
    stage: "Finished",
    description: "A sculpted gypsum wall profile in a dark textured finish, lit along its edge with warm concealed LEDs.",
    image: { src: "/images/projects/download.jpg", width: 952, height: 1080, alt: "Dark textured curved feature wall lit by a warm concealed LED strip along its edge" },
  },
   {
    slug: "rounded-tray-ceiling",
    title: "Rounded layered ceiling with LED cove",
    category: "Ceilings",
    stage: "Finished",
    description: "A rounded multi-layer gypsum ceiling with a warm LED cove around each tier and small recessed spotlights.",
    image: { src: "/images/projects/rounded-tray-ceiling.webp", width: 714, height: 1279, alt: "Rounded multi-layer gypsum ceiling with warm LED cove lighting and recessed spotlights" },
  },
  {
    slug: "swirl-ceiling",
    title: "Swirl-pattern ceiling with concealed LED lighting",
    category: "Ceilings",
    stage: "Finished",
    description: "A white gypsum ceiling with a sculpted spiral pattern lit by concealed LEDs, framed by a lit border and recessed spotlights.",
    image: { src: "/images/projects/swirl-ceiling.webp", width: 602, height: 1078, alt: "White gypsum ceiling with a sculpted spiral pattern and concealed LED lighting" },
  },

   {
    slug: "luxury-gypsum-ceiling",
    title: "Luxury gypsum ceiling with concealed LED lighting",
    category: "Ceilings",
    stage: "Finished",
    description:
      "A layered gypsum ceiling featuring clean recessed details and warm concealed LED lighting.",
    image: {
      src: "/images/projects/LED lighting.jpg",
      width: 1600,
      height: 1200,
      alt: "Luxury gypsum ceiling with recessed details and warm concealed LED lighting",
    },
  },
  {
    slug: "lounge-arches",
    title: "Arched panels above built-in seating",
    category: "Interior Finishing",
    stage: "Finished",
    description: "Decorative arched wall panels with integrated lighting, set above upholstered banquette seating.",
    image: { src: "/images/projects/more.jpg", width: 1080, height: 1080, alt: "Arched decorative wall panels with lighting above upholstered banquette seating" },
  },
  {
    slug: "restaurant-ceiling",
    title: "Panelled ceiling with track lighting",
    category: "Ceilings",
    stage: "Finished",
    description: "Ceiling panels framed with a black track-lighting layout over a restaurant dining area.",
    image: { src: "/images/projects/bub.jpg", width: 900, height: 1600, alt: "Panelled ceiling with a framed track-lighting layout above restaurant tables" },
  },
  {
    slug: "red-lounge",
    title: "Arched feature walls with accent lighting",
    category: "Interior Finishing",
    stage: "Finished",
    description: "A lounge area with arched wall niches and saturated accent lighting.",
    image: { src: "/images/projects/red-lounge.webp", width: 1080, height: 1080, alt: "Lounge terrace with arched wall niches lit in deep red" },
  },
   {
    slug: "modern-tv-feature-wall",
    title: "Modern TV feature wall with decorative panels",
    category: "Feature Walls",
    stage: "Finished",
    description:
      "A contemporary TV feature wall combining decorative wall panels with integrated ambient lighting.",
    image: {
      src: "/images/projects/download (1).jpg",
      width: 1600,
      height: 1200,
      alt: "Modern TV feature wall with decorative panels and integrated ambient lighting",
    },
  },
  {
    slug: "corridor-ceiling",
    title: "Ceiling and feature wall corridor",
    category: "Ceilings",
    stage: "Finished",
    description: "A dark painted ceiling with recessed spotlights running above a corridor and decorative wall.",
    image: { src: "/images/projects/island.jpg", width: 900, height: 1600, alt: "Dark ceiling with recessed spotlights above a corridor and feature wall" },
  },
  {
    slug: "slat-ceiling",
    title: "Linear slat ceiling over a dining area",
    category: "Ceilings",
    stage: "Finished",
    description: "A linear slatted ceiling with recessed lights above an open dining and lounge space.",
    image: { src: "/images/projects/llll.jpg", width: 900, height: 1600, alt: "Linear slatted ceiling with recessed lights above a dining and lounge space" },
  },
   {
    slug: "curved-gypsum-feature-wall",
    title: "Curved gypsum feature wall with ambient lighting",
    category: "Feature Walls",
    stage: "Finished",
    description:
      "A sculpted curved gypsum feature wall finished with subtle architectural lighting.",
    image: {
      src: "/images/projects/architectural lighting.jpg",
      width: 1600,
      height: 1200,
      alt: "Curved gypsum feature wall with subtle ambient architectural lighting",
    },
  },
  {
    slug: "drywall-framing",
    title: "Metal-framed drywall partition",
    category: "Drywall",
    stage: "In progress",
    description: "Steel framing for a drywall partition and door opening, ahead of boarding.",
    image: { src: "/images/projects/darkimage.jpg", width: 1080, height: 1080, alt: "Metal-framed drywall partition with a door opening inside a bright room" },
  },
  {
    slug: "curved-wall-install",
    title: "Curved wall profile at installation stage",
    category: "Feature Walls",
    stage: "In progress",
    description: "A curved gypsum wall profile in place and awaiting its final finish and lighting.",
    image: { src: "/images/projects/walllight.png", width: 958, height: 1080, alt: "Curved gypsum wall profile in a room before its final finish" },
  },
    {
    slug: "modern-drywall-partition",
    title: "Modern drywall partition and interior finishing",
    category: "Drywall",
    stage: "Finished",
    description:
      "A clean drywall partition creating defined interior spaces with a refined painted finish.",
    image: {
      src: "/images/projects/finishing.jpg",
      width: 1600,
      height: 1200,
      alt: "Modern drywall partition creating defined interior spaces with a refined finished surface",
    },
  },

{
  slug: "wall2",
  title: "Gypsum feature wall",
  category: "Feature Walls",
  description: "A decorative gypsum feature wall with a contemporary finish.",
  stage: "Finished",
  image: {
    src: "/images/projects/wall2.jpg",
    width: 1200,
    height: 900,
    alt: "Decorative gypsum feature wall with a contemporary finish",
  },
},

 {
  slug: "dark-ceiling-corridor",
  title: "Dark ceiling and feature wall corridor",
  category: "Ceilings",
  stage: "Finished",
  description: "A dark ceiling with recessed spotlights running above a corridor and decorative feature wall.",
  image: {
    src: "/images/projects/darrkk.jpg",
    width: 1600,
    height: 1200,
    alt: "Dark ceiling with recessed spotlights above a corridor and decorative feature wall",
  },
},
{
  slug: "luxury-gypsum-ceiling",
  title: "Luxury gypsum ceiling with concealed lighting",
  category: "Ceilings",
  stage: "Finished",
  description: "A layered gypsum ceiling featuring concealed warm LED lighting in a contemporary interior.",
  image: {
    src: "/images/projects/luxury.jpg",
    width: 1600,
    height: 1200,
    alt: "Layered gypsum ceiling with concealed warm LED lighting in a contemporary interior",
  },
},

  
  {
    slug: "curved-ceiling-framing",
    title: "Curved gypsum ceiling with oval cut-outs",
    category: "Ceilings",
    stage: "In progress",
    description: "A sculpted ceiling in green moisture-resistant board with flowing curves and oval openings, ahead of finishing.",
    image: { src: "/images/projects/curved-ceiling-framing.jpeg", width: 552, height: 414, alt: "Curved green gypsum ceiling with oval cut-outs before finishing" },
  },
  {
    slug: "hall-bulkhead",
    title: "Ceiling bulkhead in a large open hall",
    category: "Drywall",
    stage: "In progress",
    description: "A drywall ceiling bulkhead being built in a large open space, with scaffolding in place.",
    image: { src: "/images/projects/Ceiling tv.jpg", width: 1080, height: 1080, alt: "Large open hall with a green drywall ceiling bulkhead and scaffolding" },
  },

    {
    slug: "crescent-led-ceiling",
    title: "Crescent-shaped ceiling with concealed LED lighting",
    category: "Ceilings",
    stage: "In progress",
    description: "A ceiling design with sweeping crescent recesses lit by warm concealed LEDs, with a ringed circular centrepiece and recessed spotlights.",
    image: { src: "/images/projects/crescent-led-ceiling.webp", width: 714, height: 1279, alt: "Gypsum ceiling with crescent-shaped recesses and warm concealed LED lighting" },
  },
  {
    slug: "led-ceiling-site",
    title: "Layered ceiling with LED cove and linear lighting",
    category: "Ceilings",
    stage: "In progress",
    description: "A multi-level gypsum ceiling with warm LED coves and white linear light strips, photographed on site before the room is finished.",
    image: { src: "/images/projects/led-ceiling-site.jpeg", width: 736, height: 981, alt: "Layered gypsum ceiling with warm LED coves and white linear lights in a room under construction" },
  },
  {
    slug: "bedroom-niche-ceiling",
    title: "Bedroom ceiling and lit wall niches",
    category: "Interior Finishing",
    stage: "In progress",
    description: "A stepped bedroom ceiling with LED cove lighting and recessed spotlights, plus twin backlit display niches either side of the bed.",
    image: { src: "/images/projects/bedroom-niche-ceiling.webp", width: 714, height: 1279, alt: "Bedroom with stepped gypsum ceiling, LED coves and backlit wall niches beside the bed" },
  },
  {
    slug: "blue-led-living-room",
    title: "Living room ceiling with blue LED cove lighting",
    category: "Ceilings",
     stage: "Finished",
    description: "A modern living room with a dropped ceiling edged in blue LED lighting, black recessed light panels and a lit TV wall unit.",
    image: { src: "/images/projects/blue-led-living-room.webp", width: 714, height: 1279, alt: "Living room with a dropped ceiling edged in blue LED lighting and a lit TV wall" },
  },
  {
    slug: "loop-ceiling-office",
    title: "Sculpted ceiling with warm edge lighting",
    category: "Ceilings",
   stage: "Finished",
    description: "A large curved ceiling drop with warm LED edge lighting and a polished loop-shaped light fitting at its centre.",
    image: { src: "/images/projects/loop-ceiling-office.webp", width: 714, height: 1279, alt: "Sculpted gypsum ceiling with warm LED edge lighting and a loop-shaped central light" },
  },
  {
    slug: "bedroom-cove-ceiling",
    title: "Bedroom ceiling with recessed LED cove",
    category: "Ceilings",
     stage: "Finished",
    description: "A clean-lined bedroom ceiling with a recessed, softly lit cove stepping across the room above the bed.",
    image: { src: "/images/projects/bedroom-cove-ceiling.webp", width: 736, height: 1104, alt: "Bedroom with a stepped gypsum ceiling and soft recessed LED cove lighting" },
  },
  {
    slug: "luxury-bedroom-ceiling",
    title: "Luxury bedroom with tray ceiling and panelled wall",
    category: "Interior Finishing",
    stage: "Finished",
    description: "A master bedroom with a layered tray ceiling edged in LED lighting and a panelled feature wall behind the bed.",
    image: { src: "/images/projects/luxury-bedroom-ceiling.webp", width: 720, height: 960, alt: "Bedroom with an LED-edged tray ceiling and a panelled feature wall behind the bed" },
  },

    {
    slug: "kitchen-tray-ceiling",
    title: "Kitchen tray ceiling with LED cove and spotlights",
    category: "Ceilings",
     stage: "Finished",
    description: "A rounded gypsum tray ceiling over a kitchen, edged with soft LED cove lighting and surrounded by recessed spotlights, with a ceiling fan at the centre.",
    image: { src: "/images/projects/kitchen-tray-ceiling.webp", width: 698, height: 1055, alt: "Rounded gypsum tray ceiling with LED cove lighting and spotlights above a white kitchen" },
  },
  {
    slug: "curved-ceiling-lounge",
    title: "Curved ceiling drop with warm edge lighting",
    category: "Ceilings",
     stage: "Finished",
    description: "A sweeping curved ceiling drop with a warm LED glow along its edge and recessed spotlights, above a neutral-toned lounge.",
    image: { src: "/images/projects/curved-ceiling-lounge.webp", width: 714, height: 1279, alt: "Curved gypsum ceiling drop with warm LED edge lighting above a neutral lounge" },
  },
  {
    slug: "geometric-led-wall-ceiling",
    title: "Geometric panel wall and ceiling with LED joints",
    category: "Feature Walls",
    stage: "Finished",
    description: "A faceted panel wall that continues across the ceiling, with warm LED light glowing through the gaps between the panels.",
    image: { src: "/images/projects/geometric-led-wall-ceiling.webp", width: 733, height: 716, alt: "Geometric panelled feature wall and ceiling with warm LED light between the panels" },
  },
  {
    slug: "kitchen-ceiling-lighting",
    title: "Kitchen ceiling with cove lighting and spotlights",
    category: "Ceilings",
   stage: "Finished",
    description: "A stepped kitchen ceiling with a warm LED cove, a dark central light strip and recessed spotlights, above a lit shelving wall.",
    image: { src: "/images/projects/kitchen-ceiling-lighting.webp", width: 720, height: 720, alt: "Stepped kitchen ceiling with warm LED cove lighting and recessed spotlights" },
  },
  {
    slug: "tv-wall-led-backlit",
    title: "Backlit TV wall panel with ceiling light line",
    category: "Feature Walls",
     stage: "Finished",
    description: "A plain floating TV wall panel outlined in soft LED backlighting, with a matching light line along the ceiling edge.",
    image: { src: "/images/projects/tv-wall-led-backlit.webp", width: 1142, height: 1280, alt: "Backlit TV wall panel with soft LED outline and a light line along the ceiling" },
  },
  {
    slug: "arched-mirror-niches",
    title: "Arched wall niches with edge lighting",
    category: "Interior Finishing",
     stage: "Finished",
    description: "A row of tall arched wall recesses with warm LED edge lighting and mirrored insets, above a green stone ledge, with small display niches beside them.",
    image: { src: "/images/projects/arched-mirror-niches.webp", width: 714, height: 1279, alt: "Row of tall arched wall niches with warm LED edge lighting and mirrors above a green stone ledge" },
  },
  {
    slug: "brick-tv-wall-ceiling",
    title: "Suspended tile ceiling above a brick TV wall",
    category: "Interior Finishing",
     stage: "Finished",
    description: "A suspended grid tile ceiling with recessed downlights over a living area with an exposed brick TV wall.",
    image: { src: "/images/projects/brick-tv-wall-ceiling.webp", width: 720, height: 1080, alt: "Suspended tile ceiling with recessed downlights above a living area with a brick TV wall" },
  },
 


];


export const featuredSlugs = ["restaurant-ceiling", "lounge-arches", "curved-wall-led", "corridor-ceiling"];
export const projectCategories: ProjectCategory[] = Array.from(new Set(projects.map((p) => p.category)));
export const getProject = (slug: string) => projects.find((p) => p.slug === slug)!;
