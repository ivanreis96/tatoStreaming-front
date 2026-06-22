import { Button } from "@/components/ui/button"

type FilterFooterProps = {
    onClearFilters: () => void
    onApplyFilters: () => void
}

export function FilterFooter ({ onClearFilters, onApplyFilters }: FilterFooterProps) {
    return (
        <div className="w-full flex justify-end gap-4">
            <Button                
                variant="secondary"
                size="default"
                onClick={onClearFilters}
            >
                Limpar Filtros
            </Button>
            <Button
                variant="default"
                size="default"
                onClick={onApplyFilters}
            >
                Aplicar Filtros
            </Button> 
        </div>
    )
}