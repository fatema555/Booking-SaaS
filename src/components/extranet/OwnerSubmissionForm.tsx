"use client";

import { useState } from "react";

export function OwnerSubmissionForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [detail, setDetail] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    const payload = {
      title: String(fd.get("title") ?? ""),
      description: String(fd.get("description") ?? ""),
      category: String(fd.get("category") ?? ""),
      priceHint: String(fd.get("priceHint") ?? ""),
      ownerName: String(fd.get("ownerName") ?? ""),
      ownerEmail: String(fd.get("ownerEmail") ?? ""),
    };
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(json.error ?? "fail");
      setStatus("done");
      setDetail("Submission received — admins will review shortly.");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
      setDetail("Could not submit. Please verify required fields.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 grid gap-4 rounded-2xl border border-persian-blue-900/10 bg-white p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="title" className="text-sm font-medium text-persian-blue">
            Service title
          </label>
          <input
            id="title"
            name="title"
            required
            className="mt-1 w-full rounded-xl border border-persian-blue-900/15 px-3 py-2 text-sm outline-none ring-dodger-blue-400 focus:ring-2"
          />
        </div>
        <div>
          <label htmlFor="category" className="text-sm font-medium text-persian-blue">
            Category
          </label>
          <input
            id="category"
            name="category"
            required
            placeholder="e.g. Wellness"
            className="mt-1 w-full rounded-xl border border-persian-blue-900/15 px-3 py-2 text-sm outline-none ring-dodger-blue-400 focus:ring-2"
          />
        </div>
        <div>
          <label htmlFor="priceHint" className="text-sm font-medium text-persian-blue">
            Price hint (optional)
          </label>
          <input
            id="priceHint"
            name="priceHint"
            placeholder="From $50"
            className="mt-1 w-full rounded-xl border border-persian-blue-900/15 px-3 py-2 text-sm outline-none ring-dodger-blue-400 focus:ring-2"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="description" className="text-sm font-medium text-persian-blue">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            className="mt-1 w-full rounded-xl border border-persian-blue-900/15 px-3 py-2 text-sm outline-none ring-dodger-blue-400 focus:ring-2"
          />
        </div>
        <div>
          <label htmlFor="ownerName" className="text-sm font-medium text-persian-blue">
            Owner name
          </label>
          <input
            id="ownerName"
            name="ownerName"
            required
            autoComplete="name"
            className="mt-1 w-full rounded-xl border border-persian-blue-900/15 px-3 py-2 text-sm outline-none ring-dodger-blue-400 focus:ring-2"
          />
        </div>
        <div>
          <label htmlFor="ownerEmail" className="text-sm font-medium text-persian-blue">
            Owner email
          </label>
          <input
            id="ownerEmail"
            name="ownerEmail"
            type="email"
            required
            autoComplete="email"
            className="mt-1 w-full rounded-xl border border-persian-blue-900/15 px-3 py-2 text-sm outline-none ring-dodger-blue-400 focus:ring-2"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex justify-center rounded-full bg-school-bus-yellow px-5 py-2.5 text-sm font-semibold text-persian-blue-100 shadow-sm hover:bg-school-bus-yellow-600 disabled:opacity-60"
      >
        {status === "loading" ? "Submitting…" : "Submit for review"}
      </button>
      {status === "done" || status === "error" ? (
        <p className={`text-sm ${status === "done" ? "text-dodger-blue-400" : "text-school-bus-yellow-700"}`}>{detail}</p>
      ) : null}
    </form>
  );
}
