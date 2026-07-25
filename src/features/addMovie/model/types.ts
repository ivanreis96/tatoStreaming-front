import type { Media } from '@/entities/media'

export type AddMovieFormData = Omit<Media, 'id' | 'createdBy' | 'rating' | 'lucro'> & {
	rating: string
}

export type CreateMovieContext = {
	createdBy: string
	id?: string
}

export const INITIAL_ADD_MOVIE_FORM: AddMovieFormData = {
	titulo: '',
	tituloOriginal: '',
	subtitulo: '',
	sinopse: '',
	generos: [],
	popularidade: '',
	votos: '',
	rating: '',
	lancamento: '',
	duracao: '',
	situacao: 'lancado',
	idioma: '',
	orcamento: '',
	receita: '',
	posterUrl: '',
	kind: 'movie',
	backgroundUrl: '',
	teaserUrl: '',
}
