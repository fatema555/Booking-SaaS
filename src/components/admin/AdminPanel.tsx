"use client";

import type { ServiceSubmission, SubmissionStatus } from "@/types/service-submission";
import { useCallback, useMemo, useState } from "react";

type FilterTab = "overview" | SubmissionStatus | "all";

function statusBadge(status: SubmissionStatus) {
  switch (status) {
    case "pending":
      return "bg-school-bus-yellow-900/40 text-school-bus-yellow-100";
    case "approved":
      return "bg-dodger-blue-900/80 text-persian-blue-100";
    case "rejected":
      return "bg-persian-blue-900/50 text-persian-blue-100";
    default:
      return "bg-icy-blue-900 text-persian-blue";
  }
}

export function AdminPanel() {
  const [secret, setSecret] = useState("");
  const [storedSecret, setStoredSecret] = useState("");
  const [submissions, setSubmissions] = useState<ServiceSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<FilterTab>("overview");
  const [query, setQuery] = useState("");

  const refresh = useCallback(async (token: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/submissions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = (await res.json()) as { submissions?: ServiceSubmission[]; error?: string };
      if (!res.ok) throw new Error(json.error ?? "Unauthorized");
      setSubmissions(json.submissions ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load queue");
    } finally {
      setLoading(false);
    }
  }, []);

  async function unlock(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = secret.trim();
    if (!trimmed) {
      setError("Enter the same value you put in ADMIN_SECRET in .env.local.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/submissions", {
        headers: { Authorization: `Bearer ${trimmed}` },
      });
      const json = (await res.json()) as { submissions?: ServiceSubmission[]; error?: string };
      if (!res.ok) {
        throw new Error(json.error ?? (res.status === 503 ? "Server not configured" : "Unauthorized"));
      }
      setSubmissions(json.submissions ?? []);
      setStoredSecret(trimmed);
    } catch (err) {
      setStoredSecret("");
      setError(err instanceof Error ? err.message : "Could not unlock");
    } finally {
      setLoading(false);
    }
  }

  async function decide(id: string, status: "approved" | "rejected") {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${storedSecret}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(json.error ?? "Update failed");
      await refresh(storedSecret);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update failed");
    } finally {
      setLoading(false);
    }
  }

  const stats = useMemo(() => {
    const total = submissions.length;
    const pending = submissions.filter((s) => s.status === "pending").length;
    const approved = submissions.filter((s) => s.status === "approved").length;
    const rejected = submissions.filter((s) => s.status === "rejected").length;
    const approvalRate = total ? Math.round((approved / total) * 100) : 0;
    return { total, pending, approved, rejected, approvalRate };
  }, [submissions]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let rows = submissions;
    if (tab !== "overview" && tab !== "all") {
      rows = rows.filter((s) => s.status === tab);
    }
    if (!q) return rows;
    return rows.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.ownerEmail.toLowerCase().includes(q) ||
        s.ownerName.toLowerCase().includes(q),
    );
  }, [submissions, tab, query]);

  const recent = useMemo(() => submissions.slice(0, 6), [submissions]);

  const tabs: { id: FilterTab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "pending", label: "Pending" },
    { id: "approved", label: "Approved" },
    { id: "rejected", label: "Rejected" },
    { id: "all", label: "All" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <header className="animate-fade-in-up flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dodger-blue-400">Operations</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-persian-blue lg:text-4xl">Admin dashboard</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-persian-blue-400">
            Moderate extranet submissions with live counts and searchable queues. Authenticate using{" "}
            <code className="rounded bg-icy-blue-900 px-1 py-0.5 text-xs">ADMIN_SECRET</code> as a Bearer token — ideal for scaling into SSO later without redesigning this UI.
          </p>
        </div>
      </header>

      {!storedSecret ? (
        <form
          onSubmit={unlock}
          className="hover-lift-shadow mt-10 flex max-w-md animate-fade-in-up flex-col gap-3 rounded-2xl border border-persian-blue-900/10 bg-white p-6 shadow-card-soft"
        >
          <label htmlFor="secret" className="text-sm font-medium text-persian-blue">
            Admin secret
          </label>
          <input
            id="secret"
            type="password"
            value={secret}
            onChange={(ev) => setSecret(ev.target.value)}
            autoComplete="current-password"
            className="rounded-xl border border-persian-blue-900/15 px-3 py-2 text-sm outline-none ring-dodger-blue-400 transition-shadow focus:border-dodger-blue-400 focus:ring-2 focus:shadow-md"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-persian-blue px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-persian-blue-600 hover:shadow-hover-lift disabled:opacity-60"
          >
            {loading ? "Checking…" : "Unlock dashboard"}
          </button>
          {error ? (
            <p className="rounded-xl border border-school-bus-yellow-400/50 bg-school-bus-yellow-900/40 px-3 py-2 text-sm text-persian-blue-100" role="alert">
              {error}
            </p>
          ) : null}
          <p className="text-xs leading-relaxed text-persian-blue-400">
            In the <strong className="font-semibold text-persian-blue">booking-web</strong> folder, add{" "}
            <code className="rounded bg-icy-blue-900 px-1">ADMIN_SECRET=your_password</code> to{" "}
            <code className="rounded bg-icy-blue-900 px-1">.env.local</code> (same line, no spaces around{" "}
            <code className="rounded bg-icy-blue-900 px-1">=</code>). Type <strong className="text-persian-blue">exactly</strong> that password here — not{" "}
            <code className="rounded bg-icy-blue-900 px-1">AUTH_SECRET</code>. Then restart{" "}
            <code className="rounded bg-icy-blue-900 px-1">npm run dev</code>.
          </p>
        </form>
      ) : (
        <div className="mt-10 space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => refresh(storedSecret)}
              disabled={loading}
              className="rounded-full border border-persian-blue-900/20 px-4 py-2 text-sm font-semibold text-persian-blue shadow-sm transition-all duration-300 hover:bg-icy-blue-900/80 hover:shadow-hover-lift disabled:opacity-60"
            >
              Refresh data
            </button>
            <button
              type="button"
              onClick={() => {
                setStoredSecret("");
                setSubmissions([]);
                setTab("overview");
              }}
              className="text-sm font-semibold text-dodger-blue-400 underline-offset-4 hover:underline"
            >
              Lock session
            </button>
          </div>

          {error ? (
            <p className="rounded-xl border border-school-bus-yellow-400/40 bg-school-bus-yellow-900/50 px-4 py-3 text-sm text-school-bus-yellow-100">{error}</p>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Total submissions", value: stats.total, hint: "All-time queue volume", accent: "from-persian-blue-600 to-dodger-blue-500" },
              { label: "Awaiting review", value: stats.pending, hint: "Needs moderator action", accent: "from-school-bus-yellow-500 to-bright-lemon-500" },
              { label: "Approved", value: stats.approved, hint: "Published-ready pipeline", accent: "from-dodger-blue-400 to-icy-blue-400" },
              { label: "Approval rate", value: `${stats.approvalRate}%`, hint: "Approved ÷ total", accent: "from-icy-blue-400 via-dodger-blue-500 to-persian-blue-600" },
            ].map((card, i) => (
              <div
                key={card.label}
                className="hover-lift-shadow animate-fade-in-up rounded-2xl border border-persian-blue-900/10 bg-white p-5 shadow-card-soft"
                style={{ animationDelay: `${60 + i * 45}ms` }}
              >
                <div className={`inline-flex rounded-xl bg-gradient-to-br ${card.accent} px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-persian-blue-100 shadow-inner`}>
                  Live metric
                </div>
                <p className="mt-4 text-3xl font-bold text-persian-blue">{loading ? "…" : card.value}</p>
                <p className="mt-1 text-sm font-semibold text-persian-blue">{card.label}</p>
                <p className="mt-2 text-xs text-persian-blue-400">{card.hint}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <nav className="flex flex-wrap gap-2 rounded-2xl border border-persian-blue-900/10 bg-white p-2 shadow-inner" aria-label="Dashboard sections">
              {tabs.map((t) => {
                const active = tab === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTab(t.id)}
                    className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                      active ? "bg-persian-blue text-white shadow-md" : "text-persian-blue hover:bg-icy-blue-900/70 hover:shadow-sm"
                    }`}
                  >
                    {t.label}
                    {t.id === "pending" && stats.pending > 0 ? (
                      <span className="ms-2 rounded-full bg-bright-lemon px-2 py-0.5 text-[11px] font-bold text-persian-blue-100">{stats.pending}</span>
                    ) : null}
                  </button>
                );
              })}
            </nav>
            <label className="flex w-full max-w-md flex-col text-xs font-semibold uppercase tracking-wide text-persian-blue-400 lg:items-end">
              Search queue
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Title, category, owner email…"
                className="mt-2 w-full rounded-xl border border-persian-blue-900/15 px-4 py-2.5 text-sm font-normal normal-case text-persian-blue outline-none ring-dodger-blue-400 transition-shadow focus:border-dodger-blue-400 focus:ring-2 focus:shadow-md"
              />
            </label>
          </div>

          {tab === "overview" ? (
            <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
              <div className="hover-lift-shadow rounded-2xl border border-persian-blue-900/10 bg-white p-6 shadow-card-soft">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-lg font-bold text-persian-blue">Latest activity</h2>
                  <button type="button" className="text-sm font-semibold text-dodger-blue-400 hover:underline" onClick={() => setTab("all")}>
                    View all
                  </button>
                </div>
                <ul className="mt-4 divide-y divide-persian-blue-900/10">
                  {recent.length === 0 ? (
                    <li className="py-8 text-center text-sm text-persian-blue-400">No submissions yet.</li>
                  ) : (
                    recent.map((s) => (
                      <li key={s.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-persian-blue">{s.title}</p>
                          <p className="text-xs text-persian-blue-400">
                            {s.ownerEmail} · {new Date(s.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusBadge(s.status)}`}>{s.status}</span>
                      </li>
                    ))
                  )}
                </ul>
              </div>
              <aside className="hover-lift-shadow flex flex-col gap-4 rounded-2xl border border-dashed border-persian-blue-900/25 bg-icy-blue-900/40 p-6 shadow-inner">
                <h2 className="text-lg font-bold text-persian-blue">Operational notes</h2>
                <ul className="space-y-3 text-sm leading-relaxed text-persian-blue-400">
                  <li>Use Pending for daily moderation rounds.</li>
                  <li>Search scales across categories without API changes.</li>
                  <li>Swap Bearer auth for SSO — tabs & metrics stay intact.</li>
                </ul>
              </aside>
            </section>
          ) : (
            <section className="space-y-4">
              {loading ? <p className="text-sm text-persian-blue-400">Loading…</p> : null}
              {filtered.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-persian-blue-900/20 bg-white p-12 text-center text-sm text-persian-blue-400 shadow-inner">
                  Nothing matches this filter. Owners propose listings via <strong className="text-persian-blue">/extranet</strong>.
                </div>
              ) : (
                <ul className="grid gap-5 lg:grid-cols-2">
                  {filtered.map((s) => (
                    <li key={s.id} className="hover-lift-shadow flex flex-col rounded-2xl border border-persian-blue-900/10 bg-white p-5 shadow-card-soft">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusBadge(s.status)}`}>{s.status}</span>
                        <span className="text-xs font-semibold text-dodger-blue-400">{s.category}</span>
                      </div>
                      <h3 className="mt-3 text-lg font-semibold text-persian-blue">{s.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-persian-blue-400">{s.description}</p>
                      <dl className="mt-4 grid gap-2 text-xs text-persian-blue-400 sm:grid-cols-2">
                        <div>
                          <dt className="font-semibold text-persian-blue">Owner</dt>
                          <dd>
                            {s.ownerName} · {s.ownerEmail}
                          </dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-persian-blue">Submitted</dt>
                          <dd>{new Date(s.createdAt).toLocaleString()}</dd>
                        </div>
                        {s.priceHint ? (
                          <div className="sm:col-span-2">
                            <dt className="font-semibold text-persian-blue">Price hint</dt>
                            <dd>{s.priceHint}</dd>
                          </div>
                        ) : null}
                        {s.reviewedAt ? (
                          <div className="sm:col-span-2">
                            <dt className="font-semibold text-persian-blue">Reviewed</dt>
                            <dd>{new Date(s.reviewedAt).toLocaleString()}</dd>
                          </div>
                        ) : null}
                      </dl>
                      {s.status === "pending" ? (
                        <div className="mt-4 flex flex-wrap gap-2 border-t border-persian-blue-900/10 pt-4">
                          <button
                            type="button"
                            disabled={loading}
                            onClick={() => decide(s.id, "approved")}
                            className="rounded-full bg-dodger-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-dodger-blue-600 hover:shadow-hover-lift disabled:opacity-60"
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            disabled={loading}
                            onClick={() => decide(s.id, "rejected")}
                            className="rounded-full border border-persian-blue-900/20 px-4 py-2 text-sm font-semibold text-persian-blue shadow-sm transition-all duration-300 hover:bg-icy-blue-900/80 hover:shadow-hover-lift disabled:opacity-60"
                          >
                            Refuse
                          </button>
                        </div>
                      ) : null}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}
        </div>
      )}
    </div>
  );
}
