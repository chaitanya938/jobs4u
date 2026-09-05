import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "admin_session";
const SESSION_SECRET = "jobs4u_admin_secret_2024";

const PUBLIC_PATHS = [
    "/admin/login",
    "/api/admin/login",
    "/api/admin/verify-otp",
    "/api/admin/logout",
];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip middleware for non-admin paths (safety net)
    if (!pathname.startsWith("/admin") && !pathname.startsWith("/api/admin")) {
        return NextResponse.next();
    }

    // Allow public admin paths through
    if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
        return NextResponse.next();
    }

    // Check session cookie
    const sessionCookie = request.cookies.get(SESSION_COOKIE);
    const isAuthenticated = sessionCookie?.value === SESSION_SECRET;

    console.log(`[middleware] ${pathname} | cookie=${sessionCookie?.value} | auth=${isAuthenticated}`);

    if (!isAuthenticated) {
        const loginUrl = new URL("/admin/login", request.url);
        loginUrl.searchParams.set("from", pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin/:path*",
        "/api/admin/:path*",
    ],
};
