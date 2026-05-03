const testimonials = [
  {
    quote:
      "BookEase turned our villa weekends into one checkout flow. Guest messaging stayed clear and the hold policy saved us twice.",
    name: "Amelia Rhodes",
    role: "Repeat guest · Lisbon",
    rating: 5,
  },
  {
    quote:
      "As a boutique hotel partner, I finally see submissions go live only after admin review — exactly the trust bar we needed.",
    name: "Jordan Malik",
    role: "Partner · Atlas Boutique Hotels",
    rating: 5,
  },
  {
    quote:
      "The stay-type pages helped our team pick serviced apartments vs hotels fast. Mobile UX feels native, not shrunken desktop.",
    name: "Priya Desai",
    role: "Corporate travel lead",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section
      className="relative overflow-hidden border-y border-persian-blue-900/10 bg-white px-4 py-14 sm:px-6 sm:py-16 lg:py-20"
      aria-labelledby="testimonials-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, #072ac8, transparent 45%), radial-gradient(circle at 75% 85%, #fcf300, transparent 42%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center animate-fade-in-up">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dodger-blue-400">Testimonials</p>
          <h2 id="testimonials-heading" className="mt-3 text-2xl font-bold text-persian-blue sm:text-4xl">
            Voices from guests & partners
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-persian-blue-400 sm:text-base">
            Real feedback from travelers booking curated stays and operators publishing through the extranet pipeline.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <li
              key={t.name}
              className="animate-fade-in-up hover-lift-shadow flex flex-col rounded-2xl border border-persian-blue-900/10 bg-gradient-to-b from-icy-blue-900/70 to-white p-6 shadow-card-soft motion-safe:hover:border-dodger-blue-400/35 motion-safe:hover:shadow-hover-lift sm:p-8"
              style={{ animationDelay: `${90 + i * 70}ms` }}
            >
              <div className="flex gap-1 text-school-bus-yellow-600" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <StarIcon key={j} />
                ))}
              </div>
              <blockquote className="mt-5 flex-1">
                <p className="text-sm leading-relaxed text-persian-blue sm:text-[15px]">&ldquo;{t.quote}&rdquo;</p>
              </blockquote>
              <footer className="mt-6 border-t border-persian-blue-900/10 pt-5">
                <p className="text-sm font-semibold text-persian-blue">{t.name}</p>
                <p className="mt-1 text-xs text-persian-blue-400">{t.role}</p>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function StarIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
