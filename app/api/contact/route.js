import { NextResponse } from "next/server";
import { Resend } from "resend";

const rateLimitMap = new Map();
const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

export async function POST(request) {
  const ip = request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const bodyContent = await request.json();
  const CONTACT_EMAIL = bodyContent.email;
  const CONTACT_NAME = bodyContent.name;
  const CONTACT_MESSAGE = bodyContent.message;

  if (
    typeof CONTACT_NAME !== "string" ||
    !CONTACT_NAME.trim() ||
    CONTACT_NAME.length > 100 ||
    typeof CONTACT_EMAIL !== "string" ||
    !CONTACT_EMAIL.trim() ||
    CONTACT_EMAIL.length > 254 ||
    typeof CONTACT_MESSAGE !== "string" ||
    !CONTACT_MESSAGE.trim() ||
    CONTACT_MESSAGE.length > 2000
  ) {
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }

  const { data, error } = await resend.emails.send({
    from: process.env.SENDER_EMAIL,
    to: process.env.MY_EMAIL,
    subject: "Message From Contact Us Page",
    text: "Contact Name: " + CONTACT_NAME + "\n\n" + "Contact Email: " + CONTACT_EMAIL + "\n\n" + CONTACT_MESSAGE,
  });

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ data });
}
