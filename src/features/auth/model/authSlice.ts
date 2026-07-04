import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { UserProfile } from '@/entities/user'
import type { AuthSession, AuthStatus, PersistedAuthSession } from './types'

type AuthState = {
  currentUser: UserProfile | null
  accessToken: string | null
  refreshToken: string | null
  status: AuthStatus
}

const initialState: AuthState = {
  currentUser: null,
  accessToken: null,
  refreshToken: null,
  status: 'idle',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<AuthSession>) {
      state.currentUser = action.payload.user
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.status = 'authenticated'
    },
    hydrateSession(state, action: PayloadAction<PersistedAuthSession | null>) {
      if (!action.payload) {
        state.currentUser = null
        state.accessToken = null
        state.refreshToken = null
        state.status = 'unauthenticated'
        return
      }

      state.currentUser = action.payload.user
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.status = 'authenticated'
    },
    setCurrentUser(state, action: PayloadAction<UserProfile | null>) {
      state.currentUser = action.payload

      if (action.payload === null) {
        state.accessToken = null
        state.refreshToken = null
        state.status = 'unauthenticated'
      }
    },
    clearCurrentUser(state) {
      state.currentUser = null
      state.accessToken = null
      state.refreshToken = null
      state.status = 'unauthenticated'
    },
  },
})

export const { setSession, hydrateSession, setCurrentUser, clearCurrentUser } = authSlice.actions
export const authReducer = authSlice.reducer
