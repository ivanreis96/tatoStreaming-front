import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { FieldSet, FieldGroup, Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useAppDispatch } from '@/app/providers/hooks'
import { setSession, type LoginDto } from '@/features/auth'
import { authApi } from '@/shared/api'
import { getFirstZodError } from '@/shared/lib/zod'
import { loginSchema } from '../../../../../../shared/src/auth'

export function FormLogin() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [form, setForm] = useState<LoginDto>({ email: '', password: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const onFieldChange = (field: keyof LoginDto, value: string) => {
        setErrorMessage(null)
        setForm((current) => ({ ...current, [field]: value }))
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setErrorMessage(null)

        const validationResult = loginSchema.safeParse(form)

        if (!validationResult.success) {
            setErrorMessage(getFirstZodError(validationResult.error, 'Revise os dados informados para entrar.'))
            return
        }

        setIsSubmitting(true)

        try {
            const session = await authApi.login(form)
            dispatch(setSession(session))
            navigate('/', { replace: true })
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Não foi possível realizar o login.'
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
                </FieldGroup>

                {errorMessage ? <FieldError>{errorMessage}</FieldError> : null}

                <div className="flex w-full items-center justify-between gap-4">
                    <Button type="button" variant="link">Esqueci minha senha</Button>
                    <Button type="submit" variant="default" size="default" disabled={isSubmitting}>
                        {isSubmitting ? 'Entrando...' : 'Entrar'}
                    </Button>
                </div>
            </FieldSet>
        </form>
    )
}
