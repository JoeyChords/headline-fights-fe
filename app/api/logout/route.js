import { NextResponse } from "next/server";

export async function POST(request) {
  console.log(request);
  const res = await fetch(process.env.DEV_LOGOUT_API, {
    method: "POST",
    withCredentials: true,
    credentials: "include",
  });
  const data = await res.json();
  console.log(data);
  console.log("Reached");

  return NextResponse.json({ data });
}
