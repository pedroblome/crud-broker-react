import { extractToken } from './extractToken'
import { apiRequest } from '../api/httpClient'

type RegisterPayload = {
  name: string
  email: string
  password: string
}

type LoginPayload = {
  email: string
  password: string
}

export async function register(payload: RegisterPayload): Promise<void> {
  await apiRequest<unknown>('/auth/register', {
    method: 'POST',
    body: payload,
    token: null,
  })
}

export async function login(payload: LoginPayload): Promise<string> {
  const json = await apiRequest<unknown>('/auth/login', {
    method: 'POST',
    body: payload,
    token: null,
  })
  return extractToken(json)
}

