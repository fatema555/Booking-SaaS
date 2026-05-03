import Link from "next/link";

export function AppFooter() {
  return (
    <footer className="mt-auto border-t border-persian-blue-900/10 bg-persian-blue text-icy-blue-900">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <p className="text-lg font-semibold text-white">BookEase</p>
          <p className="mt-2 max-w-md text-sm text-icy-blue-800">
            Lightweight booking flows, owner submissions, and admin moderation — built with Next.js for speed and SEO.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-bright-lemon">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link className="text-icy-blue-800 hover:text-white" href="/services">
                Services
              </Link>
            </li>
            <li>
              <Link className="text-icy-blue-800 hover:text-white" href="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="text-icy-blue-800 hover:text-white" href="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-school-bus-yellow">For partners</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link className="text-icy-blue-800 hover:text-white" href="/extranet">
                Owner extranet
              </Link>
            </li>
            <li>
              <Link className="text-icy-blue-800 hover:text-white" href="/admin">
                Admin
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-icy-blue-800">
        © {new Date().getFullYear()} BookEase. All rights reserved.
      </div>
    </footer>
  );
}
