import { Suspense } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { WhyBookEase } from "@/components/home/WhyBookEase";
import { OffersSection } from "@/components/home/OffersSection";
import { ServiceTypesCarousel } from "@/components/home/ServiceTypesCarousel";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { PartnerPackagesSection } from "@/components/home/PartnerPackagesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CommunityGallerySection } from "@/components/home/CommunityGallerySection";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "BookEase — Fast, modern bookings",
  description:
    "Discover curated services, book in one tap, and track history. Owners publish via extranet; admins keep quality high.",
  path: "/",
});

function FeaturedFallback() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 animate-pulse sm:px-6 lg:px-8">
      <div className="h-8 w-48 rounded bg-icy-blue-800" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-56 rounded-2xl bg-white shadow-sm ring-1 ring-persian-blue-900/10" />
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyBookEase />
      <OffersSection />
      <ServiceTypesCarousel />
      <Suspense fallback={<FeaturedFallback />}>
        <FeaturedServices />
      </Suspense>
      <PartnerPackagesSection />
      <TestimonialsSection />
      <CommunityGallerySection />
      <section className="border-y border-persian-blue-900/10 bg-white py-14">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <h2 className="text-xl font-bold text-persian-blue">Own a service?</h2>
            <p className="mt-2 max-w-xl text-sm text-persian-blue-400">
              Use the extranet to propose your listing. Our admin team reviews every submission before it goes live.
            </p>
          </div>
          <a
            href="/extranet"
            className="inline-flex rounded-full bg-persian-blue px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-persian-blue-600 hover:shadow-lg"
          >
            Open extranet
          </a>
        </div>
      </section>
    </>
  );
}
