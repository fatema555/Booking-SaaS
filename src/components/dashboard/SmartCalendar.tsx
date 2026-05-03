"use client";

import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type BookingStatus = "confirmed" | "canceled" | "pending";

export type CalendarBooking = {
  id: string;
  title: string;
  service: string;
  bookedAt: string;
  status: BookingStatus;
};

type ViewMode = "day" | "week" | "month";

function statusStyles(status: BookingStatus): string {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-800 ring-green-200";
    case "canceled":
      return "bg-red-100 text-red-800 ring-red-200";
    case "pending":
      return "bg-yellow-100 text-yellow-800 ring-yellow-200";
    default:
      return "bg-gray-100 text-gray-700 ring-gray-200";
  }
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function startOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return startOfDay(d);
}

function sameDay(left: Date, right: Date): boolean {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

export function SmartCalendar({ bookings }: { bookings: CalendarBooking[] }) {
  const [view, setView] = useState<ViewMode>("week");
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">(
    "all",
  );
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const [summary, setSummary] = useState<string>("");
  const [anchorDate, setAnchorDate] = useState<Date>(() =>
    startOfDay(new Date()),
  );
  const services = useMemo(
    () =>
      Array.from(new Set(bookings.map((b) => b.service))).sort((a, b) =>
        a.localeCompare(b),
      ),
    [bookings],
  );

  const bookingsByFilter = useMemo(() => {
    return bookings.filter((b) => {
      const statusOk = statusFilter === "all" || b.status === statusFilter;
      const serviceOk = serviceFilter === "all" || b.service === serviceFilter;
      return statusOk && serviceOk;
    });
  }, [bookings, serviceFilter, statusFilter]);

  const visibleBookings = useMemo(() => {
    if (view === "day") {
      return bookingsByFilter.filter((b) =>
        sameDay(new Date(b.bookedAt), anchorDate),
      );
    }
    if (view === "week") {
      const weekStart = startOfWeek(anchorDate);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 7);
      return bookingsByFilter.filter((b) => {
        const dt = new Date(b.bookedAt);
        return dt >= weekStart && dt < weekEnd;
      });
    }
    return bookingsByFilter.filter((b) => {
      const dt = new Date(b.bookedAt);
      return (
        dt.getFullYear() === anchorDate.getFullYear() &&
        dt.getMonth() === anchorDate.getMonth()
      );
    });
  }, [anchorDate, bookingsByFilter, view]);

  const occupancySeries = useMemo(() => {
    const weekStart = startOfWeek(anchorDate);
    return Array.from({ length: 7 }, (_, idx) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + idx);
      const dayBookings = bookingsByFilter.filter((b) =>
        sameDay(new Date(b.bookedAt), date),
      );
      const confirmed = dayBookings.filter(
        (b) => b.status === "confirmed",
      ).length;
      const pending = dayBookings.filter((b) => b.status === "pending").length;
      const occupancy = Math.min(100, confirmed * 20 + pending * 10);
      return {
        day: date.toLocaleDateString(undefined, { weekday: "short" }),
        occupancy,
      };
    });
  }, [anchorDate, bookingsByFilter]);

  const periodLabel = useMemo(() => {
    if (view === "day") {
      return anchorDate.toLocaleDateString(undefined, {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
    if (view === "week") {
      const start = startOfWeek(anchorDate);
      const end = new Date(start);
      end.setDate(end.getDate() + 6);
      return `${start.toLocaleDateString(undefined, { month: "short", day: "numeric" })} - ${end.toLocaleDateString(
        undefined,
        { month: "short", day: "numeric", year: "numeric" },
      )}`;
    }
    return anchorDate.toLocaleDateString(undefined, {
      month: "long",
      year: "numeric",
    });
  }, [anchorDate, view]);

  const dateInputValue = useMemo(() => {
    const yyyy = anchorDate.getFullYear();
    const mm = String(anchorDate.getMonth() + 1).padStart(2, "0");
    const dd = String(anchorDate.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, [anchorDate]);

  function movePeriod(direction: -1 | 1) {
    setAnchorDate((prev) => {
      const next = new Date(prev);
      if (view === "day") next.setDate(prev.getDate() + direction);
      else if (view === "week") next.setDate(prev.getDate() + direction * 7);
      else next.setMonth(prev.getMonth() + direction);
      return startOfDay(next);
    });
  }

  function generateSummary() {
    const counts = visibleBookings.reduce(
      (acc, b) => {
        acc.total += 1;
        acc[b.status] += 1;
        return acc;
      },
      { total: 0, confirmed: 0, canceled: 0, pending: 0 },
    );
    const windowName =
      view === "day" ? "today" : view === "week" ? "this week" : "this month";
    setSummary(
      `For ${windowName}: ${counts.total} bookings (${counts.confirmed} confirmed, ${counts.pending} pending, ${counts.canceled} canceled).`,
    );
  }

  return (
    <section className="mt-8 rounded-2xl border border-persian-blue-900/10 bg-white p-4 shadow-card-soft sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-persian-blue">
            Smart Calendar
          </h2>
          <p className="text-sm text-persian-blue-400">
            Daily and weekly booking view with quick occupancy insight.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-lg border border-persian-blue-900/10 bg-icy-blue-900/35 p-1">
            <button
              type="button"
              onClick={() => setView("day")}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold ${view === "day" ? "bg-persian-blue text-white" : "text-persian-blue hover:bg-white"}`}
            >
              Day
            </button>
            <button
              type="button"
              onClick={() => setView("week")}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold ${view === "week" ? "bg-persian-blue text-white" : "text-persian-blue hover:bg-white"}`}
            >
              Week
            </button>
            <button
              type="button"
              onClick={() => setView("month")}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold ${view === "month" ? "bg-persian-blue text-white" : "text-persian-blue hover:bg-white"}`}
            >
              Month
            </button>
          </div>
          <button
            type="button"
            onClick={generateSummary}
            className="rounded-lg bg-dodger-blue-500 px-3 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-dodger-blue-600"
          >
            Smart Summarization
          </button>
        </div>
      </div>

      {summary ? (
        <p className="mt-3 rounded-lg border border-dodger-blue-900/30 bg-dodger-blue-900/25 px-3 py-2 text-sm text-persian-blue">
          {summary}
        </p>
      ) : null}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-persian-blue-900/10 bg-icy-blue-900/30 p-2.5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => movePeriod(-1)}
            className="rounded-md border border-persian-blue-900/15 bg-white px-2.5 py-1.5 text-xs font-semibold text-persian-blue hover:bg-icy-blue-900/60"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => setAnchorDate(startOfDay(new Date()))}
            className="rounded-md border border-persian-blue-900/15 bg-white px-2.5 py-1.5 text-xs font-semibold text-persian-blue hover:bg-icy-blue-900/60"
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => movePeriod(1)}
            className="rounded-md border border-persian-blue-900/15 bg-white px-2.5 py-1.5 text-xs font-semibold text-persian-blue hover:bg-icy-blue-900/60"
          >
            Next
          </button>
        </div>
        <p className="text-xs font-semibold text-persian-blue">{periodLabel}</p>
        <input
          type="date"
          value={dateInputValue}
          onChange={(e) => {
            if (!e.target.value) return;
            setAnchorDate(startOfDay(new Date(`${e.target.value}T00:00:00`)));
          }}
          className="rounded-md border border-persian-blue-900/15 bg-white px-2 py-1.5 text-xs font-semibold text-persian-blue outline-none ring-dodger-blue-400 focus:ring-2"
          aria-label="Pick date for calendar"
        />
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="text-xs font-semibold text-persian-blue-400">
          Status filter
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as BookingStatus | "all")
            }
            className="mt-1 w-full rounded-lg border border-persian-blue-900/15 bg-white px-3 py-2 text-sm text-persian-blue outline-none ring-dodger-blue-400 focus:ring-2"
          >
            <option value="all">All statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="canceled">Canceled</option>
          </select>
        </label>
        <label className="text-xs font-semibold text-persian-blue-400">
          Service filter
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="mt-1 w-full rounded-lg border border-persian-blue-900/15 bg-white px-3 py-2 text-sm text-persian-blue outline-none ring-dodger-blue-400 focus:ring-2"
          >
            <option value="all">All services</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="rounded-xl border border-persian-blue-900/10 bg-icy-blue-900/30 p-3">
          <ul className="space-y-2">
            {visibleBookings.length === 0 ? (
              <li className="rounded-lg border border-dashed border-persian-blue-900/20 bg-white px-3 py-5 text-center text-sm text-persian-blue-400">
                No bookings in this {view}.
              </li>
            ) : (
              visibleBookings.map((booking) => (
                <li
                  key={booking.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-persian-blue-900/10 bg-white px-3 py-2.5"
                >
                  <div>
                    <p className="font-medium text-persian-blue">
                      {booking.title}
                    </p>
                    <p className="text-xs text-persian-blue-400">
                      {new Date(booking.bookedAt).toLocaleString()}
                    </p>
                    <p className="mt-1 inline-flex rounded-full bg-icy-blue-900/80 px-2 py-0.5 text-[11px] font-semibold text-persian-blue">
                      {booking.service}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ring-1 ${statusStyles(booking.status)}`}
                  >
                    {booking.status}
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="rounded-xl border border-persian-blue-900/10 bg-white p-3">
          <h3 className="text-sm font-semibold text-persian-blue">
            Weekly occupancy (%)
          </h3>
          <div className="mt-3 h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={occupancySeries}
                margin={{ left: 0, right: 0, top: 8, bottom: 0 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <YAxis
                  domain={[0, 100]}
                  tickLine={false}
                  axisLine={false}
                  width={32}
                />
                <Tooltip
                  formatter={(value: any) => [`${value}%`, "Occupancy"]}
                />
                <Bar dataKey="occupancy" fill="#1e96fc" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <span className="rounded-full bg-green-100 px-2.5 py-1 font-semibold text-green-800">
          Confirmed
        </span>
        <span className="rounded-full bg-red-100 px-2.5 py-1 font-semibold text-red-800">
          Canceled
        </span>
        <span className="rounded-full bg-yellow-100 px-2.5 py-1 font-semibold text-yellow-800">
          Pending
        </span>
      </div>
    </section>
  );
}
