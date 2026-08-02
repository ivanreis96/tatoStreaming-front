import { ForgotPasswordForm } from '@/features/authReset'
import { AuthPageLayout } from '@/shared/ui/AuthPageLayout'

export function ForgotPasswordPage() {
    return (
        <AuthPageLayout
            title="Recuperar senha"
            description="Informe seu e-mail para receber as instruções de recuperação."
        >
            <ForgotPasswordForm />
        </AuthPageLayout>
    )
}