import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  // Allow auth-related routes
  if (req.nextUrl.pathname.startsWith('/api/auth') || req.nextUrl.pathname === '/login') {
    return NextResponse.next();
  }

  if (!accessToken) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Try to get user info from our /api/auth/me route so we don't rely on any public key here
  try {
    const meResponse = await fetch(new URL('/api/auth/me', req.url).toString(), {
      headers: {
        'Cookie': req.headers.get('cookie') || '',
      },
      // ensure credentials forwarded
      credentials: 'include',
    });

    if (!meResponse.ok) {
      throw new Error('Unauthorized');
    }

    const user = await meResponse.json();
    const roles = Array.isArray(user.roles) ? user.roles : [];

    // Role-based protection
    if (req.nextUrl.pathname.startsWith('/admin') && !roles.includes('admin')) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    // Add user info to headers for API routes
    const requestHeaders = new Headers(req.headers);
    if (user.id) requestHeaders.set('x-user-id', String(user.id));
    requestHeaders.set('x-user-roles', JSON.stringify(roles));

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (err) {
    // Token invalid - try to refresh
    if (refreshToken) {
      try {
        const refreshResponse = await fetch(new URL('/api/auth/refresh', req.url).toString(), {
          method: 'POST',
          headers: {
            'Cookie': req.headers.get('cookie') || '',
          },
        });

        if (refreshResponse.ok) {
          const setCookieHeader = refreshResponse.headers.get('set-cookie');
          if (setCookieHeader) {
            const response = NextResponse.next();
            response.headers.set('set-cookie', setCookieHeader);
            return response;
          }
          // If refresh succeeded but no set-cookie header, try getting /me again
          const meResponse2 = await fetch(new URL('/api/auth/me', req.url).toString(), {
            headers: { 'Cookie': req.headers.get('cookie') || '' },
            credentials: 'include',
          });
          if (meResponse2.ok) {
            const user = await meResponse2.json();
            const roles = Array.isArray(user.roles) ? user.roles : [];
            const requestHeaders = new Headers(req.headers);
            if (user.id) requestHeaders.set('x-user-id', String(user.id));
            requestHeaders.set('x-user-roles', JSON.stringify(roles));
            return NextResponse.next({ request: { headers: requestHeaders } });
          }
        }
      } catch (refreshError) {
        console.error('Refresh failed:', refreshError);
      }
    }

    // Clear invalid tokens and redirect to login
    const response = NextResponse.redirect(new URL('/auth/login', req.url));
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');
    return response;
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/api/protected/:path*'],
};