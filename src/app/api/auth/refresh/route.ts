import { NextResponse } from "next/server";
import axios from "axios";
import { getRefreshToken, setAuthCookies, clearAuthCookies } from "@/lib/auth";

export async function POST(request: Request) {
  const refreshToken = await getRefreshToken();
  
  if (!refreshToken) {
    const response = NextResponse.json({ error: "No refresh token" }, { status: 401 });
    await clearAuthCookies();
    return response;
  }

  try {
    const { data } = await axios.post(
      `${process.env.BACKEND_URL}/api/auth/refresh`, 
      { refreshToken }
    );

    if (data.accessToken && data.refreshToken) {
      await setAuthCookies(data.accessToken, data.refreshToken);
      return NextResponse.json({ success: true });
    }

    throw new Error("Invalid response from auth server");
    
  } catch (err: any) {
    console.error("Refresh failed:", err.response?.data || err.message);
    
    // Clear cookies on refresh failure
    const response = NextResponse.json(
      { error: "Refresh failed" }, 
      { status: 401 }
    );
    await clearAuthCookies();
    return response;
  }
}