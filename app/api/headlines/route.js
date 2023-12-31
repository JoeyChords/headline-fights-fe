// This to nested server side component so env works

import { NextResponse } from "next/server";

export async function POST() {
  const res = await fetch(process.env.API_BASE_URL + "/headlines?accessToken=" + process.env.DATA_API_KEY, {
    method: "POST",
    credentials: "include",
  });
  const cookieData = res.headers.getSetCookie();

  var data = await res.json();
  data = JSON.stringify(data[0]);

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
