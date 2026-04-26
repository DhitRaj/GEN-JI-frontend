import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // For now, just pass through all requests
  // Supabase authentication can be added later when needed
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
