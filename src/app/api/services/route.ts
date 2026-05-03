import { NextResponse } from "next/server";
import { getApprovedServices } from "@/lib/submissions-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const services = await getApprovedServices();
  return NextResponse.json({ services });
}
