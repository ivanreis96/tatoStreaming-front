import { useState } from 'react'
import { loginSchema } from '../../../../../../shared/src/auth'
import { getFirstZodError } from '@/shared/lib/zod'
import type {
    AuthResetStatus,
    ForgotPasswordFormData,
    ForgotPasswordSubmitAction,
} from './types'

const DEFAULT_SUCCESS_MESSAGE = 'Se o e-mail existir, enviaremos as instruções de recuperação.'
const PENDING_INTEGRATION_MESSAGE = 'O fluxo visual está pronto, mas o envio ainda não foi conectado ao backend.'

export function useForgotPasswordSubmit(submitAction?: ForgotPasswordSubmitAction) {
    const [form, setForm] = useState<ForgotPasswordFormData>({ email: '' })
    const [status, setStatus] = useState<AuthResetStatus | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onFieldChange = (field: keyof ForgotPasswordFormData, value: string) => {
        setStatus(null)
        setForm((current) => ({ ...current, [field]: value }))
    }

    const submit = async () => {
        setStatus(null)

        const validationResult = loginSchema.shape.email.safeParse(form.email)

        if (!validationResult.success) {
            setStatus({
                type: 'error',
                message: getFirstZodError(validationResult.error, 'Informe um e-mail válido.'),
            })
            return false
        }

        setIsSubmitting(true)

        try {
            if (!submitAction) {
                setStatus({ type: 'error', message: PENDING_INTEGRATION_MESSAGE })
                return false
            }

            const result = await submitAction({ email: form.email })
            setStatus({
                type: 'success',
                message: result?.message ?? DEFAULT_SUCCESS_MESSAGE,
            })
            return true
        } catch (error) {
            setStatus({
                type: 'error',
                message: error instanceof Error ? error.message : 'Não foi possível solicitar a recuperação de senha.',
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