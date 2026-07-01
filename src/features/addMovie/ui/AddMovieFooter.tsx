import { Button } from "@/components/ui/button"

type AddMovieProps = {
    onCloseFields: () => void
    onCreateMovie: () => void
}

export function AddMovieFooter ({ onCloseFields, onCreateMovie }: AddMovieProps) {
    return (
        <div className="w-full flex justify-end gap-4">
            <Button                
                variant="secondary"
                size="default"
                onClick={onCloseFields}
            >
                Cancelar
            </Button>
            <Button
                variant="default"
                size="default"
                onClick={onCreateMovie}
            >
                Adicionar filme
            </Button> 
        </div>
    )
}