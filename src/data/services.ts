export type ServiceImage = { src: string; alt: string; width: number; height: number; illustrative?: boolean };

export type Service = {
  slug: string;
  name: string;
  /** one line, shown on cards */
  short: string;
  /** customer-benefit paragraph */
  benefit: string;
  applications: string[];
  benefits: string[];
  image: ServiceImage;
  /** matches a Gallery category so we can link to real work */
  galleryCategory?: string;
};

export const services: Service[] = [
  {
    slug: "gypsum-ceilings",
    name: "Gypsum Ceiling Installation",
    short: "Smooth, level ceilings with lighting designed in from the start.",
    benefit:
      "A well-installed gypsum ceiling hides wiring and services, gives a room a seamless finish and lets lighting be planned into the design instead of added afterwards.",
    applications: ["Living rooms and bedrooms", "Offices and meeting rooms", "Restaurants and hospitality spaces", "Corridors and lobbies"],
    benefits: ["Seamless, paint-ready finish", "Concealed and cove lighting layouts", "Hides cabling and ducting", "Flat, dropped or stepped profiles"],
    image: {
      src: "/images/projects/cailing.jpg",
      alt: "Dark ceiling with recessed spotlights above a corridor and feature wall",
      width: 900,
      height: 1600,
    },
    galleryCategory: "Ceilings",
  },
  {
    slug: "pop-ceilings",
    name: "POP Ceiling Designs",
    short: "Decorative plaster-of-Paris detailing for rooms that need character.",
    benefit:
      "POP detailing adds depth and personality to a ceiling: borders, coffers and patterned layouts shaped around the room and how you want it to feel.",
    applications: ["Living and dining areas", "Entrance halls", "Event and hospitality spaces", "Refurbishments of older ceilings"],
    benefits: ["Custom patterns and borders", "Works with new or existing ceilings", "Pairs with lighting and cornices", "Designed with you before work starts"],
    image: {
      src: "/images/projects/pop2.jpg",
      alt: "Panelled ceiling with a framed track-lighting layout above a restaurant dining area",
      width: 900,
      height: 1600,
    },
    galleryCategory: "Ceilings",
  },
  {
    slug: "drywall-partitioning",
    name: "Drywall Partitioning",
    short: "Clean, quick room divisions for homes, offices and commercial units.",
    benefit:
      "Drywall partitions divide a space with less mess and less weight than block walls, and they are straightforward to adapt if your layout changes later.",
    applications: ["Office layouts", "Apartment and home remodelling", "Retail and commercial units", "Creating extra rooms or storage"],
    benefits: ["Dry, clean installation", "Metal-framed for a straight, stable wall", "Ready for screeding and paint", "Easy to modify later"],
    image: {
      src: "/images/projects/darkimage.jpg",
      alt: "Metal-framed drywall partition with a door opening inside a bright room",
      width: 1080,
      height: 1080,
    },
    galleryCategory: "Drywall",
  },
  {
    slug: "tv-units",
    name: "Custom TV Units",
    short: "Built-in feature walls with niches, shelving and hidden lighting.",
    benefit:
      "A built-in TV wall gives the room a clean focal point: cables hidden, display niches shaped to your belongings and lighting that sets the mood.",
    applications: ["Living rooms", "Master bedrooms", "Lounges and waiting areas", "Executive offices"],
    benefits: ["Cabling concealed in the wall", "Niches and shelves sized to your needs", "Integrated accent lighting", "Finished to match the room"],
    image: {
      src: "/images/projects/tv-wall-illustrative.webp",
      alt: "Living room with a recessed ceiling, cove lighting and a TV wall with display niches",
      width: 720,
      height: 835,
      illustrative: true,
    },
  },
  {
    slug: "screeding-painting",
    name: "Screeding & Painting",
    short: "Careful surface preparation for a smooth, durable finish.",
    benefit:
      "Paint only looks as good as the surface beneath it. Proper screeding and preparation give walls and ceilings the flat, even finish that makes the rest of the work look right.",
    applications: ["New builds ready for finishing", "Walls and ceilings after drywall work", "Refreshing tired interiors", "Textured and decorative paint finishes"],
    benefits: ["Even, flat surfaces", "Preparation done before paint goes on", "Decorative textures available", "Consistent finish across rooms"],
    image: {
      src: "/images/projects/walllight.png",
      alt: "Curved gypsum wall profile in a room before its final finish",
      width: 958,
      height: 1080,
    },
    galleryCategory: "Feature Walls",
  },
  {
    slug: "interior-finishing",
    name: "Interior Finishing",
    short: "Feature walls, accent lighting and the finishing details that tie a room together.",
    benefit:
      "The details are what people notice: arches, panels, feature walls and lighting. We help you choose materials and finishes, then build them cleanly.",
    applications: ["Homes and apartments", "Restaurants, lounges and hotels", "Offices and reception areas", "Show flats and developments"],
    benefits: ["Guidance on materials and finishes", "Arches, panels and feature walls", "Lighting-led design details", "One team from design to finish"],
    image: {
      src: "/images/projects/finishing.jpg",
      alt: "Arched decorative wall panels with integrated lighting above built-in seating",
      width: 1080,
      height: 1080,
    },
    galleryCategory: "Interior Finishing",
  },
];
