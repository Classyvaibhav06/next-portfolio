import { NextRequest, NextResponse } from "next/server";
import { connectDB, Contact } from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;
    const recaptchaResponse = body["g-recaptcha-response"];
    const secretKey =
      process.env.RECAPTCHA_SECRET_KEY ||
      "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe";

    // Verify reCAPTCHA
    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaResponse}`;

    const verificationRes = await fetch(verificationURL, { method: "POST" });
    const verificationResult = await verificationRes.json();

    if (!verificationResult.success) {
      return NextResponse.json(
        { success: false, msg: "reCAPTCHA verification failed." },
        { status: 400 }
      );
    }

    await connectDB();

    const newContact = new Contact({ name, email, subject, message });
    const contact = await newContact.save();

    return NextResponse.json({
      success: true,
      msg: "Message sent successfully!",
      contact,
    });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { success: false, msg: "Failed to send message." },
      { status: 400 }
    );
  }
}
