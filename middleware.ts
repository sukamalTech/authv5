import authConfig from "@/auth.config";
import NextAuth from "next-auth";
const { auth } = NextAuth(authConfig);
import {
  publicRoutes,
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
} from "@/routes";
// export async function middleware(request: NextRequest) {
//   const session = await auth();
//   const isProtected = protectedRoutes.some((route) =>
//     request.nextUrl.pathname.startsWith(route)
//   );
//   if (!session && isProtected) {
//     const absoluteUrl = new URL("/", request.nextUrl.origin);
//     return NextResponse.redirect(absoluteUrl.toString());
//   }
//   return NextResponse.next();
// }

// @ts-ignore
export default auth((req) => {
  const { nextUrl } = req;
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoutes = pathname.startsWith(apiAuthPrefix);
  const isPublicRoutes = publicRoutes.includes(pathname);
  const isAuthRoutes = authRoutes.includes(pathname);
  if (isApiAuthRoutes) {
    return null;
  }
  if (isAuthRoutes) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)); // nextUrl create absolute url from relative url
    }
    return null;
  }
  if (!isPublicRoutes && !isLoggedIn) {
    return Response.redirect(new URL("/login", nextUrl));
  }
  // nextUrl create absolute url from relative url
  return null;
});

// only the pathnames mentioned in the array will be protected and invoke the middleware
// The best matcher you can find from clerk documentation.
export const config = {
  // The below path matches all non-static and non-api routes.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
