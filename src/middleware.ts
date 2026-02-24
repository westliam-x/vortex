import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/clients",
  "/projects",
  "/spaces",
  "/reviews",
  "/invoices",
  "/payments",
  "/team",
  "/settings",
  "/logs",
];

export function middleware(request: NextRequest) {
  const loggedIn = request.cookies.get("logged_in")?.value;
  const pathname = request.nextUrl.pathname;

  const isProtected = protectedRoutes.some((path) => pathname.startsWith(path));

  if (isProtected && !loggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/clients",
    "/projects",
    "/spaces",
    "/reviews",
    "/invoices",
    "/payments",
    "/team",
    "/settings",
    "/logs",
  ],
};
