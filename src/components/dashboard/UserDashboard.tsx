"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import type {
  BookingStatus,
  CalendarBooking,
} from "@/components/dashboard/SmartCalendar";
import { STORAGE_HISTORY } from "@/lib/constants";
import { useEffect, useMemo, useState } from "react";

type HistoryEntry = {
  id: string;
  serviceId: string;
  title: string;
  bookedAt: string;
};

function normalizeHistory(raw: unknown): HistoryEntry[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((row, i) => {
      if (!row || typeof row !== "object") return null;
      const o = row as Record<string, unknown>;
      const id =
        typeof o.id === "string" && o.id.length > 0 ? o.id : `legacy-${i}`;
      const serviceId = typeof o.serviceId === "string" ? o.serviceId : "";
      const title =
        typeof o.title === "string" && o.title.length > 0 ? o.title : "Booking";
      const bookedAt =
        typeof o.bookedAt === "string" && !Number.isNaN(Date.parse(o.bookedAt))
          ? o.bookedAt
          : new Date().toISOString();
      return { id, serviceId, title, bookedAt };
    })
    .filter((x): x is HistoryEntry => x !== null);
}

const SmartCalendar = dynamic(
  () =>
    import("@/components/dashboard/SmartCalendar").then((m) => m.SmartCalendar),
  {
    ssr: false,
    loading: () => (
      <div
        className="mt-8 rounded-2xl border border-persian-blue-900/10 bg-white p-8 text-center text-sm text-persian-blue-400 shadow-card-soft"
        role="status"
        aria-live="polite"
      >
        Loading calendar…
      </div>
    ),
  },
);

