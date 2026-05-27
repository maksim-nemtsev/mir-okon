import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse, type NextRequest } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);
const isWebhookRoute = createRouteMatcher(['/api/webhooks/clerk(.*)']);
const safeMethods = new Set(['GET', 'HEAD', 'OPTIONS']);

const isSameOriginRequest = (req: NextRequest) => {
  const origin = req.headers.get('origin');
  const referer = req.headers.get('referer');
  const source = origin || referer;

  if (!source) {
    return false;
  }

  try {
    return new URL(source).origin === req.nextUrl.origin;
  } catch {
    return false;
  }
};

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();

  const isUnsafeApiRequest =
    req.nextUrl.pathname.startsWith('/api/') && !safeMethods.has(req.method);

  if (isUnsafeApiRequest && !isWebhookRoute(req) && !isSameOriginRequest(req)) {
    return NextResponse.json(
      { error: 'Invalid cross-origin request' },
      { status: 403 }
    );
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
