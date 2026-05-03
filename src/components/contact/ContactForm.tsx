"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("done");
      setMessage("Thanks — we received your message.");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 grid gap-4 rounded-2xl border border-persian-blue-900/10 bg-white p-6 shadow-sm">
      <div>
        <label htmlFor="name" className="text-sm font-medium text-persian-blue">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          className="mt-1 w-full rounded-xl border border-persian-blue-900/15 px-3 py-2 text-sm outline-none ring-dodger-blue-400 focus:ring-2"
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
          required
          autoComplete="email"
          className="mt-1 w-full rounded-xl border border-persian-blue-900/15 px-3 py-2 text-sm outline-none ring-dodger-blue-400 focus:ring-2"
        />
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium text-persian-blue">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="mt-1 w-full rounded-xl border border-persian-blue-900/15 px-3 py-2 text-sm outline-none ring-dodger-blue-400 focus:ring-2"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex justify-center rounded-full bg-persian-blue px-5 py-2.5 text-sm font-semibold text-white hover:bg-persian-blue-600 disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
      {status === "done" || status === "error" ? (
        <p className={`text-sm ${status === "done" ? "text-dodger-blue-400" : "text-school-bus-yellow-700"}`}>{message}</p>
      ) : null}
    </form>
  );
}
