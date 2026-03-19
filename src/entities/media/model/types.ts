export type MediaKind = 'movie' | 'series'

export type Media = {
  id: string
  title: string
  overview: string
  posterUrl: string
  kind: MediaKind
  rating: number
}