export function UserDashboard() {
  const { data: session, status } = useSession();
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const raw = globalThis.localStorage?.getItem(STORAGE_HISTORY);
        setHistory(raw ? normalizeHistory(JSON.parse(raw)) : []);
      } catch {
        setHistory([]);
      }
    });
  }, []);

  const recent = useMemo(() => history.slice(0, 5), [history]);
  const calendarBookings = useMemo<CalendarBooking[]>(() => {
    const fallbackSlots = [0, 1, 2, 3, 5, 6, 8, 9, 11];
    const base: CalendarBooking[] = history.map((item, idx) => {
      const created = new Date(item.bookedAt);
      const seeded = Math.abs(
        Array.from(item.id).reduce((acc, char) => acc + char.charCodeAt(0), 0),
      );
      const statuses: BookingStatus[] = ["confirmed", "pending", "canceled"];
      const status = statuses[seeded % statuses.length];
      const shifted = new Date(created);
      shifted.setDate(created.getDate() - (idx % 5));
      shifted.setHours(
        fallbackSlots[idx % fallbackSlots.length] ?? 10,
        0,
        0,
        0,
      );
      return {
        id: item.id,
        title: item.title,
        service: item.serviceId
          ? item.serviceId
              .split("-")
              .filter(Boolean)
              .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
              .join(" ") || "General"
          : "General",
        bookedAt: shifted.toISOString(),
        status,
      };
    });
    return base.sort((a, b) => (a.bookedAt > b.bookedAt ? -1 : 1));
  }, [history]);

  if (status === "loading") {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="h-10 w-48 animate-pulse rounded-xl bg-icy-blue-800" />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-28 animate-pulse rounded-2xl bg-white shadow-inner ring-1 ring-persian-blue-900/10"
            />
          ))}
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 sm:px-6 lg:px-8">
        <div className="animate-fade-in-up rounded-2xl border border-persian-blue-900/10 bg-white p-8 text-center shadow-card-soft">
          <h1 className="text-2xl font-bold text-persian-blue">
            Your dashboard
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-persian-blue-400">
            Sign in to see your booking snapshot, shortcuts, and recent activity
            in one place.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/sign-in"
              className="inline-flex justify-center rounded-full bg-persian-blue px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-persian-blue-600 hover:shadow-hover-lift"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="inline-flex justify-center rounded-full border border-persian-blue-900/20 px-6 py-3 text-sm font-semibold text-persian-blue shadow-sm transition-all duration-300 hover:bg-icy-blue-900/80 hover:shadow-hover-lift"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const user = session?.user;
  const avatarSrc = user?.image?.trim();
  const showAvatar = Boolean(avatarSrc?.startsWith("http"));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14 lg:px-8">
      <header className="animate-fade-in-up flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          {showAvatar && avatarSrc ? (
            <Image
              src={avatarSrc}
              alt=""
              width={64}
              height={64}
              className="h-16 w-16 shrink-0 rounded-2xl object-cover ring-2 ring-dodger-blue-900/50 shadow-card-soft"
            />
          ) : (
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-persian-blue-600 to-dodger-blue-500 text-xl font-bold text-white shadow-inner">
              {(user?.name ?? user?.email ?? "?").slice(0, 1).toUpperCase()}
            </span>
          )}
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dodger-blue-400">
              Dashboard
            </p>
            <h1 className="truncate text-2xl font-bold text-persian-blue sm:text-3xl">
              {user?.name ?? "Welcome"}
            </h1>
            <p className="truncate text-sm text-persian-blue-400">
              {user?.email}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/profile"
            className="inline-flex rounded-full border border-persian-blue-900/20 bg-white px-5 py-2.5 text-sm font-semibold text-persian-blue shadow-card-soft transition-all duration-300 hover:border-dodger-blue-400/45 hover:shadow-hover-lift"
          >
            Edit profile
          </Link>
          <Link
            href="/services"
            className="inline-flex rounded-full bg-persian-blue px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-persian-blue-600 hover:shadow-hover-lift"
          >
            Book something
          </Link>
        </div>
      </header>

      <section className="mt-10 grid gap-4 sm:grid-cols-3" aria-label="Summary">
        {[
          {
            label: "Saved bookings",
            value: String(history.length),
            hint: "On this device",
            accent: "from-persian-blue-600 to-dodger-blue-500",
          },
          {
            label: "Account",
            value: user?.email ? "Verified" : "—",
            hint: "Google sign-in",
            accent: "from-dodger-blue-400 to-icy-blue-400",
          },
          {
            label: "Owner tools",
            value: "Extranet",
            hint: "List a property",
            accent: "from-school-bus-yellow-500 to-bright-lemon-500",
          },
        ].map((card, i) => (
          <div
            key={card.label}
            className="hover-lift-shadow animate-fade-in-up rounded-2xl border border-persian-blue-900/10 bg-white p-5 shadow-card-soft"
            style={{ animationDelay: `${80 + i * 50}ms` }}
          >
            <div
              className={`inline-flex rounded-lg bg-linear-to-br ${card.accent} px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-persian-blue-100`}
            >
              Snapshot
            </div>
            <p className="mt-4 text-2xl font-bold text-persian-blue">
              {card.value}
            </p>
            <p className="mt-1 text-sm font-semibold text-persian-blue">
              {card.label}
            </p>
            <p className="mt-2 text-xs text-persian-blue-400">{card.hint}</p>
          </div>
        ))}
      </section>

      <SmartCalendar bookings={calendarBookings} />

      <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <section
          className="hover-lift-shadow rounded-2xl border border-persian-blue-900/10 bg-white p-6 shadow-card-soft"
          aria-labelledby="recent-heading"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2
              id="recent-heading"
              className="text-lg font-bold text-persian-blue"
            >
              Recent bookings
            </h2>
            <Link
              href="/history"
              className="text-sm font-semibold text-dodger-blue-400 underline-offset-4 hover:underline"
            >
              View all
            </Link>
          </div>
          {recent.length === 0 ? (
            <p className="mt-6 rounded-xl border border-dashed border-persian-blue-900/20 bg-icy-blue-900/40 px-4 py-8 text-center text-sm text-persian-blue-400">
              No bookings yet.{" "}
              <Link
                href="/services"
                className="font-semibold text-persian-blue underline-offset-4 hover:underline"
              >
                Browse services
              </Link>
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-persian-blue-900/10">
              {recent.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-2 py-3 first:pt-0"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-persian-blue">
                      {item.title}
                    </p>
                    <p className="text-xs text-persian-blue-400">
                      {new Date(item.bookedAt).toLocaleString()}
                    </p>
                  </div>
                  <span className="rounded-full bg-icy-blue-900/80 px-2.5 py-1 text-[11px] font-semibold text-persian-blue-400">
                    Demo
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <aside className="space-y-4" aria-label="Shortcuts">
          <h2 className="text-lg font-bold text-persian-blue">Shortcuts</h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {[
              {
                href: "/services",
                title: "Services",
                body: "Explore stays & offers",
              },
              { href: "/history", title: "History", body: "Full booking log" },
              { href: "/contact", title: "Support", body: "We reply fast" },
              {
                href: "/extranet",
                title: "Owner portal",
                body: "Submit a listing",
              },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover-lift-shadow flex flex-col rounded-2xl border border-persian-blue-900/10 bg-white p-4 shadow-sm transition-colors hover:border-dodger-blue-400/35"
                >
                  <span className="font-semibold text-persian-blue">
                    {item.title}
                  </span>
                  <span className="mt-1 text-xs text-persian-blue-400">
                    {item.body}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/admin"
            className="block rounded-2xl border border-dashed border-persian-blue-900/25 bg-icy-blue-900/30 px-4 py-3 text-center text-xs font-medium text-persian-blue-400 transition-colors hover:border-persian-blue-900/40 hover:bg-icy-blue-900/50"
          >
            Admin moderation →{" "}
            <span className="font-semibold text-persian-blue">/admin</span>
          </Link>
        </aside>
      </div>
    </div>
  );
}
