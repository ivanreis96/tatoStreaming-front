import { MovieList } from "./MovieList";
import { ToolsBar } from "./ToolsBar";
import { Button } from '../../../components/ui/button'
import { useHomeMovies } from '../model/useHomeMovies'
import { mockMovies } from '../../../mock/mockMovies'

export function HomePage() {
  const {
    searchValue,
    onSearchChange,
    paginatedMovies,
    currentPage,
    totalPages,
    canGoToPreviousPage,
    canGoToNextPage,
    goToPreviousPage,
    goToNextPage,
    showPagination,
  } = useHomeMovies(mockMovies)

  return (
    <div className="w-full h-full flex flex-col items-strench justify-start">
      <ToolsBar
        searchValue={searchValue}
        onSearchChange={onSearchChange}
      />
      
      <MovieList movies={paginatedMovies} />

      {showPagination ? (
        <div className="w-full mt-4 px-6 pb-6 flex items-center justify-center gap-3">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={goToPreviousPage}
            disabled={!canGoToPreviousPage}
            aria-label="Pagina anterior"
          >
            Anterior
          </Button>

          <span className="text-sm text-foreground/80">
            Pagina {currentPage} de {totalPages}
          </span>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={goToNextPage}
            disabled={!canGoToNextPage}
            aria-label="Proxima pagina"
          >
            Proxima
          </Button>
        </div>
      ) : null}
    </div>
  )
}
