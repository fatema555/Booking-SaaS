"use client";

import { STORAGE_HISTORY } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

type Props = { serviceId: string; title: string };

export function ServiceBookButton({ serviceId, title }: Props) {
  const router = useRouter();

  const book = useCallback(() => {
    try {
      const raw = globalThis.localStorage?.getItem(STORAGE_HISTORY);
      const list = raw ? (JSON.parse(raw) as unknown[]) : [];
      const entry = {
        id: crypto.randomUUID(),
        serviceId,
        title,
        bookedAt: new Date().toISOString(),
      };
      globalThis.localStorage?.setItem(STORAGE_HISTORY, JSON.stringify([entry, ...list]));
    } catch {
      /* ignore */
    }
    router.push("/history");
  }, [router, serviceId, title]);

  return (
    <button
      type="button"
      onClick={book}
      className="inline-flex items-center justify-center rounded-full bg-school-bus-yellow px-4 py-2 text-sm font-semibold text-persian-blue-100 shadow-sm transition hover:bg-school-bus-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-persian-blue"
    >
      Book now
    </button>
  );
}
