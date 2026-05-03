import { NextRequest, NextResponse } from "next/server";
import { readSubmissions } from "@/lib/submissions-store";
import { assertAdmin } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const deny = assertAdmin(req);
  if (deny) return deny;
  const submissions = await readSubmissions();
  return NextResponse.json({ submissions });
}
