import type { Media } from '@/entities/media'
import { mediaApi } from '@/shared/api'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export function MoviePage() {
    const { id } = useParams<{ id: string }>()
    const [movie, setMovie] = useState<Media | null>(null)
    const [isLoadingMovie, setIsLoadingMovie] = useState(true)
    const [loadError, setLoadError] = useState<string | null>(null)

    useEffect(() => {
        let isMounted = true

        const loadMovie = async () => {
            if (!id) {
                if (isMounted) {
                    setLoadError('Filme não encontrado.')
                    setIsLoadingMovie(false)
                }

                return
            }

            setIsLoadingMovie(true)
            setLoadError(null)

            try {
                const result = await mediaApi.getMediaById({ id })

                if (!isMounted) {
                    return
                }

                setMovie(result)
            } catch (error) {
                if (!isMounted) {
                    return
                }

                const message = error instanceof Error ? error.message : 'Não foi possível carregar os detalhes do filme.'
                setLoadError(message)
            } finally {
                if (isMounted) {
                    setIsLoadingMovie(false)
                }
            }
        }

        void loadMovie()

        return () => {
            isMounted = false
        }
    }, [id])

    if (isLoadingMovie) {
        return <div className="w-full px-6 py-10 text-sm text-foreground/70">Carregando detalhes do filme...</div>
    }

    if (loadError) {
        return <div className="w-full px-6 py-10 text-sm text-destructive">{loadError}</div>
    }

    if (!movie) {
        return <div className="w-full px-6 py-10 text-sm text-foreground/70">Filme não encontrado.</div>
    }

    return (
        <div className="w-full px-2 py-8 flex flex-col gap-3">
            <h1 className="text-2xl font-semibold">{movie.titulo}</h1>
            <p className="text-sm text-foreground/70">{movie.subtitulo}</p>
            <p className="text-sm">{movie.sinopse}</p>
        </div>
    )
}