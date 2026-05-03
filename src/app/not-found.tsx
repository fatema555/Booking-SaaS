import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-dodger-blue-400">404</p>
      <h1 className="mt-2 text-2xl font-bold text-persian-blue">Page not found</h1>
      <p className="mt-3 text-sm text-persian-blue-400">The page you requested does not exist or has moved.</p>
      <Link href="/" className="mt-8 rounded-full bg-persian-blue px-6 py-3 text-sm font-semibold text-white hover:bg-persian-blue-600">
        Back home
      </Link>
    </div>
  );
}
