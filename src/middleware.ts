import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const loggedIn = request.cookies.get("logged_in")?.value;
  const pathname = request.nextUrl.pathname;

  const protectedRoutes = [
    "/dashboard",
    "/clients",
    "/projects",
    "/vortexes",
    "/reviews",
    "/team",
    "/settings",
    "/logs",
  ];

  const devRoutes = [
    "/settings",      
    "/vortexes",  
  ];

  const isProtected = protectedRoutes.some((path) =>
    pathname.startsWith(path)
  );

  const isDevRoute = devRoutes.some((path) =>
    pathname.startsWith(path)
  );

  if (isProtected && !loggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isDevRoute) {
    return NextResponse.redirect(new URL("/development", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/clients",
    "/projects",
    "/vortexes",
    "/reviews",
    "/team",
    "/settings",
    "/logs",
  ],
};
