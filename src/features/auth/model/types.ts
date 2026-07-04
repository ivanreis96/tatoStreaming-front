export type { AuthSession, LoginDto, RefreshTokenDto, RegisterDto } from '../../../../../../shared/dist/index.js'

export type PersistedAuthSession = {
	accessToken: string
	refreshToken: string
	user: {
		id: string
		email: string
		displayName: string
		avatarUrl?: string
	}
}

export type AuthStatus = 'idle' | 'authenticated' | 'unauthenticated'
