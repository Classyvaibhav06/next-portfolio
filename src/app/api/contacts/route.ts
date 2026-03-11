import { NextRequest, NextResponse } from "next/server";
import { connectDB, Contact } from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const password = searchParams.get("password");
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  if (password !== adminPassword) {
    return NextResponse.json(
      { success: false, msg: "Unauthorized access" },
      { status: 401 }
    );
  }

  try {
    await connectDB();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, contacts });
  } catch (err) {
    console.error("Get contacts error:", err);
    return NextResponse.json(
      { success: false, msg: "Server Error" },
      { status: 500 }
    );
  }
}
