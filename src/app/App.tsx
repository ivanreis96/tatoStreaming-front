import { AppProviders } from './providers/AppProviders'
import { useAppDispatch, useAppSelector } from './providers/hooks'
import { toggleTheme } from '../features/theme'
import { HomePage } from '../pages/home'
import { Header } from '../widgets/header'
import { Footer } from '../widgets/footer'

function AppContent() {
  const dispatch = useAppDispatch()
  const darkMode = useAppSelector((state) => state.theme.mode === 'dark')
  const isLoged = false

  const onThemeToggle = () => {
    dispatch(toggleTheme())
  }

  return (
    <div className="app-shell">
      <Header onThemeToggle={onThemeToggle} darkMode={darkMode} isLoged={isLoged} />
      <main className="app-content">
        <HomePage />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <AppProviders>
      <AppContent />
    </AppProviders>
  )
}

export default App
