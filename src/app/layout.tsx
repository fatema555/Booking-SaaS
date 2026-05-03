import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { AppHeader } from "@/components/layout/AppHeader";
import { AppFooter } from "@/components/layout/AppFooter";
import { AuthSessionProvider } from "@/components/providers/AuthSessionProvider";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import { siteUrl } from "@/lib/seo";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
  display: "swap",
});

const base = siteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(base),
  title: {
    default: "BookEase — Fast, modern bookings",
    template: "%s | BookEase",
  },
  description:
    "Book trusted services in seconds. Owners submit listings through our extranet; our team keeps quality high.",
  applicationName: "BookEase",
  keywords: ["booking", "appointments", "services", "Next.js", "marketplace"],
  authors: [{ name: "BookEase" }],
  creator: "BookEase",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: base,
    siteName: "BookEase",
    title: "BookEase — Fast, modern bookings",
    description:
      "Lightweight booking platform with owner extranet and admin moderation. Mobile-first and SEO-ready.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BookEase — Fast, modern bookings",
    description:
      "Lightweight booking platform with owner extranet and admin moderation. Mobile-first and SEO-ready.",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#072ac8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cairo.variable} h-full scroll-smooth`}>
      <body className="flex min-h-full flex-col font-sans antialiased text-foreground bg-background">
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <AuthSessionProvider>
          <AppHeader />
          <main className="flex-1">{children}</main>
          <AppFooter />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
