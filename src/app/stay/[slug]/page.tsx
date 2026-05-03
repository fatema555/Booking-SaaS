import Link from "next/link";
import { notFound } from "next/navigation";
import { STAY_CATEGORIES, getStayCategory } from "@/lib/stay-categories";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return STAY_CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const cat = getStayCategory(slug);
  if (!cat) return {};
  return pageMeta({
    title: `${cat.title} · BookEase stays`,
    description: cat.description,
    path: `/stay/${slug}`,
  });
}

export default async function StayCategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = getStayCategory(slug);
  if (!cat) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <nav aria-label="Breadcrumb" className="text-sm text-persian-blue-400">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link href="/" className="font-medium text-dodger-blue-400 hover:text-dodger-blue-600">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/#stay-types-heading" className="font-medium text-dodger-blue-400 hover:text-dodger-blue-600">
              Stay types
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="font-semibold text-persian-blue">{cat.title}</li>
        </ol>
      </nav>

      <header className="mt-8 animate-fade-in-up">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dodger-blue-400">{cat.tagline}</p>
        <h1 className="mt-3 text-3xl font-bold text-persian-blue sm:text-4xl">{cat.title}</h1>
        <p className="mt-4 text-base leading-relaxed text-persian-blue-400 sm:text-lg">{cat.description}</p>
      </header>

      <div className="mt-10 grid gap-4 animate-fade-in-up rounded-2xl border border-persian-blue-900/10 bg-white p-6 shadow-card-soft hover-lift-shadow sm:p-8">
        <h2 className="text-lg font-semibold text-persian-blue">How BookEase handles {cat.title.toLowerCase()}</h2>
        <ul className="list-disc space-y-2 ps-5 text-sm leading-relaxed text-persian-blue-400">
          <li>Inventory flows through owner extranet approvals — every listing is admin-reviewed.</li>
          <li>Transparent pricing hints before you reach checkout; holds available where enabled.</li>
          <li>Mix this category into partner packages for flights, transfers, and bundled perks.</li>
        </ul>
        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-full bg-persian-blue px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-persian-blue-600 hover:shadow-hover-lift"
          >
            Browse live listings
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-persian-blue-900/20 px-6 py-3 text-sm font-semibold text-persian-blue shadow-sm transition-all duration-300 hover:border-dodger-blue-400/50 hover:shadow-hover-lift"
          >
            Talk to concierge
          </Link>
        </div>
      </div>

      <section className="mt-12 animate-fade-in-up">
        <h2 className="text-lg font-semibold text-persian-blue">Explore other stay types</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {STAY_CATEGORIES.filter((c) => c.slug !== slug).map((c) => (
            <li key={c.slug}>
              <Link
                href={`/stay/${c.slug}`}
                className="inline-flex rounded-full border border-persian-blue-900/15 bg-white px-4 py-2 text-sm font-medium text-persian-blue shadow-sm transition-all duration-200 hover:border-dodger-blue-400/45 hover:shadow-hover-lift"
              >
                {c.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
