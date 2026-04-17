import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../../pages/home'
import { LoginPage } from '../../pages/login'
import { CadastroPage } from '../../pages/cadastro'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<CadastroPage />} />
    </Routes>
  )
}
