import { Button } from "@/components/ui/button"

type AddMovieProps = {
    onCloseFields: () => void
    onCreateMovie: () => void | Promise<void>
    isSubmitting?: boolean
    submitLabel?: string
    submittingLabel?: string
}

export function AddMovieFooter ({
    onCloseFields,
    onCreateMovie,
    isSubmitting = false,
    submitLabel = 'Adicionar filme',
    submittingLabel = 'Adicionando...'
}: AddMovieProps) {
    return (
        <div className="w-full flex justify-end gap-4">
            <Button                
                variant="secondary"
                size="default"
                onClick={onCloseFields}
                disabled={isSubmitting}
            >
                Cancelar
            </Button>
            <Button
                variant="default"
                size="default"
                onClick={onCreateMovie}
                disabled={isSubmitting}
            >
                {isSubmitting ? submittingLabel : submitLabel}
            </Button> 
        </div>
    )
}