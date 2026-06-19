import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
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
    footerContent?: ReactNode,
}

export function ModalBase({ trigger, title, description, children, footerContent }: ModalBaseProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="bg-dialog sm:max-w-[560px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description ? <DialogDescription>{description}</DialogDescription> : null}
                </DialogHeader>
                {children}               
                {footerContent ?
                    <DialogFooter className="bg-dialog">
                        {footerContent}
                    </DialogFooter>
                    : null
                }
            </DialogContent>
        </Dialog>
    )
}