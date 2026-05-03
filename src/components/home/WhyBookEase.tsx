export function WhyBookEase() {
  const reasons = [
    {
      title: "Speed that feels instant",
      body: "Server-rendered pages, streaming where it helps, and a UI tuned for thumb-friendly taps — bookings stay fast on every screen.",
      accent: "from-dodger-blue-500 to-persian-blue-600",
    },
    {
      title: "Quality you can trust",
      body: "Owners propose listings in the extranet; admins approve or refuse before anything appears in search — fewer surprises at checkout.",
      accent: "from-school-bus-yellow-500 to-bright-lemon-500",
    },
    {
      title: "Discovery built for SEO",
      body: "Structured metadata, clean headings, and performance-minded assets help customers find your services without sacrificing polish.",
      accent: "from-icy-blue-400 to-dodger-blue-400",
    },
    {
      title: "History & profile in one place",
      body: "Signed-in journeys keep reservations organized with profile preferences — ideal for repeat bookings and returning guests.",
      accent: "from-persian-blue-600 to-dodger-blue-500",
    },
  ];

  return (
    <section
      className="relative overflow-hidden bg-icy-blue-900/40 px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
      aria-labelledby="why-bookease-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 90%, rgb(252 243 0 / 0.12), transparent 45%), radial-gradient(circle at 90% 20%, rgb(30 150 252 / 0.08), transparent 40%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center animate-fade-in-up">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dodger-blue-400">Why BookEase?</p>
          <h2 id="why-bookease-heading" className="mt-3 text-3xl font-bold tracking-tight text-persian-blue sm:text-4xl">
            Booking tools that scale with your growth
          </h2>
          <p className="mt-4 text-base leading-relaxed text-persian-blue-400 sm:text-lg">
            One cohesive stack for discovery, conversion, and owner workflows — mobile-first by default so nothing feels bolted on.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {reasons.map((item, i) => (
            <li
              key={item.title}
              className="animate-fade-in-up rounded-2xl border border-persian-blue-900/10 bg-white p-6 shadow-sm hover-lift-shadow sm:p-8"
              style={{ animationDelay: `${100 + i * 75}ms` }}
            >
              <div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.accent} shadow-md`}
                aria-hidden
              >
                <span className="h-2.5 w-2.5 rounded-full bg-white/90 shadow-sm" />
              </div>
              <h3 className="text-lg font-semibold text-persian-blue">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-persian-blue-400">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
