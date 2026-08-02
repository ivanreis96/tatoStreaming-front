import { ForgotPasswordForm } from '@/features/authReset'
import { authApi } from '@/shared/api'
import { AuthPageLayout } from '@/shared/ui/AuthPageLayout'

export function ForgotPasswordPage() {
    return (
        <AuthPageLayout
            title="Recuperar senha"
            description="Informe seu e-mail para receber as instruções de recuperação."
        >
            <ForgotPasswordForm
                submitAction={(payload) => authApi.forgotPassword(payload)}
            />
        </AuthPageLayout>
    )
}