import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // For debugging purposes, let's make the middleware completely permissive
  // This will help us isolate if the middleware is causing the redirect issues

  console.log("Middleware: Request to", request.nextUrl.pathname);

  // Allow all requests to pass through for now
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
