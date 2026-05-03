import { HistoryClient } from "@/components/history/HistoryClient";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Booking history",
  description: "Review your recent BookEase reservations saved on this device.",
  path: "/history",
});

export default function HistoryPage() {
  return <HistoryClient />;
}
