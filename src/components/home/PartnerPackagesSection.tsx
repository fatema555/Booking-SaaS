import Link from "next/link";

const packages = [
  {
    name: "Coastal unwind",
    nights: "5 nights · flights optional",
    perks: ["Airport transfers", "Breakfast daily", "Sunset sailing slot"],
    href: "/contact?topic=package-coastal",
    accent: "border-dodger-blue-400/40 bg-gradient-to-br from-dodger-blue-900/40 to-white",
  },
  {
    name: "Metro cultural sprint",
    nights: "4 nights · museum passes",
    perks: ["Central apartment", "Late checkout", "City transit pack"],
    href: "/contact?topic=package-city",
    accent: "border-persian-blue-900/20 bg-gradient-to-br from-persian-blue-900/25 to-white",
  },
  {
    name: "Mountain reset",
    nights: "6 nights · wellness incl.",
    perks: ["Private cabin", "Guided trek", "Sauna evenings"],
    href: "/contact?topic=package-mountain",
    accent: "border-school-bus-yellow-400/50 bg-gradient-to-br from-school-bus-yellow-900/35 to-white",
  },
];

export function PartnerPackagesSection() {
  return (
    <section
      className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-16 lg:py-20"
      aria-labelledby="partner-packages-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 70% 10%, #1e96fc, transparent 35%), radial-gradient(circle at 20% 80%, #ffc600, transparent 40%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center animate-fade-in-up">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dodger-blue-400">Partners · Full packages</p>
          <h2 id="partner-packages-heading" className="mt-3 text-2xl font-bold text-persian-blue sm:text-4xl">
            Pick a turnkey trip — we stitch stays, transfers, and perks
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-persian-blue-400 sm:text-base">
            Partners bundle inventory across hotels, villas, and serviced apartments so guests choose a storyline, not a spreadsheet.
            Tell us headcount and dates — BookEase concierge shapes the full itinerary.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <li
              key={pkg.name}
              className={`animate-fade-in-up hover-lift-shadow flex flex-col rounded-2xl border-2 p-6 shadow-card-soft motion-safe:hover:shadow-hover-lift sm:p-7 ${pkg.accent}`}
              style={{ animationDelay: `${100 + i * 80}ms` }}
            >
              <h3 className="text-xl font-bold text-persian-blue">{pkg.name}</h3>
              <p className="mt-2 text-sm font-medium text-dodger-blue-400">{pkg.nights}</p>
              <ul className="mt-5 flex flex-1 flex-col gap-2 text-sm text-persian-blue-400">
                {pkg.perks.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bright-lemon-500 shadow-sm" aria-hidden />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={pkg.href}
                className="mt-8 inline-flex items-center justify-center rounded-full bg-persian-blue px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-persian-blue-600 hover:shadow-hover-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-persian-blue"
              >
                Request this package
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center text-xs text-persian-blue-400 animate-fade-in-up">
          Custom corp retreats & incentive trips —{" "}
          <Link href="/contact?topic=partner-bespoke" className="font-semibold text-persian-blue underline-offset-4 hover:underline">
            contact partnerships
          </Link>
        </p>
      </div>
    </section>
  );
}
