import type { Metadata } from "next";

const siteName = "BookEase";

export function siteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  if (url?.startsWith("http")) return url.replace(/\/$/, "");
  return "http://localhost:3000";
}

export function pageMeta(opts: {
  title: string;
  description: string;
  path?: string;
  openGraph?: Metadata["openGraph"];
}): Metadata {
  const canonical = opts.path ? `${siteUrl()}${opts.path}` : siteUrl();
  return {
    title: opts.title,
    description: opts.description,
    metadataBase: new URL(siteUrl()),
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName,
      url: canonical,
      title: opts.title,
      description: opts.description,
      ...opts.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
    },
    robots: { index: true, follow: true },
  };
}
