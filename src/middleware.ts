import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  // Refresh session to ensure we have the latest auth state
  // This helps prevent race conditions after login/signup
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    console.error("Middleware session error:", sessionError);
  }

  const user = session?.user;
  const { pathname } = request.nextUrl;

  // Define protected and public routes
  const protectedPatientRoutes = ["/patient"];
  const protectedPractitionerRoutes = ["/practitioner"];
  const publicRoutes = ["/welcome", "/auth"];

  const isPatientRoute = protectedPatientRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPractitionerRoute = protectedPractitionerRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (user) {
    // If user is logged in
    try {
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profileError) {
        console.error("Middleware profile error:", profileError);
        // If profile fetch fails, allow access but don't redirect
        return response;
      }

      if (isPublicRoute) {
        // User is logged in but accessing public route, redirect to their dashboard
        if (profile?.role === "patient") {
          return NextResponse.redirect(new URL("/patient", request.url));
        }
        if (profile?.role === "practitioner") {
          return NextResponse.redirect(new URL("/practitioner", request.url));
        }
      }

      // Ensure user is accessing the correct route for their role
      if (profile?.role === "patient" && isPractitionerRoute) {
        return NextResponse.redirect(new URL("/patient", request.url));
      }
      if (profile?.role === "practitioner" && isPatientRoute) {
        return NextResponse.redirect(new URL("/practitioner", request.url));
      }
    } catch (error) {
      console.error("Middleware error:", error);
      // On error, allow the request to proceed
      return response;
    }
  } else {
    // If user is not logged in and tries to access a protected route
    if (!isPublicRoute) {
      // redirect to welcome page
      return NextResponse.redirect(new URL("/welcome", request.url));
    }
  }

  return response;
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
