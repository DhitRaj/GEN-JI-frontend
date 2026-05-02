import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const pathname = request.nextUrl.pathname;

  const noIndexPrefixes = ['/admin', '/api', '/preview', '/select', '/theme-studio'];
  const shouldNoIndex = noIndexPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (shouldNoIndex) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  }

  // In development, disable HTML caching for all app routes to avoid stale chunk references.
  // In production, keep this strict only for admin pages.
  const shouldNoStore =
    process.env.NODE_ENV === 'development' ||
    pathname === '/admin' ||
    pathname.startsWith('/admin/');

  if (shouldNoStore) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/|favicon.ico).*)",
  ],
};
