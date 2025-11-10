import { NextResponse } from "next/server";
import axios from "axios";
import { setAuthCookies } from "@/lib/auth";

export async function POST(request: Request) {
  // Accept JSON or form submissions. When a browser submits the server-rendered
  // form the content-type will be form-data/x-www-form-urlencoded (handled via formData()).
  let body: any;
  const contentType = request.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    body = await request.json();
  } else {
    const form = await request.formData();
    body = Object.fromEntries(form.entries());
  }

  try {
    const { data } = await axios.post(`${process.env.BACKEND_URL}/api/auth/login`, body, {
      // forward cookies if any
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
      withCredentials: true,
    });

    if (!data.accessToken) {
      return NextResponse.json({ error: "Invalid login" }, { status: 401 });
    }

    await setAuthCookies(data.accessToken, data.refreshToken);

    // If the request expects HTML (browser form), redirect to dashboard
    const accept = request.headers.get('accept') || '';
    if (accept.includes('text/html')) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Login failed", err.response?.data || err.message);
    const accept = request.headers.get('accept') || '';
    const message = encodeURIComponent((err.response?.data?.message) || err.message || 'Login failed')
    if (accept.includes('text/html')) {
      // Redirect back to login with an error message
      return NextResponse.redirect(new URL(`/auth/login?error=${message}`, request.url));
    }

    return NextResponse.json({ error: "Login failed", details: err.response?.data }, { status: 500 });
  }
}
