import { Button } from "@/components/ui/button"

export function FilterFooter () {
    return (
        <div className="w-full flex justify-end gap-4">
            <Button                
                variant="secondary"
                size="default"
                onClick={() => console.log('Limpar filtros')}            
            >
                Limpar Filtros
            </Button>
            <Button
                variant="default"
                size="default"
                onClick={() => console.log('Aplicar filtros')}
            >
                Aplicar Filtros
            </Button> 
        </div>
    )
}