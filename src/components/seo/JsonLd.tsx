export function OrganizationJsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BookEase",
    url: base,
    description: "Modern booking platform connecting customers with trusted service providers.",
    logo: `${base}/favicon.ico`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebSiteJsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BookEase",
    url: base,
    potentialAction: {
      "@type": "SearchAction",
      target: `${base}/services?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
