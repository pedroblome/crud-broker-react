import { useAuth } from '../auth/useAuth'

export function HomePage() {
  const { token, logout } = useAuth()

  return (
    <main
      style={{
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        alignItems: 'center',
      }}
    >
      <h1 style={{ margin: 0 }}>Home</h1>
      <p style={{ margin: 0, maxWidth: 640 }}>
        You are logged in. Future requests will include your Bearer token.
      </p>
      <div
        style={{
          padding: 12,
          border: '1px solid var(--border)',
          borderRadius: 8,
          width: 'min(640px, 100%)',
          textAlign: 'left',
          fontFamily: 'var(--mono)',
          color: 'var(--text-h)',
          overflowWrap: 'anywhere',
        }}
      >
        <div style={{ fontSize: 14, marginBottom: 6, opacity: 0.9 }}>Token</div>
        <div style={{ fontSize: 14 }}>
          {token ? `${token.slice(0, 18)}...${token.slice(-8)}` : '—'}
        </div>
      </div>

      <button className="counter" onClick={logout}>
        Logout
      </button>
    </main>
  )
}

