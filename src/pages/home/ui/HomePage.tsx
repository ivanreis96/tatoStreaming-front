import { useCallback, useEffect, useMemo, useState } from 'react'
import { MovieList } from './MovieList'
import { ToolsBar } from './ToolsBar'
import { Button } from '@/components/ui/button'
import { useHomeMovies } from '../model/useHomeMovies'
import type { Media } from '@/entities/media'
import { useAppSelector } from '@/app/providers/hooks'
import { mediaGateway } from '@/shared/api'
import { BASE_MEDIA_GENRES } from '@/shared'

type MediaSource = 'api' | 'mock'

export function HomePage() {
  const authState = useAppSelector((state) => state.auth)
  const [movies, setMovies] = useState<Media[]>([])
  const [moviesSource, setMoviesSource] = useState<MediaSource>('api')
  const [isLoadingMovies, setIsLoadingMovies] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [createMovieError, setCreateMovieError] = useState<string | null>(null)
  const [isCreatingMovie, setIsCreatingMovie] = useState(false)

  useEffect(() => {
    let isMounted = true

    const loadMovies = async () => {
      setIsLoadingMovies(true)
      setLoadError(null)

      try {
        const result = await mediaGateway.listMediaWithFallback()

        if (!isMounted) {
          return
        }

        setMovies(result.movies)
        setMoviesSource(result.source)
      } catch (error) {
        if (!isMounted) {
          return
        }

        const message = error instanceof Error ? error.message : 'Não foi possível carregar os filmes.'
        setLoadError(message)
      } finally {
        if (isMounted) {
          setIsLoadingMovies(false)
        }
      }
    }

    void loadMovies()

    return () => {
      isMounted = false
    }
  }, [])

  const createMovie = useCallback(async (movie: Media) => {
    if (!authState.accessToken || !authState.currentUser) {
      setCreateMovieError('Sessão inválida. Faça login novamente para adicionar filmes.')
      return false
    }

    setIsCreatingMovie(true)
    setCreateMovieError(null)

    try {
      const { id: _id, createdBy: _createdBy, ...payload } = movie
      const result = await mediaGateway.createMediaWithFallback({
        payload,
        accessToken: authState.accessToken,
        createdBy: authState.currentUser.id,
      })

      setMovies((current) => [result.movie, ...current])
      setMoviesSource(result.source)
      return true
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Não foi possível adicionar o filme.'
      setCreateMovieError(message)
      return false
    } finally {
      setIsCreatingMovie(false)
    }
  }, [authState.accessToken, authState.currentUser?.id])

  const {
    searchValue,
    onSearchChange,
    otherFilters,
    onOtherFiltersChange,
    paginatedMovies,
    currentPage,
    totalPages,
    canGoToPreviousPage,
    canGoToNextPage,
    goToPreviousPage,
    goToNextPage,
    showPagination,
  } = useHomeMovies(movies)

  const sourceMessage = useMemo(() => {
    if (moviesSource !== 'mock') {
      return null
    }

    return 'Exibindo catálogo em fallback de mock.'
  }, [moviesSource])

  const availableGenres: string[] = useMemo(() => {
    const normalizedGenres = [...movies.flatMap((movie) => movie.generos), ...BASE_MEDIA_GENRES]
    .map((genre) => genre.trim()).filter((genre) => genre.length > 0)

    return Array.from(new Set(normalizedGenres)).sort((a, b) => a.localeCompare(b, 'pt-BR'))
  }, [movies])

  return (
    <div className="w-full h-full flex flex-col items-strench justify-start">
      <ToolsBar
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        otherFilters={otherFilters}
        onOtherFiltersChange={onOtherFiltersChange}
        onCreateMovie={createMovie}
        isCreatingMovie={isCreatingMovie}
        createMovieError={createMovieError}
        availableGenres={availableGenres}
      />

      {sourceMessage ? (
        <div className="w-full px-6 pt-3 text-xs text-foreground/70">
          {sourceMessage}
        </div>
      ) : null}

      {loadError ? (
        <div className="w-full px-6 pt-3 text-sm text-destructive">{loadError}</div>
      ) : null}

      {isLoadingMovies ? (
        <div className="w-full px-6 py-10 text-sm text-foreground/70">Carregando filmes...</div>
      ) : (
        <MovieList movies={paginatedMovies} />
      )}
      
      {!isLoadingMovies && showPagination ? (
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
