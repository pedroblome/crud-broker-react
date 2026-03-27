import { useContext } from 'react'
import { AuthContext } from './authContextStore'
import type { AuthContextValue } from './authContextStore'

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}

