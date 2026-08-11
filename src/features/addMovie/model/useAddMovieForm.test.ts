/// <reference types="jest" />

import { mapAddMovieFormToMedia } from './useAddMovieForm'
import { DEFAULT_MEDIA_ASSET_URLS, INITIAL_ADD_MOVIE_FORM, type AddMovieFormData } from './types'

describe('mapAddMovieFormToMedia', () => {
  it('mapeia formulario para media com calculo de lucro e contexto informado', () => {
    const form: AddMovieFormData = {
      ...INITIAL_ADD_MOVIE_FORM,
      titulo: 'Interstellar',
      rating: '8.7',
      orcamento: '100',
      receita: '250',
      generos: ['Drama', 'Sci-Fi'],
    }

    const media = mapAddMovieFormToMedia(form, {
      id: 'movie-1',
      createdBy: 'user-1',
    })

    expect(media.id).toBe('movie-1')
    expect(media.createdBy).toBe('user-1')
    expect(media.rating).toBe(8.7)
    expect(media.lucro).toBe('150')
    expect(media.titulo).toBe('Interstellar')
    expect(media.generos).toEqual(['Drama', 'Sci-Fi'])
  })

  it('aplica fallback para urls quando campos chegam vazios', () => {
    const form: AddMovieFormData = {
      ...INITIAL_ADD_MOVIE_FORM,
      posterUrl: '',
      backgroundUrl: '',
      teaserUrl: '',
    }

    const media = mapAddMovieFormToMedia(form, {
      id: 'movie-2',
      createdBy: 'user-2',
    })

    expect(media.posterUrl).toBe(DEFAULT_MEDIA_ASSET_URLS.posterUrl)
    expect(media.backgroundUrl).toBe(DEFAULT_MEDIA_ASSET_URLS.backgroundUrl)
    expect(media.teaserUrl).toBe(DEFAULT_MEDIA_ASSET_URLS.teaserUrl)
  })

  it('normaliza campos numericos invalidos para zero', () => {
    const form: AddMovieFormData = {
      ...INITIAL_ADD_MOVIE_FORM,
      rating: 'not-a-number',
      orcamento: 'x',
      receita: 'y',
    }

    const media = mapAddMovieFormToMedia(form, {
      id: 'movie-3',
      createdBy: 'user-3',
    })

    expect(media.rating).toBe(0)
    expect(media.lucro).toBe('0')
  })
})
