import { BrowserRouter, useNavigate } from 'react-router-dom'
import { AppProviders } from './providers/AppProviders'
import { useAppDispatch, useAppSelector } from './providers/hooks'
import { toggleTheme } from '../shared/theme'
import { AppRoutes } from './routes/AppRoutes'
import { Header } from '../widgets/header'
import { Footer } from '../widgets/footer'
import { clearCurrentUser } from '@/features/auth'

function AppContent() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const darkMode = useAppSelector((state) => state.theme.mode === 'dark')
  const isLoged = useAppSelector((state) => state.auth.status === 'authenticated' && state.auth.currentUser !== null)

  const onThemeToggle = () => {
    dispatch(toggleTheme())
  }

  const onAuthAction = () => {
    if (isLoged) {
      dispatch(clearCurrentUser())
      navigate('/login', { replace: true })
      return
    }

    navigate('/login')
  }

  return (
    <div className="app-shell">
      <Header onThemeToggle={onThemeToggle} darkMode={darkMode} isLoged={isLoged} onAuthAction={onAuthAction} />
        <main className="app-content">
          <AppRoutes />
        </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <AppContent />
      </AppProviders>
    </BrowserRouter>
  )
}

export default App
