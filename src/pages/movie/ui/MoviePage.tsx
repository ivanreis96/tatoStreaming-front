import type { Media } from '@/entities/media'
import { mediaApi } from '@/shared/api'
import { AppImage, BASE_MEDIA_GENRES, CircularTracker, SheetBase, YouTubeEmbed } from '@/shared'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { MovieBlockDetail } from './MovieBlockDetail'
import { useAppSelector } from '@/app/providers/hooks'
import { AddMovieContent, AddMovieFooter, type AddMovieFormData, useAddMovieForm } from '@/features/addMovie'
import { createMediaSchema } from '../../../../../../shared/src/media'
import { getFirstZodError } from '@/shared/lib/zod'
import BackArrowIcon from '@/assets/movie-back-arrow.svg?react'

function mapMovieToAddMovieFormData(movie: Media): AddMovieFormData {
    return {
        titulo: movie.titulo,
        tituloOriginal: movie.tituloOriginal,
        subtitulo: movie.subtitulo,
        sinopse: movie.sinopse,
        generos: [...movie.generos],
        popularidade: movie.popularidade,
        votos: movie.votos,
        rating: String(movie.rating),
        lancamento: movie.lancamento,
        duracao: movie.duracao,
        situacao: movie.situacao,
        idioma: movie.idioma,
        orcamento: movie.orcamento,
        receita: movie.receita,
        posterUrl: movie.posterUrl,
        kind: movie.kind,
        backgroundUrl: movie.backgroundUrl,
        teaserUrl: movie.teaserUrl,
    }
}

