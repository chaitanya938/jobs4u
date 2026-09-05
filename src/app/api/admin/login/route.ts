import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
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

        const otp = generateOTP();
        const expires = Date.now() + 5 * 60 * 1000; // 5 minutes
        otpStore[ADMIN_EMAIL] = { otp, expires };

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Jobs4U Admin" <${process.env.SMTP_USER}>`,
            to: ADMIN_EMAIL,
            subject: "Your Jobs4U Admin OTP",
            html: `
                <div style="font-family: Inter, sans-serif; max-width: 480px; margin: auto; padding: 32px; background: #f8fafc; border-radius: 16px; border: 1px solid #e2e8f0;">
                    <h2 style="color: #0f172a; margin-bottom: 8px;">Jobs4U Admin Login</h2>
                    <p style="color: #475569; margin-bottom: 24px;">Use the OTP below to complete your sign-in. It expires in <strong>5 minutes</strong>.</p>
                    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; text-align: center;">
                        <p style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #0d9488; margin: 0;">${otp}</p>
                    </div>
                    <p style="color: #94a3b8; font-size: 13px; margin-top: 24px;">If you did not request this, please ignore this email.</p>
                </div>
            `,
        });

        return NextResponse.json({ success: true, message: "OTP sent to your email." });
    } catch (error: any) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: `SMTP Error: ${error?.message || "Unknown error"}` },
            { status: 500 }
        );
    }
}
