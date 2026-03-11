import { NextRequest, NextResponse } from "next/server";
import { connectDB, Contact } from "@/lib/mongodb";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { password } = body;
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (password !== adminPassword) {
      return NextResponse.json(
        { success: false, msg: "Unauthorized access" },
        { status: 401 }
      );
    }

    const { id } = await params;
    await connectDB();
    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return NextResponse.json(
        { success: false, msg: "Contact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      msg: "Contact deleted successfully",
    });
  } catch (err) {
    console.error("Delete contact error:", err);
    return NextResponse.json(
      { success: false, msg: "Server Error" },
      { status: 500 }
    );
  }
}
