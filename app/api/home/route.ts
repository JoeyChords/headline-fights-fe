import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  const res = await fetch((process.env.API_BASE_URL ?? "") + "/", {
    method: "GET",
    mode: "cors",
    credentials: "include",
  });
  const data = await res.text();

  return NextResponse.json({ data });
}
