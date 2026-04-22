import styles from '../MovieList.module.css'
import type { Media } from '../../../entities/media/model/types'

type MovieListProps = {
    movies: Media[]
}

export function MovieList(props: MovieListProps) {
    return (
        <div className={styles['movie-content']}>
            {props.movies.length > 0 ? (
                <div className={styles['movie-content__list']}>
                    {props.movies.map((movie) => (
                        <div key={movie.id}>{movie.titulo}</div>
                    ))}
                </div>
            ) : (
                <span>Nenhum filme encontrado</span>
            )}
        </div>
    )
}