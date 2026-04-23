import { AppImage } from "../../../components/ui/image"
import styles from '../MovieList.module.css'


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
        <div className={styles['movie-card']}>
            <div className={styles['movie-card-image']}>
                <AppImage src={movieProps.posterUrl } alt={movieProps.titulo} fullWidth={true} height="100%" />
            </div>
            <div className={styles['movie-card-description']}>
                <h3 className={styles['movie-card-description__title']}>{movieProps.titulo}</h3>
                <p className={styles['movie-card-description__subtitle']}>{movieProps.subtitulo}</p>
            </div>
        </div>
    )
}