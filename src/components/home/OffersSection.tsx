const offers = [
  {
    title: "Early bird weekends",
    detail: "Lock weekday rates when you book Fri–Sun bundles 21+ days ahead.",
    badge: "Limited",
    accent: "from-persian-blue-600 to-dodger-blue-500",
  },
  {
    title: "Stay longer, save more",
    detail: "Automatic markdowns from night seven — stacks with partner packages.",
    badge: "Popular",
    accent: "from-school-bus-yellow-500 to-bright-lemon-500",
  },
  {
    title: "Flexible hold",
    detail: "48-hour courtesy holds on villas & vacation homes before you commit.",
    badge: "New",
    accent: "from-dodger-blue-400 to-icy-blue-400",
  },
];

export function OffersSection() {
  return (
    <section
      className="relative overflow-hidden border-y border-persian-blue-900/10 bg-white px-4 py-14 sm:px-6 sm:py-16 lg:py-20"
      aria-labelledby="offers-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 40%, #072ac8, transparent 42%), radial-gradient(circle at 85% 70%, #fcf300, transparent 38%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 text-center sm:text-start md:flex-row md:items-end md:justify-between">
          <div className="animate-fade-in-up max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dodger-blue-400">Offers</p>
            <h2 id="offers-heading" className="mt-2 text-2xl font-bold text-persian-blue sm:text-3xl">
              Deals crafted for planners & spontaneous trips alike
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-persian-blue-400 sm:text-base">
              Transparent perks across stays — no treasure-hunt promo codes. Availability updates live as inventory shifts.
            </p>
          </div>
          <span className="inline-flex animate-fade-in-up justify-center rounded-full bg-icy-blue-900/70 px-4 py-2 text-xs font-semibold text-persian-blue shadow-md motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-lg md:self-auto">
            Refresh weekly · Subject to inventory
          </span>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer, i) => (
            <li
              key={offer.title}
              className="animate-fade-in-up hover-lift-shadow rounded-2xl border border-persian-blue-900/10 bg-icy-blue-900/50 p-6 shadow-card-soft motion-safe:hover:border-dodger-blue-400/35 sm:p-7"
              style={{ animationDelay: `${90 + i * 70}ms` }}
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`inline-flex rounded-full bg-gradient-to-r ${offer.accent} px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-persian-blue-100 shadow-sm`}
                >
                  {offer.badge}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-persian-blue">{offer.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-persian-blue-400">{offer.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
