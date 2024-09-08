// // middleware.js
// // import { useAuth } from '@/@core/contexts/authContext'
// import { NextResponse } from 'next/server'

// export default async function middleware(req) {
//   // List of paths that require authentication
//   const protectedRoutes = ['/kundli','/about','/home']

//   const { pathname } = req.nextUrl

//   // Check if the request is for a protected route
//   if (protectedRoutes.includes(pathname)) {
//     // Get the token from cookies (assuming the token is stored in cookies)
//     const token = req.cookies.get('authToken')

//     // If no token is found, redirect to the login page
//     if (!token) {
//       return NextResponse.redirect(new URL('/login', req.url))
//     }

//     // You can add further token validation here (e.g., check token validity)
//   }

//   // If the route is not protected or the token is valid, proceed
//   return NextResponse.next()
// }

// export const config = {
//   matcher: ['/kundli','/about','/home'] // Paths to protect
// }


// // middleware.js
// // import { useAuth } from '@/@core/contexts/authContext'
// import { NextResponse } from 'next/server'
// var myROutes = []
// export default async function middleware(req) {
//   // List of paths that require authentication
//   const protectedRoutes = ['/kundlipage','/about','/home']

//   const { pathname } = req.nextUrl

//   // Check if the request is for a protected route
//   if (protectedRoutes.includes(pathname)) {
//     // Get the token from cookies (assuming the token is stored in cookies)
//     const token = req.cookies.get('authState')
//     // console.log("token : ",JSON.parse(token.value))
//     const { username,authRule,refreshToken,accessToken,userRole,expirationTime} = JSON.parse(token.value);
//     var protectedRoutesData = JSON.parse(authRule)


//       const hrefsWithAccess = protectedRoutesData
//         .filter(item => item.HasAccess)
//         .map(item => item.Href)
//         myROutes.push(hrefsWithAccess)

//     // If no token is found, redirect to the login page
//     // if (!token) {
//     //   return NextResponse.redirect(new URL('/login', req.url))
//     // }

//   }
//   return NextResponse.next()
// }
// console.log(" myROutes : ",myROutes)
// export const config = {
//   matcher: ['/kundlipage','/about','/home'] // Paths to protect
//   // matcher: ['/kundlipage','/about','/home'] // Paths to protect
// }

// import { NextResponse } from 'next/server'

// export default async function middleware(req) {
//   const protectedRoutes = ['/kundlipage']
//   const { pathname } = req.nextUrl

//   if (protectedRoutes.includes(pathname)) {
//     const token = req.cookies.get('authState')
//     if (token) {
//       try {
//         const { authRule } = JSON.parse(token.value)
//         const protectedRoutesData = JSON.parse(authRule)

//         const hrefsWithAccess = protectedRoutesData
//           .filter(item => item.HasAccess)
//           .map(item => item.Href)
//         if (hrefsWithAccess.includes('kundlipage')) {
//           hrefsWithAccess.push('/preview');
//         }
//         const hasAccess = hrefsWithAccess.some(accessPath => pathname.startsWith(accessPath));

//         if (!hasAccess) {
//           // Redirect to a forbidden or login page
//           return NextResponse.redirect(new URL('/forbidden', req.url))
//         }
//         return NextResponse.next()
//       } catch (error) {
//         console.error('Error parsing token or routes:', error)
//       }
//     } else {
//       return NextResponse.redirect(new URL('/login', req.url))
//     }
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: ['/kundlipage/:path*', '/about', '/home','/user']
// }
