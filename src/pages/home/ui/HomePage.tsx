import { useMemo, useState, type ReactNode } from 'react'
import { MovieList } from "./MovieList";
import { ToolsBar } from "./ToolsBar";
import type { Media } from '../../../entities/media/model/types'
import { SearchMovieInput, filterMoviesByTitle } from '../../../features/search'
import type { SearchFilters } from '../../../features/search'

const mockMovies: Media[] = [
  {
    id: '1',
    titulo: 'Interstellar',
    tituloOriginal: 'Interstellar',
    subtitulo: 'A journey through space and time.',
    sinopse: 'Com a Terra em colapso ambiental, um grupo de astronautas atravessa um buraco de minhoca em busca de um novo lar para a humanidade.',
    genres: ['Ficcao cientifica', 'Drama', 'Aventura'],
    popularidade: '92.5',
    votos: '18850',
    kind: 'movie',
    rating: 8.7,
    lancamento: '2014-11-07',
    duracao: '169 min',
    situacao: 'Lancado',
    idioma: 'en-US',
    orcamento: '165000000',
    receita: '701729206',
    lucro: '536729206',
    posterUrl: 'https://image.tmdb.org/t/p/w780/nCbkOyOMTEwlEV0LtCOvCnwEONA.jpg',
    teaserUrl: 'https://www.youtube.com/watch?v=zSWdZVtXT7E',
  },
  {
    id: '2',
    titulo: 'Inception',
    tituloOriginal: 'Inception',
    subtitulo: 'Dreams inside dreams.',
    sinopse: 'Um especialista em roubo de informacoes atraves de sonhos recebe a missao de implantar uma ideia na mente de um herdeiro corporativo.',
    genres: ['Ficcao cientifica', 'Acao', 'Suspense'],
    popularidade: '89.1',
    votos: '24910',
    kind: 'movie',
    rating: 8.8,
    lancamento: '2010-07-16',
    duracao: '148 min',
    situacao: 'Lancado',
    idioma: 'en-US',
    orcamento: '160000000',
    receita: '836848102',
    lucro: '676848102',
    posterUrl: 'https://image.tmdb.org/t/p/w780/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
    teaserUrl: 'https://www.youtube.com/watch?v=YoHD9XEInc0',
  },
  {
    id: '3',
    titulo: 'The Matrix',
    tituloOriginal: 'The Matrix',
    subtitulo: 'Reality is not what it seems.',
    sinopse: 'Um programador descobre que a realidade e uma simulacao e se junta a rebeldes para enfrentar as maquinas.',
    genres: ['Ficcao cientifica', 'Acao'],
    popularidade: '84.0',
    votos: '21940',
    kind: 'movie',
    rating: 8.7,
    lancamento: '1999-03-31',
    duracao: '136 min',
    situacao: 'Lancado',
    idioma: 'en-US',
    orcamento: '63000000',
    receita: '467222728',
    lucro: '404222728',
    posterUrl: 'https://image.tmdb.org/t/p/w780/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    teaserUrl: 'https://www.youtube.com/watch?v=vKQi3bBA1y8',
  },
  {
    id: '4',
    titulo: 'Twin peaks',
    tituloOriginal: 'Twin Peaks',
    subtitulo: 'Cuidado cas coruja',
    sinopse: 'Um agente do FBI investiga o assassinato de Laura Palmer em uma cidade misteriosa cheia de segredos.',
    genres: ['Drama', 'Misterio', 'Crime'],
    popularidade: '70.2',
    votos: '1980',
    kind: 'series',
    rating: 8.7,
    lancamento: '1990-04-08',
    duracao: '47 min',
    situacao: 'Encerrada',
    idioma: 'en-US',
    orcamento: '1800000',
    receita: '0',
    lucro: '-1800000',
    posterUrl: 'https://image.tmdb.org/t/p/w780/wRbjVBdDo5qHAEOVYoMWpM58FSA.jpg',
    teaserUrl: 'https://www.youtube.com/watch?v=3acm7j9k_1w',
  },
  {
    id: '5',
    titulo: 'Power rangers',
    tituloOriginal: 'Power Rangers',
    subtitulo: 'power rangers tem a força',
    sinopse: 'Cinco adolescentes improvaveis descobrem poderes especiais e precisam se unir para defender o mundo de uma ameaca alienigena.',
    genres: ['Acao', 'Aventura', 'Ficcao cientifica'],
    popularidade: '61.7',
    votos: '3460',
    kind: 'movie',
    rating: 6.6,
    lancamento: '2017-03-24',
    duracao: '124 min',
    situacao: 'Lancado',
    idioma: 'en-US',
    orcamento: '100000000',
    receita: '142337537',
    lucro: '42337537',
    posterUrl: 'https://image.tmdb.org/t/p/w780/iRAZDrS1xfBRUsraLXdC1Lkvegp.jpg',
    teaserUrl: 'https://www.youtube.com/watch?v=Q-C4qqsgs8w',
  },
]

export function HomePage() {
  const [filters, setFilters] = useState<SearchFilters>({ movie: '' })

  const SearchBar: ReactNode = 
      <div className="p-4">
        <SearchMovieInput
          value={filters.movie}
          onChange={(value) => setFilters((current) => ({ ...current, movie: value }))}
        />
      </div>

  const filteredMovies = useMemo(() => {
    return filterMoviesByTitle(mockMovies, filters.movie)
  }, [filters.movie])

  return (
    <div className="w-full h-full flex flex-col items-strench justify-start">
      <ToolsBar {...SearchBar} />
      
      <MovieList movies={filteredMovies} />
    </div>
  )
}
