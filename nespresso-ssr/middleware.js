import { NextResponse } from "next/server";
import routes from "./routes.json";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Ignore API routes and static files
  if (pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next();
  }

  // Root path should not be redirected
  if (pathname === "/") {
    return NextResponse.next();
  }

  // Check for trailing slash
  try {
    if (pathname.endsWith("/")) {
      const pathWithoutSlash = pathname.slice(0, -1);

      const urlWithoutSlash = new URL(
        pathname.slice(0, -1) || "/",
        request.url
      );

      // Match the URL against the route patterns
      const isValidRoute = routes.some((routePattern) =>
        routePattern.includes(pathWithoutSlash)
      );

      if (isValidRoute) {
        // Redirect to the URL without trailing slash
        const url = urlWithoutSlash;
        return NextResponse.redirect(url, { status: 301 });
      }
    }
  } catch (e) {
    console.log(`\u001b[1;32m Middleware error: ${e}`);
  }

  return NextResponse.next();
}
