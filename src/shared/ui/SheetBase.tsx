import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

type sheetBaseProps = {
    ButtonTrigger: React.ReactNode,
    side?: "top" | "bottom" | "left" | "right",
    children?: React.ReactNode,
    description: string,
    title: string | React.ReactNode,
    footerContent?: React.ReactNode,
}

export function SheetBase({ ButtonTrigger, side, children, description, title, footerContent }: sheetBaseProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                {ButtonTrigger}
            </SheetTrigger>
            <SheetContent
                side={side}
                className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]"
            >
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                    {
                        description ?
                            <SheetDescription>
                                {description}
                            </SheetDescription> 
                            : null
                    }
                </SheetHeader>
                <div>
                    {children}
                </div>
                {footerContent ?
                    <SheetFooter>
                        { footerContent }
                    </SheetFooter>
                    : null}
            </SheetContent>
        </Sheet>
    )
}
