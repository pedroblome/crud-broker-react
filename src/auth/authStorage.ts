const TOKEN_KEY = 'auth_token'

export function getStoredToken(): string | null {
  try {
    return sessionStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function setStoredToken(token: string): void {
  try {
    sessionStorage.setItem(TOKEN_KEY, token)
  } catch {
    console.log('Storage token failed')
    // If storage fails (private mode, disabled storage), app will remain unauthenticated.
  }
}

export function clearStoredToken(): void {
  try {
    sessionStorage.removeItem(TOKEN_KEY)
  } catch {
    // ignore
  }
}

export function hasStoredToken(): boolean {
  return getStoredToken() !== null
}

