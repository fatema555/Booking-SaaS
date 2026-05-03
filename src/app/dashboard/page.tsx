import { UserDashboard } from "@/components/dashboard/UserDashboard";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Dashboard",
    description: "Your BookEase hub: bookings, shortcuts, and account overview.",
    path: "/dashboard",
  }),
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <UserDashboard />;
}
