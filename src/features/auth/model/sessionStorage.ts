import type { PersistedAuthSession } from './types'

const AUTH_SESSION_STORAGE_KEY = 'app-auth-session'

export function loadPersistedAuthSession(): PersistedAuthSession | null {
  try {
    const rawSession = window.localStorage.getItem(AUTH_SESSION_STORAGE_KEY)

    if (!rawSession) {
      return null
    }

    return JSON.parse(rawSession) as PersistedAuthSession
  } catch {
    return null
  }
}

export function savePersistedAuthSession(session: PersistedAuthSession) {
  window.localStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(session))
}

export function clearPersistedAuthSession() {
  window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY)
}
