import Image from "next/image";

type GalleryItem = {
  src: string;
  alt: string;
  label: "Partner" | "Guest";
  /** Larger hero tile on md+ */
  featured?: boolean;
};

const gallery: GalleryItem[] = [
  {
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80",
    alt: "Partner resort pool deck at dusk",
    label: "Partner",
    featured: true,
  },
  {
    src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
    alt: "Guests relaxing in a bright hotel lounge",
    label: "Guest",
  },
  {
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
    alt: "Partner boutique hotel facade",
    label: "Partner",
  },
  {
    src: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&q=80",
    alt: "Travelers exploring a coastal village",
    label: "Guest",
  },
  {
    src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80",
    alt: "Modern waterfront apartments",
    label: "Partner",
  },
  {
    src: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=80",
    alt: "Visitors on a scenic boardwalk",
    label: "Guest",
  },
  {
    src: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80",
    alt: "Guest family on a sunny patio",
    label: "Guest",
  },
];

export function CommunityGallerySection() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-icy-blue-900/50 to-icy-blue-900/30 px-4 py-14 sm:px-6 sm:py-16 lg:py-20"
      aria-labelledby="gallery-heading"
    >
      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center animate-fade-in-up">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dodger-blue-400">Community</p>
          <h2 id="gallery-heading" className="mt-3 text-2xl font-bold text-persian-blue sm:text-4xl">
            Partners & visitors in the frame
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-persian-blue-400 sm:text-base">
            Properties we spotlight and moments travelers share — responsive grid, descriptive alt text, and hover motion that stays
            subtle.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {gallery.map((item, i) => (
            <li
              key={item.src}
              className={`group relative overflow-hidden rounded-2xl border border-persian-blue-900/10 shadow-card-soft motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:border-dodger-blue-400/40 motion-safe:hover:shadow-hover-lift ${
                item.featured ? "col-span-2 aspect-[21/10] sm:aspect-[24/10]" : "aspect-square sm:aspect-[4/5]"
              }`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.04]"
                sizes={
                  item.featured
                    ? "(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
                    : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                }
                priority={i === 0}
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-persian-blue-100/85 via-transparent to-transparent opacity-90"
                aria-hidden
              />
              <span className="absolute start-3 top-3 inline-flex rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-persian-blue shadow-sm backdrop-blur-sm sm:text-[11px]">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
