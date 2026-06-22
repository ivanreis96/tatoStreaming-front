import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import type { DatePickerActions } from "@/shared"
import { cn } from "@/lib/utils"

export function DatePicker(props: DatePickerActions) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!props.date}
          className={cn(
            "w-full justify-start text-left font-normal data-[empty=true]:text-muted-foreground",
            props.className,
          )}
        >
          <CalendarIcon />
          {props.date ? format(props.date, "PPP") : <span>{props.placeholder ?? "Pick a date"}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden bg-[var(--input)] p-0" align="start">
        <Calendar
          locale={ptBR}
          className=""
          mode="single"
          selected={props.date}
          defaultMonth={props.date}
          captionLayout="dropdown-years"
          onSelect={(date) => {
            props.setDate(date)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}