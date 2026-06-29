import { useEffect, type ReactNode } from 'react'
import { Provider } from 'react-redux'
import { useAppSelector, useAppDispatch } from './hooks'
import { store } from './store'
import { setCurrentUser } from '@/features/auth'
import { mockCurrentUser } from '@/mock'

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

function MockAuthInit() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setCurrentUser(mockCurrentUser))
  }, [dispatch])

  return null
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <Provider store={store}>
      <ThemeEffect />
      <MockAuthInit />
      {children}
    </Provider>
  )
}
