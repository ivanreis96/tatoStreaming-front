import { useEffect, useMemo, useState } from 'react'
import { filterMoviesByTitle } from '../../../features/search'
import type { SearchFilters } from '../../../features/search'
import type { Media } from '../../../entities/media/model/types'

const MOVIES_PER_PAGE = 10

type UseHomeMoviesResult = {
  searchValue: string
  onSearchChange: (value: string) => void
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
  const [filters, setFilters] = useState<SearchFilters>({ movie: '' })
  const [currentPage, setCurrentPage] = useState(1)

  const filteredMovies = useMemo(() => {
    return filterMoviesByTitle(movies, filters.movie)
  }, [movies, filters.movie])

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredMovies.length / MOVIES_PER_PAGE))
  }, [filteredMovies.length])

  useEffect(() => {
    setCurrentPage(1)
  }, [filters.movie])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const paginatedMovies = useMemo(() => {
    const startIndex = (currentPage - 1) * MOVIES_PER_PAGE
    return filteredMovies.slice(startIndex, startIndex + MOVIES_PER_PAGE)
  }, [currentPage, filteredMovies])

  return {
    searchValue: filters.movie,
    onSearchChange: (value) => {
      setFilters((current) => ({ ...current, movie: value }))
    },
    paginatedMovies,
    filteredMoviesCount: filteredMovies.length,
    currentPage,
    totalPages,
    canGoToPreviousPage: currentPage > 1,
    canGoToNextPage: currentPage < totalPages,
    goToPreviousPage: () => {
      setCurrentPage((page) => Math.max(1, page - 1))
    },
    goToNextPage: () => {
      setCurrentPage((page) => Math.min(totalPages, page + 1))
    },
    showPagination: filteredMovies.length > MOVIES_PER_PAGE,
  }
}
