import { Button } from '@/components/ui/button'
import { SearchMovieInput } from '../../../features/search'
import style from '../toolbar.module.css'

type ToolsBarProps = {
    searchValue: string
    onSearchChange: (value: string) => void
}

export function ToolsBar({ searchValue, onSearchChange }: ToolsBarProps) {
    return (
        <div className={style['tools-bar']}>
            <SearchMovieInput value={searchValue} onChange={onSearchChange} />
             <Button variant="secondary" size="sm">
                Filtrar
            </Button>
            <Button variant="default" size="sm">
                Adicionar filme
            </Button>
        </div>
    )
}