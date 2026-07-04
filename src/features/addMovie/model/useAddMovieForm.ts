import type { Media, MediaKind } from '@/entities/media'
import { format, parseISO } from 'date-fns'
import { useMemo, useState } from 'react'
import { INITIAL_ADD_MOVIE_FORM, type AddMovieFormData, type CreateMovieContext } from './types'

function generateMovieId() {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
        return crypto.randomUUID()
    }

    return `movie-${Date.now()}`
}

function parseReleaseDate(lancamento: string): Date | undefined {
    if (!lancamento) {
        return undefined
    }

    const parsed = parseISO(lancamento)

    if (Number.isNaN(parsed.getTime())) {
        return undefined
    }

    return parsed
}

function toNumber(value: string) {
    const numericValue = Number(value)

    if (Number.isNaN(numericValue)) {
        return 0
    }

    return numericValue
}

export function mapAddMovieFormToMedia(form: AddMovieFormData, context: CreateMovieContext): Media {
    const orcamento = toNumber(form.orcamento)
    const receita = toNumber(form.receita)

    return {
        ...form,
        id: context.id ?? generateMovieId(),
        createdBy: context.createdBy,
        rating: toNumber(form.rating),
        lucro: String(receita - orcamento),
    }
}

export type UseAddMovieFormReturn = {
    form: AddMovieFormData
    releaseDate: Date | undefined
    lucro: string
    onFieldChange: (field: keyof AddMovieFormData, value: string) => void
    onKindChange: (kind: MediaKind) => void
    onGenreChange: (genre: string, checked: boolean | 'indeterminate') => void
    onReleaseDateChange: (date: Date | undefined) => void
    resetForm: () => void
    createMediaFromForm: (context: CreateMovieContext) => Media
}

export function useAddMovieForm(initialData: AddMovieFormData = INITIAL_ADD_MOVIE_FORM): UseAddMovieFormReturn {
    const [form, setForm] = useState<AddMovieFormData>(initialData)
    const [releaseDate, setReleaseDate] = useState<Date | undefined>(parseReleaseDate(initialData.lancamento))

    const lucro = useMemo(() => {
        const receita = Number(form.receita)
        const orcamento = Number(form.orcamento)

        if (Number.isNaN(receita) || Number.isNaN(orcamento)) {
            return ''
        }

        return String(receita - orcamento)
    }, [form.orcamento, form.receita])

    const onFieldChange = (field: keyof AddMovieFormData, value: string) => {
        setForm((current) => ({ ...current, [field]: value }))
    }

    const onKindChange = (kind: MediaKind) => {
        setForm((current) => ({ ...current, kind }))
    }

    const onGenreChange = (genre: string, checked: boolean | 'indeterminate') => {
        setForm((current) => {
            const nextGenres = checked === true
                ? [...current.generos, genre]
                : current.generos.filter((item: string) => item !== genre)

            return { ...current, generos: nextGenres }
        })
    }

    const onReleaseDateChange = (date: Date | undefined) => {
        setReleaseDate(date)
        onFieldChange('lancamento', date ? format(date, 'yyyy-MM-dd') : '')
    }

    const resetForm = () => {
        setForm(INITIAL_ADD_MOVIE_FORM)
        setReleaseDate(undefined)
    }

    const createMediaFromForm = (context: CreateMovieContext) => {
        return mapAddMovieFormToMedia(form, context)
    }

    return {
        form,
        releaseDate,
        lucro,
        onFieldChange,
        onKindChange,
        onGenreChange,
        onReleaseDateChange,
        resetForm,
        createMediaFromForm,
    }
}
