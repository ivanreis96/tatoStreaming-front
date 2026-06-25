import type { Media } from '@/entities/media'
import type { MovieFilters } from './types'
import { parseDateOnly } from '@/shared'

export function filterMoviesByOtherFields(movies: Media[], fieldsFilter: MovieFilters): Media[] {
    return movies.filter((movie) => {
        const matchesDuracao = fieldsFilter.duracao
            ? movie.duracao === fieldsFilter.duracao
            : true;

        const matchesGeneros = fieldsFilter.generos && fieldsFilter.generos.length > 0
            ? fieldsFilter.generos.some((genero) => movie.generos?.includes(genero))
            : true;

        let matchesLancamento = true;
        if (fieldsFilter.lancamentoInicio || fieldsFilter.lancamentoFim) {
            const dataLancamento = parseDateOnly(movie.lancamento)
            let inicioOk = true;
            let fimOk = true;
            if (fieldsFilter.lancamentoInicio) {
                inicioOk = dataLancamento >= fieldsFilter.lancamentoInicio
            }
            if (fieldsFilter.lancamentoFim) {
                fimOk = dataLancamento <= fieldsFilter.lancamentoFim
            }
            matchesLancamento = inicioOk && fimOk;
        }

        return matchesDuracao && matchesGeneros && matchesLancamento;
    });
}