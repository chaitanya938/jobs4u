import { NextRequest, NextResponse } from "next/server";
import { otpStore } from "@/lib/otp-store";

const ADMIN_EMAIL = "jobs4uwebsite@gmail.com";
const SESSION_COOKIE = "admin_session";
const SESSION_SECRET = "jobs4u_admin_secret_2024";

export async function POST(request: NextRequest) {
    try {
        const { otp } = await request.json();

        const record = otpStore[ADMIN_EMAIL];

        if (!record) {
            return NextResponse.json(
                { error: "No OTP found. Please request a new one." },
                { status: 401 }
            );
        }

        if (Date.now() > record.expires) {
            delete otpStore[ADMIN_EMAIL];
            return NextResponse.json(
                { error: "OTP has expired. Please request a new one." },
                { status: 401 }
            );
        }

        if (otp !== record.otp) {
            return NextResponse.json(
                { error: "Invalid OTP. Please try again." },
                { status: 401 }
            );
        }

        // OTP correct — clear it and set session cookie
        delete otpStore[ADMIN_EMAIL];

        const response = NextResponse.json({ success: true });
        response.cookies.set(SESSION_COOKIE, SESSION_SECRET, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 8, // 8 hours
            path: "/",
        });

        return response;
    } catch {
        return NextResponse.json({ error: "Server error." }, { status: 500 });
    }
}
