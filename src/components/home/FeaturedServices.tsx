import Link from "next/link";
import { getApprovedServices } from "@/lib/submissions-store";
import { ServiceBookButton } from "@/components/services/ServiceBookButton";

export async function FeaturedServices() {
  const services = (await getApprovedServices()).slice(0, 4);

  if (services.length === 0) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="hover-lift-shadow rounded-2xl border border-dashed border-persian-blue-900/25 bg-white p-10 text-center shadow-card-soft transition-all duration-300 motion-safe:hover:shadow-hover-lift">
          <h2 className="text-xl font-semibold text-persian-blue">No published services yet</h2>
          <p className="mt-2 text-sm text-persian-blue-400">
            Owners can submit listings via the extranet; admins approve them for this feed.
          </p>
          <Link
            href="/extranet"
            className="mt-6 inline-flex rounded-full bg-persian-blue px-5 py-2.5 text-sm font-semibold text-white hover:bg-persian-blue-600"
          >
            Submit a service
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8" aria-labelledby="featured-heading">
      <div className="flex animate-fade-in-up flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="featured-heading" className="text-2xl font-bold text-persian-blue sm:text-3xl">
            Featured services
          </h2>
          <p className="mt-2 max-w-xl text-sm text-persian-blue-400">
            Curated listings ready to book. Tap “Book now” to save a reservation to your history.
          </p>
        </div>
        <Link href="/services" className="text-sm font-semibold text-dodger-blue-400 hover:text-dodger-blue-600">
          View all →
        </Link>
      </div>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <li
            key={s.id}
            className="animate-fade-in-up hover-lift-shadow flex flex-col rounded-2xl border border-persian-blue-900/10 bg-white p-5 shadow-card-soft transition-colors duration-300 motion-safe:hover:border-dodger-blue-400/40 motion-safe:hover:shadow-hover-lift"
            style={{ animationDelay: `${80 + i * 60}ms` }}
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-dodger-blue-400">{s.category}</p>
            <h3 className="mt-2 text-lg font-semibold text-persian-blue">{s.title}</h3>
            <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-persian-blue-400">{s.description}</p>
            <p className="mt-4 text-sm font-medium text-school-bus-yellow-700">{s.priceHint}</p>
            <div className="mt-4 flex gap-2">
              <ServiceBookButton serviceId={s.id} title={s.title} />
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-persian-blue-900/15 px-4 py-2 text-sm font-semibold text-persian-blue hover:bg-icy-blue-900/80"
              >
                Details
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
