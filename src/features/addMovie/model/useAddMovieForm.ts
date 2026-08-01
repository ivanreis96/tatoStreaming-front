import type { Media, MediaKind, MediaSituacao } from '@/entities/media'
import { format, parseISO } from 'date-fns'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { DEFAULT_MEDIA_ASSET_URLS, INITIAL_ADD_MOVIE_FORM, type AddMovieFormData, type CreateMovieContext } from './types'

function createInitialForm(initialData: AddMovieFormData): AddMovieFormData {
    return {
        ...INITIAL_ADD_MOVIE_FORM,
        ...initialData,
        posterUrl: initialData.posterUrl || DEFAULT_MEDIA_ASSET_URLS.posterUrl,
        backgroundUrl: initialData.backgroundUrl || DEFAULT_MEDIA_ASSET_URLS.backgroundUrl,
        teaserUrl: initialData.teaserUrl || DEFAULT_MEDIA_ASSET_URLS.teaserUrl,
        generos: [...initialData.generos],
    }
}

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
        posterUrl: form.posterUrl || DEFAULT_MEDIA_ASSET_URLS.posterUrl,
        backgroundUrl: form.backgroundUrl || DEFAULT_MEDIA_ASSET_URLS.backgroundUrl,
        teaserUrl: form.teaserUrl || DEFAULT_MEDIA_ASSET_URLS.teaserUrl,
    }
}

export type UseAddMovieFormReturn = {
    form: AddMovieFormData
    releaseDate: Date | undefined
    lucro: string
    onFieldChange: (field: keyof AddMovieFormData, value: string) => void
    onKindChange: (kind: MediaKind) => void
    onSituacaoChange: (situacao: MediaSituacao) => void
    onGenreChange: (genre: string, checked: boolean | 'indeterminate') => void
    onReleaseDateChange: (date: Date | undefined) => void
    resetForm: (nextInitialData?: AddMovieFormData) => void
    createMediaFromForm: (context: CreateMovieContext) => Media
    onAddGenresFromInput: (input: string) => void,
}

export function useAddMovieForm(initialData: AddMovieFormData = INITIAL_ADD_MOVIE_FORM): UseAddMovieFormReturn {
    const [form, setForm] = useState<AddMovieFormData>(() => createInitialForm(initialData))
    const [releaseDate, setReleaseDate] = useState<Date | undefined>(parseReleaseDate(initialData.lancamento))

    useEffect(() => {
        setForm(createInitialForm(initialData))
        setReleaseDate(parseReleaseDate(initialData.lancamento))
    }, [initialData])

    const lucro = useMemo(() => {
        const receita = Number(form.receita)
        const orcamento = Number(form.orcamento)

        if (Number.isNaN(receita) || Number.isNaN(orcamento)) {
            return ''
        }

        return String(receita - orcamento)
    }, [form.orcamento, form.receita])

    const onFieldChange = useCallback((field: keyof AddMovieFormData, value: string) => {
        setForm((current) => ({ ...current, [field]: value }))
    }, [])

    const onKindChange = useCallback((kind: MediaKind) => {
        setForm((current) => ({ ...current, kind }))
    }, [])

    const onSituacaoChange = useCallback((situacao: MediaSituacao) => {
        setForm((current) => ({ ...current, situacao }))
    }, [])

    const onGenreChange = useCallback((genre: string, checked: boolean | 'indeterminate') => {
        setForm((current) => {
            const nextGenres = checked === true
                ? [...current.generos, genre]
                : current.generos.filter((item: string) => item !== genre)

            return { ...current, generos: nextGenres }
        })
    }, [])

    const onReleaseDateChange = useCallback((date: Date | undefined) => {
        setReleaseDate(date)
        onFieldChange('lancamento', date ? format(date, 'yyyy-MM-dd') : '')
    }, [onFieldChange])

    const resetForm = useCallback((nextInitialData?: AddMovieFormData) => {
        const source = nextInitialData ?? initialData
        setForm(createInitialForm(source))
        setReleaseDate(parseReleaseDate(source.lancamento))
    }, [initialData])

    const createMediaFromForm = useCallback((context: CreateMovieContext) => {
        return mapAddMovieFormToMedia(form, context)
    }, [form])

    const onAddGenresFromInput = useCallback ((input: string) => {
        const parsedGenres = input
            .split(',')
            .map((genre) => genre.trim())
            .filter((genre) => genre.length > 0)

        if (parsedGenres.length === 0) {
            return
        }

        setForm((current) => {
            const nextGenres = Array.from(new Set([...current.generos, ...parsedGenres]))
            return { ...current, generos: nextGenres }
        })
    }, [])

    return {
        form,
        releaseDate,
        lucro,
        onFieldChange,
        onKindChange,
        onSituacaoChange,
        onGenreChange,
        onReleaseDateChange,
        resetForm,
        createMediaFromForm,
        onAddGenresFromInput,
    }
}
