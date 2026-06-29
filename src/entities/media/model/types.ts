export type MediaKind = 'movie' | 'series'

export type Media = {
  id: string
  createdBy: string
  titulo: string
  tituloOriginal: string
  subtitulo: string
  sinopse: string
  generos: string[]
  popularidade: string
  votos: string
  rating: number
  lancamento: string
  duracao: string
  situacao: string
  idioma: string
  orcamento: string
  receita: string
  lucro: string
  posterUrl: string
  kind: MediaKind
  backgroundUrl: string
  teaserUrl: string
}