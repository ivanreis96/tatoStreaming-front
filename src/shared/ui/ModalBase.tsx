import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverTitle, PopoverDescription } from "@/components/ui/popover";
import type { ReactNode } from "react";


type ModalBaseProps = {
    ChildButton: ReactNode,
    Titulo: string,
    
    // onSearchChange: (value: string) => void
}

export function ModalBase({ChildButton, Titulo}: ModalBaseProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                { ChildButton}
            </PopoverTrigger>
            <PopoverContent>
                <PopoverHeader>
                    <PopoverTitle>{ Titulo }</PopoverTitle>
                    <PopoverDescription>Description text here.</PopoverDescription>
                </PopoverHeader>
            </PopoverContent>
        </Popover>
    )
}