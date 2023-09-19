import { NextResponse } from "next/server";

export async function POST(request) {
  const res = await fetch(process.env.DEV_LOGOUT_API, {
    method: "POST",
    withCredentials: true,
    credentials: "include",
  });
  const data = await res.json();

  return NextResponse.json({ data });
}
