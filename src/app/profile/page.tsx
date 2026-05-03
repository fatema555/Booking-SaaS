import { ProfileForm } from "@/components/profile/ProfileForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your profile",
  description: "Manage your BookEase demo profile stored on this device.",
  robots: { index: false, follow: false },
};

export default function ProfilePage() {
  return <ProfileForm />;
}
