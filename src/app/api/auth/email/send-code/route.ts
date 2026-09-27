import { NextRequest, NextResponse } from "next/server";
import { generateOtp } from "@/lib/otp";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body?.email?.toLowerCase().trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const code = generateOtp(email);
    console.log(`[Auth] Verification code for ${email}: ${code}`);

    return NextResponse.json({
      success: true,
      message: `Verification code sent to ${email}.`,
      code // Returned so users in development or preview can instantly copy / fill the code
    });
  } catch (err) {
    console.error("[Auth] Send code error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to generate verification code." },
      { status: 500 }
    );
  }
}
