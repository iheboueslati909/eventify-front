import axios from 'axios'
import { cookies } from 'next/headers'
import type { MeResponse } from '@/dtos/auth/me-response.dto'

export async function getServerMe(): Promise<MeResponse | null> {
  try {
  const cookieStore = await cookies() as any;
  const cookieHeader = (cookieStore.getAll ? cookieStore.getAll() : []).map((c: any) => `${c.name}=${c.value}`).join('; ');

    const { data } = await axios.get(`${process.env.BACKEND_URL}/api/auth/me`, {
      headers: {
        cookie: cookieHeader,
      },
      withCredentials: true,
    });

    if (!data) return null;

    return {
      id: String(data.id),
      email: String(data.email),
      roles: Array.isArray(data.roles) ? data.roles : [],
    };
  } catch (err) {
    return null;
  }
}
