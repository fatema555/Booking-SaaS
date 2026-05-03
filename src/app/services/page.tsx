import Link from "next/link";
import { ServiceBookButton } from "@/components/services/ServiceBookButton";
import { getApprovedServices } from "@/lib/submissions-store";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Services catalog",
  description: "Browse approved BookEase services — book instantly and track reservations in your history.",
  path: "/services",
});

export default async function ServicesPage() {
  const services = await getApprovedServices();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold text-persian-blue sm:text-4xl">Services</h1>
        <p className="mt-3 text-sm leading-relaxed text-persian-blue-400 sm:text-base">
          Each listing below passed admin review. Select “Book now” to add a reservation reference to your device history (demo persistence via browser storage).
        </p>
      </header>

      {services.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-persian-blue-900/20 bg-white p-12 text-center">
          <p className="font-medium text-persian-blue">No approved services yet.</p>
          <p className="mt-2 text-sm text-persian-blue-400">Check back soon or submit your own via the extranet.</p>
          <Link href="/extranet" className="mt-6 inline-flex rounded-full bg-persian-blue px-5 py-2.5 text-sm font-semibold text-white">
            Owner extranet
          </Link>
        </div>
      ) : (
        <ul className="mt-10 grid gap-6 lg:grid-cols-2">
          {services.map((s) => (
            <li key={s.id} className="rounded-2xl border border-persian-blue-900/10 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-icy-blue-900 px-3 py-1 text-xs font-semibold text-persian-blue-300">{s.category}</span>
                {s.priceHint ? (
                  <span className="text-xs font-semibold text-school-bus-yellow-700">{s.priceHint}</span>
                ) : null}
              </div>
              <h2 className="mt-4 text-xl font-semibold text-persian-blue">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-persian-blue-400">{s.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ServiceBookButton serviceId={s.id} title={s.title} />
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-persian-blue-900/15 px-4 py-2 text-sm font-semibold text-persian-blue hover:bg-icy-blue-900/80"
                >
                  Ask a question
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
