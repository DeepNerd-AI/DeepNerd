import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/", "/login", "/signup", "/docs", "/about", "/terms", "/privacy", "/contact", "/products"];

function isPublicRoute(pathname: string) {
  return PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({ request });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: "", ...options });
          response = NextResponse.next({ request });
          response.cookies.set({ name, value: "", ...options });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isDashboard = pathname.startsWith("/dashboard");
  const isOnboarding = pathname === "/onboarding";
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  if (!user && (isDashboard || isOnboarding)) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (!user) {
    return response;
  }

  let onboardingCompleted = false;
  const { data: profile } = await supabase
    .from("profiles")
    .select("onboarding_completed")
    .eq("id", user.id)
    .maybeSingle();

  onboardingCompleted = Boolean(profile?.onboarding_completed);

  if (!onboardingCompleted && !isOnboarding && isDashboard) {
    const url = request.nextUrl.clone();
    url.pathname = "/onboarding";
    return NextResponse.redirect(url);
  }

  if (onboardingCompleted && isOnboarding) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = onboardingCompleted ? "/dashboard" : "/onboarding";
    return NextResponse.redirect(url);
  }

  if (!isDashboard && !isOnboarding && !isPublicRoute(pathname) && !pathname.startsWith("/api")) {
    return response;
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
