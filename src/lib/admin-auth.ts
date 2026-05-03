import { NextRequest } from "next/server";

function configuredAdminSecret(): string | undefined {
  const raw = process.env.ADMIN_SECRET;
  const trimmed = raw?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : undefined;
}

export function assertAdmin(req: NextRequest): Response | null {
  const secret = configuredAdminSecret();
  if (!secret) {
    return Response.json(
      {
        error:
          "Admin access not configured. Create booking-web/.env.local with ADMIN_SECRET=your_password (no quotes), save, then restart npm run dev.",
      },
      { status: 503 },
    );
  }
  const header = req.headers.get("authorization");
  const token = header?.startsWith("Bearer ") ? header.slice(7).trim() : null;
  if (!token) {
    return Response.json({ error: "Missing Authorization: Bearer <ADMIN_SECRET> header." }, { status: 401 });
  }
  if (token !== secret) {
    return Response.json(
      {
        error:
          "That secret does not match ADMIN_SECRET on the server. Check for spaces, copy/paste errors, and that you restarted the dev server after editing .env.local.",
      },
      { status: 401 },
    );
  }
  return null;
}
