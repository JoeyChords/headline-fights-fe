import { headers } from "next/headers";

//Uses headers and body content from original request on register page form
export async function POST(request) {
  const headersList = headers();
  const contentType = headersList.get("content-type");
  const bodyContent = await request.json();
  const res = await fetch(process.env.API_BASE_URL + "/login", {
    method: "POST",
    headers: { "Content-Type": contentType },
    body: JSON.stringify(bodyContent),
    credentials: "include",
  });

  //Parse body to send in response
  var data = await res.text();
  data = JSON.stringify(data);
  var cookieData = res.headers.getSetCookie();

  return new Response(data, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "https://www.headlinefights.com",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "true",
      "Content-Type": "application/json",
      "Set-Cookie": cookieData,
    },
  });
}
