import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About BookEase",
  description:
    "Learn how BookEase combines fast booking UX with owner submissions and admin moderation — built on Next.js.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-dodger-blue-400">About</p>
        <h1 className="mt-2 text-3xl font-bold text-persian-blue sm:text-4xl">Built for clarity and scale</h1>
      </header>
      <div className="mt-8 max-w-none space-y-4 text-base leading-relaxed text-persian-blue-400">
        <p>
          BookEase is a lightweight booking surface focused on speed, accessibility, and technical SEO. Public pages ship with thoughtful metadata,
          semantic structure, and optional JSON-LD to help discovery while keeping payloads lean.
        </p>
        <p>
          Service owners propose listings through a dedicated extranet. Each submission lands in a moderation queue where administrators can approve or
          refuse before anything appears on the public catalog.
        </p>
        <p>
          The stack favors the Next.js App Router, streaming-friendly layouts, Cairo typography for global readability, and a Tailwind theme tuned to our
          brand palette — Persian blue anchors the UI with icy blues and energetic yellow accents for calls to action.
        </p>
      </div>
    </article>
  );
}
