import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { AddMovieFormData } from '../model/types'
import type { UseAddMovieFormReturn } from '../model/useAddMovieForm'
import { mockGenres } from '@/mock/mockMovies'
import { DatePicker } from '@/shared'

type AddMovieContentProps = Pick<UseAddMovieFormReturn,
    'form' |
    'releaseDate' |
    'lucro' |
    'onFieldChange' |
    'onKindChange' |
    'onGenreChange' |
    'onReleaseDateChange'
>

export function AddMovieContent({
    form,
    releaseDate,
    lucro,
    onFieldChange,
    onKindChange,
    onGenreChange,
    onReleaseDateChange,
}: AddMovieContentProps) {
    const handleFieldChange = (field: keyof AddMovieFormData, value: string) => {
        onFieldChange(field, value)
    }

    return (
        <FieldSet className="w-full p-4">
            <div className="text-base text-muted">Informações básicas</div>
            <FieldGroup className="flex-row flex-1 gap-2">
                <Field className="flex-1">
                    <FieldLabel className="text-muted" htmlFor="titulo">Título</FieldLabel>
                    <Input
                        id="titulo"
                        type="text"
                        placeholder="Ex.: Interstellar"
                        value={form.titulo}
                        onChange={(event) => handleFieldChange('titulo', event.target.value)}
                    />
                </Field>

                <Field className="flex-1">
                    <FieldLabel className="text-muted" htmlFor="tituloOriginal">Título original</FieldLabel>
                    <Input
                        id="tituloOriginal"
                        type="text"
                        placeholder="Ex.: Interstellar"
                        value={form.tituloOriginal}
                        onChange={(event) => handleFieldChange('tituloOriginal', event.target.value)}
                    />
                </Field>
            </FieldGroup>

            <FieldGroup>
                <Field>
                    <FieldLabel className="text-muted" htmlFor="subtitulo">Subtitulo</FieldLabel>
                    <Input
                        id="subtitulo"
                        type="text"
                        placeholder="Ex.: A journey through space and time"
                        value={form.subtitulo}
                        onChange={(event) => handleFieldChange('subtitulo', event.target.value)}
                    />
                </Field>
                <Field>
                    <FieldLabel className="text-muted" htmlFor="sinopse">Sinopse</FieldLabel>
                    <Textarea
                        id="sinopse"
                        placeholder="Descreva a sinopse do filme ou série"
                        value={form.sinopse}
                        onChange={(event) => handleFieldChange('sinopse', event.target.value)}
                    />
                </Field>
            </FieldGroup>

            <div className="text-base text-muted">Tipo e lançamento</div>
            <FieldGroup className="flex-row flex-1 gap-2 flex-wrap w-full">
                <FieldGroup className="w-auto flex-1 flex-wrap flex-column gap-4">
                    <Field orientation="horizontal" className="w-full">
                        <Checkbox
                            id="kind-movie"
                            checked={form.kind === 'movie'}
                            onCheckedChange={(checked) => {
                                if (checked === true) {
                                    onKindChange('movie')
                                }
                            }}
                        />
                        <Label className="text-muted" htmlFor="kind-movie">Filme</Label>
                    </Field>

                    <Field orientation="horizontal" className="w-full">
                        <Checkbox
                            id="kind-series"
                            checked={form.kind === 'series'}
                            onCheckedChange={(checked) => {
                                if (checked === true) {
                                    onKindChange('series')
                                }
                            }}
                        />
                        <Label className="text-muted" htmlFor="kind-series">Série</Label>
                    </Field>
                </FieldGroup>

                <Field className="flex-2 min-w-[220px]">
                    <FieldLabel className="text-muted" htmlFor="lancamento">Data de lançamento</FieldLabel>
                    <DatePicker
                        date={releaseDate}
                        setDate={onReleaseDateChange}
                        placeholder="Selecione a data"
                    />
                </Field>
            </FieldGroup>

            <FieldGroup className="flex-row flex-1 gap-2">
                <Field className="flex-1">
                    <FieldLabel className="text-muted" htmlFor="duracao">Duração</FieldLabel>
                    <Input
                        id="duracao"
                        type="text"
                        placeholder="Ex.: 169 min"
                        value={form.duracao}
                        onChange={(event) => handleFieldChange('duracao', event.target.value)}
                    />
                </Field>

                <Field className="flex-1">
                    <FieldLabel className="text-muted" htmlFor="situacao">Situação</FieldLabel>
                    <Input
                        id="situacao"
                        type="text"
                        placeholder="Ex.: Lancado"
                        value={form.situacao}
                        onChange={(event) => handleFieldChange('situacao', event.target.value)}
                    />
                </Field>

                <Field className="flex-1">
                    <FieldLabel className="text-muted" htmlFor="idioma">Idioma</FieldLabel>
                    <Input
                        id="idioma"
                        type="text"
                        placeholder="Ex.: en-US"
                        value={form.idioma}
                        onChange={(event) => handleFieldChange('idioma', event.target.value)}
                    />
                </Field>
            </FieldGroup>

            <div className="text-base text-muted">Gêneros</div>
            <FieldGroup className="flex-row flex-1 gap-4 flex-wrap w-full">
                {mockGenres.map((genre, index) => (
                    <Field orientation="horizontal" key={genre} className="w-auto">
                        <Checkbox
                            checked={form.generos.includes(genre)}
                            onCheckedChange={(checked) => onGenreChange(genre, checked)}
                            id={`add-movie-genre-${index}`}
                            name={`add-movie-genre-${index}`}
                        />
                        <Label className="text-muted" htmlFor={`add-movie-genre-${index}`}>{genre}</Label>
                    </Field>
                ))}
            </FieldGroup>

            <div className="text-base text-muted">Métricas</div>
            <FieldGroup className="flex-row flex-1 gap-2">
                <Field className="flex-1">
                    <FieldLabel className="text-muted" htmlFor="popularidade">Popularidade</FieldLabel>
                    <Input
                        id="popularidade"
                        type="text"
                        placeholder="Ex.: 92.5"
                        value={form.popularidade}
                        onChange={(event) => handleFieldChange('popularidade', event.target.value)}
                    />
                </Field>
                <Field className="flex-1">
                    <FieldLabel className="text-muted" htmlFor="votos">Votos</FieldLabel>
                    <Input
                        id="votos"
                        type="text"
                        placeholder="Ex.: 18850"
                        value={form.votos}
                        onChange={(event) => handleFieldChange('votos', event.target.value)}
                    />
                </Field>
                <Field className="flex-1">
                    <FieldLabel className="text-muted" htmlFor="rating">Rating</FieldLabel>
                    <Input
                        id="rating"
                        type="text"
                        placeholder="Ex.: 8.7"
                        value={form.rating}
                        onChange={(event) => handleFieldChange('rating', event.target.value)}
                    />
                </Field>
            </FieldGroup>

            <div className="text-base text-muted">Financeiro</div>
            <FieldGroup className="flex-row flex-1 gap-2">
                <Field className="flex-1">
                    <FieldLabel className="text-muted" htmlFor="orcamento">Orçamento</FieldLabel>
                    <Input
                        id="orcamento"
                        type="text"
                        placeholder="Ex.: 165000000"
                        value={form.orcamento}
                        onChange={(event) => handleFieldChange('orcamento', event.target.value)}
                    />
                </Field>
                <Field className="flex-1">
                    <FieldLabel className="text-muted" htmlFor="receita">Receita</FieldLabel>
                    <Input
                        id="receita"
                        type="text"
                        placeholder="Ex.: 701729206"
                        value={form.receita}
                        onChange={(event) => handleFieldChange('receita', event.target.value)}
                    />
                </Field>
                <Field className="flex-1">
                    <FieldLabel className="text-muted" htmlFor="lucro">Lucro (calculado)</FieldLabel>
                    <Input
                        id="lucro"
                        type="text"
                        value={lucro}
                        readOnly
                    />
                </Field>
            </FieldGroup>

            <div className="text-base text-muted">Mídia e links</div>
            <FieldGroup>
                <Field>
                    <FieldLabel className="text-muted" htmlFor="posterUrl">Poster URL</FieldLabel>
                    <Input
                        id="posterUrl"
                        type="text"
                        placeholder="https://..."
                        value={form.posterUrl}
                        onChange={(event) => handleFieldChange('posterUrl', event.target.value)}
                    />
                </Field>
                <Field>
                    <FieldLabel className="text-muted" htmlFor="backgroundUrl">Background URL</FieldLabel>
                    <Input
                        id="backgroundUrl"
                        type="text"
                        placeholder="https://..."
                        value={form.backgroundUrl}
                        onChange={(event) => handleFieldChange('backgroundUrl', event.target.value)}
                    />
                </Field>
                <Field>
                    <FieldLabel className="text-muted" htmlFor="teaserUrl">Teaser URL</FieldLabel>
                    <Input
                        id="teaserUrl"
                        type="text"
                        placeholder="https://..."
                        value={form.teaserUrl}
                        onChange={(event) => handleFieldChange('teaserUrl', event.target.value)}
                    />
                </Field>
            </FieldGroup>
        </FieldSet>
    )
}