import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

/* ──────────────────────────────────────────────── Define Protected Routes */
// List all routes that require user to be logged in (e.g., /feedback page)
const isProtectedRoute = createRouteMatcher(['/feedback']);

/* ──────────────────────────────────────────────── Middleware Function */
// Check authentication for protected routes before allowing access
export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect(); // Require login for protected routes
  }
});

/* ──────────────────────────────────────────────── Middleware Configuration */
// Define which pages this middleware should run on
export const config = {
  matcher: [
    // Run on all pages except Next.js system files and static files (images, fonts, etc.)
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run on API routes
    '/(api|trpc)(.*)',
  ],
};
