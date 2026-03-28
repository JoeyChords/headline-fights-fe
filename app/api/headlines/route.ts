import { NextResponse } from "next/server";

export async function POST(): Promise<Response | NextResponse> {
  const res = await fetch((process.env.API_BASE_URL ?? "") + "/headlines", {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    return new Response(null, { status: res.status });
  }

  const json = (await res.json()) as unknown[];
  const data = JSON.stringify(json[0]);

  return new Response(data, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "https://www.headlinefights.com",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Credentials": "true",
      "Content-Type": "application/json",
    },
  });
}
