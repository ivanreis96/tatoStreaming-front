import { Button } from '@/components/ui/button'
import { SearchMovieInput } from '@/features/search'
import style from '../toolbar.module.css'
import { ModalBase } from '@/shared'
import { FilterFooter } from '@/features/movieFilters'
import { MovieFiltersContent } from '@/features/movieFilters'

type ToolsBarProps = {
    searchValue: string
    onSearchChange: (value: string) => void
}

const filterButton = () => {
    return (
        <Button variant="secondary" size="sm">
            Filtrar
        </Button>
    )
}

export function ToolsBar({ searchValue, onSearchChange }: ToolsBarProps) {
    return (
        <div className={style['tools-bar']}>
            <SearchMovieInput value={searchValue} onChange={onSearchChange} />

            <ModalBase
                trigger={filterButton()} 
                title={'Filtrar filme'} 
                children={<MovieFiltersContent />} 
                footerContent={<FilterFooter />}
            />

            <Button variant="default" size="sm">
                Adicionar filme
            </Button>
        </div>
    )
}