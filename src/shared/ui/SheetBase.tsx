import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

type SheetBaseProps = {
    buttonTrigger: React.ReactNode,
    side?: "top" | "bottom" | "left" | "right",
    children?: React.ReactNode,
    description?: string,
    title: string | React.ReactNode,
    footerContent?: React.ReactNode,
}

export function SheetBase({ buttonTrigger, side, children, description, title, footerContent }: SheetBaseProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                {buttonTrigger}
            </SheetTrigger>
            <SheetContent                
                side={side}
                className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh] bg-dialog !max-w-[565px] "
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
