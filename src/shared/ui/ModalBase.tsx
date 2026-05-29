import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import type { ReactNode } from "react";


type ModalBaseProps = {
    trigger: ReactNode,
    title: string,
    description?: string,
    children: ReactNode,
    
    // onSearchChange: (value: string) => void
}

export function ModalBase({ trigger, title, description, children }: ModalBaseProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description ? <DialogDescription>{description}</DialogDescription> : null}
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}