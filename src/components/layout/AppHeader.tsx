"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

/** Main site navigation — dashboard is reached from Profile only */
const primaryNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
  { href: "/history", label: "History" },
] as const;

const toolsNav = [
  { href: "/profile", label: "Profile" },
  { href: "/extranet", label: "Owner portal" },
  { href: "/admin", label: "Admin" },
] as const;

function navLinkClass(active: boolean) {
  return [
    "rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200",
    active
      ? "bg-persian-blue text-white shadow-sm"
      : "text-persian-blue-600 hover:bg-icy-blue-900/70 hover:text-persian-blue",
  ].join(" ");
}

function authLinks(className?: string) {
  return (
    <div className={className ?? "flex items-center gap-2"}>
      <Link
        href="/register"
        className="inline-flex h-10 items-center justify-center rounded-lg border border-persian-blue-900/20 bg-white px-3 text-xs font-semibold text-persian-blue shadow-sm transition-all duration-200 hover:border-dodger-blue-400/50 hover:shadow-md sm:px-4 sm:text-sm"
      >
        Register
      </Link>
      <Link
        href="/sign-in"
        className="inline-flex h-10 items-center justify-center rounded-lg bg-persian-blue px-3 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-persian-blue-600 hover:shadow-md sm:px-4 sm:text-sm"
      >
        Sign in
      </Link>
    </div>
  );
}

export function AppHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 border-b border-persian-blue-900/10 bg-white/95 shadow-[0_1px_0_0_rgb(7_42_200/0.04)] backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6 lg:px-8">
        <Link href="/" className="site-logo flex shrink-0 items-center gap-2 rounded-lg pr-1 font-semibold text-persian-blue">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-persian-blue text-sm font-bold text-bright-lemon">
            BE
          </span>
          <span className="hidden text-lg tracking-tight sm:inline">BookEase</span>
        </Link>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex lg:justify-center"
          aria-label="Primary"
        >
          {primaryNav.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClass(pathname === item.href)}>
              {item.label}
            </Link>
          ))}
          <span className="mx-2 hidden h-7 w-px shrink-0 bg-persian-blue-900/15 lg:block" aria-hidden />
          {toolsNav.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClass(pathname === item.href)}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ms-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          {status === "authenticated" && session?.user ? (
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                href="/profile"
                title="Profile"
                className="flex h-10 max-w-44 items-center gap-2 rounded-lg border border-persian-blue-900/12 bg-icy-blue-900/35 py-1 ps-1 pe-3 transition-all duration-200 hover:border-dodger-blue-400/40 hover:bg-white hover:shadow-md"
              >
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt=""
                    width={32}
                    height={32}
                    className="h-8 w-8 shrink-0 rounded-md object-cover"
                  />
                ) : (
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-persian-blue text-xs font-bold text-bright-lemon">
                    {(session.user.name ?? session.user.email ?? "?").slice(0, 1).toUpperCase()}
                  </span>
                )}
                <span className="truncate text-xs font-semibold text-persian-blue">{session.user.name ?? session.user.email ?? "Account"}</span>
              </Link>
              <button
                type="button"
                onClick={() => void signOut({ callbackUrl: "/" })}
                className="h-10 rounded-lg border border-persian-blue-900/18 bg-white px-3 text-xs font-semibold text-persian-blue shadow-sm transition-all duration-200 hover:bg-icy-blue-900/60 hover:shadow-md sm:text-sm"
              >
                Sign out
              </button>
            </div>
          ) : (
            authLinks("flex items-center gap-1.5 sm:gap-2")
          )}

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-persian-blue-900/12 bg-white text-persian-blue shadow-sm transition-colors hover:bg-icy-blue-900/50 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Toggle menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-persian-blue-900/10 bg-white px-4 pb-5 lg:hidden">
          <p className="px-1 pt-3 text-[11px] font-bold uppercase tracking-wider text-persian-blue-400">Browse</p>
          <nav className="mt-1 flex flex-col gap-0.5" aria-label="Mobile primary">
            {primaryNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium ${active ? "bg-persian-blue text-white" : "text-persian-blue hover:bg-icy-blue-900/70"}`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <p className="mt-4 px-1 text-[11px] font-bold uppercase tracking-wider text-persian-blue-400">Account &amp; tools</p>
          <nav className="mt-1 flex flex-col gap-0.5" aria-label="Mobile account">
            {toolsNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium ${active ? "bg-persian-blue text-white" : "text-persian-blue hover:bg-icy-blue-900/70"}`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-5 flex flex-col gap-3 border-t border-persian-blue-900/10 pt-4">
            {status === "authenticated" && session?.user ? (
              <>
                <div className="flex items-center gap-3 rounded-xl border border-persian-blue-900/10 bg-icy-blue-900/40 px-3 py-2">
                  {session.user.image ? (
                    <Image src={session.user.image} alt="" width={40} height={40} className="h-10 w-10 rounded-lg object-cover" />
                  ) : (
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-persian-blue text-sm font-bold text-bright-lemon">
                      {(session.user.name ?? session.user.email ?? "?").slice(0, 1).toUpperCase()}
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-persian-blue">{session.user.name ?? "Signed in"}</p>
                    <p className="truncate text-xs text-persian-blue-400">{session.user.email}</p>
                  </div>
                </div>
                <p className="px-1 text-xs text-persian-blue-400">Open your personal hub from the Profile page.</p>
                <button
                  type="button"
                  className="h-10 rounded-lg border border-persian-blue-900/20 text-sm font-semibold text-persian-blue hover:bg-icy-blue-900/70"
                  onClick={() => {
                    setOpen(false);
                    void signOut({ callbackUrl: "/" });
                  }}
                >
                  Sign out
                </button>
              </>
            ) : (
              authLinks("flex w-full flex-wrap gap-2")
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
