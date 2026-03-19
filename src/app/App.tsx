import { AppProviders } from './providers/AppProviders'
import { HomePage } from '../pages/home'
import { Header } from '../widgets/header'

function App() {
  return (
    <AppProviders>
      <div className="app-shell">
        <Header />
        <main className="app-content">
          <HomePage />
        </main>
      </div>
    </AppProviders>
  )
}

export default App
