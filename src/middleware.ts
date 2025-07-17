import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
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

  if (isProtected && !token) {
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
