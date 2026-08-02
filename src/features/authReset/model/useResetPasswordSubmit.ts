import { useState } from 'react'
import { registerSchema } from '../../../../../../shared/src/auth'
import { getFirstZodError } from '@/shared/lib/zod'
import type {
    AuthResetStatus,
    ResetPasswordFormData,
    ResetPasswordSubmitAction,
} from './types'

const DEFAULT_SUCCESS_MESSAGE = 'Senha redefinida com sucesso. Faça login com a nova senha.'
const PENDING_INTEGRATION_MESSAGE = 'O fluxo visual está pronto, mas a redefinição ainda não foi conectada ao backend.'

export function useResetPasswordSubmit(token: string | null, submitAction?: ResetPasswordSubmitAction) {
    const [form, setForm] = useState<ResetPasswordFormData>({
        password: '',
        confirmPassword: '',
    })
    const [status, setStatus] = useState<AuthResetStatus | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onFieldChange = (field: keyof ResetPasswordFormData, value: string) => {
        setStatus(null)
        setForm((current) => ({ ...current, [field]: value }))
    }

    const submit = async () => {
        setStatus(null)

        if (!token || token.trim().length === 0) {
            setStatus({
                type: 'error',
                message: 'Link de redefinição inválido ou expirado.',
            })
            return false
        }

        const passwordValidation = registerSchema.shape.password.safeParse(form.password)

        if (!passwordValidation.success) {
            setStatus({
                type: 'error',
                message: getFirstZodError(passwordValidation.error, 'Informe uma nova senha válida.'),
            })
            return false
        }

        if (form.password !== form.confirmPassword) {
            setStatus({
                type: 'error',
                message: 'As senhas não conferem.',
            })
            return false
        }

        setIsSubmitting(true)

        try {
            if (!submitAction) {
                setStatus({ type: 'error', message: PENDING_INTEGRATION_MESSAGE })
                return false
            }

            const result = await submitAction({ token, password: form.password })
            setStatus({
                type: 'success',
                message: result?.message ?? DEFAULT_SUCCESS_MESSAGE,
            })
            return true
        } catch (error) {
            setStatus({
                type: 'error',
                message: error instanceof Error ? error.message : 'Não foi possível redefinir a senha.',
            })
            return false
        } finally {
            setIsSubmitting(false)
        }
    }

    return {
        form,
        status,
        isSubmitting,
        onFieldChange,
        submit,
    }
}