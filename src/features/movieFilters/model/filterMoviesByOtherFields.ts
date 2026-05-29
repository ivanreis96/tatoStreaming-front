import type { Media } from '@/entities/media'
import type { MovieFilters } from './types'

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
            const [dia, mes, ano] = movie.lancamento.split("/");
            const dataLancamento = new Date(`${ano}-${mes}-${dia}`);
            let inicioOk = true;
            let fimOk = true;
            if (fieldsFilter.lancamentoInicio) {
                const [di, mi, ai] = fieldsFilter.lancamentoInicio.split("/");
                const dataInicio = new Date(`${ai}-${mi}-${di}`);
                inicioOk = dataLancamento >= dataInicio;
            }
            if (fieldsFilter.lancamentoFim) {
                const [df, mf, af] = fieldsFilter.lancamentoFim.split("/");
                const dataFim = new Date(`${af}-${mf}-${df}`);
                fimOk = dataLancamento <= dataFim;
            }
            matchesLancamento = inicioOk && fimOk;
        }

        return matchesDuracao && matchesGeneros && matchesLancamento;
    });
}