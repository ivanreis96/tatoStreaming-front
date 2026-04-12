import { Button } from "../../../components/ui/button";
import { FieldSet, FieldGroup, Field, FieldLabel } from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";

export function FormLogin() {
    return (
        <FieldSet className="w-full">
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="username">Nome/E-mail</FieldLabel>
                    <Input id="username" type="text" placeholder="Digite seu nome/E-mail" />                   
                </Field>
                <Field>
                    <FieldLabel htmlFor="password">Senha</FieldLabel>                   
                    <Input id="password" type="password" placeholder="Digite sua senha" />
                </Field>
            </FieldGroup>
            <div className="flex w-full items-center justify-between gap-4">
                <Button variant="link">Esqueci minha senha</Button>
                <Button variant="default" size="default">Entrar</Button>
            </div>
        </FieldSet>
    )
}
