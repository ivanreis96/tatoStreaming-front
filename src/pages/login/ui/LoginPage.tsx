import { AuthPageLayout } from '@/shared'
import { FormLogin } from './FormLogin'

export function LoginPage() {
    return (
        <AuthPageLayout
            title="Entrar"
            description="Use seu e-mail e senha para acessar a plataforma."
        >
            <FormLogin />
        </AuthPageLayout>
    )
}