import { getStoredToken } from '../auth/authStorage'

const API_BASE_URL = 'http://localhost:8080/api'

type JsonHeaders = Record<string, string>

type ApiRequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  headers?: JsonHeaders
  /**
   * If omitted, uses the current stored token.
   * If set to `null`, no Authorization header will be sent.
   */
  token?: string | null
}

function joinUrl(path: string): string {
  if (path.startsWith('/')) return `${API_BASE_URL}${path}`
  return `${API_BASE_URL}/${path}`
}

async function parseErrorBody(res: Response): Promise<string> {
  const contentType = res.headers.get('content-type') ?? ''
  try {
    if (contentType.includes('application/json')) {
      const json = (await res.json()) as unknown
      if (typeof json === 'string') return json
      return JSON.stringify(json)
    }
    return await res.text()
  } catch {
    return res.statusText
  }
}

export async function apiRequest<TResponse>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<TResponse> {
  const token = options.token === undefined ? getStoredToken() : options.token

  const headers = new Headers(options.headers ?? {})
  if (options.body !== undefined && options.body !== null) {
    if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json')
  }

  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const res = await fetch(joinUrl(path), {
    method: options.method ?? 'GET',
    headers,
    body:
      options.body !== undefined && options.body !== null
        ? JSON.stringify(options.body)
        : undefined,
  })

  if (!res.ok) {
    const errBody = await parseErrorBody(res)
    throw new Error(`Request failed (${res.status}): ${errBody}`)
  }

  const contentType = res.headers.get('content-type') ?? ''
  if (contentType.includes('application/json')) return (await res.json()) as TResponse
  // For non-JSON responses, callers should use `TResponse = string`.
  return (await res.text()) as unknown as TResponse
}

