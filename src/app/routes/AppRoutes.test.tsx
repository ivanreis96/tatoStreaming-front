/// <reference types="jest" />

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { AppRoutes } from './AppRoutes'
import { authReducer } from '@/features/auth'
import { themeReducer } from '@/shared/theme'

jest.mock('@/pages/home', () => ({
  HomePage: () => <div data-testid="home-page">home</div>,
}))

jest.mock('@/pages/login', () => ({
  LoginPage: () => <div data-testid="login-page">login</div>,
}))

jest.mock('@/pages/cadastro', () => ({
  CadastroPage: () => <div data-testid="cadastro-page">cadastro</div>,
}))

jest.mock('@/pages/movie', () => ({
  MoviePage: () => <div data-testid="movie-page">movie</div>,
}))

jest.mock('@/pages/forgotPassword', () => ({
  ForgotPasswordPage: () => <div data-testid="forgot-password-page">forgot-password</div>,
}))

jest.mock('@/pages/resetPassword', () => ({
  ResetPasswordPage: () => <div data-testid="reset-password-page">reset-password</div>,
}))

type AuthPreload = {
  currentUser: { id: string; displayName: string; email: string; avatarUrl?: string } | null
  accessToken: string | null
  refreshToken: string | null
  status: 'idle' | 'authenticated' | 'unauthenticated'
}

function renderRoutes(initialPath: string, auth: AuthPreload) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      theme: themeReducer,
    },
    preloadedState: {
      auth,
      theme: { mode: 'light' as const },
    },
  })

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialPath]}>
        <AppRoutes />
      </MemoryRouter>
    </Provider>,
  )
}

describe('AppRoutes', () => {
  it('redireciona usuario nao autenticado da rota privada para /login', () => {
    renderRoutes('/', {
      currentUser: null,
      accessToken: null,
      refreshToken: null,
      status: 'unauthenticated',
    })

    expect(screen.getByTestId('login-page')).toBeTruthy()
  })

  it('permite acesso a rota privada para usuario autenticado', () => {
    renderRoutes('/', {
      currentUser: {
        id: 'user-1',
        displayName: 'Teste',
        email: 'teste@tato.com',
      },
      accessToken: 'token',
      refreshToken: 'refresh-token',
      status: 'authenticated',
    })

    expect(screen.getByTestId('home-page')).toBeTruthy()
  })

  it('redireciona usuario autenticado em /login para /', () => {
    renderRoutes('/login', {
      currentUser: {
        id: 'user-1',
        displayName: 'Teste',
        email: 'teste@tato.com',
      },
      accessToken: 'token',
      refreshToken: 'refresh-token',
      status: 'authenticated',
    })

    expect(screen.getByTestId('home-page')).toBeTruthy()
  })
})
