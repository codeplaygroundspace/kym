import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // TODO: Get user role from Supabase session/JWT
  // For now, we'll skip authentication checks

  // Protected routes that require authentication
  const protectedRoutes = ["/patient", "/practitioner"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // TODO: Check if user is authenticated with Supabase
    // const supabaseToken = request.cookies.get('supabase-auth-token');
    // if (!supabaseToken) {
    //   return NextResponse.redirect(new URL('/auth/login', request.url));
    // }
    // TODO: Check user role and redirect accordingly
    // const userRole = getUserRoleFromToken(supabaseToken);
    // if (pathname.startsWith('/patient') && userRole !== 'patient') {
    //   return NextResponse.redirect(new URL('/practitioner', request.url));
    // }
    // if (pathname.startsWith('/practitioner') && userRole !== 'practitioner') {
    //   return NextResponse.redirect(new URL('/patient', request.url));
    // }
  }

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
     * - welcome (public pages)
     * - auth (authentication pages)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|welcome|auth).*)",
  ],
};
