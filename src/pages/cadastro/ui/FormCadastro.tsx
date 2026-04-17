import { Button } from "../../../components/ui/button";
import { FieldSet, FieldGroup, Field, FieldLabel } from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";

export function FormCadastro() {
    return (
        <FieldSet className="w-full">
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="username">Nome</FieldLabel>
                    <Input id="username" type="text" placeholder="Digite seu nome" />                   
                </Field>
                <Field>
                    <FieldLabel htmlFor="username">E-mail</FieldLabel>
                    <Input id="username" type="text" placeholder="Digite seu e-mail" />                   
                </Field>
                <Field>
                    <FieldLabel htmlFor="password">Senha</FieldLabel>                   
                    <Input id="password" type="password" placeholder="Digite sua senha" />
                </Field>
                <Field>
                    <FieldLabel htmlFor="password">Confirmação de senha</FieldLabel>                   
                    <Input id="password" type="password" placeholder="Digite sua senha novamente" />
                </Field>
            </FieldGroup>
            <div className="flex w-full items-center justify-end">
                <Button variant="default" size="default">Cadastrar</Button>
            </div>
        </FieldSet>
    )
}
