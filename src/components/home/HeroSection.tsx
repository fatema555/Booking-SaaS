import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-persian-blue via-persian-blue-600 to-dodger-blue-500 px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #fcf300 0%, transparent 35%), radial-gradient(circle at 80% 10%, #a2d6f9 0%, transparent 40%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl lg:flex lg:items-center lg:gap-12">
        <div className="max-w-xl animate-fade-in-up lg:flex-1">
          <p className="motion-safe:animate-gentle-pulse inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-bright-lemon shadow-md backdrop-blur transition-shadow duration-300 hover:shadow-hover-lift">
            Mobile-first · SEO-ready · Owner extranet
          </p>
          <h1 className="mt-6 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Book services faster — owners publish, admins curate.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-icy-blue-900 sm:text-lg">
            A lightweight Next.js booking surface with structured metadata, responsive UI, and a clear path from owner submission to published service.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/services"
              className="hover-lift-shadow inline-flex items-center justify-center rounded-full bg-bright-lemon px-6 py-3 text-sm font-semibold text-persian-blue-100 shadow-lg transition-all duration-300 hover:bg-bright-lemon-600 hover:shadow-hover-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Browse services
            </Link>
            <Link
              href="/extranet"
              className="hover-lift-shadow inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-md backdrop-blur transition-all duration-300 hover:bg-white/20 hover:shadow-hover-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Owner extranet
            </Link>
          </div>
        </div>
        <div className="mt-12 animate-fade-in-up lg:mt-0 lg:flex-1" style={{ animationDelay: "180ms" }}>
          <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_24px_48px_-12px_rgb(0_0_0_/_0.35)]">
            <dl className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-xl bg-white/90 p-4 text-persian-blue-100 shadow-sm transition-all duration-300 hover:shadow-lg">
                <dt className="text-xs font-semibold uppercase tracking-wide text-dodger-blue-400">Performance</dt>
                <dd className="mt-1 text-2xl font-bold text-persian-blue">App Router</dd>
                <dd className="text-sm text-persian-blue-400">Streaming-friendly layouts</dd>
              </div>
              <div className="rounded-xl bg-white/90 p-4 text-persian-blue-100 shadow-sm transition-all duration-300 hover:shadow-lg">
                <dt className="text-xs font-semibold uppercase tracking-wide text-dodger-blue-400">Discovery</dt>
                <dd className="mt-1 text-2xl font-bold text-persian-blue">SEO</dd>
                <dd className="text-sm text-persian-blue-400">Metadata, OG, JSON-LD</dd>
              </div>
              <div className="rounded-xl bg-white/90 p-4 text-persian-blue-100 shadow-sm transition-all duration-300 hover:shadow-lg">
                <dt className="text-xs font-semibold uppercase tracking-wide text-dodger-blue-400">Trust</dt>
                <dd className="mt-1 text-2xl font-bold text-persian-blue">Admin</dd>
                <dd className="text-sm text-persian-blue-400">Approve or refuse listings</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
