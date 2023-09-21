import { NextResponse } from "next/server";

export async function POST(request) {
  const res = await fetch(process.env.API_BASE_URL + "/logout", {
    method: "POST",
    mode: "cors",
    credentials: "include",
  });
  const data = await res.json();

  return NextResponse.json({ data });
}
