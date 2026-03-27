import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const headersList = await headers();
  const contentType = headersList.get("content-type") ?? "application/json";
  const bodyContent = (await request.json()) as Record<string, unknown>;
  const res = await fetch((process.env.API_BASE_URL ?? "") + "/register", {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: { "Content-Type": contentType },
    body: JSON.stringify(bodyContent),
  });
  if (!res.ok) {
    return NextResponse.json({ data: null }, { status: res.status });
  }
  const data = (await res.json()) as unknown;

  return NextResponse.json({ data });
}
