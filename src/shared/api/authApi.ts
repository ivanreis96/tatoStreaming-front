import type {
  AuthMessageResponse,
  AuthSession,
  ForgotPasswordDto,
  LoginDto,
  RefreshTokenDto,
  RegisterDto,
  ResetPasswordDto,
  UserProfile,
} from '../../../../../shared/dist/index.js'
import { httpClient } from './httpClient'

type AuthApiPath =
  | '/api/auth/register'
  | '/api/auth/login'
  | '/api/auth/refresh'
  | '/api/auth/me'
  | '/api/auth/forgot-password'
  | '/api/auth/reset-password'

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

export function forgotPassword(data: ForgotPasswordDto) {
  return authRequest<AuthMessageResponse>('/api/auth/forgot-password', {
    method: 'POST',
    body: data,
  })
}

export function resetPassword(data: ResetPasswordDto) {
  return authRequest<AuthMessageResponse>('/api/auth/reset-password', {
    method: 'POST',
    body: data,
  })
}
