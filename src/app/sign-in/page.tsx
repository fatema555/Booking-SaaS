import type { Metadata } from "next";
import Link from "next/link";
import { GoogleAuthButton } from "@/components/auth/GoogleAuthButton";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Sign in — BookEase",
    description: "Sign in to BookEase with Google to view history and manage your profile.",
    path: "/sign-in",
  }),
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-14 sm:px-6 lg:px-8">
      <div className="animate-fade-in-up hover-lift-shadow rounded-2xl border border-persian-blue-900/10 bg-white p-8 shadow-card-soft">
        <h1 className="text-2xl font-bold text-persian-blue">Welcome back</h1>
        <p className="mt-2 text-sm text-persian-blue-400">
          Sign in securely with your Google account. New here?{" "}
          <Link href="/register" className="font-semibold text-dodger-blue-400 underline-offset-4 hover:underline">
            Register
          </Link>
        </p>

        <div className="mt-8 space-y-6">
          <GoogleAuthButton label="Sign in with Google" callbackUrl="/dashboard" />

          <div className="relative flex items-center gap-4 py-1">
            <span className="h-px flex-1 bg-persian-blue-900/15" aria-hidden />
            <span className="text-xs font-semibold uppercase tracking-wide text-persian-blue-400">Or demo form</span>
            <span className="h-px flex-1 bg-persian-blue-900/15" aria-hidden />
          </div>

          <form className="flex flex-col gap-4 opacity-90" action="#" method="post">
            <p className="text-xs text-persian-blue-400">
              Email/password is a UI placeholder — use Google above for real authentication.
            </p>
            <label className="block text-sm font-medium text-persian-blue">
              Email
              <input
                type="email"
                name="email"
                autoComplete="email"
                disabled
                className="mt-1 w-full cursor-not-allowed rounded-xl border border-persian-blue-900/15 bg-icy-blue-900/40 px-4 py-3 text-persian-blue-400 shadow-inner outline-none"
                placeholder="you@example.com"
              />
            </label>
            <label className="block text-sm font-medium text-persian-blue">
              Password
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                disabled
                className="mt-1 w-full cursor-not-allowed rounded-xl border border-persian-blue-900/15 bg-icy-blue-900/40 px-4 py-3 text-persian-blue-400 shadow-inner outline-none"
                placeholder="••••••••"
              />
            </label>
            <button
              type="button"
              disabled
              className="mt-2 cursor-not-allowed rounded-full bg-persian-blue-800 px-6 py-3 text-sm font-semibold text-white/80 opacity-70 shadow-inner"
            >
              Sign in (disabled)
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
