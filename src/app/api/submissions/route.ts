import { NextResponse } from "next/server";
import { addSubmission } from "@/lib/submissions-store";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<{
      title: string;
      description: string;
      category: string;
      priceHint: string;
      ownerName: string;
      ownerEmail: string;
    }>;

    const title = body.title?.trim();
    const description = body.description?.trim();
    const category = body.category?.trim();
    const ownerName = body.ownerName?.trim();
    const ownerEmail = body.ownerEmail?.trim()?.toLowerCase();
    const priceHint = body.priceHint?.trim() ?? "";

    if (!title || !description || !category || !ownerName || !ownerEmail) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const row = await addSubmission({
      title,
      description,
      category,
      priceHint,
      ownerName,
      ownerEmail,
    });

    return NextResponse.json({ submission: row }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
}
