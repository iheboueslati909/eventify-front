"use client"
import React, { createContext, useContext, useState } from 'react'
import type { MeResponse } from '@/dtos/auth/me-response.dto'

interface AuthContextValue {
  user: MeResponse | null
  setUser: (u: MeResponse | null) => void
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children, initialUser }: { children: React.ReactNode; initialUser?: MeResponse | null }) {
  const [user, setUser] = useState<MeResponse | null>(initialUser ?? null)

  async function logout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } finally {
      setUser(null)
      // client-side redirect
      window.location.href = '/auth/login'
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext must be used inside AuthProvider')
  return ctx
}

export default AuthContext
