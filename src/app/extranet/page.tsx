import { OwnerSubmissionForm } from "@/components/extranet/OwnerSubmissionForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Owner extranet",
  description: "Submit your service for BookEase admin review before publication.",
  robots: { index: false, follow: false },
};

export default function ExtranetPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-dodger-blue-400">Owners</p>
        <h1 className="mt-2 text-3xl font-bold text-persian-blue">Extranet · propose a listing</h1>
        <p className="mt-3 text-sm leading-relaxed text-persian-blue-400">
          Completed submissions enter the moderation queue as <strong className="font-semibold text-persian-blue">pending</strong>. Administrators approve or refuse each entry;
          only approved rows surface on the public catalog.
        </p>
      </header>
      <OwnerSubmissionForm />
    </div>
  );
}
