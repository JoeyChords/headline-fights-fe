import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

//Uses headers and body content from original request on register page form
export async function POST(request) {
  const headersList = headers();
  const contentType = headersList.get("content-type");
  const bodyContent = await request.json();
  const res = await fetch(process.env.DEV_REGISTER_API, {
    method: "POST",
    headers: { "Content-Type": contentType },
    body: JSON.stringify(bodyContent),
  });
  const data = await res.json();
  console.log(data);

  return NextResponse.json({ data });
}
