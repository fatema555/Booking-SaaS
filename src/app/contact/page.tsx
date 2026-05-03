import { ContactForm } from "@/components/contact/ContactForm";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact",
  description: "Reach the BookEase team with questions about bookings, partnerships, or moderation.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:px-6 lg:px-8">
      <header>
        <h1 className="text-3xl font-bold text-persian-blue">Contact</h1>
        <p className="mt-3 text-sm text-persian-blue-400">
          Messages are stored securely on the server for this demo environment (JSON persistence). Swap the handler for email or CRM when you ship.
        </p>
      </header>
      <ContactForm />
    </div>
  );
}
