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
        <div className="movie-card">
            <div className="movie-card-image"></div>
            <div className="movie-card-description">
                <h3 className="movie-card-description__title">Título do Filme</h3>
                <p className="movie-card-description__info">Descrição do filme...</p>
            </div>
        </div>
    )
}