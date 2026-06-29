import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { UserProfile } from '@/entities/user'

type AuthState = {
  currentUser: UserProfile | null
}

const initialState: AuthState = {
  currentUser: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<UserProfile | null>) {
      state.currentUser = action.payload
    },
    clearCurrentUser(state) {
      state.currentUser = null
    },
  },
})

export const { setCurrentUser, clearCurrentUser } = authSlice.actions
export const authReducer = authSlice.reducer
