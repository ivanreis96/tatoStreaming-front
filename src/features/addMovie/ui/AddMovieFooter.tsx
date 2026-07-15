import { Button } from "@/components/ui/button"

type AddMovieProps = {
    onCloseFields: () => void
    onCreateMovie: () => void | Promise<void>
    isSubmitting?: boolean
}

export function AddMovieFooter ({ onCloseFields, onCreateMovie, isSubmitting = false }: AddMovieProps) {
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
                {isSubmitting ? 'Adicionando...' : 'Adicionar filme'}
            </Button> 
        </div>
    )
}