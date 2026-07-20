import type { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAppSelector } from '../providers/hooks'
import { HomePage } from '@/pages/home'
import { LoginPage } from '@/pages/login'
import { CadastroPage } from '@/pages/cadastro'
import { MoviePage } from '@/pages/movie'

type GuardProps = {
  children: ReactNode
}

function PrivateRoute({ children }: GuardProps) {
  const authState = useAppSelector((state) => state.auth)

  if (authState.status === 'idle') {
    return null
  }

  if (authState.status !== 'authenticated' || !authState.currentUser) {
    return <Navigate to="/login" replace />
  }

  return children
}

function PublicOnlyRoute({ children }: GuardProps) {
  const authState = useAppSelector((state) => state.auth)

  if (authState.status === 'idle') {
    return null
  }

  if (authState.status === 'authenticated' && authState.currentUser) {
    return <Navigate to="/" replace />
  }

  return children
}

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={(
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        )}
      />
      <Route
        path="/login"
        element={(
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        )}
      />
      <Route
        path="/cadastro"
        element={(
          <PublicOnlyRoute>
            <CadastroPage />
          </PublicOnlyRoute>
        )}
      />
      <Route
        path="/movie/:id"
        element={(
          <PrivateRoute>
            <MoviePage />
          </PrivateRoute>
        )}
      />
    </Routes>
  )
}
