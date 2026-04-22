import type { Media } from '../../../entities/media/model/types'

export function filterMoviesByTitle(movies: Media[], movieTitle: string): Media[] {
  const normalizedTitle = movieTitle.trim().toLowerCase()

  if (!normalizedTitle) {
    return movies
  }

  return movies.filter((movie) => {
    const normalizedTitulo = movie.titulo.toLowerCase()
    const normalizedTituloOriginal = movie.tituloOriginal.toLowerCase()

    return (
      normalizedTitulo.includes(normalizedTitle)
      || normalizedTituloOriginal.includes(normalizedTitle)
    )
  })
}