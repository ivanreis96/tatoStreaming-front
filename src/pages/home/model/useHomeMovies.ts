import { useCallback, useEffect, useMemo, useState } from 'react'
import { filterMoviesByTitle } from '@/features/search'
import type { SearchFilters } from '@/features/search'
import type { Media } from '@/entities/media'
import { filterMoviesByOtherFields } from '@/features/movieFilters'
import type { MovieFilters } from '@/features/movieFilters'

const MOVIES_PER_PAGE = 20

type UseHomeMoviesResult = {
  searchValue: string
  onSearchChange: (value: string) => void
  otherFilters: MovieFilters
  onOtherFiltersChange: (nextFilters: Partial<MovieFilters>) => void
  paginatedMovies: Media[]
  filteredMoviesCount: number
  currentPage: number
  totalPages: number
  canGoToPreviousPage: boolean
  canGoToNextPage: boolean
  goToPreviousPage: () => void
  goToNextPage: () => void
  showPagination: boolean
}

export function useHomeMovies(movies: Media[]): UseHomeMoviesResult {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({ movie: '' })
  const [otherFilters, setOtherFilters] = useState<MovieFilters>({
    duracao: '',
    lancamentoInicio: undefined,
    lancamentoFim: undefined,
    generos: [],
  })
  const [currentPage, setCurrentPage] = useState(1)

  const filteredMovies = useMemo(() => {
    return (
      filterMoviesByTitle(filterMoviesByOtherFields(movies, otherFilters), searchFilters.movie)
    )
  }, [movies, otherFilters, searchFilters.movie])

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredMovies.length / MOVIES_PER_PAGE))
  }, [filteredMovies.length])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchFilters.movie, otherFilters])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const paginatedMovies = useMemo(() => {
    const startIndex = (currentPage - 1) * MOVIES_PER_PAGE
    return filteredMovies.slice(startIndex, startIndex + MOVIES_PER_PAGE)
  }, [currentPage, filteredMovies])

  const onSearchChange = useCallback((value: string) => {
    setSearchFilters((current) => ({ ...current, movie: value }))
  }, [])

  const onOtherFiltersChange = useCallback((nextFilters: Partial<MovieFilters>) => {
    setOtherFilters((current) => ({ ...current, ...nextFilters }))
  }, [])

  const goToPreviousPage = useCallback(() => {
    setCurrentPage((page) => Math.max(1, page - 1))
  }, [])

  const goToNextPage = useCallback(() => {
    setCurrentPage((page) => Math.min(totalPages, page + 1))
  }, [totalPages])

  return {
    searchValue: searchFilters.movie,
    onSearchChange,
    otherFilters,
    onOtherFiltersChange,
    paginatedMovies,
    filteredMoviesCount: filteredMovies.length,
    currentPage,
    totalPages,
    canGoToPreviousPage: currentPage > 1,
    canGoToNextPage: currentPage < totalPages,
    goToPreviousPage,
    goToNextPage,
    showPagination: filteredMovies.length > MOVIES_PER_PAGE,
  }
}
