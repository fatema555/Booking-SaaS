"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { STORAGE_PROFILE } from "@/lib/constants";
import { useEffect, useState } from "react";

type Profile = { displayName: string; email: string };

const empty: Profile = { displayName: "", email: "" };

export function ProfileForm() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<Profile>(empty);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const raw = globalThis.localStorage?.getItem(STORAGE_PROFILE);
        const local = raw ? { ...empty, ...(JSON.parse(raw) as Profile) } : empty;
        setProfile(local);
      } catch {
        setProfile(empty);
      }
    });
  }, []);

  useEffect(() => {
    if (session?.user) {
      setProfile((prev) => ({
        displayName: session.user?.name ?? prev.displayName,
        email: session.user?.email ?? prev.email,
      }));
    }
  }, [session?.user?.email, session?.user?.name]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const next: Profile = {
      displayName: String(fd.get("displayName") ?? ""),
      email: String(fd.get("email") ?? ""),
    };
    globalThis.localStorage?.setItem(STORAGE_PROFILE, JSON.stringify(next));
    setProfile(next);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:px-6 lg:px-8">
      <header>
        <h1 className="text-3xl font-bold text-persian-blue">Profile</h1>
        <p className="mt-3 text-sm text-persian-blue-400">
          Google users sign in once — details sync below. Extra fields save locally until you wire a backend profile API.
        </p>
      </header>

      {status === "loading" ? (
        <p className="mt-8 animate-pulse text-sm text-persian-blue-400">Checking session…</p>
      ) : status === "unauthenticated" ? (
        <div className="hover-lift-shadow mt-8 rounded-2xl border border-persian-blue-900/10 bg-white p-6 shadow-card-soft">
          <p className="text-sm text-persian-blue-400">
            You are not signed in. Use Google on the auth pages to unlock personalized history and faster checkout flows.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/sign-in"
              className="inline-flex rounded-full bg-persian-blue px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-persian-blue-600 hover:shadow-hover-lift"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="inline-flex rounded-full border border-persian-blue-900/20 px-5 py-2.5 text-sm font-semibold text-persian-blue shadow-sm transition-all duration-300 hover:bg-icy-blue-900/80 hover:shadow-hover-lift"
            >
              Register
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="hover-lift-shadow mt-8 flex animate-fade-in-up flex-col gap-4 rounded-2xl border border-persian-blue-900/15 bg-white p-6 shadow-card-soft sm:flex-row sm:items-center">
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt=""
                width={72}
                height={72}
                className="h-[72px] w-[72px] shrink-0 rounded-2xl object-cover ring-2 ring-dodger-blue-900/60"
              />
            ) : (
              <span className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-persian-blue-600 to-dodger-blue-500 text-2xl font-bold text-white shadow-inner">
                {(session?.user?.name ?? session?.user?.email ?? "?").slice(0, 1).toUpperCase()}
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-lg font-semibold text-persian-blue">{session?.user?.name ?? "Google account"}</p>
              <p className="truncate text-sm text-persian-blue-400">{session?.user?.email}</p>
              <button
                type="button"
                onClick={() => void signOut({ callbackUrl: "/" })}
                className="mt-3 text-sm font-semibold text-dodger-blue-400 underline-offset-4 hover:underline"
              >
                Sign out
              </button>
            </div>
          </div>

          <div className="hover-lift-shadow mt-6 overflow-hidden rounded-2xl border border-dodger-blue-400/25 bg-gradient-to-br from-persian-blue via-persian-blue-600 to-dodger-blue-500 p-6 text-white shadow-card-soft sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bright-lemon/95">Your space</p>
            <h2 className="mt-2 text-xl font-bold sm:text-2xl">Personal dashboard</h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-icy-blue-900">
              Bookings, shortcuts, and activity — separate from the public site and admin tools. Open it only when you want your member view.
            </p>
            <Link
              href="/dashboard"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-bright-lemon px-6 py-3 text-sm font-bold text-persian-blue-100 shadow-lg transition-all duration-300 hover:bg-bright-lemon-600 hover:shadow-xl"
            >
              Open my dashboard
            </Link>
          </div>
        </>
      )}

      <form
        key={`${profile.email}-${profile.displayName}-${session?.user?.email ?? ""}`}
        onSubmit={onSubmit}
        className="hover-lift-shadow mt-8 grid gap-4 rounded-2xl border border-persian-blue-900/10 bg-white p-6 shadow-card-soft"
      >
        <div>
          <label htmlFor="displayName" className="text-sm font-medium text-persian-blue">
            Display name
          </label>
          <input
            id="displayName"
            name="displayName"
            defaultValue={profile.displayName}
            autoComplete="name"
            className="mt-1 w-full rounded-xl border border-persian-blue-900/15 px-3 py-2 text-sm outline-none ring-dodger-blue-400 transition-shadow focus:border-dodger-blue-400 focus:ring-2 focus:shadow-md"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-persian-blue">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={profile.email}
            autoComplete="email"
            readOnly={Boolean(session?.user?.email)}
            className={`mt-1 w-full rounded-xl border border-persian-blue-900/15 px-3 py-2 text-sm outline-none ring-dodger-blue-400 transition-shadow focus:border-dodger-blue-400 focus:ring-2 focus:shadow-md ${
              session?.user?.email ? "cursor-not-allowed bg-icy-blue-900/50 text-persian-blue-400" : ""
            }`}
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center rounded-full bg-dodger-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-dodger-blue-600 hover:shadow-hover-lift"
        >
          Save profile
        </button>
        {saved ? <p className="animate-fade-in-up text-sm font-medium text-dodger-blue-400">Saved.</p> : null}
      </form>
    </div>
  );
}
