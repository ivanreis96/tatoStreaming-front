import styles from './MovieList.module.css'

type MovieListProps = {
    movies?: any[]
}

export function MovieList(props: MovieListProps) {
    return (
        <div className={styles['movie-content']}>
            {props.movies ? (
                <div className={styles['movie-content__list']}>
                    {props.movies.map((movie, index) => (
                        <div key={index}>{movie.title}</div>
                    ))}
                </div>
            ) : (
                <p>Nenhum fulme encontrado</p>
            )}
        </div>
    )
}