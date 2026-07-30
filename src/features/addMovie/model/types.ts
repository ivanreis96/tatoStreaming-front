import type { Media } from '@/entities/media'

export const DEFAULT_MEDIA_ASSET_URLS = {
	posterUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
	backgroundUrl: 'https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=1600&q=80',
	teaserUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
}

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
	posterUrl: DEFAULT_MEDIA_ASSET_URLS.posterUrl,
	kind: 'movie',
	backgroundUrl: DEFAULT_MEDIA_ASSET_URLS.backgroundUrl,
	teaserUrl: DEFAULT_MEDIA_ASSET_URLS.teaserUrl,
}
