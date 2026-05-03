"use client";

import { STORAGE_HISTORY } from "@/lib/constants";
import Link from "next/link";
import { useEffect, useState } from "react";

type Entry = { id: string; serviceId: string; title: string; bookedAt: string };

export function HistoryClient() {
  const [items, setItems] = useState<Entry[]>([]);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const raw = globalThis.localStorage?.getItem(STORAGE_HISTORY);
        setItems(raw ? (JSON.parse(raw) as Entry[]) : []);
      } catch {
        setItems([]);
      }
    });
  }, []);

  function clearAll() {
    globalThis.localStorage?.removeItem(STORAGE_HISTORY);
    setItems([]);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-persian-blue">Booking history</h1>
          <p className="mt-2 text-sm text-persian-blue-400">
            Demo bookings are saved in your browser (localStorage). Replace with authenticated APIs when you wire accounts.
          </p>
        </div>
        {items.length > 0 ? (
          <button
            type="button"
            onClick={clearAll}
            className="rounded-full border border-persian-blue-900/20 px-4 py-2 text-sm font-semibold text-persian-blue hover:bg-icy-blue-900/80"
          >
            Clear history
          </button>
        ) : null}
      </header>

      {items.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-persian-blue-900/20 bg-white p-10 text-center">
          <p className="font-medium text-persian-blue">No bookings yet.</p>
          <p className="mt-2 text-sm text-persian-blue-400">Browse services and tap “Book now” to populate this list.</p>
          <Link href="/services" className="mt-6 inline-flex rounded-full bg-persian-blue px-5 py-2.5 text-sm font-semibold text-white">
            Browse services
          </Link>
        </div>
      ) : (
        <ul className="mt-8 space-y-4">
          {items.map((item) => (
            <li key={item.id} className="rounded-2xl border border-persian-blue-900/10 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-dodger-blue-400">
                {new Date(item.bookedAt).toLocaleString()}
              </p>
              <h2 className="mt-2 text-lg font-semibold text-persian-blue">{item.title}</h2>
              <p className="mt-1 text-sm text-persian-blue-400">Reference service ID: {item.serviceId}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
