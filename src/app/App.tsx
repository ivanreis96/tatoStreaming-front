import { AppProviders, useTheme } from './providers/AppProviders'
import { HomePage } from '../pages/home'
import { Header } from '../widgets/header'

function AppContent() {
  const { toggleTheme } = useTheme()

  return (
    <div className="app-shell">
      <Header onThemeToggle={toggleTheme} />
      <main className="app-content">
        <HomePage />
      </main>
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
