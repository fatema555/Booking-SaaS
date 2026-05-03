import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const CONTACT_PATH = path.join(process.cwd(), "data", "contact-messages.json");

async function appendMessage(entry: Record<string, unknown>) {
  try {
    await fs.access(CONTACT_PATH);
  } catch {
    await fs.mkdir(path.dirname(CONTACT_PATH), { recursive: true });
    await fs.writeFile(CONTACT_PATH, "[]", "utf-8");
  }
  const raw = await fs.readFile(CONTACT_PATH, "utf-8");
  const list = JSON.parse(raw) as unknown[];
  list.push(entry);
  await fs.writeFile(CONTACT_PATH, JSON.stringify(list, null, 2), "utf-8");
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<{ name: string; email: string; message: string }>;
    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields required." }, { status: 400 });
    }
    await appendMessage({
      id: crypto.randomUUID(),
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
