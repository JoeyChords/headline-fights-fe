import { NextResponse } from "next/server";

export async function POST(): Promise<NextResponse> {
  const res = await fetch((process.env.API_BASE_URL ?? "") + "/logout", {
    method: "POST",
    mode: "cors",
    credentials: "include",
    cache: "no-store",
  });

  const data = await res.text();

  return NextResponse.json({ data });
}
