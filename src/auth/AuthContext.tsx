import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { clearStoredToken, getStoredToken, setStoredToken } from './authStorage'
import { login as loginApi, register as registerApi } from './authApi'
import { AuthContext } from './authContextStore'
import type { AuthContextValue } from './authContextStore'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => getStoredToken())

  const isAuthenticated = token !== null && token.length > 0

  const login = useCallback(
    async (payload: { email: string; password: string }) => {
      const newToken = await loginApi(payload)
      setStoredToken(newToken)
      setToken(newToken)
    },
    []
  )

  const register = useCallback(
    async (payload: { name: string; email: string; password: string }) => {
      await registerApi(payload)
    },
    []
  )

  const logout = useCallback(() => {
    clearStoredToken()
    setToken(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ token, isAuthenticated, login, register, logout }),
    [token, isAuthenticated, login, register, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

