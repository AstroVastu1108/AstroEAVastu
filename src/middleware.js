// middleware.js
// import { useAuth } from '@/@core/contexts/authContext'
import { NextResponse } from 'next/server'

export default async function middleware(req) {
  // List of paths that require authentication
  const protectedRoutes = ['/kundli','/about','/home']

  const { pathname } = req.nextUrl

  // Check if the request is for a protected route
  if (protectedRoutes.includes(pathname)) {
    // Get the token from cookies (assuming the token is stored in cookies)
    const token = req.cookies.get('authToken')

    // If no token is found, redirect to the login page
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // You can add further token validation here (e.g., check token validity)
  }

  // If the route is not protected or the token is valid, proceed
  return NextResponse.next()
}

export const config = {
  matcher: ['/kundli','/about','/home'] // Paths to protect
}
