import { useState } from 'react'
import { LoginForm } from '../components/auth/LoginForm'
import { RegisterForm } from '../components/auth/RegisterForm'

type AuthMode = 'login' | 'register'

export function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('login')

  return (
    <div
      style={{
        minHeight: '60svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        padding: 16,
      }}
    >
      <div style={{ display: 'flex', gap: 10 }}>
        <button
          className="counter"
          type="button"
          onClick={() => setMode('login')}
          style={{
            opacity: mode === 'login' ? 1 : 0.75,
          }}
        >
          Login
        </button>
        <button
          className="counter"
          type="button"
          onClick={() => setMode('register')}
          style={{
            opacity: mode === 'register' ? 1 : 0.75,
          }}
        >
          Register
        </button>
      </div>

      {mode === 'login' ? (
        <LoginForm />
      ) : (
        <RegisterForm onRegistered={() => setMode('login')} />
      )}
    </div>
  )
}

