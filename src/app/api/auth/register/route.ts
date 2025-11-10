import { NextResponse } from "next/server";
import axios from "axios";
import { setAuthCookies } from "@/lib/auth";

export async function POST(request: Request) {
  let body: any;
  const contentType = request.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    body = await request.json();
  } else {
    const form = await request.formData();
    body = Object.fromEntries(form.entries());
  }

  try {
    const { data } = await axios.post(`${process.env.BACKEND_URL}/api/auth/register`, body, {
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
      withCredentials: true,
    });

    // If backend returned tokens, set them and redirect to dashboard
    if (data?.accessToken && data?.refreshToken) {
      await setAuthCookies(data.accessToken, data.refreshToken);
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Otherwise redirect to login (typical registration flow)
    return NextResponse.redirect(new URL('/auth/login', request.url));
  } catch (err: any) {
    console.error('Registration failed', err.response?.data || err.message);
    const message = encodeURIComponent((err.response?.data?.message) || err.message || 'Registration failed')
    // Redirect back to signup and include error message
    return NextResponse.redirect(new URL(`/auth/signup?error=${message}`, request.url));
  }
}
