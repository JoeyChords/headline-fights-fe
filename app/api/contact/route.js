import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

export async function POST(request) {
  let transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    auth: {
      user: "apikey",
      pass: process.env.SENDGRID_API_KEY,
    },
  });
  const bodyContent = await request.json();
  const CONTACT_EMAIL = bodyContent.email;
  const CONTACT_NAME = bodyContent.name;
  const CONTACT_MESSAGE = bodyContent.message;

  let emailResponse = await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: process.env.MY_EMAIL,
    subject: "Message From Contact Us Page",
    text: "Contact Name: " + CONTACT_NAME + "\n\n" + "Contact Email: " + CONTACT_EMAIL + "\n\n" + CONTACT_MESSAGE,
  });

  return NextResponse.json({ emailResponse });
}