export function MoviePage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const authState = useAppSelector((state) => state.auth)
    const [movie, setMovie] = useState<Media | null>(null)
    const [isLoadingMovie, setIsLoadingMovie] = useState(true)
    const [loadError, setLoadError] = useState<string | null>(null)
    const [actionError, setActionError] = useState<string | null>(null)
    const [editFormError, setEditFormError] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [isEditSheetOpen, setIsEditSheetOpen] = useState(false)

    const initialEditFormData = useMemo(() => {
        if (!movie) {
            return null
        }

        return mapMovieToAddMovieFormData(movie)
    }, [movie])

    const {
        form,
        releaseDate,
        lucro,
        onFieldChange,
        onKindChange,
        onSituacaoChange,
        onGenreChange,
        onReleaseDateChange,
        resetForm,
        createMediaFromForm,
        onAddGenresFromInput,
    } = useAddMovieForm(initialEditFormData ?? undefined)

    const availableGenres = useMemo(() => {
        if (!movie) {
            return [...BASE_MEDIA_GENRES]
        }

        const normalizedGenres = [...movie.generos, ...BASE_MEDIA_GENRES]
            .map((genre) => genre.trim())
            .filter((genre) => genre.length > 0)

        return Array.from(new Set(normalizedGenres)).sort((a, b) => a.localeCompare(b, 'pt-BR'))
    }, [movie])

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

    const handleDeleteMovie = async () => {
        if (!authState.accessToken) {
            setActionError('Sessão inválida. Faça login novamente para excluir o filme.')
            return
        }

        const shouldDelete = window.confirm(`Deseja mesmo deletar "${movie.titulo}"?`)

        if (!shouldDelete) {
            return
        }

        setIsDeleting(true)
        setActionError(null)

        try {
            await mediaApi.deleteMedia({ id: movie.id }, authState.accessToken)
            navigate('/', { replace: true })
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Não foi possível excluir o filme.'
            setActionError(message)
        } finally {
            setIsDeleting(false)
        }
    }

    const handleEditSheetOpenChange = (open: boolean) => {
        setIsEditSheetOpen(open)
        setEditFormError(null)

        if (!initialEditFormData) {
            return
        }

        if (open) {
            resetForm(initialEditFormData)
            return
        }

        resetForm(initialEditFormData)
    }

    const handleUpdateMovie = async () => {
        if (!authState.accessToken) {
            setActionError('Sessão inválida. Faça login novamente para editar o filme.')
            return
        }

        const nextMovie = createMediaFromForm({
            id: movie.id,
            createdBy: movie.createdBy,
        })
        const { id: _id, createdBy: _createdBy, ...payload } = nextMovie

        const validationResult = createMediaSchema.safeParse(payload)

        if (!validationResult.success) {
            setEditFormError(getFirstZodError(validationResult.error, 'Revise os dados informados para atualizar o filme.'))
            return
        }

        const hasChanges =
            payload.titulo !== movie.titulo ||
            payload.tituloOriginal !== movie.tituloOriginal ||
            payload.subtitulo !== movie.subtitulo ||
            payload.sinopse !== movie.sinopse ||
            payload.popularidade !== movie.popularidade ||
            payload.votos !== movie.votos ||
            payload.rating !== movie.rating ||
            payload.lancamento !== movie.lancamento ||
            payload.duracao !== movie.duracao ||
            payload.situacao !== movie.situacao ||
            payload.idioma !== movie.idioma ||
            payload.orcamento !== movie.orcamento ||
            payload.receita !== movie.receita ||
            payload.lucro !== movie.lucro ||
            payload.posterUrl !== movie.posterUrl ||
            payload.kind !== movie.kind ||
            payload.backgroundUrl !== movie.backgroundUrl ||
            payload.teaserUrl !== movie.teaserUrl ||
            payload.generos.join('|') !== movie.generos.join('|')

        if (!hasChanges) {
            setEditFormError('Nenhuma alteração foi aplicada.')
            return
        }

        setIsUpdating(true)
        setActionError(null)
        setEditFormError(null)

        try {
            const updatedMovie = await mediaApi.updateMedia({ id: movie.id }, payload, authState.accessToken)
            setMovie(updatedMovie)
            setIsEditSheetOpen(false)
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Não foi possível atualizar o filme.'
            setActionError(message)
        } finally {
            setIsUpdating(false)
        }
    }

    return (
        <div className="w-full px-2 py-8 flex flex-col max-w-[1366px]">
            <div className="relative isolate min-h-[500px] bg-[#121113] p-8">
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute left-[-40px] top-[-15px] z-20 text-foreground/70 hover:text-foreground"
                    onClick={() => navigate('/')}
                    aria-label="Voltar para a listagem"
                >
                    <AppImage src={BackArrowIcon} alt="Seta para esquerda" fillColor="currentColor" width={14} height={14} />
                    Voltar
                </Button>
                <div className="absolute inset-0">
                    <AppImage
                        src={movie.backgroundUrl}
                        alt={movie.titulo}
                        className="absolute inset-0 h-full w-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-[#121113]/0 via-[#121113]/80 to-[#121113]/100" />
                </div>

                <div className="relative z-10 flex flex-col gap-4">
                    <div className="w-full flex justify-between items-start">
                        <div className="flex flex-col">
                            <h1 className="text-[32px] font-heading subtitle color-white">{movie.titulo}</h1>
                            <p className="text-base font-heading color-white">Título original: {movie.tituloOriginal}</p>
                        </div>
                        <div className='flex gap-4'>
                            <Button
                                variant={"secondary"}
                                onClick={handleDeleteMovie}
                                disabled={isDeleting || isUpdating}
                            >
                                {isDeleting ? 'Deletando...' : 'Deletar'}
                            </Button>
                            <SheetBase
                                open={isEditSheetOpen}
                                onOpenChange={handleEditSheetOpenChange}
                                buttonTrigger={
                                    <Button
                                        variant={"default"}
                                        disabled={isDeleting || isUpdating}
                                    >
                                        Editar
                                    </Button>
                                }
                                title={'Editar filme'}
                                side={'right'}
                                children={
                                    <AddMovieContent
                                        form={form}
                                        releaseDate={releaseDate}
                                        lucro={lucro}
                                        onFieldChange={onFieldChange}
                                        onKindChange={onKindChange}
                                        onSituacaoChange={onSituacaoChange}
                                        onGenreChange={onGenreChange}
                                        onReleaseDateChange={onReleaseDateChange}
                                        availableGenres={availableGenres}
                                        onAddGenresFromInput={onAddGenresFromInput}
                                        genreValidationError={editFormError}
                                    />
                                }
                                footerContent={
                                    <AddMovieFooter
                                        onCloseFields={() => handleEditSheetOpenChange(false)}
                                        onCreateMovie={handleUpdateMovie}
                                        isSubmitting={isUpdating}
                                        submitLabel={'Salvar alterações'}
                                        submittingLabel={'Salvando...'}
                                    />
                                }
                            />
                        </div>
                    </div>

                    {actionError ? (
                        <div className="text-sm text-destructive">{actionError}</div>
                    ) : null}

                    <div className='w-full flex gap-4 items-start'>
                        <div className="flex-1 max-w-[374px]">
                            <AppImage
                                src={movie.posterUrl}
                                alt={movie.titulo}
                                className='w-[full] rounded-[4px] shadow-[0_1px_5px_rgba(0,0,0,0.20)]'
                            />
                        </div>
                        <div className="flex-2 flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <div className="italic font-heading text-base">{movie.subtitulo}</div>
                                <div className='flex gap-2 items-center'>
                                    <MovieBlockDetail
                                        label="Popularidade"
                                        textDetail={movie.popularidade}
                                    />
                                    <MovieBlockDetail
                                        label="Votos"
                                        textDetail={movie.votos}
                                    />
                                    <CircularTracker
                                        value={movie.rating * 10}
                                        size={104}
                                        strokeWidth={10}
                                        label="Rating"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="flex-1 w-50 flex flex-col gap-4">
                                    <MovieBlockDetail
                                        label="Sinopse"
                                        textDetail={movie.sinopse}
                                        isMainDetail={true}
                                    />
                                    <MovieBlockDetail
                                        label="Gêneros"
                                        textDetail={movie.generos}
                                    />
                                </div>
                                <div className="flex-1 w-50 grid grid-cols-1 gap-4 md:grid-cols-6">
                                    <div className="md:col-span-3">
                                        <MovieBlockDetail
                                            label="Lançamento"
                                            textDetail={movie.lancamento}
                                        />
                                    </div>
                                    <div className="md:col-span-3">
                                        <MovieBlockDetail
                                            label="Duração"
                                            textDetail={movie.duracao}
                                        />
                                    </div>
                                    <div className="md:col-span-3">
                                        <MovieBlockDetail
                                            label="Duração"
                                            textDetail={movie.duracao}
                                        />
                                    </div>
                                    <div className="md:col-span-3">
                                        <MovieBlockDetail
                                            label="Idioma"
                                            textDetail={movie.idioma}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <MovieBlockDetail
                                            label="Orçamento"
                                            textDetail={movie.orcamento}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <MovieBlockDetail
                                            label="Receita"
                                            textDetail={movie.receita}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <MovieBlockDetail
                                            label="Lucro"
                                            textDetail={movie.lucro}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full px-8 pt-[45px]'>
                <YouTubeEmbed
                    url={movie.teaserUrl}
                    title={`Trailer de ${movie.titulo}`}
                />
            </div>
        </div>
    )
}