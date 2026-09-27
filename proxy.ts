import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/select-org(.*)",
  "/about",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, orgId, redirectToSignIn } = await auth();

  
  // If logged in & visiting root → redirect to org
  // If user not logged in & route is protected → go to sign in
  if (!isPublicRoute(req) && !userId) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }
  if (userId && orgId && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(
      new URL(`/organization/${orgId}`, req.url)
    );
  }

  // If logged in but no org selected → force select-org
  if (
    userId &&
    !orgId &&
    req.nextUrl.pathname !== "/select-org" &&
    !req.nextUrl.pathname.startsWith("/sign-in")
  ) {
    return NextResponse.redirect(new URL("/select-org", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};