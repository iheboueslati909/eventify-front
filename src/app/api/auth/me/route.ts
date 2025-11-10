import { NextResponse } from "next/server";
import axios from "axios";

// Forward the request to the backend /api/auth/me endpoint and return the result.
export async function GET(request: Request) {
  try {
    const cookieHeader = request.headers.get('cookie') || '';
    const { data } = await axios.get(`${process.env.BACKEND_URL}/api/auth/me`, {
      headers: {
        cookie: cookieHeader,
      },
      withCredentials: true,
    });

    // Expect backend to return { id, email, roles }
    return NextResponse.json({
      id: data.id,
      email: data.email,
      roles: Array.isArray(data.roles) ? data.roles : [],
    });
  } catch (err: any) {
    console.error('Fetch /me failed:', err.response?.data || err.message);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}