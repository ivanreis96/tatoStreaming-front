import { Button } from '@/components/ui/button'
import { SearchMovieInput } from '@/features/search'
import style from '../toolbar.module.css'
import { ModalBase, SheetBase } from '@/shared'
import { FilterFooter } from '@/features/movieFilters'
import { MovieFiltersContent } from '@/features/movieFilters'
import type { MovieFilters } from '@/features/movieFilters'
import { AddMovieContent, AddMovieFooter, useAddMovieForm } from '@/features/addMovie'
import { memo, useCallback, useState } from 'react'
import { useAppSelector } from '@/app/providers/hooks'
import type { Media } from '@/entities/media'
import { getFirstZodError } from '@/shared/lib/zod'
import { createMediaSchema } from '../../../../../../shared/src/media'

type ToolsBarProps = {
    searchValue: string
    onSearchChange: (value: string) => void
    otherFilters: MovieFilters
    onOtherFiltersChange: (nextFilters: Partial<MovieFilters>) => void
    onCreateMovie: (movie: Media) => Promise<boolean>
    isCreatingMovie: boolean
    createMovieError: string | null
    availableGenres: string[]
}

const filterButton = () => {
    return (
        <Button variant="secondary" size="sm">
            Filtrar
        </Button>
    )
}

const EMPTY_MOVIE_FILTERS: MovieFilters = {
    duracao: '',
    lancamentoInicio: undefined,
    lancamentoFim: undefined,
    generos: [],
}

function cloneMovieFilters(filters: MovieFilters): MovieFilters {
    return {
        duracao: filters.duracao,
        lancamentoInicio: filters.lancamentoInicio,
        lancamentoFim: filters.lancamentoFim,
        generos: [...filters.generos],
    }
}

export const ToolsBar = memo(function ToolsBar({
    searchValue,
    onSearchChange,
    otherFilters,
    onOtherFiltersChange,
    onCreateMovie,
    isCreatingMovie,
    createMovieError,
    availableGenres,
}: ToolsBarProps) {
    const currentUser = useAppSelector((state) => state.auth.currentUser)
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
    const [isAddMovieSheetOpen, setIsAddMovieSheetOpen] = useState(false)
    const [addMovieFormError, setAddMovieFormError] = useState<string | null>(null)
    const [draftFilters, setDraftFilters] = useState<MovieFilters>(() => cloneMovieFilters(otherFilters))
    const {
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
    } = useAddMovieForm()

    const handleModalOpenChange = useCallback((open: boolean) => {
        setIsFilterModalOpen(open)

        if (open) {
            setDraftFilters(cloneMovieFilters(otherFilters))
        }
    }, [otherFilters])

    const handleDraftFiltersChange = useCallback((nextFilters: Partial<MovieFilters>) => {
        setDraftFilters((current) => ({ ...current, ...nextFilters }))
    }, [])

    const handleApplyFilters = useCallback(() => {
        onOtherFiltersChange(draftFilters)
        setIsFilterModalOpen(false)
    }, [draftFilters, onOtherFiltersChange])

    const handleClearFilters = useCallback(() => {
        const clearedFilters = cloneMovieFilters(EMPTY_MOVIE_FILTERS)
        onOtherFiltersChange(clearedFilters)
        setDraftFilters(clearedFilters)
    }, [onOtherFiltersChange])

    const handleAddMovieSheetOpenChange = useCallback((open: boolean) => {
        setIsAddMovieSheetOpen(open)
        setAddMovieFormError(null)

        if (!open) {
            resetForm()
        }
    }, [resetForm])

    const handleCloseAddMovieFields = useCallback(() => {
        resetForm()
        setAddMovieFormError(null)
        setIsAddMovieSheetOpen(false)
    }, [resetForm])

    const handleCreateMovie = useCallback(async () => {
        if (!currentUser) {
            return
        }

        const nextMovie = createMediaFromForm({ createdBy: currentUser.id })
        const { id: _id, createdBy: _createdBy, ...payload } = nextMovie
        const validationResult = createMediaSchema.safeParse(payload)

        if (!validationResult.success) {
            setAddMovieFormError(getFirstZodError(validationResult.error, 'Revise os dados informados para adicionar o filme.'))
            return
        }

        setAddMovieFormError(null)
        const hasCreated = await onCreateMovie(nextMovie)

        if (!hasCreated) {
            return
        }

        setIsAddMovieSheetOpen(false)
        resetForm()
    }, [currentUser, createMediaFromForm, onCreateMovie, resetForm])

    return (
        <div className={style['tools-bar']}>
            <SearchMovieInput value={searchValue} onChange={onSearchChange} />

            <ModalBase
                open={isFilterModalOpen}
                onOpenChange={handleModalOpenChange}
                trigger={filterButton()}
                title={'Filtrar filme'}
                children={
                    <MovieFiltersContent
                        otherFilters={draftFilters}
                        onOtherFiltersChange={handleDraftFiltersChange}
                        availableGenres={availableGenres}
                    />}
                footerContent={
                    <FilterFooter
                        onClearFilters={handleClearFilters}
                        onApplyFilters={handleApplyFilters}
                    />
                }
            />

            <SheetBase
                open={isAddMovieSheetOpen}
                onOpenChange={handleAddMovieSheetOpenChange}
                buttonTrigger={<Button variant="default" size="sm">Adicionar filme</Button>}
                title={'Adicionar Filme'}
                side={'right'}
                children={
                    <AddMovieContent
                        form={form}
                        releaseDate={releaseDate}
                        lucro={lucro}
                        onFieldChange={onFieldChange}
                        onKindChange={onKindChange}
                        onSituacaoChange={onSituacaoChange}
                        onGenreChange={onGenreChange}
                        onReleaseDateChange={onReleaseDateChange}
                        availableGenres={availableGenres}
                        onAddGenresFromInput={onAddGenresFromInput}
                        genreValidationError={addMovieFormError}
                    />
                }
                footerContent={
                    <AddMovieFooter
                        onCloseFields={handleCloseAddMovieFields}
                        onCreateMovie={handleCreateMovie}
                        isSubmitting={isCreatingMovie}
                    />
                }
            />

            {createMovieError ? (
                <span className="text-xs text-destructive">{createMovieError}</span>
            ) : null}
        </div>
    )
})