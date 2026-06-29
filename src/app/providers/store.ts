import { configureStore } from '@reduxjs/toolkit'
import { themeReducer } from '@/shared/theme'
import { authReducer } from '@/features/auth'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
