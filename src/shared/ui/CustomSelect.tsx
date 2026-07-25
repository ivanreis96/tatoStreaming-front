import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useRef, useState } from "react"

type CustomSelectProps = {
    listItems: ListItemSelect[]
    defaultValue?: string
    value: string
    onChange: (value: string) => void
    placeholder?: string
}

type ListItemSelect = {
    value: string
    label: string
}

export function CustomSelect({ listItems, defaultValue, placeholder, value, onChange }: CustomSelectProps) {
    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null)

    useEffect(() => {
        const nextContainer = wrapperRef.current?.closest('[data-slot="sheet-content"]') as HTMLElement | null
        setPortalContainer(nextContainer)
    }, [])

    return (
        <div ref={wrapperRef}>
            <Select 
                value={value}
                defaultValue={defaultValue}
                onValueChange={onChange}                
            >
                <SelectTrigger className="w-full" suppressHydrationWarning>
                    <SelectValue placeholder={placeholder ? placeholder : ""} />
                </SelectTrigger>
                <SelectContent className="w-full"  portalContainer={portalContainer}>
                    {listItems.map((listItem) => (
                        <SelectItem key={listItem.value} value={listItem.value}>
                            {listItem.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}