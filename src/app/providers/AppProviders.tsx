import { useEffect, type ReactNode } from 'react'
import { Provider } from 'react-redux'
import { useAppSelector, useAppDispatch } from './hooks'
import { store } from './store'
import {
  clearPersistedAuthSession,
  hydrateSession,
  loadPersistedAuthSession,
  savePersistedAuthSession,
} from '@/features/auth'

type AppProvidersProps = {
  children: ReactNode
}

function ThemeEffect() {
  const theme = useAppSelector((state) => state.theme.mode)

  useEffect(() => {
    const rootElement = document.documentElement

    rootElement.classList.toggle('dark', theme === 'dark')
    rootElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('app-theme', theme)
  }, [theme])

  return null
}

function AuthSessionInit() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(hydrateSession(loadPersistedAuthSession()))
  }, [dispatch])

  return null
}

function AuthSessionSync() {
  const authState = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (
      authState.status === 'authenticated'
      && authState.currentUser
      && authState.accessToken
      && authState.refreshToken
    ) {
      savePersistedAuthSession({
        user: authState.currentUser,
        accessToken: authState.accessToken,
        refreshToken: authState.refreshToken,
      })

      return
    }

    if (authState.status === 'unauthenticated') {
      clearPersistedAuthSession()
    }
  }, [authState])

  return null
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <Provider store={store}>
      <ThemeEffect />
      <AuthSessionInit />
      <AuthSessionSync />
      {children}
    </Provider>
  )
}
