import { NextResponse } from "next/server";

export async function GET(request) {
  const res = await fetch(process.env.API_BASE_URL + "/", {
    method: "GET",
    crossDomain: true,
    xhrFields: { withCredentials: true },
    mode: "cors",
    credentials: "include",
  });
  const data = await res.json();

  return NextResponse.json({ data });
}
