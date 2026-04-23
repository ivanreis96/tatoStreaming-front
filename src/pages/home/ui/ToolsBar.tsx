import { SearchMovieInput } from '../../../features/search'

type ToolsBarProps = {
    searchValue: string
    onSearchChange: (value: string) => void
}

export function ToolsBar({ searchValue, onSearchChange }: ToolsBarProps) {
    return (
        <div className="tools-bar p-4">
            <SearchMovieInput value={searchValue} onChange={onSearchChange} />
        </div>
    )
}