// src/proxy.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // কুকি থেকে টোকেন ও রোল রিড করা
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  const isProtectedPath =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/recruiter");

  // ১. টোকেন না থাকলে প্রোটেক্টেড পাথে ঢুকতে দেবে না -> সরাসরি /login এ রিডাইরেক্ট
  if (isProtectedPath && (!token || token === "demo-token")) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ২. লগইন থাকা অবস্থায় /login এ গেলে ড্যাশবোর্ডে রিডাইরেক্ট
  if (pathname === "/login" && token && token !== "demo-token") {
    if (role === "SUPER_ADMIN" || role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    if (role === "RECRUITER") {
      return NextResponse.redirect(new URL("/recruiter", request.url));
    }
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // ৩. রোল ভিত্তিক অ্যাক্সেস গার্ড (RBAC)
  if (token && role) {
    if (pathname.startsWith("/admin") && role !== "ADMIN" && role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (pathname.startsWith("/recruiter") && role !== "RECRUITER" && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

// যে যে রাউটে Proxy ইন্টারসেপ্ট করবে
export const config = {
  matcher: [
    "/admin/:path*",
    "/recruiter/:path*",
    "/dashboard/:path*",
    "/login",
  ],
};