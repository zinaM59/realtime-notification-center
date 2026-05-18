// proxy.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const proxy = auth((req) => {
    console.log("PROXY RUNNING:", req.nextUrl.pathname);

    const isLoggedIn = !!req.auth;
    const pathname = req.nextUrl.pathname;

    if (!isLoggedIn && (pathname.startsWith("/dashboard") || pathname.startsWith("/tasks") || pathname.startsWith("/notifications"))) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
    if (
        !isLoggedIn &&
        (pathname.startsWith("/api/tasks") ||
            pathname.startsWith("/api/notifications"))
    ) {

        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        //return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/api/tasks/:path*",
        "/api/notifications/:path*",
    ],
};