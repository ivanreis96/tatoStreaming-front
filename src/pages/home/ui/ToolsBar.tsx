import { Button } from '@/components/ui/button'
import { SearchMovieInput } from '@/features/search'
import style from '../toolbar.module.css'
import { ModalBase } from '@/shared'
import { FilterFooter } from '@/features/movieFilters'
import { MovieFiltersContent } from '@/features/movieFilters'
import type { MovieFilters } from '@/features/movieFilters'
import { useState } from 'react'

type ToolsBarProps = {
    searchValue: string
    onSearchChange: (value: string) => void
    otherFilters: MovieFilters
    onOtherFiltersChange: (nextFilters: Partial<MovieFilters>) => void
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
}: ToolsBarProps) {
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
    const [draftFilters, setDraftFilters] = useState<MovieFilters>(() => cloneMovieFilters(otherFilters))

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

    return (
        <div className={style['tools-bar']}>
            <SearchMovieInput value={searchValue} onChange={onSearchChange} />

            <ModalBase
                open={isFilterModalOpen}
                onOpenChange={handleModalOpenChange}
                trigger={filterButton()} 
                title={'Filtrar filme'} 
                children={<MovieFiltersContent otherFilters={draftFilters} onOtherFiltersChange={handleDraftFiltersChange} />} 
                footerContent={<FilterFooter onClearFilters={handleClearFilters} onApplyFilters={handleApplyFilters} />}
            />

            <Button variant="default" size="sm">
                Adicionar filme
            </Button>
        </div>
    )
}