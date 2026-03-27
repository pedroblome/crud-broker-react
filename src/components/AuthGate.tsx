import { AuthPage } from '../pages/AuthPage'
import { HomePage } from '../pages/HomePage'
import { useAuth } from '../auth/useAuth'

export function AuthGate() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) return <AuthPage />
  return <HomePage />
}

