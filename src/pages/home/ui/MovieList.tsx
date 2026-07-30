import styles from '../MovieList.module.css'
import type { Media } from '@/entities/media'
import { MovieCard } from './MovieCard'
import { memo } from 'react'

type MovieListProps = {
    movies: Media[]
}


 export const MovieList = memo((props: MovieListProps) => {
    return (
        <div className={styles['movie-content']}>
            {props.movies.length > 0 ? (
                <div className={styles['movie-content__list']}>
                    {props.movies.map((movie) => (
                        <MovieCard key={movie.id} {...movie} />
                    ))}
                </div>
            ) : (
                <span>Nenhum filme encontrado</span>
            )}
        </div>
    )
})

// export function MovieList(props: MovieListProps) {
//     return ListContent(props)
// }