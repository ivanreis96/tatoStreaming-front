export type DatePickerActions = {
  date?: Date
  setDate: (date: Date | undefined) => void
  placeholder?: string
  className?: string
}