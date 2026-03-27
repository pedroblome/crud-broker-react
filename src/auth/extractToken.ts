type AnyRecord = Record<string, unknown>

function isRecord(value: unknown): value is AnyRecord {
  return typeof value === 'object' && value !== null
}

function pickString(record: AnyRecord, key: string): string | null {
  const val = record[key]
  return typeof val === 'string' && val.length > 0 ? val : null
}

/**
 * Tries to extract the raw token string from various common backend response shapes.
 * If your backend uses a different field name, update the keys below.
 */
export function extractToken(response: unknown): string {
  if (typeof response === 'string' && response.length > 0) return response
  if (!isRecord(response)) {
    throw new Error('Login response did not contain a token')
  }

  // Common top-level names
  const direct =
    pickString(response, 'token') ??
    pickString(response, 'accessToken') ??
    pickString(response, 'access_token') ??
    pickString(response, 'access')

  if (direct) return direct

  // Common nested wrappers
  const candidates: Array<AnyRecord> = []
  const maybeData = response.data
  if (isRecord(maybeData)) candidates.push(maybeData)
  const maybeResult = response.result
  if (isRecord(maybeResult)) candidates.push(maybeResult)
  const maybeDataAny = response.payload
  if (isRecord(maybeDataAny)) candidates.push(maybeDataAny)

  for (const c of candidates) {
    const nested =
      pickString(c, 'token') ??
      pickString(c, 'accessToken') ??
      pickString(c, 'access_token') ??
      pickString(c, 'access')
    if (nested) return nested
  }

  throw new Error(
    'Could not find token in login response. Please confirm the response JSON field name.'
  )
}

