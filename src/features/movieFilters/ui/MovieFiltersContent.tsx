import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/shared";
import type { ReactNode } from "react";
import type { MovieFilters } from "../model/types";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { mockGenres } from '@/mock/mockMovies'

type MovieFiltersContentProps = {
    otherFilters: MovieFilters
    onOtherFiltersChange: (nextFilters: Partial<MovieFilters>) => void
}

export function MovieFiltersContent({ otherFilters, onOtherFiltersChange }: MovieFiltersContentProps) {

    const formContent: ReactNode =
        <FieldSet className="w-full">
            <div className="text-base text-muted">Data de lançamento</div>
            <FieldGroup className="flex-row flex-1 gap-2">
                <Field className="flex-2">
                    <FieldLabel className={"text-muted"} htmlFor="data_de">De</FieldLabel>
                    <DatePicker
                        date={otherFilters.lancamentoInicio}
                        setDate={(date) => onOtherFiltersChange({ lancamentoInicio: date })}
                        placeholder="Selecione a data inicial"
                    />
                </Field>
                <Field className="flex-2">
                    <FieldLabel className={"text-muted"} htmlFor="data_ate">Até</FieldLabel>
                    <DatePicker
                        date={otherFilters.lancamentoFim}
                        setDate={(date) => onOtherFiltersChange({ lancamentoFim: date })}
                        placeholder="Selecione a data final"
                    />
                </Field>
            </FieldGroup>
            <FieldGroup>
                <Field>
                    <FieldLabel className={"text-muted"} htmlFor="duracao">Duração</FieldLabel>
                    <Input
                        id="duracao"
                        type="text"
                        placeholder="Ex.: 120"
                        value={otherFilters.duracao}
                        onChange={(event) => onOtherFiltersChange({ duracao: event.target.value })}
                    />
                </Field>
            </FieldGroup>

            <div className="text-base text-muted">Gêneros</div>
            <FieldGroup className="flex-row flex-1 gap-4 flex-wrap w-full">
                {mockGenres.map((genre: string, index: number) => (
                    <Field orientation="horizontal" key={index} className="w-auto">
                        <Checkbox
                            checked={otherFilters.generos.includes(genre)}
                            onCheckedChange={(checked) => {
                                const nextGenres = checked
                                    ? [...otherFilters.generos, genre]
                                    : otherFilters.generos.filter((g) => g !== genre)
                                onOtherFiltersChange({ generos: nextGenres })
                            }}
                            id={`movie${index}-movie`} name={`movie${index}-movie`}
                        />
                        <Label className={"text-muted"} htmlFor={`movie${index}-movie`}>{genre}</Label>
                    </Field>
                ))}
            </FieldGroup>
        </FieldSet>

    return (
        formContent
    )
}