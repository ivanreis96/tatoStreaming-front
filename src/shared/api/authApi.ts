import type {
  AuthSession,
  LoginDto,
  RefreshTokenDto,
  RegisterDto,
  UserProfile,
} from '../../../../../shared/dist/index.js'
import { httpClient } from './httpClient'

type AuthApiPath = '/api/auth/register' | '/api/auth/login' | '/api/auth/refresh' | '/api/auth/me'

function authRequest<T>(path: AuthApiPath, options?: Parameters<typeof httpClient<T>>[1]) {
  return httpClient<T>(path, options)
}

export function register(data: RegisterDto) {
  return authRequest<AuthSession>('/api/auth/register', {
    method: 'POST',
    body: data,
  })
}

export function login(data: LoginDto) {
  return authRequest<AuthSession>('/api/auth/login', {
    method: 'POST',
    body: data,
  })
}

export function refresh(data: RefreshTokenDto) {
  return authRequest<AuthSession>('/api/auth/refresh', {
    method: 'POST',
    body: data,
  })
}

export function me(accessToken: string) {
  return authRequest<UserProfile>('/api/auth/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
