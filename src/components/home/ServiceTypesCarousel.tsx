"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";
import { STAY_CATEGORIES } from "@/lib/stay-categories";

const gradients = [
  "from-persian-blue-600 via-dodger-blue-500 to-icy-blue-400",
  "from-dodger-blue-500 via-persian-blue-600 to-bright-lemon-500",
  "from-school-bus-yellow-500 via-bright-lemon-500 to-dodger-blue-400",
  "from-icy-blue-400 via-dodger-blue-500 to-persian-blue-600",
  "from-persian-blue-500 via-icy-blue-400 to-dodger-blue-500",
  "from-bright-lemon-500 via-school-bus-yellow-500 to-persian-blue-600",
  "from-dodger-blue-400 via-icy-blue-500 to-persian-blue-500",
];

export function ServiceTypesCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByDir = useCallback((dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-carousel-card]");
    const gap = 16;
    const width = card ? card.offsetWidth + gap : Math.min(el.clientWidth * 0.85, 320);
    el.scrollBy({ left: dir * width, behavior: "smooth" });
  }, []);

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-icy-blue-900/30 to-icy-blue-900/60 px-4 py-14 sm:px-6 sm:py-16 lg:py-20"
      aria-labelledby="stay-types-heading"
    >
      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="animate-fade-in-up max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dodger-blue-400">Browse by stay type</p>
            <h2 id="stay-types-heading" className="scroll-mt-28 mt-2 text-2xl font-bold text-persian-blue sm:text-3xl">
              Seven curated lanes — each opens its own destination page
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-persian-blue-400 sm:text-base">
              Swipe on mobile or use arrows on desktop. Every card links to a dedicated hub with tailored guidance for that category.
            </p>
          </div>
          <div className="flex shrink-0 animate-fade-in-up items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-persian-blue-900/15 bg-white text-persian-blue shadow-card-soft transition-all duration-200 hover:border-dodger-blue-400/50 hover:shadow-hover-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-persian-blue"
              aria-label="Scroll carousel left"
              onClick={() => scrollByDir(-1)}
            >
              <Chevron className="-scale-x-100" />
            </button>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-persian-blue-900/15 bg-white text-persian-blue shadow-card-soft transition-all duration-200 hover:border-dodger-blue-400/50 hover:shadow-hover-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-persian-blue"
              aria-label="Scroll carousel right"
              onClick={() => scrollByDir(1)}
            >
              <Chevron />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="carousel-mask mt-10 flex gap-4 overflow-x-auto pb-4 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] motion-safe:scroll-smooth [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: "x mandatory" }}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Stay categories"
        >
          {STAY_CATEGORIES.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/stay/${cat.slug}`}
              data-carousel-card
              className="hover-lift-shadow group relative flex w-[min(100%,280px)] shrink-0 snap-start snap-always flex-col overflow-hidden rounded-2xl border border-persian-blue-900/10 bg-white shadow-card-soft motion-safe:transition-shadow motion-safe:duration-300 motion-safe:hover:border-dodger-blue-400/40 motion-safe:hover:shadow-hover-lift sm:w-[300px]"
              style={{ animationDelay: `${60 + i * 40}ms` }}
            >
              <div
                className={`relative h-28 bg-gradient-to-br ${gradients[i % gradients.length]} opacity-95 motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.03]`}
                aria-hidden
              >
                <div className="absolute inset-0 bg-[linear-gradient(160deg,rgb(255_255_255/0.15),transparent_55%)]" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-dodger-blue-400">{cat.tagline}</p>
                <h3 className="mt-2 text-lg font-bold text-persian-blue">{cat.title}</h3>
                <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-persian-blue-400">{cat.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-persian-blue-600 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5">
                  Explore {cat.title}
                  <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg className={`h-5 w-5 ${className ?? ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}
