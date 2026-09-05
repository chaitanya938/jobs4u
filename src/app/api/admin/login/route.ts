import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { otpStore } from "@/lib/otp-store";

const ADMIN_EMAIL = "jobs4uwebsite@gmail.com";
const ADMIN_PASSWORD = "QazmlpTCS@123";

function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
            return NextResponse.json(
                { error: "Invalid email or password." },
                { status: 401 }
            );
        }

        // Render Free Tier explicitly blocks outbound SMTP ports to prevent spam.
        // In Next.js 15+ cookies() must be awaited
        const cookieStore = await cookies();
        cookieStore.set("admin_session", "jobs4u_admin_secret_2024", {
            maxAge: 60 * 60 * 8, // 8 hours
            path: "/",
        });

        return NextResponse.json({ success: true, redirect: true });
    } catch (error: any) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: `System Error: ${error?.message || "Unknown error"}` },
            { status: 500 }
        );
    }
}
