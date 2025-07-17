// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // Define protected paths
  const protectedRoutes = ["/dashboard", "/clients", "/projects", "/vortexes", "/reviews", "/team", "/settings", "/logs"];

  const isProtected = protectedRoutes.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
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
