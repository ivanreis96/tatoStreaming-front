import { Button } from '@/components/ui/button'
import { SearchMovieInput } from '@/features/search'
import style from '../toolbar.module.css'
import { ModalBase, SheetBase } from '@/shared'
import { FilterFooter } from '@/features/movieFilters'
import { MovieFiltersContent } from '@/features/movieFilters'
import type { MovieFilters } from '@/features/movieFilters'
import { AddMovieContent, AddMovieFooter, useAddMovieForm } from '@/features/addMovie'
import { useState } from 'react'
import { useAppSelector } from '@/app/providers/hooks'
import type { Media } from '@/entities/media'

type ToolsBarProps = {
    searchValue: string
    onSearchChange: (value: string) => void
    otherFilters: MovieFilters
    onOtherFiltersChange: (nextFilters: Partial<MovieFilters>) => void
    onCreateMovie: (movie: Media) => Promise<boolean>
    isCreatingMovie: boolean
    createMovieError: string | null
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

export function ToolsBar({
    searchValue,
    onSearchChange,
    otherFilters,
    onOtherFiltersChange,
    onCreateMovie,
    isCreatingMovie,
    createMovieError,
}: ToolsBarProps) {
    const currentUser = useAppSelector((state) => state.auth.currentUser)
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
    const [isAddMovieSheetOpen, setIsAddMovieSheetOpen] = useState(false)
    const [draftFilters, setDraftFilters] = useState<MovieFilters>(() => cloneMovieFilters(otherFilters))
    const {
        form,
        releaseDate,
        lucro,
        onFieldChange,
        onKindChange,
        onGenreChange,
        onReleaseDateChange,
        resetForm,
        createMediaFromForm,
    } = useAddMovieForm()

    const handleModalOpenChange = (open: boolean) => {
        setIsFilterModalOpen(open)

        if (open) {
            setDraftFilters(cloneMovieFilters(otherFilters))
        }
    }

    const handleDraftFiltersChange = (nextFilters: Partial<MovieFilters>) => {
        setDraftFilters((current) => ({ ...current, ...nextFilters }))
    }

    const handleApplyFilters = () => {
        onOtherFiltersChange(draftFilters)
        setIsFilterModalOpen(false)
    }

    const handleClearFilters = () => {
        const clearedFilters = cloneMovieFilters(EMPTY_MOVIE_FILTERS)
        onOtherFiltersChange(clearedFilters)
        setDraftFilters(clearedFilters)
    }

    const handleAddMovieSheetOpenChange = (open: boolean) => {
        setIsAddMovieSheetOpen(open)

        if (!open) {
            resetForm()
        }
    }

    const handleCloseAddMovieFields = () => {
        resetForm()
        setIsAddMovieSheetOpen(false)
    }

    const handleCreateMovie = async () => {
        if (!currentUser) {
            return
        }

        const nextMovie = createMediaFromForm({ createdBy: currentUser.id })
        const hasCreated = await onCreateMovie(nextMovie)

        if (!hasCreated) {
            return
        }

        setIsAddMovieSheetOpen(false)
        resetForm()
    }

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
                        onGenreChange={onGenreChange}
                        onReleaseDateChange={onReleaseDateChange}
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
}