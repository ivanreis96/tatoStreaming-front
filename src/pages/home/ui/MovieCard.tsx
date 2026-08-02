import { AppImage } from "@/shared"
import styles from '../MovieList.module.css'
import { Link } from 'react-router-dom'


type MediaCardProps = {
    id: string
    titulo: string
    tituloOriginal: string
    subtitulo: string
    rating: number
    posterUrl: string
}

export function MovieCard(movieProps: MediaCardProps) {
    return (
        <Link to={`/movie/${movieProps.id}`} className="" aria-label={`Abrir detalhes de ${movieProps.titulo}`}>
            <div className={styles['movie-card']}>
                <div className={styles['movie-card-image']}>
                    <AppImage src={movieProps.posterUrl } className={styles['movie-card-image']} alt={movieProps.titulo} fullWidth={true} height={"100%"} />
                </div>
                <div className={styles['movie-card-description']}>
                    <h3 className={styles['movie-card-description__title']}>{movieProps.titulo}</h3>
                    <p className={styles['movie-card-description__subtitle']}>{movieProps.subtitulo}</p>
                </div>
            </div>
        </Link>
    )
}