import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { FieldSet, FieldGroup, Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useAppDispatch } from '@/app/providers/hooks'
import { setSession, type RegisterDto } from '@/features/auth'
import { authApi } from '@/shared/api'

type RegisterFormState = RegisterDto & {
    confirmPassword: string
}

export function FormCadastro() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [form, setForm] = useState<RegisterFormState>({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const onFieldChange = (field: keyof RegisterFormState, value: string) => {
        setForm((current) => ({ ...current, [field]: value }))
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setErrorMessage(null)

        if (form.password !== form.confirmPassword) {
            setErrorMessage('As senhas não conferem.')
            return
        }

        setIsSubmitting(true)

        try {
            const session = await authApi.register({
                displayName: form.displayName,
                email: form.email,
                password: form.password,
            })

            dispatch(setSession(session))
            navigate('/', { replace: true })
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Não foi possível finalizar o cadastro.'
            setErrorMessage(message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form className="w-full" onSubmit={onSubmit}>
            <FieldSet className="w-full">
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="displayName">Nome</FieldLabel>
                        <Input
                            id="displayName"
                            type="text"
                            placeholder="Digite seu nome"
                            value={form.displayName}
                            onChange={(event) => onFieldChange('displayName', event.target.value)}
                            required
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="email">E-mail</FieldLabel>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Digite seu e-mail"
                            value={form.email}
                            onChange={(event) => onFieldChange('email', event.target.value)}
                            required
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="password">Senha</FieldLabel>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Digite sua senha"
                            value={form.password}
                            onChange={(event) => onFieldChange('password', event.target.value)}
                            required
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="confirmPassword">Confirmação de senha</FieldLabel>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Digite sua senha novamente"
                            value={form.confirmPassword}
                            onChange={(event) => onFieldChange('confirmPassword', event.target.value)}
                            required
                        />
                    </Field>
                </FieldGroup>

                {errorMessage ? <FieldError>{errorMessage}</FieldError> : null}

                <div className="flex w-full items-center justify-end">
                    <Button type="submit" variant="default" size="default" disabled={isSubmitting}>
                        {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
                    </Button>
                </div>
            </FieldSet>
        </form>
    )
}
