import { useSearchParams } from 'react-router-dom'
import { ResetPasswordForm } from '@/features/authReset'
import { AuthPageLayout } from '@/shared/ui/AuthPageLayout'

export function ResetPasswordPage() {
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')

    return (
        <AuthPageLayout
            title="Redefinir senha"
            description="Defina uma nova senha para concluir a recuperação da conta."
        >
            <ResetPasswordForm token={token} />
        </AuthPageLayout>
    )
}