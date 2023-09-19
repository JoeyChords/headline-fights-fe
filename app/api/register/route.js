import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

//Uses headers and body content from original request on register page form
export async function POST(request) {
  const headersList = headers();
  const contentType = headersList.get("content-type");
  const bodyContent = await request.json();
  const res = await fetch(process.env.DEV_REGISTER_API, {
    method: "POST",
    withCredentials: true,
    credentials: "include",
    headers: { "Content-Type": contentType },
    body: JSON.stringify(bodyContent),
  });
  const data = await res.json();

  return NextResponse.json({ data });
}
