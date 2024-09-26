import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "./midlewares/verifySession";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/home")) {
    const session = await verifySession();

    console.log("session", session);
    if (!session) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/auth")) {
    const session = await verifySession();

    if (session) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }
}

export const config = {
  matcher: ["/home/:path", "/auth/:path"],
};
