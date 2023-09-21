import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

//Uses headers and body content from original request on register page form
export async function POST(request) {
  const headersList = headers();
  const contentType = headersList.get("content-type");
  const bodyContent = await request.json();
  const res = await fetch(process.env.API_BASE_URL + "/register", {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: { "Content-Type": contentType },
    body: JSON.stringify(bodyContent),
  });
  const data = await res.json();

  return NextResponse.json({ data });
}
