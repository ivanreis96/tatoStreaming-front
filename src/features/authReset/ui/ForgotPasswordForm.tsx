import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useForgotPasswordSubmit } from '../model/useForgotPasswordSubmit'
import type { ForgotPasswordSubmitAction } from '../model/types'
import { AuthResetStatusMessage } from './AuthResetStatusMessage'

type ForgotPasswordFormProps = {
    submitAction?: ForgotPasswordSubmitAction
}

export function ForgotPasswordForm({ submitAction }: ForgotPasswordFormProps) {
    const navigate = useNavigate()
    const { form, status, isSubmitting, onFieldChange, submit } = useForgotPasswordSubmit(submitAction)

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        await submit()
    }

    return (
        <form className="w-full" onSubmit={onSubmit}>
            <FieldSet className="w-full gap-5">
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="forgot-password-email">E-mail</FieldLabel>
                        <Input
                            id="forgot-password-email"
                            type="email"
                            placeholder="Digite seu e-mail"
                            value={form.email}
                            onChange={(event) => onFieldChange('email', event.target.value)}
                            required
                        />
                    </Field>
                </FieldGroup>

                <AuthResetStatusMessage status={status} />

                <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <Button type="button" variant="link" onClick={() => navigate('/login')}>
                        Voltar ao login
                    </Button>
                    <Button type="submit" variant="default" size="default" disabled={isSubmitting}>
                        {isSubmitting ? 'Enviando...' : 'Enviar instruções'}
                    </Button>
                </div>
            </FieldSet>
        </form>
    )
}