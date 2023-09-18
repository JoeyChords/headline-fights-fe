import { NextResponse } from "next/server";

export async function POST() {
  const res = await fetch(process.env.DEV_HEADLINE_API + "?" + "accessToken=" + process.env.DATA_API_KEY, {
    method: "POST",
    withCredentials: true,
    credentials: "include",
  });
  const data = await res.json();

  return NextResponse.json({ data });
}
