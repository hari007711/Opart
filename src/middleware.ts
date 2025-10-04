import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  // Check if user is on auth pages
  const isAuthPage = pathname.startsWith("/auth");

  // If user has session and tries to access auth pages, redirect to home
  if (sessionCookie && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user has no session and tries to access protected pages, redirect to login
  if (!sessionCookie && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except static files and API routes
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
