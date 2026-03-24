import { AppProviders, useTheme } from './providers/AppProviders'
import { HomePage } from '../pages/home'
import { Header } from '../widgets/header'

function AppContent() {
  const { theme, toggleTheme } = useTheme()

  const themeToggleLabel = theme === 'dark' ? 'Tema claro' : 'Tema escuro'

  return (
    <div className="app-shell">
      <Header onThemeToggle={toggleTheme} themeToggleLabel={themeToggleLabel} />
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
