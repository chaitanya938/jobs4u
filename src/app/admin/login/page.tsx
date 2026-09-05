"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Step = "credentials" | "otp";

function AdminLoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const from = searchParams.get("from") || "/admin";

    const [step, setStep] = useState<Step>("credentials");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [countdown, setCountdown] = useState(0);

    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Countdown timer for OTP resend
    useEffect(() => {
        if (countdown <= 0) return;
        const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
        return () => clearTimeout(t);
    }, [countdown]);

    async function handleCredentials(e?: React.FormEvent | React.MouseEvent | React.KeyboardEvent) {
        if (e) e.preventDefault();
        console.log("Submit clicked, attempting login with:", email);
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Something went wrong.");
            } else {
                setStep("otp");
                setCountdown(30);
            }
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    function handleOtpChange(index: number, value: string) {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);
        if (value && index < 5) {
            otpRefs.current[index + 1]?.focus();
        }
    }

    function handleOtpKeyDown(index: number, e: React.KeyboardEvent) {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    }

    function handleOtpPaste(e: React.ClipboardEvent) {
        e.preventDefault();
        const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        if (text.length === 6) {
            setOtp(text.split(""));
            otpRefs.current[5]?.focus();
        }
    }

    async function handleOtpSubmit(e?: React.FormEvent | React.MouseEvent | React.KeyboardEvent) {
        if (e) e.preventDefault();
        const otpValue = otp.join("");
        if (otpValue.length < 6) {
            setError("Please enter all 6 digits.");
            return;
        }
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/admin/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ otp: otpValue }),
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Invalid OTP.");
                setOtp(["", "", "", "", "", ""]);
                otpRefs.current[0]?.focus();
            } else {
                router.push(from);
                router.refresh();
            }
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    async function handleResendOtp() {
        if (countdown > 0) return;
        setError("");
        setLoading(true);
        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "Failed to resend OTP.");
            } else {
                setOtp(["", "", "", "", "", ""]);
                setCountdown(30);
                otpRefs.current[0]?.focus();
            }
        } catch {
            setError("Network error.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="admin-login-bg">
            {/* Animated blobs */}
            <div className="blob blob-1" />
            <div className="blob blob-2" />
            <div className="blob blob-3" />

            <div className="login-card">
                {/* Logo */}
                <div className="login-logo">
                    <span className="logo-icon">J4</span>
                    <span className="logo-text">Jobs4U</span>
                </div>

                {step === "credentials" ? (
                    <>
                        <h1 className="login-title">Admin Sign In</h1>
                        <p className="login-subtitle">Enter your credentials to continue</p>

                        <div className="login-form">
                            <div className="field-group">
                                <label htmlFor="admin-email" className="field-label">Email address</label>
                                <input
                                    id="admin-email"
                                    type="email"
                                    autoComplete="off"
                                    name="email"
                                    placeholder="admin@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === "Enter") handleCredentials(); }}
                                    className="field-input"
                                />
                            </div>

                            <div className="field-group">
                                <label htmlFor="admin-password" className="field-label">Password</label>
                                <div className="password-wrap">
                                    <input
                                        id="admin-password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="off"
                                        name="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === "Enter") handleCredentials(); }}
                                        className="field-input password-input"
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setShowPassword((v) => !v);
                                        }}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ pointerEvents: 'none' }}><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                                        ) : (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ pointerEvents: 'none' }}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {error && <div className="error-box">{error}</div>}

                            <button
                                type="button"
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); void handleCredentials(); }}
                                disabled={loading}
                                className="login-btn"
                            >
                                {loading ? (
                                    <span className="spinner-wrap"><span className="spinner" />Sending OTP…</span>
                                ) : (
                                    "Continue →"
                                )}
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="otp-header">
                            <h1 className="login-title">Check your email</h1>
                            <p className="login-subtitle">
                                A 6-digit OTP has been sent to<br />
                                <strong className="otp-email">jobs4uwebsite@gmail.com</strong>
                            </p>
                        </div>

                        <div className="login-form">
                            <div className="otp-boxes" onPaste={handleOtpPaste}>
                                {otp.map((digit, i) => (
                                    <input
                                        key={i}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        ref={(el) => { otpRefs.current[i] = el; }}
                                        onChange={(e) => handleOtpChange(i, e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") handleOtpSubmit();
                                            else handleOtpKeyDown(i, e);
                                        }}
                                        className={`otp-box ${digit ? "otp-box-filled" : ""}`}
                                        aria-label={`OTP digit ${i + 1}`}
                                        autoFocus={i === 0}
                                    />
                                ))}
                            </div>

                            {error && <div className="error-box">{error}</div>}

                            <button
                                type="button"
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); void handleOtpSubmit(); }}
                                disabled={loading}
                                className="login-btn"
                            >
                                {loading ? (
                                    <span className="spinner-wrap"><span className="spinner" />Verifying…</span>
                                ) : (
                                    "Verify & Sign In →"
                                )}
                            </button>

                            <div className="resend-row">
                                <span>Didn&apos;t receive it?</span>
                                <button
                                    type="button"
                                    onClick={handleResendOtp}
                                    disabled={countdown > 0 || loading}
                                    className="resend-btn"
                                >
                                    {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={() => { setStep("credentials"); setError(""); setOtp(["", "", "", "", "", ""]); }}
                                className="back-btn"
                            >
                                ← Back
                            </button>
                        </div>
                    </>
                )}
            </div>

            <style>{`
                .admin-login-bg {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #0f172a;
                    position: relative;
                    overflow: hidden;
                    padding: 1rem;
                }
                .blob {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(80px);
                    opacity: 0.25;
                    pointer-events: none;
                    animation: blobFloat 8s ease-in-out infinite;
                }
                .blob-1 { width: 500px; height: 500px; background: #0d9488; top: -150px; left: -150px; animation-delay: 0s; }
                .blob-2 { width: 400px; height: 400px; background: #6366f1; bottom: -100px; right: -100px; animation-delay: 3s; }
                .blob-3 { width: 300px; height: 300px; background: #f59e0b; top: 50%; left: 50%; transform: translate(-50%,-50%); animation-delay: 6s; }
                @keyframes blobFloat {
                    0%, 100% { transform: scale(1) translate(0, 0); }
                    33% { transform: scale(1.05) translate(20px, -20px); }
                    66% { transform: scale(0.95) translate(-20px, 10px); }
                }
                .login-card {
                    position: relative;
                    z-index: 10;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.1);
                    backdrop-filter: blur(24px);
                    border-radius: 24px;
                    padding: 40px 36px;
                    width: 100%;
                    max-width: 420px;
                    box-shadow: 0 25px 60px rgba(0,0,0,0.5);
                }
                .login-logo {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 28px;
                    justify-content: center;
                }
                .logo-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    background: linear-gradient(135deg, #f97316, #ec4899);
                    color: white;
                    font-weight: 800;
                    font-size: 13px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .logo-text {
                    font-size: 20px;
                    font-weight: 700;
                    color: #f1f5f9;
                    letter-spacing: -0.3px;
                }
                .login-title {
                    font-size: 24px;
                    font-weight: 700;
                    color: #f1f5f9;
                    text-align: center;
                    margin: 0 0 8px;
                }
                .login-subtitle {
                    font-size: 14px;
                    color: #94a3b8;
                    text-align: center;
                    margin: 0 0 28px;
                    line-height: 1.6;
                }
                .login-form {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                .field-group { display: flex; flex-direction: column; gap: 6px; }
                .field-label { font-size: 13px; font-weight: 500; color: #cbd5e1; }
                .field-input {
                    background: rgba(255,255,255,0.06);
                    border: 1px solid rgba(255,255,255,0.12);
                    border-radius: 10px;
                    padding: 11px 14px;
                    font-size: 14px;
                    color: #f1f5f9;
                    outline: none;
                    transition: border-color 0.2s, background 0.2s;
                    width: 100%;
                }
                .field-input::placeholder { color: #475569; }
                .field-input:focus {
                    border-color: #0d9488;
                    background: rgba(13,148,136,0.07);
                }
                .password-wrap { position: relative; }
                .password-input { padding-right: 44px; }
                .password-toggle {
                    position: absolute;
                    right: 4px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: transparent;
                    border: none;
                    color: #64748b;
                    cursor: pointer;
                    padding: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 44px;
                    min-height: 44px;
                    transition: color 0.2s;
                    z-index: 10;
                    -webkit-tap-highlight-color: transparent;
                }
                .password-toggle svg { pointer-events: none; }
                @media (hover: hover) {
                    .password-toggle:hover { color: #94a3b8; }
                    .login-btn:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
                }
                .error-box {
                    background: rgba(239,68,68,0.12);
                    border: 1px solid rgba(239,68,68,0.3);
                    border-radius: 10px;
                    padding: 10px 14px;
                    font-size: 13px;
                    color: #fca5a5;
                }
                .login-btn {
                    background: linear-gradient(135deg, #0d9488, #0891b2);
                    color: white;
                    border: none;
                    border-radius: 10px;
                    padding: 13px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: opacity 0.2s, transform 0.15s;
                    margin-top: 4px;
                }
                .login-btn:active:not(:disabled) { transform: translateY(1px); opacity: 0.8; }
                .login-btn:disabled { opacity: 0.6; cursor: not-allowed; }
                .spinner-wrap { display: flex; align-items: center; justify-content: center; gap: 8px; }
                .spinner {
                    width: 16px;
                    height: 16px;
                    border: 2px solid rgba(255,255,255,0.3);
                    border-top-color: white;
                    border-radius: 50%;
                    animation: spin 0.7s linear infinite;
                }
                @keyframes spin { to { transform: rotate(360deg); } }
                /* OTP */
                .otp-header { text-align: center; margin-bottom: 8px; }
                .otp-email { color: #5eead4; }
                .otp-boxes {
                    display: flex;
                    gap: 8px;
                    justify-content: center;
                    margin-bottom: 4px;
                    flex-wrap: nowrap;
                    width: 100%;
                }
                .otp-box {
                    width: min(48px, 14vw);
                    height: min(56px, 16vw);
                    background: rgba(255,255,255,0.06);
                    border: 1px solid rgba(255,255,255,0.12);
                    border-radius: 10px;
                    font-size: min(22px, 6vw);
                    font-weight: 700;
                    color: #f1f5f9;
                    text-align: center;
                    outline: none;
                    transition: border-color 0.2s, background 0.2s, transform 0.15s;
                    caret-color: #0d9488;
                }
                .otp-box:focus {
                    border-color: #0d9488;
                    background: rgba(13,148,136,0.09);
                    transform: scale(1.05);
                }
                .otp-box-filled {
                    border-color: #0d9488;
                    background: rgba(13,148,136,0.07);
                }
                .resend-row {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    font-size: 13px;
                    color: #64748b;
                }
                .resend-btn {
                    background: none;
                    border: none;
                    color: #0d9488;
                    font-size: 13px;
                    font-weight: 600;
                    cursor: pointer;
                    padding: 0;
                    transition: color 0.2s;
                }
                .resend-btn:disabled { color: #475569; cursor: default; }
                .resend-btn:not(:disabled):hover { color: #5eead4; }
                .back-btn {
                    background: none;
                    border: none;
                    color: #64748b;
                    font-size: 13px;
                    cursor: pointer;
                    padding: 4px 0;
                    transition: color 0.2s;
                    align-self: center;
                }
                .back-btn:hover { color: #94a3b8; }
            `}</style>
        </div>
    );
}

export default function AdminLoginPage() {
    return (
        <Suspense fallback={<div className="admin-login-bg" style={{ minHeight: "100vh", background: "#0f172a" }}></div>}>
            <AdminLoginForm />
        </Suspense>
    );
}
