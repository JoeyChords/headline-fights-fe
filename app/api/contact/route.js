import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const bodyContent = await request.json();
  const CONTACT_EMAIL = bodyContent.email;
  const CONTACT_NAME = bodyContent.name;
  const CONTACT_MESSAGE = bodyContent.message;

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
