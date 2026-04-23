import { MovieList } from "./MovieList";
import { ToolsBar } from "./ToolsBar";
import type { Media } from '../../../entities/media/model/types'
import { Button } from '../../../components/ui/button'
import { useHomeMovies } from '../model/useHomeMovies'

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
    backgroundUrl: 'https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg',
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
    backgroundUrl: 'https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
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
    backgroundUrl: 'https://image.tmdb.org/t/p/original/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg',
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
    backgroundUrl: 'https://image.tmdb.org/t/p/original/cB1wBz9x3Q2Q7hY4Yt7A2Vj2p6Q.jpg',
    teaserUrl: 'https://www.youtube.com/watch?v=3acm7j9k_1w',
  },
  {
    id: '5',
    titulo: 'Vingadores: Endgame',
    tituloOriginal: 'Avengers: Endgame',
    subtitulo: 'O desfecho da saga do infinito.',
    sinopse: 'Apos os eventos devastadores de Guerra Infinita, os Vingadores restantes se unem para uma ultima tentativa de reverter as acoes de Thanos e restaurar o equilibrio do universo.',
    genres: ['Acao', 'Aventura', 'Ficcao cientifica'],
    popularidade: '101.4',
    votos: '25500',
    kind: 'movie',
    rating: 8.4,
    lancamento: '2019-04-26',
    duracao: '181 min',
    situacao: 'Lancado',
    idioma: 'en-US',
    orcamento: '356000000',
    receita: '2799439100',
    lucro: '2443439100',
    posterUrl: 'https://image.tmdb.org/t/p/w780/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
    backgroundUrl: 'https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
    teaserUrl: 'https://www.youtube.com/watch?v=TcMBFSGVi1c',
  },
  {
    id: '6',
    titulo: 'Clube da Luta',
    tituloOriginal: 'Fight Club',
    subtitulo: 'Uma critica intensa ao consumo e a identidade.',
    sinopse: 'Um homem desiludido cria um clube de lutas clandestino com um vendedor de sabao carismatico, e a iniciativa cresce para algo muito mais perigoso.',
    genres: ['Drama'],
    popularidade: '84.6',
    votos: '28500',
    kind: 'movie',
    rating: 8.4,
    lancamento: '1999-10-15',
    duracao: '139 min',
    situacao: 'Lancado',
    idioma: 'en-US',
    orcamento: '63000000',
    receita: '100853753',
    lucro: '37853753',
    posterUrl: 'https://image.tmdb.org/t/p/w780/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg',
    backgroundUrl: 'https://image.tmdb.org/t/p/w780/pMyOSRURkxF6YId9vOTGsBH1jRb.jpg',
    teaserUrl: 'https://www.youtube.com/watch?v=SUXWAEX2jlg',
  },
  {
    id: '7',
    titulo: 'Coringa',
    tituloOriginal: 'Joker',
    subtitulo: 'O nascimento de um icone do caos.',
    sinopse: 'Arthur Fleck, um comediante fracassado e isolado, inicia uma transformacao sombria que o conduz ao surgimento do Coringa em Gotham.',
    genres: ['Crime', 'Drama', 'Suspense'],
    popularidade: '93.2',
    votos: '25500',
    kind: 'movie',
    rating: 8.4,
    lancamento: '2019-10-04',
    duracao: '122 min',
    situacao: 'Lancado',
    idioma: 'en-US',
    orcamento: '55000000',
    receita: '1074251311',
    lucro: '1019251311',
    posterUrl: 'https://image.tmdb.org/t/p/w780/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
    backgroundUrl: 'https://image.tmdb.org/t/p/w780/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
    teaserUrl: 'https://www.youtube.com/watch?v=zAGVQLHvwOY',
  },
  {
    id: '8',
    titulo: 'Duna',
    tituloOriginal: 'Dune',
    subtitulo: 'Destino, areia e poder em Arrakis.',
    sinopse: 'Paul Atreides precisa sobreviver no planeta mais perigoso do universo para proteger sua familia e cumprir um destino que pode mudar tudo.',
    genres: ['Ficcao cientifica', 'Aventura', 'Drama'],
    popularidade: '89.7',
    votos: '12200',
    kind: 'movie',
    rating: 8.0,
    lancamento: '2021-10-22',
    duracao: '155 min',
    situacao: 'Lancado',
    idioma: 'en-US',
    orcamento: '165000000',
    receita: '402000000',
    lucro: '237000000',
    posterUrl: 'https://image.tmdb.org/t/p/w780/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
    backgroundUrl: 'https://image.tmdb.org/t/p/original/jYEW5xZkZk2WTrdbMGAPFuBqbDc.jpg',
    teaserUrl: 'https://www.youtube.com/watch?v=n9xhJrPXop4',
  },
  {
    id: '9',
    titulo: 'Parasita',
    tituloOriginal: 'Parasite',
    subtitulo: 'Uma satira afiada sobre desigualdade social.',
    sinopse: 'A familia Kim se infiltra na rotina de uma familia rica com um plano engenhoso, mas as consequencias fogem do controle.',
    genres: ['Drama', 'Suspense', 'Comedia'],
    popularidade: '74.3',
    votos: '18000',
    kind: 'movie',
    rating: 8.5,
    lancamento: '2019-05-30',
    duracao: '132 min',
    situacao: 'Lancado',
    idioma: 'ko-KR',
    orcamento: '11400000',
    receita: '263100000',
    lucro: '251700000',
    posterUrl: 'https://image.tmdb.org/t/p/w780/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
    backgroundUrl: 'https://image.tmdb.org/t/p/original/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg',
    teaserUrl: 'https://www.youtube.com/watch?v=5xH0HfJHsaY',
  },
  {
    id: '10',
    titulo: 'Batman: O Cavaleiro das Trevas',
    tituloOriginal: 'The Dark Knight',
    subtitulo: 'O caos encontra seu maior palco em Gotham.',
    sinopse: 'Batman enfrenta o Coringa, um criminoso imprevisivel que mergulha Gotham em caos e coloca a cidade diante de escolhas impossiveis.',
    genres: ['Acao', 'Crime', 'Drama'],
    popularidade: '96.2',
    votos: '32000',
    kind: 'movie',
    rating: 9.0,
    lancamento: '2008-07-18',
    duracao: '152 min',
    situacao: 'Lancado',
    idioma: 'en-US',
    orcamento: '185000000',
    receita: '1004558444',
    lucro: '819558444',
    posterUrl: 'https://image.tmdb.org/t/p/w780/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    backgroundUrl: 'https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg',
    teaserUrl: 'https://www.youtube.com/watch?v=EXeTwQWrcwY',
  },
  {
    id: '11',
    titulo: 'Breaking Bad',
    tituloOriginal: 'Breaking Bad',
    subtitulo: 'A transformacao de um homem comum.',
    sinopse: 'Um professor de quimica com cancer entra no trafico de metanfetamina para garantir o futuro da familia, iniciando uma espiral perigosa.',
    genres: ['Drama', 'Crime'],
    popularidade: '88.4',
    votos: '14500',
    kind: 'series',
    rating: 9.5,
    lancamento: '2008-01-20',
    duracao: '49 min',
    situacao: 'Encerrada',
    idioma: 'en-US',
    orcamento: '0',
    receita: '0',
    lucro: '0',
    posterUrl: 'https://image.tmdb.org/t/p/w780/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg',
    backgroundUrl: 'https://image.tmdb.org/t/p/original/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg',
    teaserUrl: 'https://www.youtube.com/watch?v=HhesaQXLuRY',
  },
  {
    id: '12',
    titulo: 'Chernobyl',
    tituloOriginal: 'Chernobyl',
    subtitulo: 'A historia de um desastre real.',
    sinopse: 'Minisserie dramatiza os eventos do desastre nuclear de Chernobyl e o esforco de cientistas e trabalhadores para conter a catastrofe.',
    genres: ['Drama', 'Historico'],
    popularidade: '64.8',
    votos: '6200',
    kind: 'series',
    rating: 9.3,
    lancamento: '2019-05-06',
    duracao: '65 min',
    situacao: 'Encerrada',
    idioma: 'en-US',
    orcamento: '0',
    receita: '0',
    lucro: '0',
    posterUrl: 'https://image.tmdb.org/t/p/w780/hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg',
    backgroundUrl: 'https://image.tmdb.org/t/p/original/900tHlUYUkp7Ol04XFSoAaEIXcT.jpg',
    teaserUrl: 'https://www.youtube.com/watch?v=s9APLXM9Ei8',
  },
]

export function HomePage() {
  const {
    searchValue,
    onSearchChange,
    paginatedMovies,
    currentPage,
    totalPages,
    canGoToPreviousPage,
    canGoToNextPage,
    goToPreviousPage,
    goToNextPage,
    showPagination,
  } = useHomeMovies(mockMovies)

  return (
    <div className="w-full h-full flex flex-col items-strench justify-start">
      <ToolsBar
        searchValue={searchValue}
        onSearchChange={onSearchChange}
      />
      
      <MovieList movies={paginatedMovies} />

      {showPagination ? (
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
