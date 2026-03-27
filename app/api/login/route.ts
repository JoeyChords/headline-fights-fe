import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest): Promise<Response> {
  const headersList = await headers();
  const contentType = headersList.get("content-type") ?? "application/json";
  const bodyContent = (await request.json()) as Record<string, unknown>;
  const res = await fetch((process.env.API_BASE_URL ?? "") + "/login", {
    method: "POST",
    headers: { "Content-Type": contentType },
    body: JSON.stringify(bodyContent),
    credentials: "include",
  });

  const data = JSON.stringify(await res.text());
  const cookieData = res.headers.getSetCookie();

  const responseHeaders = new Headers({
    "Access-Control-Allow-Origin": "https://www.headlinefights.com",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
    "Content-Type": "application/json",
  });
  for (const cookie of cookieData) {
    responseHeaders.append("Set-Cookie", cookie);
  }

  return new Response(data, { status: res.status, headers: responseHeaders });
}
