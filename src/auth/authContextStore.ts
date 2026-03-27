import { createContext } from 'react'

export type AuthContextValue = {
  token: string | null
  isAuthenticated: boolean
  login: (payload: { email: string; password: string }) => Promise<void>
  register: (payload: { name: string; email: string; password: string }) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

