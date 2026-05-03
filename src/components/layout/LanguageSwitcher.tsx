"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const locales = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
] as const;

const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

function getServerLocale(): "en" | "ar" {
  return "en";
}

function getClientLocale(): "en" | "ar" {
  const s = window.localStorage.getItem("bookEaseLang");
  return s === "ar" ? "ar" : "en";
}

function persistLocale(code: "en" | "ar") {
  window.localStorage.setItem("bookEaseLang", code);
  listeners.forEach((fn) => fn());
}

export function LanguageSwitcher() {
  const locale = useSyncExternalStore(subscribe, getClientLocale, getServerLocale);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  useEffect(() => {
    function onPointerDown(e: MouseEvent | TouchEvent) {
      if (!panelRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, []);

  function pick(code: "en" | "ar") {
    persistLocale(code);
    setOpen(false);
  }

  const current = locales.find((l) => l.code === locale)?.label ?? "English";

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        className="group flex h-10 items-center gap-1.5 rounded-full border border-persian-blue-900/15 bg-white px-2 text-sm font-medium text-persian-blue shadow-sm transition-all duration-200 hover:border-dodger-blue-400/50 hover:shadow-hover-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-persian-blue sm:gap-2 sm:px-3"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Choose language"
        onClick={() => setOpen((v) => !v)}
      >
        <GlobeIcon className="h-6 w-6 shrink-0 text-dodger-blue-500 sm:h-5 sm:w-5" aria-hidden />
        <span className="hidden min-w-[4.25rem] text-start sm:inline">{current}</span>
        <ChevronIcon className={`h-4 w-4 shrink-0 text-persian-blue-400 motion-safe:transition-transform motion-safe:duration-200 ${open ? "-rotate-180" : ""}`} aria-hidden />
      </button>
      {open ? (
        <ul
          className="animate-dropdown-open absolute end-0 z-[60] mt-2 min-w-[10rem] rounded-xl border border-persian-blue-900/10 bg-white py-1 shadow-lg ring-1 ring-persian-blue-900/5"
          role="listbox"
          aria-label="Languages"
        >
          {locales.map((l) => (
            <li key={l.code} role="option" aria-selected={locale === l.code}>
              <button
                type="button"
                className={`flex w-full items-center px-4 py-2.5 text-start text-sm transition-colors hover:bg-icy-blue-900/80 ${
                  locale === l.code ? "font-semibold text-persian-blue" : "text-persian-blue-400"
                }`}
                onClick={() => pick(l.code)}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}
