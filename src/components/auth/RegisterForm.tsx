import { useState, type FormEvent } from 'react'
import { useAuth } from '../../auth/useAuth'

type RegisterFormProps = {
  onRegistered: () => void
}

export function RegisterForm({ onRegistered }: RegisterFormProps) {
  const auth = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await auth.register({ name, email, password })
      onRegistered()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Register failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      style={{
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        alignItems: 'center',
        width: 'min(520px, 100%)',
      }}
    >
      <h1 style={{ margin: 0 }}>Register</h1>
      <form onSubmit={onSubmit} style={{ width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span>Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
              style={{ padding: 10, borderRadius: 8, border: '1px solid var(--border)' }}
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span>Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="email"
              required
              style={{ padding: 10, borderRadius: 8, border: '1px solid var(--border)' }}
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span>Password</span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="new-password"
              required
              style={{ padding: 10, borderRadius: 8, border: '1px solid var(--border)' }}
            />
          </label>

          {error ? (
            <div
              role="alert"
              style={{
                padding: 12,
                borderRadius: 8,
                border: '1px solid rgba(255,0,0,0.25)',
                color: 'var(--text-h)',
                background: 'rgba(255,0,0,0.08)',
              }}
            >
              {error}
            </div>
          ) : null}

          <button className="counter" type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Create account'}
          </button>
        </div>
      </form>
    </section>
  )
}

