import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("middleware");
  console.log(request.nextUrl);

  if (
    request.nextUrl.pathname.startsWith("/home") ||
    request.nextUrl.pathname.startsWith("/auth")
  ) {
    // return NextResponse.rewrite(new URL("/auth", request.url));
    // return NextResponse.redirect(new URL("/auth", request.url));

    if (true) {
    } else {
    }
  }

  if (request.nextUrl.pathname.startsWith("/auth")) {
  }
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/home/:path", "/auth/:path"],
};
