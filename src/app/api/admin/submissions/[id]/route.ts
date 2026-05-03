import { NextRequest, NextResponse } from "next/server";
import { updateSubmissionStatus } from "@/lib/submissions-store";
import { assertAdmin } from "@/lib/admin-auth";

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const deny = assertAdmin(req);
  if (deny) return deny;

  const { id } = await ctx.params;
  let body: { status?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.status !== "approved" && body.status !== "rejected") {
    return NextResponse.json({ error: "status must be approved or rejected" }, { status: 400 });
  }

  const updated = await updateSubmissionStatus(id, body.status);
  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ submission: updated });
}
