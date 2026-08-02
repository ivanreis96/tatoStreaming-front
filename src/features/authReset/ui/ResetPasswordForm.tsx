import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useResetPasswordSubmit } from '../model/useResetPasswordSubmit'
import type { ResetPasswordSubmitAction } from '../model/types'
import { AuthResetStatusMessage } from './AuthResetStatusMessage'

type ResetPasswordFormProps = {
    token: string | null
    submitAction?: ResetPasswordSubmitAction
}

export function ResetPasswordForm({ token, submitAction }: ResetPasswordFormProps) {
    const navigate = useNavigate()
    const { form, status, isSubmitting, onFieldChange, submit } = useResetPasswordSubmit(token, submitAction)

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        await submit()
    }

    return (
        <form className="w-full" onSubmit={onSubmit}>
            <FieldSet className="w-full gap-5">
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="reset-password">Nova senha</FieldLabel>
                        <Input
                            id="reset-password"
                            type="password"
                            placeholder="Digite sua nova senha"
                            value={form.password}
                            onChange={(event) => onFieldChange('password', event.target.value)}
                            required
                        />
                        <FieldDescription>
                            Use pelo menos 8 caracteres, com 1 número e 1 caractere especial.
                        </FieldDescription>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="reset-confirm-password">Confirmar nova senha</FieldLabel>
                        <Input
                            id="reset-confirm-password"
                            type="password"
                            placeholder="Digite novamente sua nova senha"
                            value={form.confirmPassword}
                            onChange={(event) => onFieldChange('confirmPassword', event.target.value)}
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
                        {isSubmitting ? 'Salvando...' : 'Redefinir senha'}
                    </Button>
                </div>
            </FieldSet>
        </form>
    )
}