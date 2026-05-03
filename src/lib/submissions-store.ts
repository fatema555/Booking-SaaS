import fs from "fs/promises";
import path from "path";
import type { ServiceSubmission, SubmissionStatus } from "@/types/service-submission";

export type { ServiceSubmission, SubmissionStatus };

const DATA_PATH = path.join(process.cwd(), "data", "submissions.json");

async function ensureFile(): Promise<void> {
  try {
    await fs.access(DATA_PATH);
  } catch {
    await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
    await fs.writeFile(DATA_PATH, "[]", "utf-8");
  }
}

export async function readSubmissions(): Promise<ServiceSubmission[]> {
  await ensureFile();
  const raw = await fs.readFile(DATA_PATH, "utf-8");
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as ServiceSubmission[]) : [];
  } catch {
    return [];
  }
}

async function writeSubmissions(items: ServiceSubmission[]): Promise<void> {
  await ensureFile();
  await fs.writeFile(DATA_PATH, JSON.stringify(items, null, 2), "utf-8");
}

export async function getApprovedServices(): Promise<ServiceSubmission[]> {
  const all = await readSubmissions();
  return all.filter((s) => s.status === "approved").sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function addSubmission(input: Omit<ServiceSubmission, "id" | "status" | "createdAt">): Promise<ServiceSubmission> {
  const all = await readSubmissions();
  const row: ServiceSubmission = {
    ...input,
    id: crypto.randomUUID(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  await writeSubmissions([row, ...all]);
  return row;
}

export async function updateSubmissionStatus(
  id: string,
  status: Exclude<SubmissionStatus, "pending">,
): Promise<ServiceSubmission | null> {
  const all = await readSubmissions();
  const idx = all.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  const updated: ServiceSubmission = {
    ...all[idx],
    status,
    reviewedAt: new Date().toISOString(),
  };
  const next = [...all];
  next[idx] = updated;
  await writeSubmissions(next);
  return updated;
}
