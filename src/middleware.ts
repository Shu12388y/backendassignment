import { NextRequest, NextResponse } from 'next/server';

// Define the protected paths (routes that require authentication)


export function middleware(req: NextRequest) {
  // Get the token from cookies
  const protectedPaths = ['/userProfile', '/Jobs'];
  const { pathname } = req.nextUrl;
  const isProtectedRoute = protectedPaths.some(route => pathname?.startsWith(route));
  const token = req.cookies.get('token')?.value;
  // console.log(isProtectedRoute)
  // console.log(token)

  // Check if the request is for a protected route
  if (isProtectedRoute) {
    // If no token is found, redirect to the login page
    if (!token) {
      const loginUrl = new URL('/signin', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If the token is present, or the route is not protected, continue with the request
  return NextResponse.next();
}
