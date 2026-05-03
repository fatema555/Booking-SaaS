export type StayCategory = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
};

export const STAY_CATEGORIES: StayCategory[] = [
  {
    slug: "hotels",
    title: "Hotels",
    tagline: "Front desk comfort",
    description:
      "City-center towers, boutique hideaways, and full-service stays with housekeeping and concierge — ideal when you want zero-friction arrivals.",
  },
  {
    slug: "apartments",
    title: "Apartments",
    tagline: "Live like a local",
    description:
      "Self-contained flats with kitchens and laundry hooks — perfect for longer stays, remote work weeks, and neighborhoods you want to explore slowly.",
  },
  {
    slug: "villas",
    title: "Villas",
    tagline: "Private pools & space",
    description:
      "Spacious layouts for groups and celebrations: gardens, terraces, and multi-bedroom layouts that feel like your own retreat.",
  },
  {
    slug: "cabins",
    title: "Cabins",
    tagline: "Nature-forward escapes",
    description:
      "Woodland edges, lakeside docks, and fireplace evenings — curated cabins for unplugged weekends without sacrificing essentials.",
  },
  {
    slug: "serviced-apartments",
    title: "Serviced apartments",
    tagline: "Hotel polish, apartment freedom",
    description:
      "Weekly housekeeping, linen swaps, and front-desk support layered onto apartment layouts — built for relocating teams and extended trips.",
  },
  {
    slug: "vacation-homes",
    title: "Vacation homes",
    tagline: "Whole-home privacy",
    description:
      "Detached residences from coastal cottages to ski-town lodges — bring the whole crew and keep routines intact.",
  },
  {
    slug: "guest-houses",
    title: "Guest houses",
    tagline: "Intimate hospitality",
    description:
      "Owner-hosted gems with personalized touches — breakfasts on the terrace, local tips, and quieter footprints than big-brand hotels.",
  },
];

export function getStayCategory(slug: string): StayCategory | undefined {
  return STAY_CATEGORIES.find((c) => c.slug === slug);
}
