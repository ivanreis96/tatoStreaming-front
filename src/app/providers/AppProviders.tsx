import { useEffect, type ReactNode } from 'react'
import { Provider } from 'react-redux'
import { useAppSelector } from './hooks'
import { store } from './store'

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

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <Provider store={store}>
      <ThemeEffect />
      {children}
    </Provider>
  )
}
