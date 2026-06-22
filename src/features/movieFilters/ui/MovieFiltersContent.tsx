import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { DatePicker, FormCard } from "@/shared";
import type { ReactNode } from "react";
import type { MovieFilters } from "../model/types";

type MovieFiltersContentProps = {
    otherFilters: MovieFilters
    onOtherFiltersChange: (nextFilters: Partial<MovieFilters>) => void
}

export function MovieFiltersContent({ otherFilters, onOtherFiltersChange }: MovieFiltersContentProps) {

    const formContent: ReactNode =
        <FieldSet className="w-full">
            <div className="text-base font-muted">Data de lançamento</div>
            <FieldGroup className="flex-row flex-1 gap-2">
                <Field className="flex-2">
                    <FieldLabel htmlFor="data_de">De</FieldLabel>
                    <DatePicker
                        date={otherFilters.lancamentoInicio}
                        setDate={(date) => onOtherFiltersChange({ lancamentoInicio: date })}
                        placeholder="Selecione a data inicial"
                    />
                </Field>
                <Field className="flex-2">
                    <FieldLabel htmlFor="data_ate">Até</FieldLabel>
                    <DatePicker
                        date={otherFilters.lancamentoFim}
                        setDate={(date) => onOtherFiltersChange({ lancamentoFim: date })}
                        placeholder="Selecione a data final"
                    />
                </Field>
            </FieldGroup>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="duracao">Duração</FieldLabel>
                    <Input
                        id="duracao"
                        type="text"
                        placeholder="Ex.: 120"
                        value={otherFilters.duracao}
                        onChange={(event) => onOtherFiltersChange({ duracao: event.target.value })}
                    />
                </Field>
            </FieldGroup>
        </FieldSet>

    return (
        <FormCard
            children={formContent}
        />
    )
}